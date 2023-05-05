import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import Octicons from "react-native-vector-icons/Octicons"
import { Image } from 'react-native'
import { Colors, css, images, isEmpty, logout, toastConfig } from '../../../libs'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Toast from 'react-native-toast-message';

const Profile = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const routes = route?.params
    const { host } = useSelector(state => state?.user);

    const { themes } = useSelector(state => state?.setting)


    //affiche les erreurs eventuelles apres le dispatch
    useEffect(() => {
        if (routes?.message) {
            Toast.show({ type: 'success', text1: 'Reussie', text2: routes?.message, visibilityTime: 5000 });
            routes.message = ""
        }
    }, [routes]);

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logout())
    }

    return (

        <View style={css.profile.container}>
            <StatusBar barStyle={"light-content"} backgroundColor={Colors.black} />

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={[css.profile.profile_infos, { backgroundColor: themes === "sombre" ? Colors.black : Colors.main }]}>
                    <View style={css.profile.profile_image_container}>
                        <Image source={!isEmpty(host?.facebook) ? { uri: host?.facebook?.picture_url } : images.user_avatar} style={css.profile.profile_image} />
                    </View>
                    <View style={css.profile.profile_details}>
                        {(host?.facebook?.first_name || host?.facebook?.last_name) && <Text style={[css.profile.profile_details_text, { fontSize: 20, fontWeight: 300, color: themes === "sombre" ? Colors.white : Colors.dark }]}>{host?.facebook?.first_name + " " + host?.facebook?.last_name || host?.name}</Text>}
                        <Text style={css.profile.profile_details_text}>{host?.phone}</Text>
                        {(host?.facebook?.email || host?.email) && <Text style={[css.profile.profile_details_text, { fontSize: 13, color: themes === "sombre" ? Colors.white : Colors.dark }]}>{host?.email?.slice(0, 25)}{host?.email?.length > 25 && "..."}</Text>}
                        {(host?.facebook?.town || host?.town) && <Text style={[css.profile.profile_details_text, { fontSize: 10, color: themes === "sombre" ? Colors.white : Colors.dark }]}>{host?.town?.slice(0, 25)}{host?.town?.length > 25 && "..."}</Text>}
                    </View>
                </View>

                <Toast config={toastConfig} />


                <View style={css.profile.profile_main_content}>
                    {/* section compte */}
                    <View style={css.profile.section} />
                    <TouchableOpacity onPress={() => navigation.navigate("edit_profile")} activeOpacity={0.6} style={css.profile.profile_item}>
                        <View style={css.profile.left}>
                            <View style={[css.profile.profile_item_icon_box, { backgroundColor: "#ca135e" }]}>
                                <FontAwesome5 name="user-edit" size={22} color={Colors.white} />
                            </View>
                            <Text>Modifier mon profil</Text>
                        </View>

                        <FontAwesome name="angle-right" size={20} />

                    </TouchableOpacity>
                    <View style={css.profile.separator} />

                    <TouchableOpacity onPress={() => navigation.navigate("facebook_validation")} activeOpacity={0.6} style={css.profile.profile_item}>
                        <View style={css.profile.left}>
                            <View style={[css.profile.profile_item_icon_box, { backgroundColor: Colors.primary }]}>
                                <FontAwesome name="facebook-f" size={22} color={Colors.white} />
                            </View>
                            <Text>Valider mon profil facebook</Text>
                        </View>

                        <FontAwesome name="angle-right" size={20} />

                    </TouchableOpacity>
                    <View style={css.profile.separator} />

                    {/* section enchère */}
                    <View style={css.profile.section} />
                    <TouchableOpacity onPress={() => navigation.navigate("my_auctions")} activeOpacity={0.6} style={css.profile.profile_item}>
                        <View style={css.profile.left}>
                            <View style={[css.profile.profile_item_icon_box, { backgroundColor: Colors.main }]}>
                                <MaterialCommunityIcons name="gavel" size={22} color={Colors.white} />
                            </View>
                            <Text>Mes enchères</Text>
                        </View>

                        <FontAwesome name="angle-right" size={20} />

                    </TouchableOpacity>
                    <View style={css.profile.separator} />

                    {/* <TouchableOpacity onPress={() => navigation.navigate("my_purchases")} activeOpacity={0.6} style={css.profile.profile_item}>
                        <View style={css.profile.left}>
                            <View style={[css.profile.profile_item_icon_box, { backgroundColor: "#546eed" }]}>
                                <FontAwesome5 name="shopping-cart" size={22} color={Colors.white} />
                            </View>
                            <Text>Mes achats</Text>
                        </View>

                        <FontAwesome name="angle-right" size={20} />

                    </TouchableOpacity>
                    <View style={css.profile.separator} /> */}

                    {/* <TouchableOpacity onPress={() => navigation.navigate("my_sales")} activeOpacity={0.6} style={css.profile.profile_item}>
                        <View style={css.profile.left}>
                            <View style={[css.profile.profile_item_icon_box, { backgroundColor: "#1f3c58" }]}>
                                <FontAwesome name="shopping-bag" size={22} color={Colors.white} />
                            </View>
                            <Text>Mes ventes</Text>
                        </View>

                        <FontAwesome name="angle-right" size={20} />

                    </TouchableOpacity>
                    <View style={css.profile.separator} /> */}

                    <TouchableOpacity onPress={() => navigation.navigate("my_favorites")} activeOpacity={0.6} style={css.profile.profile_item}>
                        <View style={css.profile.left}>
                            <View style={[css.profile.profile_item_icon_box, { backgroundColor: "tomato" }]}>
                                <AntDesign name="heart" size={22} color={Colors.white} />
                            </View>
                            <Text>Mes favoris</Text>
                        </View>

                        <FontAwesome name="angle-right" size={20} />

                    </TouchableOpacity>
                    <View style={css.profile.separator} />


                    {/* section paramètre */}
                    <View style={css.profile.section} />

                    {/* <TouchableOpacity onPress={() => navigation.navigate("evaluations")} activeOpacity={0.6} style={css.profile.profile_item}>
                        <View style={css.profile.left}>
                            <View style={[css.profile.profile_item_icon_box, { backgroundColor: "#ffbf00" }]}>
                                <FontAwesome name="star" size={22} color={Colors.white} />
                            </View>
                            <Text>Évaluation</Text>
                        </View>

                        <FontAwesome name="angle-right" size={20} />

                    </TouchableOpacity>
                    <View style={css.profile.separator} /> */}
                    {host?.vip &&
                        <TouchableOpacity onPress={() => navigation.navigate("invitations")} activeOpacity={0.6} style={css.profile.profile_item}>
                            <View style={css.profile.left}>
                                <View style={[css.profile.profile_item_icon_box, { backgroundColor: Colors.info }]}>
                                    <SimpleLineIcons name="envelope-letter" size={22} color={Colors.white} />
                                </View>
                                <Text>Invitations</Text>
                            </View>

                            <FontAwesome name="angle-right" size={20} />
                        </TouchableOpacity>
                    }

                    <View style={css.profile.separator} />

                    <TouchableOpacity onPress={() => navigation.navigate("historiques")} activeOpacity={0.6} style={css.profile.profile_item}>
                        <View style={css.profile.left}>
                            <View style={[css.profile.profile_item_icon_box, { backgroundColor: "#888" }]}>
                                <Octicons name="history" size={22} color={Colors.white} />
                            </View>
                            <Text>Historiques</Text>
                        </View>

                        <FontAwesome name="angle-right" size={20} />

                    </TouchableOpacity>
                    <View style={css.profile.separator} />

                    <TouchableOpacity onPress={() => navigation.navigate("parametre")} activeOpacity={0.6} style={css.profile.profile_item}>
                        <View style={css.profile.left}>
                            <View style={[css.profile.profile_item_icon_box, { backgroundColor: "#622a55" }]}>
                                <FontAwesome name="cog" size={22} color={Colors.white} />
                            </View>
                            <Text>Paramètres</Text>
                        </View>

                        <FontAwesome name="angle-right" size={20} />

                    </TouchableOpacity>
                    <View style={css.profile.separator} />


                    {/* section deconnexion */}
                    <View style={css.profile.section} />

                    <TouchableOpacity onPress={handleLogout} activeOpacity={0.6} style={css.profile.profile_item}>
                        <View style={css.profile.left}>
                            <View style={[css.profile.profile_item_icon_box, { backgroundColor: "#a51c30" }]} >
                                <AntDesign name="logout" size={22} color={Colors.white} />
                            </View>
                            <Text>Déconnexion</Text>
                        </View>

                        <FontAwesome name="angle-right" size={20} />

                    </TouchableOpacity>
                    <View style={css.profile.separator} />
                </View>
            </ScrollView >
        </View >

    )
}

export default Profile

const styles = StyleSheet.create({
    enchere_container: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" },
    mes_encheres: { width: "100%", alignItems: "center", backgroundColor: Colors.white, paddingVertical: 15, marginTop: 15 },
    enchere_item: {
        padding: 15,
        paddingVertical: 25, backgroundColor: Colors.light_gray, borderRadius: 5, borderColor: Colors.input_border_color, borderWidth: 0.8
    }
})