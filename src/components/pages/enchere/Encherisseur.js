import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from '../../../libs'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import moment from 'moment';

const Encherisseur = ({ own, data, enchere }) => {

    useEffect(() => {
        moment.locale('fr')
    }, [])

    return (
        <View style={styles.content}>
            <View style={[styles.content, {}]}>
                <View style={[styles.user,
                {
                    alignSelf: own ? "flex-end" : "flex-start",
                    borderTopLeftRadius: own ? 10 : 0,
                    borderBottomLeftRadius: own ? 10 : 0,
                    borderTopRightRadius: !own ? 10 : 0,
                    borderBottomRightRadius: !own ? 10 : 0,
                    backgroundColor: own ? Colors.home_card : Colors.light_gray
                }]}>
                    <View style={styles.name_box}>
                        <Text style={[styles.name, { color: own ? Colors.white : Colors.dark }]}>{own ? "Vous" : data?.name?.slice(0, 14) || "Anonyme"}{data?.name?.length > 14 && "..."}</Text>
                        {own && <FontAwesome name="check-circle" size={14} color={Colors.primary} />}
                    </View>
                    <View style={[styles.bid_box]}><Text style={[styles.bid, { color: own ? Colors.white : Colors.dark, paddingLeft: !own ? 10 : 0 }]}>{enchere?.montant} FCFA</Text></View>

                </View>
                <View style={[{ width: "48%", alignSelf: own ? "flex-end" : "flex-start", }]}>
                    <Text style={[styles.date, { color: Colors.dark, paddingLeft: !own ? 10 : 0, textAlign: own ? "left" : "right", }]}>{moment(enchere?.date).fromNow()}</Text>
                </View>

            </View>

        </View>
    )
}

export default Encherisseur

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        width: "100%", marginBottom: 2
    },
    user: {
        backgroundColor: "gray", width: "70%", padding: 10, paddingBottom: 0

    },
    name_box: {
        flexDirection: "row", alignItems: "center"
    },
    name: {
        fontSize: 14, fontWeight: 400, letterSpacing: 1, marginRight: 2
    },
    bid_box: {
        width: "100%",
        paddingVertical: 10
    },
    bid: {
        fontSize: 16, fontWeight: "bold", color: Colors.dark
    },
    date: {
        fontSize: 10, fontStyle: "italic"
    },
})