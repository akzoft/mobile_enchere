import React from 'react'
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { Colors } from '../../libs'
import { useDispatch, useSelector } from 'react-redux'
import { delete_enchere } from '../../libs/redux/actions/enchere.action'

const Edit_Delete = ({ edit, handleEdit, data }) => {

    const { host } = useSelector(state => state?.user)
    const dispatch = useDispatch()

    const styles = StyleSheet.create({
        container: { width: "30%", flexDirection: "row", alignItems: "center", justifyContent: edit ? "space-between" : "flex-end" }
    })

    const handleDelete = () => {
        Alert.alert(
            `Suppression de : ${data?.title?.length <= 13 ? data?.title?.slice(0, 13) : data?.title?.slice(0, 13) + "..."}`,
            "Voulez-vous vraiment la supprimer ?",
            [
                { text: 'Non', style: "cancel" },
                {
                    text: 'Oui', onPress: () => {
                        dispatch(delete_enchere(data?._id, host?._id))
                        Alert.alert("Infos", "Suppression effectuée avec succès !", [{ text: "Ok" }])
                        // Toast.show({ type: 'success', text1: 'Infos', text2: "Suppression effectuée avec succès !" });
                    }
                }
            ]
        )
    }

    return (
        <View style={styles.container}>
            {/* <Toast config={toastConfig} /> */}
            {edit &&
                <TouchableOpacity onPress={edit && handleEdit}>
                    <FontAwesome name='edit' size={22} style={{ color: Colors.info }} />
                </TouchableOpacity>
            }
            <TouchableOpacity onPress={handleDelete}>
                <MaterialIcons name='delete' size={22} style={{ color: Colors.danger }} />
            </TouchableOpacity>
        </View>
    )
}

export default Edit_Delete