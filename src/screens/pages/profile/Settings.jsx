import { StatusBar, Text, View } from 'react-native'
import React, { useState } from 'react'
import Fontisto from "react-native-vector-icons/Fontisto"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { Colors, activeMode, activeMsg, activeNotif, css, } from '../../../libs'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Container, } from '../../../components'
import { Switch } from 'react-native-elements'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Settings = ({ navigation, route }) => {
    const [notif, setNotif] = useState(false);
    const [msg, setMsg] = useState(false);
    const [them, setThem] = useState(false);
    const [mode, setMode] = useState("")
    const [data, setData] = useState(false);
    const dispatch = useDispatch();
    const handleRedirect = (link) => { navigation.navigate(link) }
    const { notifs, msgs, themes, thems } = useSelector(state => state?.setting)


    useEffect(() => {
        setNotif(notifs)
    }, [notifs])

    useEffect(() => {
        setMsg(msgs)
    }, [msgs])
    useEffect(() => {
        setMode(themes)
        setThem(thems)
    }, [themes, thems])

    useEffect(() => {
        if (data === "notif") {
            dispatch(activeNotif(notif))
        }
        if (data === "msg") {
            dispatch(activeMsg(msg))
        }

        if (data === "mode") {
            let mode = them ? "clair" : "sombre"
            dispatch(activeMode({ mode, them }))
        }
    }, [data, notif, msg, them])

    const handleDispatch = (data) => {
        if (data === "notif") {
            setNotif(!notif)
            setData("notif")
        }
        if (data === "msg") {
            setMsg(!msg)
            setData("msg")
        }
        if (data === "mode") {
            setThem(!them)
            setData("mode")
        }
    }


    return (

        <View style={[css.profile.container, { backgroundColor: themes === "sombre" ? Colors.black : Colors.white }]}>
            <StatusBar barStyle={"light-content"} backgroundColor={Colors.black} />

            <Container >
                <View style={css.settings.screen_title_container}><FontAwesome name='cog' size={24} color={themes === "sombre" ? Colors.white : Colors.black} /><Text style={[css.settings.screen_title, { color: themes === "sombre" ? Colors.white : Colors.black }]}>Paramètres</Text></View>
                <View style={css.creer.screen_title_line} />
            </Container>
            <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: "#eee" }}>

                <View style={css.profile.profile_main_content}>

                    {/* section compte */}
                    <View style={css.profile.section} />
                    <TouchableOpacity onPress={() => handleDispatch("notif")} activeOpacity={0.6} style={css.profile.profile_item}>
                        <View style={css.profile.left}>
                            <View style={[css.profile.profile_item_icon_box, { backgroundColor: "#ca135e" }]}>
                                <Fontisto name='bell-alt' size={22} color={Colors.white} />
                            </View>
                            <Text>Notifications</Text>
                        </View>

                        <Switch
                            value={notif}
                            onValueChange={notif => handleDispatch("notif")}
                            trackColor={{ false: '#767577', true: '#767577' }}
                            thumbColor={notif ? Colors.main : '#f4f3f4'}
                        />

                    </TouchableOpacity>
                    <View style={css.profile.separator} />

                    <TouchableOpacity onPress={() => handleDispatch("msg")} activeOpacity={0.6} style={css.profile.profile_item}>
                        <View style={css.profile.left}>
                            <View style={[css.profile.profile_item_icon_box, { backgroundColor: Colors.primary }]}>
                                <MaterialIcons name='message' size={22} color={Colors.white} />
                            </View>
                            <Text>Messagerie</Text>
                        </View>

                        <Switch
                            value={msg}
                            onValueChange={msg => handleDispatch("msg")}
                            trackColor={{ false: '#767577', true: '#767577' }}
                            thumbColor={msg ? Colors.main : '#f4f3f4'}
                        />

                    </TouchableOpacity>
                    <View style={css.profile.separator} />
                    {/* 
                    <TouchableOpacity activeOpacity={0.6} style={css.profile.profile_item}>
                        <View style={css.profile.left}>
                            <View style={[css.profile.profile_item_icon_box, { backgroundColor: Colors.main }]}>
                                <Fontisto name='search' size={22} color={Colors.white} />
                            </View>
                            <Text>Recherche avancée</Text>
                        </View>

                        <FontAwesome name="angle-right" size={20} />

                    </TouchableOpacity>
                    <View style={css.profile.separator} /> */}

                    {/* <TouchableOpacity activeOpacity={0.6} style={css.profile.profile_item}>
                        <View style={css.profile.left}>
                            <View style={[css.profile.profile_item_icon_box, { backgroundColor: "#546eed" }]}>
                                <MaterialIcons name="language" size={22} color={Colors.white} />
                            </View>
                            <Text>Langues</Text>
                        </View>

                        <View style={css.settings.theme}>
                            <Text>Français</Text>
                            <FontAwesome name="angle-right" size={20} />
                        </View>

                    </TouchableOpacity>
                    <View style={css.profile.separator} /> */}


                    <TouchableOpacity onPress={() => handleDispatch("mode")} activeOpacity={0.6} style={css.profile.profile_item}>
                        <View style={css.profile.left}>
                            <View style={[css.profile.profile_item_icon_box, { backgroundColor: "pink" }]}>
                                <Ionicons name="tv-outline" size={22} color={Colors.white} />
                            </View>
                            <Text>Thème</Text>
                        </View>


                        <View style={css.settings.theme}>
                            <Text>{mode}</Text>
                            <FontAwesome name="angle-right" size={20} />
                        </View>



                    </TouchableOpacity>
                    <View style={css.profile.separator} />

                    <TouchableOpacity onPress={() => navigation.navigate("support")} activeOpacity={0.6} style={css.profile.profile_item}>
                        <View style={css.profile.left}>
                            <View style={[css.profile.profile_item_icon_box, { backgroundColor: Colors.black }]}>
                                <FontAwesome5 name="question-circle" size={22} color={Colors.white} />
                            </View>
                            <Text>Mode d'emploi</Text>
                        </View>

                        <FontAwesome name="angle-right" size={20} />

                    </TouchableOpacity>
                    <View style={css.profile.separator} />

                    <TouchableOpacity onPress={() => handleRedirect("politique_confidentialite")} activeOpacity={0.6} style={css.profile.profile_item}>
                        <View style={css.profile.left}>
                            <View style={[css.profile.profile_item_icon_box, { backgroundColor: "#556b2f" }]}>
                                <FontAwesome5 name="file-alt" size={22} color={Colors.white} />
                            </View>
                            <Text>Politique de confidentialité</Text>
                        </View>

                        <FontAwesome name="angle-right" size={20} />

                    </TouchableOpacity>
                    <View style={css.profile.separator} />



                </View>
            </ScrollView >
        </View >

    )
}

export default Settings

