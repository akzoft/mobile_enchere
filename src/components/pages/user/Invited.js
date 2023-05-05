import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import AntDesign from "react-native-vector-icons/AntDesign"
import { Colors, api_public, isEmpty } from '../../../libs'

const Invited = ({ data, host }) => {
    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <View style={styles.main_container}>
                    {data?.image &&
                        <View style={styles.image_container}>
                            <Image source={{ uri: `${api_public}/images/${data?.medias[0]}` }} style={styles.image} />
                        </View>
                    }

                    {/* <Text style={{ fontSize: 12, fontStyle: "italic", fontWeight: 300 }}>il y'a 12 minutes</Text> */}
                    <TouchableOpacity style={{ padding: 5, backgroundColor: Colors.warning, borderRadius: 5 }}><AntDesign name="contacts" size={20} color={Colors.white} /></TouchableOpacity>

                </View>
                <View style={styles.infos}>
                    {/* <Text style={styles.name}>{host?.name?.slice(0, 15)}{host?.name?.length > 15 && "..."}{isEmpty(host?.name) && host?.phone}</Text> */}
                    <Text style={styles.phone}>{data}</Text>
                </View>
            </View>
            <View style={{ width: "65%", height: 1, backgroundColor: Colors.light_gray, alignSelf: "flex-end" }} />
        </View>
    )
}

export default Invited

const styles = StyleSheet.create({
    container: {
        flex: 1, marginVertical: 10,
    },
    main: { flexDirection: "row", justifyContent: "space-between" },
    main_container: { flexDirection: "row", alignItems: "center", gap: 5 },
    image_container: { height: 30, width: 30, backgroundColor: Colors.info, borderRadius: 30, alignItems: "center", justifyContent: "center" },
    image: { height: 28, width: 28, borderRadius: 28 },
    name: { fontSize: 15, letterSpacing: 1, fontWeight: 400 },
    phone: { fontSize: 12, fontWeight: 300 }
})