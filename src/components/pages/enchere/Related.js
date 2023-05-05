import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { Colors, convertDateToMillis, css } from '../../../libs'
import { useNavigation } from '@react-navigation/core'
import Ionicons from "react-native-vector-icons/Ionicons"
import { api_public } from '../../../libs/redux/constants/constants'
import CountdownTimer from '../../commons/timer/CountdownTimer'

const Related = ({ data, scrollViewRef, theme }) => {
    const navigation = useNavigation()

    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate("detail", { data });
            scrollViewRef.current.scrollTo({ y: 0, animated: true })
        }}
            style={styles.container}>
            <StatusBar barStyle={"light-content"} backgroundColor={Colors.black} />
            <View style={styles.main_content}>
                {data?.medias?.length > 0 && <View style={styles.image_container}>
                    <Image source={{ uri: `${api_public}/images/${data?.medias[0]}` }} style={styles.image} />
                </View>}

                <View style={[styles.infos, { backgroundColor: theme === "sombre" ? Colors.home_card : Colors.white }]}>
                    <View ><Text style={[styles.name, { color: theme === "sombre" ? Colors.white : Colors.black }]}>{data?.title?.slice(0, 17)}{data?.title?.length > 17 && "..."}</Text></View>
                    <View ><Text style={[styles.price, { color: theme === "sombre" ? Colors.white : Colors.black }]}>{data?.history[data?.history?.length - 1]?.montant || data?.started_price} FCFA</Text></View>
                    {data?.history[data?.history?.length - 1]?.montant < data?.reserve_price && <View style={styles.content}><Text style={styles.reserve}>prix de reserve</Text><Text>{data?.reserve_price} FCFA</Text></View>}
                    <View style={styles.content}><Text style={[styles.delivery, { color: theme === "sombre" ? Colors.white : Colors.black }]}>livraison: </Text><Text style={{ color: theme === "sombre" ? "wheat" : Colors.black }}>{data?.delivery_options?.teliman ? "Teliman" : (!data?.delivery_options?.teliman && data?.delivery_options?.own && data?.delivery_options?.deliveryPrice === 0 ? "gratuite" : data?.delivery_options?.deliveryPrice + " FCFA")}</Text></View>
                    <View style={[css.details.delai, { justifyContent: "space-between" }]}>
                        <Text style={{ color: theme === "sombre" ? Colors.white : Colors.black }}>Fin dans</Text>
                        <View style={css.details.delai}>
                            {/* <Ionicons name="ios-time-outline" size={12} /> */}
                            <CountdownTimer targetDate={convertDateToMillis(data?.expiration_time)} size={13} txtSize={5} hideLabel={false} />
                        </View>
                    </View>
                </View>
            </View >
            <View style={{ alignSelf: "flex-end", borderWidth: 0.3, borderColor: theme === "sombre" ? Colors.white : Colors.input_border_color, width: "40%", borderRadius: 100 }} />
        </TouchableOpacity>
    )
}

export default Related

const styles = StyleSheet.create({
    container: {
        flex: 1, marginVertical: 5
    },
    main_content: {
        width: "100%", flexDirection: "row"
    },
    image_container: {
        width: "40%", height: 150
    },
    image: {
        width: "100%",
        height: "100%", resizeMode: "cover"
    },
    infos: {
        width: "60%",
        padding: 5, height: "100%",
    },
    content: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 4 },
    name: {
        fontSize: 18, letterSpacing: 1, fontWeight: "500"
    },

    price: {
        fontWeight: "300", color: Colors.main
    },
    categorie: {

    },
    delai: {

    },
})