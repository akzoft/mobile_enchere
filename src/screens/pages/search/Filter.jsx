import { useState } from 'react'
import { StatusBar, TouchableOpacity } from 'react-native'
import { View, Text } from 'react-native'
import { Colors, css, filtre_enchere, isEmpty, toastConfig } from '../../../libs'
import { Container, Separateur } from '../../../components'
import { ScrollView } from 'react-native'
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import { TouchableWithoutFeedback } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { format } from 'date-fns'
import { Modal } from 'react-native'
import { Slider } from 'react-native-elements'
import Toast from 'react-native-toast-message'
import { useDispatch, useSelector } from 'react-redux'


const Filter = ({ navigation }) => {
    const [value, setValue] = useState(500)
    const [dateModalFrom, setDateModalFrom] = useState(false)

    const range = { step: 500, min: 500, max: 350000 }
    const [dateFrom, setDateFrom] = useState(new Date())
    const [Lieu, setLieu] = useState([])
    const [categorie, setCategorie] = useState([])

    const { themes } = useSelector(state => state?.setting)


    const data = [
        { key: '1', value: 'Bamako' },
        { key: '2', value: 'Hamdallaye' },
        { key: '3', value: 'Sotuba' },
        { key: '4', value: 'Sikass0' },
        { key: '5', value: 'Zegoua' },
        { key: '6', value: 'Magnambougou' },
        { key: '7', value: 'Daoudabougou' },
    ]

    const { host } = useSelector(state => state?.user)
    const dispatch = useDispatch()

    const toggleModalFrom = () => {
        setDateModalFrom(!dateModalFrom)
    }

    //envoi de donnée à la base de donnée
    const handleFilter = () => {

        const datas = {
            lieu: Lieu,
            categories: categorie,
            date: dateFrom,
            montant: value,
        }

        dispatch(filtre_enchere(host?._id, datas))

        navigation.navigate("search")
    }

    return (
        <View style={[css.filter.container, { backgroundColor: themes === "sombre" ? Colors.black : Colors.white }]}>
            <StatusBar barStyle={"light-content"} backgroundColor={Colors.black} />

            <Container >
                <Text style={[css.creer.screen_title, { color: themes === "sombre" ? Colors.white : Colors.black }]}>Filtrer vos recherches</Text>
                <View style={[css.creer.screen_title_line]} />
                <Toast config={toastConfig} />
            </Container>

            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', width: "100%", zIndex: -1, backgroundColor: Colors.white }}>
                <Container>
                    <View style={css.filter.card}>

                        <Separateur my={0} style={[css.creer.title]} text={"Lieu"} />
                        <MultipleSelectList
                            setSelected={(val) => setLieu(val && val)}
                            data={data}
                            placeholder='Selectionner un ou des lieu(x)'
                            save="value"
                            label="Lieu(x)"
                            search={true}
                            dropdownStyles={{ borderWidth: 1, borderColor: Colors.input_border_color, borderRadius: 5 }}
                            boxStyles={{ borderWidth: 1, borderColor: Colors.input_border_color, borderRadius: 5 }}
                        />

                        <Separateur my={15} style={[css.creer.title]} text={"Categories"} />
                        <MultipleSelectList
                            setSelected={(val) => setCategorie(val)}
                            placeholder='Selectionner une ou plusieurs categorie(s)'
                            data={data}
                            save="value"
                            label="Categorie(s)"
                            search={true}
                            dropdownStyles={{ borderWidth: 1, borderColor: Colors.input_border_color, borderRadius: 5 }}
                            boxStyles={{ borderWidth: 1, borderColor: Colors.input_border_color, borderRadius: 5 }}
                        />

                        <Separateur my={15} style={[css.creer.title]} text={"Date"} />
                        <View style={css.creer.input_container}>
                            <Text style={{ marginTop: 5 }}>Date</Text>
                            <View style={[css.creer.input, { padding: 15 }]}>
                                <TouchableWithoutFeedback onPress={toggleModalFrom} >
                                    <Text><Text style={[css.creer.input]}>{format(dateFrom, 'dd/MM/yyyy')}</Text></Text>
                                </TouchableWithoutFeedback>
                            </View>

                            <Modal visible={dateModalFrom} animationType="slide" transparent={true} onRequestClose={toggleModalFrom} style={{ alignItems: "center" }}>
                                <TouchableWithoutFeedback onPress={() => setDateModalFrom(false)}>
                                    <View style={css.creer.modal}>
                                        <DatePicker
                                            date={dateFrom}
                                            onDateChange={(date) => setDateFrom(date)}
                                            mode="date"
                                            style={{ backgroundColor: "white" }}
                                        />
                                        <TouchableOpacity onPress={toggleModalFrom} style={[css.creer.button, { width: "75%", }]}>
                                            <Text style={{ color: Colors.white, letterSpacing: 1, fontSize: 14 }}>Selectionner</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableWithoutFeedback>
                            </Modal>

                        </View>

                        <Separateur my={15} style={[css.creer.title]} text={"Fourchette de prix (FCFA)"} />
                        <View style={css.creer.input_container}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <Text>{range.min}</Text><Text style={{ color: Colors.brown }}>{value}</Text>
                            </View>

                            <Slider
                                value={value}
                                onValueChange={(value) => setValue(value)}
                                minimumValue={range.min}
                                maximumValue={range.max}
                                step={range.step}

                                minimumTrackTintColor={Colors.main}
                                maximumTrackTintColor={Colors.input_border_color}

                                thumbStyle={{ backgroundColor: Colors.main, borderWidth: 2, borderColor: Colors.main, borderRadius: 20, height: 20, width: 20 }}
                            />
                        </View>

                        <TouchableOpacity onPress={handleFilter} style={{ backgroundColor: Colors.main, padding: 12, marginTop: 30, borderRadius: 5 }}>
                            <Text style={{ textAlign: 'center', color: Colors.white, fontSize: 15 }}>
                                Appliquer le filtre
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Container>
            </ScrollView>
        </View>
    )
}
export default Filter

