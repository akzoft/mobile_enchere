import React, { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View, TextInput, ImageBackground, StatusBar } from 'react-native'
import { CheckBox } from 'react-native-elements';
import { Container } from '../../../components'
import { Colors, _clear_errors, _clear_message, css, handleChange, images, isEmpty, login, toastConfig } from '../../../libs'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';

const Login = ({ navigation, route }) => {
    let routes = route?.params;
    const [remember, setRemember] = useState(false);
    const datas = { phone: "", password: "" }
    const [inputs, setInputs] = useState(datas)
    const [redirect, setRedirect] = useState(false)
    const [redirect2, setRedirect2] = useState(false)
    const dispatch = useDispatch()

    const { isAuth, host, errors, message } = useSelector(state => state?.user);

    //auto remplissage champ phone apres inscription
    useEffect(() => {
        if (routes?.phone)
            setInputs({ ...inputs, phone: routes?.phone })
    }, [routes])


    //notifications
    useEffect(() => {
        if (routes?.message || message) {
            Toast.show({ type: 'info', text1: 'Infos', text2: routes?.message || message });
            if (routes?.message) routes.message = ""
            dispatch({ type: "_clear_message" })
        }
    }, [routes, message])

    //erreurs
    useEffect(() => {
        if (!isEmpty(errors)) {
            Toast.show({ type: 'danger', text1: 'Erreurs', text2: errors });
        }
    }, [errors]);

    //@if connected and compte is disable, redirect to enable screen
    //else
    //@if connected and compte is enable and fbk not yet, redirect to fbk sync
    //else
    //redirect to main screen
    useEffect(() => {
        if (isAuth && !isEmpty(host)) {
            if (host?.license_status) {

                if (isEmpty(host?.facebook) && !host?.confirm_facebook_later) {
                    setRedirect2(true)
                    navigation.navigate("synchronisation_facebook")
                }
            }
            else {
                setRedirect(true)
                navigation.navigate("activate_compte", { message: message && message })
                dispatch({ type: "_clear_message" })
            }
        }
    }, [isAuth, host, redirect, redirect2, message])



    //fonction pour le dispatch du login
    const handleSubmit = (e) => {
        e.preventDefault()
        setRedirect(false)
        setRedirect2(false)
        dispatch(login(inputs))
    }

    return (
        <ImageBackground resizeMode="cover" source={images.background} style={css.auth.container}>
            <StatusBar barStyle={"light-content"} backgroundColor={Colors.main} />
            <Toast config={toastConfig} />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={css.auth.scroll_container}>
                <View style={css.auth.main_content}>

                    <Container>
                        <View style={css.auth.auth_container}>
                            <Text style={css.auth.auth_title}>Veuillez vous identifier</Text>

                            <View style={css.auth.input_container}>
                                <Text style={css.auth.input_label}>Numéro de téléphone <Text style={css.auth.require}>*</Text></Text>

                                <View style={css.auth.phone_input_container}>
                                    <TouchableOpacity activeOpacity={0.7} style={css.auth.indicatif_input}><Text >+223</Text></TouchableOpacity>
                                    <Text style={{ borderRightWidth: 1, marginVertical: 9, borderRightColor: Colors.input_border_color }}></Text>
                                    <TextInput keyboardType="number-pad" style={[css.auth.input, css.auth.phone_input]}
                                        value={inputs.phone} onChangeText={text => handleChange('phone', text, setInputs)}
                                    />
                                </View>

                                {/* <InputHandleError message="" /> */}
                            </View>

                            <View style={css.auth.input_container}>
                                <Text style={css.auth.input_label}>Mot de passe <Text style={css.auth.require}>*</Text></Text>
                                <TextInput style={css.auth.input} secureTextEntry={true}
                                    value={inputs.password} onChangeText={text => handleChange('password', text, setInputs)}
                                />
                                {/* <InputHandleError message="" /> */}
                            </View>

                            <View style={css.auth.auth_forgot_container}>
                                <View style={css.auth.auth_remember}>
                                    <CheckBox
                                        title={"Se souvenir"}
                                        checked={remember ? "checked" : ""}
                                        onPress={() => setRemember(!remember)}
                                        containerStyle={css.auth.checkboxContainer}
                                        textStyle={css.auth.checkboxText}
                                    />
                                </View>
                                <TouchableOpacity onPress={() => navigation.navigate("forgot_password")} activeOpacity={0.5} style={css.auth.auth_forgot}><Text>Mot de passe oublié</Text></TouchableOpacity>
                            </View>

                            <TouchableOpacity onPress={handleSubmit} activeOpacity={0.7} style={css.auth.auth_submit_btn}>
                                <Text style={css.auth.auth_submit_btn_text}>Connecter</Text>
                            </TouchableOpacity>

                            <View style={css.auth.separator} />
                            <View style={css.auth.auth_bottom_container}>
                                <Text style={css.auth.auth_bottom_label}>Vous n'avez encore un compte?</Text>
                                <TouchableOpacity onPress={() => navigation.navigate("register")} style={css.auth.auth_bottom_register_link}>
                                    <Text style={css.auth.auth_bottom_register_link_text}>Inscrivez-vous</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </Container>

                </View>
            </ScrollView>
        </ImageBackground>
    )
}

export default Login
