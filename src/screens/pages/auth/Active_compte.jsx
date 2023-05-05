import { ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors, auth, css, handleChange, images, isEmpty, toastConfig, user_compte_activation } from '../../../libs'
import Toast from 'react-native-toast-message'
import { Container } from '../../../components'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Spinner from 'react-native-loading-spinner-overlay'

const Active_compte = ({ navigation, route }) => {
    const [inputs, setInputs] = useState({ licenseKey: "" })
    const { compte_active, host, errors, message, loading } = useSelector(state => state?.user);
    const dispatch = useDispatch();

    //notifications
    useEffect(() => {
        if (message) {
            Toast.show({ type: 'info', text1: 'Infos', text2: message });
        }
    }, [message])

    //errors notif
    useEffect(() => {
        if (!isEmpty(errors)) {
            Toast.show({ type: 'danger', text1: 'Erreurs', text2: errors });
            dispatch({ type: "_clear_errors" })
            return;
        }
    }, [errors]);

    //auth is compte is active
    useEffect(() => {
        if (!isEmpty(compte_active) && compte_active)
            dispatch(auth())
    }, [compte_active, dispatch])

    //handle active compte
    const handleActivate = (e) => {
        const datas = { userID: host?._id, licenseKey: inputs.licenseKey }
        dispatch(user_compte_activation(datas))
    }

    if (loading)
        return <Spinner
            visible={loading}
            textContent={'Patienter...'}
            textStyle={{ color: Colors.white }}
            animation={'fade'}
            overlayColor={'rgba(0, 0, 0, 0.5)'}
        />

    return (
        <ImageBackground resizeMode="cover" source={images.background} style={css.auth.container}>
            <StatusBar barStyle={"light-content"} backgroundColor={Colors.main} />
            <Toast config={toastConfig} />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={css.auth.scroll_container}>
                <View style={css.auth.main_content}>

                    <Container>
                        <View style={css.auth.auth_container}>
                            <Text style={css.auth.auth_title}>Activer votre compte</Text>

                            <Text style={css.auth.info_text}>Nous vous invitons à activer votre compte en inserant et en soumettant le code d'activation que vous avez reçu.</Text>

                            <View style={css.auth.input_container}>
                                <Text style={css.auth.input_label}>Code d'activation<Text style={css.auth.require}>*</Text></Text>
                                <TextInput style={css.auth.input}
                                    value={inputs.licenseKey} onChangeText={text => handleChange('licenseKey', text, setInputs)}
                                />
                            </View>

                            <TouchableOpacity onPress={handleActivate} activeOpacity={0.7} style={css.auth.auth_submit_btn}>
                                <Text style={css.auth.auth_submit_btn_text}>Connecter</Text>
                            </TouchableOpacity>



                            <View style={css.auth.separator} />
                            <View style={css.auth.auth_bottom_container}>
                                <Text style={css.auth.auth_bottom_label}>Je possède déjà un compte</Text>
                                <TouchableOpacity onPress={() => navigation.navigate("login")} style={css.auth.auth_bottom_register_link}>
                                    <Text style={css.auth.auth_bottom_register_link_text}>Connectez-vous</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </Container>

                </View>
            </ScrollView>
        </ImageBackground>
    )
}

export default Active_compte

const styles = StyleSheet.create({})