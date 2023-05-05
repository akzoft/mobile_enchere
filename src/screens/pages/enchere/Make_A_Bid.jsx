import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { Bid_Counter, CountdownTimer, Encherisseur, Separateur } from '../../../components'
import { Colors, ExpirationVerify, Vitepay, api_public, convertDateToMillis, css, isEmpty } from '../../../libs'
import { Overlay } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect } from 'react'

const Make_A_Bid = ({ navigation, route }) => {
    const [visible, setVisible] = useState(false);
    const { data } = route?.params
    const dispatch = useDispatch();
    const { host } = useSelector(state => state?.user)
    const { themes } = useSelector(state => state?.setting)




    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const handleOpenVitepay = (e, orderId, amount) => {
        e.preventDefault()
        const vitepay = new Vitepay()
        vitepay.post_data(orderId, amount)
            .then(link => navigation.navigate("vitepay_confirm", { link }))
            .catch(error => console.error(error));
    }

    // console.log(data)

    return (
        <View style={styles.container}>
            <StatusBar barStyle={"light-content"} backgroundColor={Colors.black} />

            <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={css.details.bottomSheet} animationType="slide" animationDuration={1000}>
                <View style={css.details.sheet_header}>
                    <Text style={css.details.sheet_title}>Les mises disponibles</Text>
                    <TouchableOpacity activeOpacity={0.7} onPress={toggleOverlay}><Fontisto name="close-a" size={18} style={css.details.sheet_close} /></TouchableOpacity>
                </View>

                <View style={css.creer.screen_title_line} />

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={css.details.desc_container}>
                    {(((data?.history?.length > 0 && data?.history[data?.history?.length - 1]?.montant) < data?.reserve_price) || isEmpty(data?.history)) &&
                        <View style={{ marginVertical: 4, marginBottom: 20 }}>
                            <TouchableOpacity onPress={(e) => handleOpenVitepay(e, data?._id, data?.reserve_price)} style={[styles.make, { backgroundColor: Colors.black }]}>
                                <Text style={styles.btn_text}>Reserver le produit</Text>
                            </TouchableOpacity>
                            <View style={styles.reserver}><Text style={styles.reserve_txt}>prix de reservation: </Text><Text style={styles.reserce_prix}>{data?.reserve_price} FCFA</Text></View>
                        </View>
                    }

                    <Separateur text={data?.history[data?.history?.length - 1]?.montant < data?.reserve_price ? "OU MISER" : "MISER"} />

                    <View style={{ marginVertical: 4 }}>
                        <Bid_Counter toggleOverlay={toggleOverlay} lastAmount={data?.history[data?.history?.length - 1]?.montant} start={500} step={500} data={data} handleOpenVitepay={handleOpenVitepay} />
                    </View>
                </ScrollView>
            </Overlay>

            <View style={[styles.product, { backgroundColor: themes === "sombre" ? Colors.home_card : Colors.white }]}>
                <TouchableOpacity onPress={() => navigation.navigate("detail", { data })} style={styles.prod}>
                    <View style={styles.image_container}>
                        <Image source={{ uri: `${api_public}/images/${data?.medias[0]}` }} style={styles.image} />
                    </View>
                    <View style={styles.infos}>
                        <Text style={[styles.name, { color: themes === "sombre" ? Colors.white : Colors.black }]}>{(data?.title && data?.title?.length <= 14) ? data?.title.slice(0, 14) : data?.title.slice(0, 14) + "..."}</Text>
                        <Text style={styles.price}>{data?.history[data?.history?.length - 1]?.montant || data?.started_price} FCFA</Text>
                    </View>
                </TouchableOpacity>

                <View style={[styles.expiration, { alignItems: "center" }]}>
                    <Text style={{ color: themes === "sombre" ? Colors.white : Colors.black }}>Délai d'expiration</Text>
                    <CountdownTimer targetDate={convertDateToMillis(data?.expiration_time)} size={13} txtSize={5} hideLabel={false} />
                </View>
            </View>
            <View style={{ width: "100%", alignItems: "center" }}><View style={[css.creer.screen_title_line, { marginTop: 0 }]} /></View>
            <ScrollView contentContainerStyle={{ paddingVertical: 10, flexGrow: 1, backgroundColor: themes === "sombre" ? "#262626" : Colors.white }}>
                {data?.history?.length > 0 ?
                    data?.history?.map((enchere) => <Encherisseur data={data} enchere={enchere} own={host?._id === enchere?.buyerID ? true : false} key={enchere?._id} />) :
                    <View style={{ height: "100%", alignItems: "center", justifyContent: "center", }}>
                        <Text style={{ fontSize: 16, letterSpacing: 1, fontWeight: 300, color: themes === "sombre" ? "wheat" : Colors.black }}>Aucune participation pour l'instant</Text>
                        <Text style={{ fontSize: 13, letterSpacing: 1, fontWeight: 300, color: themes === "sombre" ? "wheat" : Colors.black }}>Voulez-vous bien être la première!</Text>
                    </View>
                }
            </ScrollView>
            <View style={[styles.bottom, { backgroundColor: themes === "sombre" ? Colors.home_card : Colors.white }]}>
                {ExpirationVerify(data?.expiration) ?
                    <TouchableOpacity onPress={toggleOverlay} style={styles.make}>
                        <Text style={styles.btn_text}>Placer une offre</Text>
                    </TouchableOpacity> :
                    <TouchableOpacity activeOpacity={0.8} style={[styles.make, { backgroundColor: Colors.secondary }]}>
                        <Text style={styles.btn_text}>Enchère fermée</Text>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

export default Make_A_Bid

const styles = StyleSheet.create({
    container: { flex: 1 },
    product: { flexDirection: "row", justifyContent: "space-between", padding: 5 },
    prod: { flexDirection: "row", justifyContent: "space-between", padding: 5 },
    image_container: { width: 65, height: 65 },
    image: { width: "100%", height: "100%" },
    bottom: { padding: 10, paddingHorizontal: 20 },
    make: { padding: 15, backgroundColor: Colors.main, alignItems: "center", justifyContent: "center", borderRadius: 5 },
    infos: { paddingLeft: 5 },
    name: { fontSize: 15, color: Colors.dark },
    price: { color: Colors.main, paddingLeft: 5, paddingTop: 5, fontSize: 14 },
    btn_text: { textAlign: "center", alignItems: "center", justifyContent: "center", fontWeight: "bold", color: Colors.white, fontSize: 16 }
    , reserver: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    reserve_txt: { color: Colors.dark },
    reserce_prix: { color: Colors.main, fontWeight: "bold" },
    expiration: { paddingRight: 10 }
})


