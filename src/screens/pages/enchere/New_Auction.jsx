import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, FlatList, TouchableWithoutFeedback, Modal, StatusBar, Alert } from 'react-native'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useEffect, useState } from 'react'
import { CheckBox } from 'react-native-elements'
import DatePicker from 'react-native-date-picker'
import { format } from 'date-fns'
import DocumentPicker from 'react-native-document-picker'
import { CategoriesArticle, Colors, css, handleChange, images, isEmpty, isImage, isVideo, validation_create_enchere } from '../../../libs'
import { Container, InputHandleError, Loading, Separateur } from '../../../components'
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list'
import { useDispatch, useSelector } from 'react-redux'
import { create_enchere } from '../../../libs/redux/actions/enchere.action'
import { useNavigation } from '@react-navigation/native'
import { send_notification } from '../../../libs/redux/actions/notification.action'

const New_Auction = () => {
    const navigation = useNavigation()
    const init = { files: "", sellerID: "", title: "", description: "", categories: [], delivery_options: { teliman: true, own: false, cost: false }, started_price: "", increase_price: "", reserve_price: "", expiration_time: "", enchere_status: "", enchere_type: "", hostID: "" }
    const [inputs, setInputs] = useState(init)
    const [categories, setCategories] = useState([])
    const [selectedValue, setSelectedValue] = useState("publique")
    const [date, setDate] = useState(new Date(new Date().getTime() + 24 * 60 * 60 * 1000))
    const [selectedFiles, setSelectedFiles] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [modalUpdateVisible, setModalUpdateVisible] = useState(false)
    const [selectedImageIndex, setSelectedImageIndex] = useState(null)
    const [deliveryType, setDeliveryType] = useState({ teliman: true, own: false, cost: false })
    const [delivery, setDelivery] = useState({ deliveryPrice: "" })
    const [err, setErr] = useState(null)
    const [clickSubmit, setClickSubmit] = useState(false)

    const data = [{ key: '1', value: 'publique' }, { key: '2', value: 'privée' }]


    const { host } = useSelector(state => state?.user)
    const { new_enchere, loading } = useSelector(state => state?.enchere)
    const { all_firebase_token } = useSelector(state => state?.notification)
    const dispatch = useDispatch()
    const { themes } = useSelector(state => state?.setting)


    //------------------ Modal ----------------------------
    const toggleModal = () => setModalVisible(!modalVisible)

    const toggleUpdateImgModal = (index) => {
        setSelectedImageIndex(index)
        setModalUpdateVisible(!modalUpdateVisible)
    }

    //----------------------------files----------------------------
    function handleImagePress(index) {
        let tab = selectedFiles
        DocumentPicker.pick({ type: [DocumentPicker.types.images, DocumentPicker.types.video] })
            .then((newImage) => {
                if (newImage) {

                    tab = selectedFiles?.filter((img, i) => i !== index)
                    setSelectedFiles([...tab, newImage[0]])
                }
            })
        setModalUpdateVisible(false)
    }

    const handleRemoveImage = (index) => {
        selectedFiles.splice(index, 1)
        setModalUpdateVisible(false)
    }

    function renderItem({ item, index }) {
        if (isImage(item)) {
            return (
                <TouchableOpacity onPress={() => toggleUpdateImgModal(index)} >
                    <Image source={{ uri: item.uri }} style={css.creer.article_img} />
                </TouchableOpacity>
            )
        } else if (isVideo(item)) {
            return (
                <TouchableOpacity onPress={() => toggleUpdateImgModal(index)} style={css.creer.video_display_container}>
                    <Image source={{ uri: item.uri }} style={css.creer.article_img} />
                    <View style={css.creer.video_display_item}>
                        <Image source={images.video_icon_image} style={css.creer.video} />
                    </View>
                </TouchableOpacity>
            )
        }
        return null
    }

    async function pickMultiple() {
        try {
            const results = await DocumentPicker.pickMultiple()
            const filesToAdd = []
            for (const result of results) {
                if (selectedFiles.length + filesToAdd.length >= 5) {
                    break
                }
                if (isImage(result) || isVideo(result)) {
                    filesToAdd.push(result)
                }
            }
            setSelectedFiles([...selectedFiles, ...filesToAdd])
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled document picker')
            } else {
                console.error('Error picking multiple files:', err)
            }
        }
    }

    //------------submit -----------------
    const handleSubmit = () => {

        if (host?.facebook) {
            inputs.sellerID = host?._id
            inputs.categories = categories
            inputs.expiration_time = new Date(date).toISOString()
            inputs.enchere_type = host?.vip === true ? selectedValue === "publique" ? "public" : "private" : "public"
            inputs.enchere_status = host?.vip === true ? "published" : "pending"
            inputs.files = selectedFiles
            inputs.delivery_options = { teliman: deliveryType.teliman, own: deliveryType.own, deliveryPrice: deliveryType.cost ? (delivery.deliveryPrice && delivery.deliveryPrice !== "") ? delivery.deliveryPrice : 0 : 0 }
            inputs.hostID = host?._id

            // recuperer les erreurs du control des champs
            const { init_error, error } = validation_create_enchere(inputs)
            setErr(init_error)

            if (init_error.hostID !== error.hostID ||
                init_error.sellerID !== error.sellerID ||
                init_error.files !== error.files ||
                init_error.categories !== error.categories ||
                init_error.title !== error.title ||
                init_error.description !== error.description ||
                init_error.started_price !== error.started_price ||
                init_error.reserve_price !== error.reserve_price ||
                init_error.increase_price !== error.increase_price
            ) setErr(error)
            else {
                const { files, ...rest } = inputs

                if (files?.length > 0) {
                    let data = new FormData()

                    for (const file of files) {
                        data.append('file', file)
                    }

                    dispatch(create_enchere(data, rest))
                    setClickSubmit(true)
                }
            }
        } else {
            Alert.alert("Avertissement", "Veuillez, vous connecter à facebook d'abord au niveau du profil.", [{ text: "OK" }])
        }


    }

    useEffect(() => {
        if (loading === false && clickSubmit === true) {
            setInputs(init)
            setCategories([])
            setSelectedFiles([])
            setDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000))
            setSelectedValue("publique")
            setClickSubmit(false)

            all_firebase_token?.forEach(token => {
                dispatch(send_notification({ title: "Message d'alerte", body: new_enchere.description, imageUrl: "", to: token }))
            })

            navigation.navigate("detail", { data: new_enchere })
        }
    }, [clickSubmit, loading])


    return (
        clickSubmit ? <Loading text="veuillez patienter..." color="green" /> : (
            <View style={[css.creer.container, { backgroundColor: themes === "sombre" ? Colors.black : Colors.white }]}>
                <StatusBar barStyle={"light-content"} backgroundColor={Colors.black} />

                <Container >
                    <Text style={[css.creer.screen_title, , { color: themes === "sombre" ? Colors.white : Colors.black }]}>Ajouter un article pour l'enchère</Text>
                    <View style={css.creer.screen_title_line} />
                </Container>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[css.creer.scrollable_content, { backgroundColor: themes === "sombre" ? Colors.white : Colors.white }]}>
                    <Container >

                        <Separateur style={css.creer.title} text={"Informations sur l'article"} />
                        <View style={{ width: "100%", }}>
                            <View style={css.creer.input_container}>
                                <View style={[css.creer.article_img_container,]}>
                                    <TouchableOpacity onPress={pickMultiple} style={[css.creer.input, css.creer.upload]}>
                                        <FontAwesome5 name='upload' color={"black"} size={28} style={{ opacity: 0.5 }} />
                                        <View><Text>Uploader des fichiers (max: 5 fichiers)</Text></View>
                                    </TouchableOpacity>
                                </View>
                                {!isEmpty(err) && !isEmpty(err.files) && <InputHandleError message={err.files} />}
                                <View >
                                    <FlatList
                                        data={selectedFiles}
                                        renderItem={renderItem}
                                        keyExtractor={(item, index) => index.toString()}
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                    />
                                </View>
                            </View>

                            <View style={css.creer.input_container}>
                                <TextInput placeholder='Titre article*' style={css.creer.input}
                                    value={inputs.title}
                                    onChangeText={text => handleChange('title', text, setInputs)}
                                />
                                {!isEmpty(err) && !isEmpty(err.title) && <InputHandleError message={err.title} />}
                            </View>

                            <View style={css.creer.input_container}>
                                <TextInput placeholder='Description article*' style={[css.creer.input, { alignItems: "flex-start", justifyContent: "flex-start" }]}
                                    multiline={true}
                                    numberOfLines={4}
                                    value={inputs.description}
                                    onChangeText={text => handleChange('description', text, setInputs)}
                                />
                                {!isEmpty(err) && !isEmpty(err.description) && <InputHandleError message={err.description} />}
                            </View>

                            <Text>Categories <Text style={css.creer.require}>*</Text></Text>
                            <MultipleSelectList
                                setSelected={(val) => setCategories(val)}
                                placeholder='Selectionner une ou plusieurs categorie(s)'
                                data={CategoriesArticle}
                                save="value"
                                label="Categorie(s)"
                                search={true}
                                dropdownStyles={{ borderWidth: 1, borderColor: Colors.input_border_color, borderRadius: 5 }}
                                boxStyles={{ borderWidth: 1, borderColor: Colors.input_border_color, borderRadius: 5 }}
                            />
                            <Text style={{ fontSize: 12, color: Colors.warning }}>Nombre maximal de categorie: 3</Text>
                            {!isEmpty(err) && !isEmpty(err.categories) && <InputHandleError message={err.categories} />}
                        </View>

                        <Separateur style={css.creer.title} text={"Informations sur l'enchère"} />
                        <View style={{ width: "100%", }}>
                            <View style={css.creer.input_container}>
                                <TextInput
                                    keyboardType="number-pad"
                                    placeholder='Prix de depart*' style={css.creer.input}
                                    value={inputs.started_price}
                                    onChangeText={text => handleChange('started_price', text, setInputs)}
                                />
                                {!isEmpty(err) && !isEmpty(err.started_price) && <InputHandleError message={err.started_price} />}
                            </View>

                            <View style={css.creer.input_container}>
                                <TextInput
                                    keyboardType="number-pad"
                                    placeholder="Prix de reserve" style={css.creer.input}
                                    value={inputs.reserve_price}
                                    onChangeText={text => handleChange('reserve_price', text, setInputs)}
                                />
                                {!isEmpty(err) && !isEmpty(err.reserve_price) && <InputHandleError message={err.reserve_price} />}
                            </View>

                            <View style={css.creer.input_container}>
                                <TextInput
                                    keyboardType="number-pad"
                                    placeholder="Prix d'incrementation*" style={css.creer.input}
                                    value={inputs.increase_price}
                                    onChangeText={text => handleChange('increase_price', text, setInputs)}
                                />
                                {!isEmpty(err) && !isEmpty(err.increase_price) && <InputHandleError message={err.increase_price} />}
                            </View>
                        </View>

                        <Separateur style={css.creer.title} text={"Parametrage de l'enchère"} />
                        <View style={{ width: "100%", }}>
                            <View style={css.creer.input_container}>
                                <Text style={{ marginTop: 5 }}>Delai de fin de l'enchère <Text style={css.creer.require}>*</Text></Text>
                                <View style={[css.creer.input, { padding: 15 }]}>
                                    <TouchableWithoutFeedback onPress={toggleModal} >
                                        <Text><Text style={[css.creer.input]}>{format(date, 'dd/MM/yyyy')}</Text></Text>
                                    </TouchableWithoutFeedback>
                                </View>
                                <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={toggleModal} style={{ alignItems: "center" }}>
                                    <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                                        <View style={css.creer.modal}>
                                            <DatePicker
                                                date={date}
                                                onDateChange={setDate}
                                                mode="date"
                                                style={{ backgroundColor: "white" }}
                                            />
                                            <TouchableOpacity onPress={toggleModal} style={[css.creer.button, { width: "75%", }]}>
                                                <Text style={{ color: Colors.white, letterSpacing: 1, fontSize: 14 }}>Selectionner</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </Modal>

                                <InputHandleError message={""} />
                            </View>

                            <View>
                                <Text style={css.creer.label}>Options de livraison <Text style={css.creer.require}>*</Text></Text>
                                <View style={{ flexDirection: "row" }}>
                                    <CheckBox
                                        title={"Teliman"}
                                        checked={deliveryType.teliman ? "checked" : ""}
                                        onPress={() => setDeliveryType({ teliman: true, own: false, cost: false })}
                                        containerStyle={[css.creer.checkboxContainer]}
                                        textStyle={[css.creer.checkboxText, { textDecorationLine: deliveryType.own ? "line-through" : "none", textDecorationColor: Colors.main }]}

                                    />

                                    <CheckBox
                                        title={"A main propre"}
                                        checked={deliveryType.own ? "checked" : ""}
                                        onPress={() => setDeliveryType(old => { return { ...old, teliman: false, own: true } })}
                                        containerStyle={[css.creer.checkboxContainer]}
                                        textStyle={[css.creer.checkboxText, { textDecorationLine: deliveryType.teliman ? "line-through" : "none", textDecorationColor: Colors.main }]}

                                    />

                                    {deliveryType.own &&
                                        <CheckBox
                                            title={"Avec frais"}
                                            checked={deliveryType.cost ? "checked" : ""}
                                            onPress={() => setDeliveryType(old => { return { ...old, teliman: false, cost: !deliveryType.cost } })}
                                            containerStyle={css.creer.checkboxContainer}
                                            textStyle={css.creer.checkboxText}

                                        />
                                    }
                                </View>

                                {(deliveryType.own && deliveryType.cost) &&
                                    <View style={css.creer.input_container}>
                                        <TextInput
                                            keyboardType="number-pad"
                                            placeholder='Prix de livraison' style={css.creer.input}
                                            value={delivery.deliveryPrice}
                                            onChangeText={text => handleChange('deliveryPrice', text, setDelivery)}
                                        />

                                    </View>
                                }

                                <InputHandleError message={""} />
                            </View>

                            {!isEmpty(host) && host?.vip === true &&
                                <View style={css.creer.input_container}>
                                    <Text style={css.creer.label}>Type d'enchère <Text style={css.creer.require}>*</Text></Text>

                                    <SelectList
                                        setSelected={(val) => setSelectedValue(val)}
                                        data={data}
                                        save="value"
                                        search={false}
                                        placeholder={data[0].value}
                                        dropdownStyles={{ borderWidth: 1, borderColor: Colors.input_border_color, borderRadius: 5 }}
                                        boxStyles={{ borderWidth: 1, borderColor: Colors.input_border_color, borderRadius: 5 }}
                                    />
                                    <InputHandleError message={""} />
                                </View>
                            }
                        </View>

                        <TouchableOpacity style={css.creer.button} onPress={handleSubmit} activeOpacity={0.7}>
                            <Text style={css.creer.text}>Enregistrer</Text>
                        </TouchableOpacity>

                        {/* Modal pour la gestion de modification et de suppression de fichiers */}
                        <Modal visible={modalUpdateVisible} animationType="slide" transparent={true} onRequestClose={toggleModal} style={{ alignItems: "center" }}>
                            <TouchableWithoutFeedback onPress={() => setModalUpdateVisible(false)}>
                                <View style={css.creer.modal}>
                                    <Container style={{ backgroundColor: Colors.white, paddingBottom: 40, paddingTop: 0, borderRadius: 5 }}>
                                        <TouchableOpacity onPress={() => setModalUpdateVisible(false)} style={css.creer.close_update_img_modal_container}>
                                            <Ionicons name="ios-close-outline" size={32} color={Colors.danger} />
                                        </TouchableOpacity>

                                        <Separateur my={0} style={css.creer.title} text={"Choisissez une option"} />
                                        <TouchableOpacity onPress={() => handleImagePress(selectedImageIndex)} style={[css.creer.button, css.creer.update_img_modal_btn, { backgroundColor: Colors.main }]}>
                                            <MaterialCommunityIcons name="image-edit" size={32} color={Colors.white} />
                                            <Text style={{ color: Colors.white, letterSpacing: 1, fontSize: 14 }}>Remplacer le fichier selectionné</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => handleRemoveImage(selectedImageIndex)} style={[css.creer.button, css.creer.update_img_modal_btn, { backgroundColor: Colors.black }]}>
                                            <MaterialCommunityIcons name="image-remove" size={32} color={Colors.white} />
                                            <Text style={{ color: Colors.white, letterSpacing: 1, fontSize: 14 }}>Supprimer le fichier selectionné</Text>
                                        </TouchableOpacity>
                                    </Container>

                                </View>
                            </TouchableWithoutFeedback>
                        </Modal>
                        <View style={css.space.spacer} />
                    </Container>
                </ScrollView >
            </View >
        )
    )
}
export default New_Auction





