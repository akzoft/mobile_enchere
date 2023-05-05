import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';
import { Colors } from '../../libs';
import { useDispatch, useSelector } from 'react-redux';
import { participate_in_enchere } from '../../libs/redux/actions/enchere.action';

const Bid_Counter = ({ lastAmount, data, handleOpenVitepay, toggleOverlay }) => {
    const { host } = useSelector(state => state?.user)
    const dispatch = useDispatch()

    const actual_price = parseInt(lastAmount) || parseInt(data?.started_price);
    const increase_price = parseInt(data?.increase_price) || 500
    const [montant, setMontant] = useState(increase_price);

    const increment = () => { setMontant((prevCount) => prevCount + increase_price); }

    const decrement = () => { if (montant - increase_price >= increase_price) setMontant((prevCount) => prevCount - increase_price); }

    const participate = () => { dispatch(participate_in_enchere(data?._id, host?._id, { buyerID: host?._id, montant })) }


    const handleOpen = (e) => {
        handleOpenVitepay(e, data?._id, montant + actual_price);
        toggleOverlay()
    }



    return (
        <View style={styles.container}>
            <View style={styles.info_container}><Text style={styles.info}>Les mises augmentes de: </Text><Text style={{ fontWeight: "bold", color: Colors.dark, fontStyle: "italic" }}>{increase_price} FCFA</Text></View>
            <View style={styles.quantity_increaser}>
                <TouchableOpacity style={styles.btn_container} onPress={() => decrement(increase_price)} >
                    <FontAwesome name="minus" size={24} color={Colors.white} />
                </TouchableOpacity>
                <View style={styles.value_container}><Text style={styles.value}>{montant + actual_price}</Text></View>


                <TouchableOpacity style={styles.btn_container} onPress={() => increment(increase_price)}>
                    <FontAwesome name="plus" size={24} color={Colors.white} />
                </TouchableOpacity>

            </View>

            <View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
                <TouchableOpacity style={styles.confirm_btn} onPress={handleOpen}>
                    <FontAwesome name="gavel" size={24} color={Colors.white} />
                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.confirm_btn} onPress={participate}>
                    <FontAwesome name="gavel" size={24} color={Colors.white} />
                </TouchableOpacity> */}
                <View style={styles.info_container}><Text style={styles.info}>Confirmer la mise </Text></View>
            </View>

        </View>
    )
}

export default Bid_Counter

const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: "center"
    },
    quantity_increaser: {
        flex: 1,
        alignItems: "center", justifyContent: "center",
        width: "100%", flexDirection: "row"
    },
    btn_container: {
        width: "15%",
        backgroundColor: Colors.black,
        padding: 18, alignItems: "center"
    },
    value_container: {
        backgroundColor: Colors.light, borderWidth: 1, borderColor: Colors.input_border_color,
        width: '70%',
        padding: 15, alignItems: "center"
    },

    value: {
        fontSize: 18
    },
    info_container: {
        flexDirection: "row", alignItems: "center", justifyContent: "center"
    },
    info: {
        fontSize: 12, fontStyle: "italic", letterSpacing: 1
    },
    confirm_btn: {
        padding: 15, alignSelf: "center",
        backgroundColor: Colors.main, width: "40%", alignItems: "center", borderRadius: 5, marginTop: 20
    }

})