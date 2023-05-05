import React, { useState } from 'react'
import { ImageBackground, TextInput, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { Colors, css, handleChange, images, isEmpty, toastConfig, _clear_errors, _clear_message, forgot } from '../../../libs'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Toast from 'react-native-toast-message';
import { Container } from '../../../components'
import Spinner from 'react-native-loading-spinner-overlay';

const Forgot_Password = ({ navigation }) => {
    const init = { phone: "" }
    const [inputs, setInputs] = useState(init);
    const dispatch = useDispatch()
    const { errors, code_de_recuperation, phone, message, loading } = useSelector(state => state?.user);


    useEffect(() => {
        if (!isEmpty(errors)) {
            Toast.show({ type: 'danger', text1: 'Erreurs', text2: errors });
            dispatch({ type: _clear_errors })
        }
    }, [errors]);

    useEffect(() => {
        if (code_de_recuperation !== null && phone !== null && message !== null)
            navigation.navigate('verification_code_de_confirmation', { message });
    }, [code_de_recuperation, message])


    const handleSubmit = (e) => {
        inputs.plateforme = "android"
        dispatch(forgot(inputs))
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
                            <Text style={css.auth.auth_title}>Numéro de recupération</Text>

                            <Text style={css.auth.info_text}>Veuillez entrer votre numéro de téléphone pour la recupération de votre mot de passe.</Text>
                            <View style={css.auth.input_container}>
                                <Text style={css.auth.input_label}>Numéro de téléphone <Text style={css.auth.require}>*</Text></Text>

                                <View style={css.auth.phone_input_container}>
                                    <TouchableOpacity activeOpacity={0.7} style={css.auth.indicatif_input}><Text >+223</Text></TouchableOpacity>
                                    <Text style={{ borderRightWidth: 1, marginVertical: 9, borderRightColor: Colors.input_border_color }}></Text>
                                    <TextInput keyboardType="number-pad" style={[css.auth.input, css.auth.phone_input]}
                                        value={inputs.phone} onChangeText={text => handleChange('phone', text, setInputs)}
                                    />
                                </View>

                                {/* <InputHandleError message={error || errors || ""} /> */}
                            </View>

                            <TouchableOpacity onPress={handleSubmit} activeOpacity={0.7} style={css.auth.auth_submit_btn}>
                                <Text style={css.auth.auth_submit_btn_text}>Confirmer</Text>
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

export default Forgot_Password


