import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { Colors } from '../../libs'
import { colors } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

const Vitepay_cards = ({ text, type }) => {
    const navigation = useNavigation()

    const styles = StyleSheet.create({
        info_card: {
            width: "80%", height: "50%", alignItems: "center", justifyContent: "center",
            gap: 10,
            padding: 20, borderWidth: 1, borderColor: type === "success" ? colors.success : type === "cancel" ? Colors.warning : Colors.danger,
            paddingVertical: 40, borderRadius: 5,
            backgroundColor: Colors.white,
            shadowColor: type === "success" ? colors.success : type === "cancel" ? Colors.warning : Colors.danger,
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 2, },
            shadowRadius: 4,
            elevation: 10,
            borderRadius: 10
        },
        text: {
            fontSize: 22,
            letterSpacing: 1, fontWeight: 300
        },
        return_btn: {
            marginTop: 35, paddingHorizontal: 5
            , paddingVertical: 10
        },
        return_text: {
            letterSpacing: 1, color: Colors.facebook, textDecorationLine: "underline", fontStyle: "italic"
        }
    })


    return (
        <View style={styles.info_card}>
            {type === "cancel" ?
                <FontAwesome name="warning" size={50} color={Colors.warning} /> :
                <FontAwesome5 name={type === "success" ? "handshake" : type === "failed" && "times-circle"} size={50} color={type === "success" ? colors.success : type === "failed" && Colors.danger} />
            }
            <Text style={[styles.text, { color: type === "success" ? colors.success : type === "cancel" ? Colors.warning : Colors.danger, textAlign: "center" }]}>{text}</Text>

            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.return_btn}><Text style={styles.return_text}>Retourner à l'enchère</Text></TouchableOpacity>
        </View>
    )
}

export default Vitepay_cards

