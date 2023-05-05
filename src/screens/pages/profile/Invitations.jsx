import { FlatList, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign"
import { Colors, _clear_errors, _clear_invitation, css, invited_datas, isEmpty, removePhoneIndicatif, send_invitation, toastConfig } from '../../../libs';
import { Container, InputHandleError, Invited } from '../../../components';
import { selectContactPhone } from 'react-native-select-contact';
import { PermissionsAndroid, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { useEffect } from 'react';

const Invitations = ({ navigation, route }) => {
    // const [selectedContact, setSelectedContact] = useState('');
    const dispatch = useDispatch();

    const [vip, setVip] = useState(false);
    const isVIP = true;
    const [phone, setPhone] = useState(null);
    const { host, errors, invitation_data, message } = useSelector(state => state?.user);


    //affiche les erreurs eventuelles apres le dispatch
    useEffect(() => {
        if (errors !== "" && !isEmpty(errors)) {
            Toast.show({ type: 'danger', text1: 'Erreur', text2: errors });
            dispatch({ type: _clear_errors })
        }
    }, [errors, dispatch]);

    useEffect(() => {
        if (invitation_data != null && invitation_data) {
            navigation.navigate("profile", { message: message || "Invitation envoyée!" })
            dispatch({ type: _clear_invitation })
        }
    }, [invitation_data, dispatch])


    //_clear_invitation
    const handlePress = async () => {
        try {
            const selectedPhoneNumber = await getPhoneNumber();
            setPhone(removePhoneIndicatif(selectedPhoneNumber));
        } catch (error) {
            setPhone(null);
        }
    };

    async function getPhoneNumber() {
        // on android we need to explicitly request for contacts permission and make sure it's granted
        // before calling API methods
        if (Platform.OS === 'android') {
            const request = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            );

            // denied permission
            if (request === PermissionsAndroid.RESULTS.DENIED) throw Error("Permission Denied");

            // user chose 'deny, don't ask again'
            else if (request === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) throw Error("Permission Denied");
        }

        // Here we are sure permission is granted for android or that platform is not android
        const selection = await selectContactPhone();
        if (!selection) {
            return null;
        }

        let { contact, selectedPhone } = selection;
        return selectedPhone.number;
    }



    const handleSubmit = (e) => {
        e.preventDefault()
        datas = { friend_phone: phone, id: host?._id, hostID: host?._id }
        dispatch(send_invitation(datas))
    }


    return (
        <View style={styles.container}>
            <StatusBar barStyle={"light-content"} backgroundColor={Colors.black} />

            {host?.vip &&
                <View style={{ width: "100%", alignItems: "center" }}>
                    <Container>
                        <View style={[css.explorer.is_auth_container, { width: "100%" }]}>
                            <Text style={[css.myAuctions.title, { marginTop: 0, padding: 0 }]}>Invitations</Text>
                        </View>
                        <View style={[css.creer.screen_title_line, { marginTop: 0, width: "25%", alignSelf: "flex-start" }]} />


                        <Text style={[css.auth.info_text, { marginBottom: 2, marginTop: 10, alignSelf: "flex-start" }]}>Selectionner un contact à qui envoyer une invitation.</Text>
                        <View style={css.auth.input_container}>
                            <Text style={css.auth.input_label}>Contact <Text style={css.auth.require}>*</Text></Text>

                            <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
                                <View style={css.auth.phone_input_container}>
                                    <TouchableOpacity activeOpacity={0.7} style={css.auth.indicatif_input}><Text >+223</Text></TouchableOpacity>
                                    <Text style={{ borderRightWidth: 1, marginVertical: 9, borderRightColor: Colors.input_border_color }}></Text>
                                    <TextInput keyboardType="number-pad" style={[css.auth.input, css.auth.phone_input, { width: "65%" }]}
                                        value={phone} onChangeText={text => setPhone(text)}
                                    />
                                </View>
                                <TouchableOpacity onPress={handlePress} style={{ padding: 15, backgroundColor: Colors.brown, borderRadius: 5 }}><AntDesign name="contacts" size={20} color={Colors.white} /></TouchableOpacity>

                            </View>

                            <InputHandleError message="" style={{ alignSelf: "flex-start", paddingHorizontal: 15 }} />
                        </View>
                        <TouchableOpacity onPress={handleSubmit} activeOpacity={0.7} style={[css.auth.auth_submit_btn, { backgroundColor: Colors.black }]}>
                            <Text style={css.auth.auth_submit_btn_text}>Envoyer</Text>
                        </TouchableOpacity>
                    </Container>
                </View>
            }

            <Toast config={toastConfig} />
            <ScrollView contentContainerStyle={{ alignItems: "center" }}>
                <Container >
                    <View style={{ width: "95%" }}>
                        <View style={[css.explorer.is_auth_container, { width: "100%", justifyContent: "center" }]}>
                            <Text style={[css.myAuctions.title, { marginTop: 0, padding: 0, fontSize: 14 }]}>Liste des invité(e)s</Text>
                        </View>
                        <View style={[css.creer.screen_title_line, { marginTop: 0, width: "25%", alignSelf: "center", height: 1.5 }]} />



                        {host?.invitations?.map((data) => (<Invited key={data} host={host} data={data} />))}
                    </View>

                </Container>
            </ScrollView>
        </View>
    )
}

export default Invitations

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: Colors.white
    }
})





