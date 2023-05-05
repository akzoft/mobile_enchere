import React, { useEffect, useState } from 'react'
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Image } from 'react-native'
import { Colors, api_public, convertDateToMillis, css } from '../../../libs'
import { useNavigation } from '@react-navigation/core'
import Fontisto from "react-native-vector-icons/Fontisto"
import CountdownTimer from '../../commons/timer/CountdownTimer'
import { Overlay } from 'react-native-elements'
import EditRejectedBid from './EditRejectedBid'
import RejectMotifBid from './RejectMotifBid'
import Edit_Delete from '../../commons/Edit_Delete'
import { useDispatch, useSelector } from 'react-redux'

const Small_Enchere_Card = ({ data, type, theme }) => {
    const navigation = useNavigation()
    const [visible, setVisible] = useState(false);
    const [typOverlay, setTypOverlay] = useState("edit");

    const { host } = useSelector(state => state?.user)
    const dispatch = useDispatch()

    const toggleOverlay = () => setVisible(!visible)

    const handleMotif = () => {
        toggleOverlay()
        setTypOverlay("motif")
    }

    const handleEdit = () => {
        toggleOverlay()
        setTypOverlay("edit")
    }

    return (
        <TouchableOpacity onPress={() => navigation.navigate("detail", { data })} style={[styles.container, { backgroundColor: theme === "sombre" ? Colors.home_card : Colors.white }]}>
            <StatusBar barStyle={"light-content"} backgroundColor={Colors.black} />

            <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={[css.details.bottomSheet, { height: "75%", paddingHorizontal: 0 }]} animationType="slide" animationDuration={1000}>
                <View style={{ paddingHorizontal: 20 }}>
                    <View style={[css.details.sheet_header,]}>
                        <Text style={[css.details.sheet_title, , { color: theme === "sombre" ? Colors.white : Colors.black }]}>{typOverlay === "edit" ? "Modifier l'article" : typOverlay === "motif" && "Motifs du rejet de l'article"}</Text>
                        <TouchableOpacity activeOpacity={0.7} onPress={toggleOverlay}><Fontisto name="close-a" size={18} style={css.details.sheet_close} /></TouchableOpacity>
                    </View>

                    <View style={[css.creer.screen_title_line]} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[{ width: "100%", paddingHorizontal: 0, backgroundColor: theme === "sombre" ? Colors.home_card : Colors.white }]}>
                    {typOverlay === "edit" && <EditRejectedBid theme={theme} data={data} />}
                    {typOverlay === "motif" && <RejectMotifBid theme={theme} data={data} />}
                </ScrollView>
            </Overlay>

            <View style={[styles.main_content, { backgroundColor: theme === "sombre" ? Colors.home_card : Colors.white }]}>
                <View style={styles.image_container}>
                    <Image source={{ uri: `${api_public}/images/${data?.medias[0]}` }} style={styles.image} />
                </View>

                <View style={styles.infos}>
                    <View style={styles.title}>
                        <Text style={[styles.name, { color: theme === "sombre" ? Colors.white : Colors.black }]}>{data?.title?.length <= 10 ? data?.title?.slice(0, 10) : data?.title?.slice(0, 10) + "..."}</Text>
                        {type === "reject" ? <Edit_Delete edit={true} handleEdit={handleEdit} data={data} /> : <Edit_Delete data={data} />}
                    </View>
                    <View>
                        <Text style={styles.price}>{data?.history[data?.history?.length - 1]?.montant || data?.started_price} FCFA</Text>
                    </View>
                    <View style={styles.content}>
                        <Text style={[styles.reserve, { color: theme === "sombre" ? Colors.white : Colors.black }]}>prix de reserve :</Text><Text style={{ fontSize: 12, color: theme === "sombre" ? "wheat" : Colors.black }}>{data?.reserve_price} FCFA</Text>
                    </View>
                    <View style={styles.content}>
                        <Text style={[styles.delivery, { color: theme === "sombre" ? Colors.white : Colors.black }]}>livraison :</Text>
                        <Text style={{ fontSize: 12, color: theme === "sombre" ? "wheat" : Colors.black }}>{data?.delivery_options?.teliman ? "Teliman" : (!data?.delivery_options?.teliman && data?.delivery_options?.own && data?.delivery_options?.deliveryPrice === 0 ? "gratuite" : data?.delivery_options?.deliveryPrice)}</Text>
                    </View>
                    {type === "finished" &&
                        <View style={styles.content}>
                            <Text style={[styles.delai, { color: theme === "sombre" ? Colors.white : Colors.black }]}>Expiration :</Text>
                            <Text style={[styles.delai, { color: Colors.warning }]}>Expirée</Text>
                        </View>
                    }
                    {type !== "reject" && type !== "finished" &&
                        <View style={styles.content}>
                            <Text style={[styles.delai, { color: theme === "sombre" ? Colors.white : Colors.black }]}>Expiration :</Text>
                            <CountdownTimer targetDate={convertDateToMillis(data?.expiration_time)} size={11} hideLabel={true} />
                        </View>
                    }
                    {type === "reject" &&
                        <>
                            <View style={styles.content}>
                                <Text style={[styles.delai, { color: theme === "sombre" ? Colors.white : Colors.black }]}>Status :</Text>
                                <Text style={[styles.delai, { color: theme === "sombre" ? "wheat" : Colors.danger }]}>Rejetée</Text>
                            </View>
                            <TouchableOpacity onPress={handleMotif} style={{ alignItems: "center", }}>
                                <Text style={{ color: Colors.warning, textDecorationLine: "underline" }}>Motif de rejet</Text>
                            </TouchableOpacity>
                        </>
                    }
                </View>
            </View>
            <View style={{ alignSelf: "flex-end", borderWidth: 0.3, borderColor: Colors.input_border_color, width: "40%", borderRadius: 100 }} />
        </TouchableOpacity>
    )
}

export default Small_Enchere_Card

const styles = StyleSheet.create({
    container: { flex: 1, marginVertical: 2, backgroundColor: Colors.white, borderRadius: 5, borderWidth: 0.6, borderColor: Colors.input_border_color },

    main_content: { width: "100%", flexDirection: "row" },
    image_container: { width: "40%", borderTopLeftRadius: 7, borderBottomLeftRadius: 7 },
    title: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    image: { width: "100%", height: "100%", resizeMode: "cover", borderTopLeftRadius: 5, borderBottomLeftRadius: 5 },
    infos: { width: "60%", padding: 5, height: "100%", borderLeftWidth: 1, borderLeftColor: "rgba(0,0,0,0.1)" },
    content: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 2 },
    name: { width: "70%", fontSize: 18, letterSpacing: 1, fontWeight: "300" },

    price: { fontWeight: "300", color: Colors.main, fontSize: 12 },
    reserve: { fontSize: 13 },
    categorie: {},
    delai: { fontSize: 12 },
})