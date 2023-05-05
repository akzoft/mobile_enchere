import React, { useEffect, useState } from 'react'
import { ImageBackground, StatusBar, Text, ScrollView, TouchableOpacity, View, TextInput } from 'react-native'
import { Colors, _clear_errors, _clear_user_registered, css, handleChange, images, isEmpty, register, toastConfig } from '../../../libs'
import { useDispatch, useSelector } from 'react-redux'
import Toast from 'react-native-toast-message';
import { Container } from '../../../components'
import Spinner from 'react-native-loading-spinner-overlay';


const Register = ({ navigation }) => {
    const datas = { phone: "", password: "", password_confirm: "" }
    const [inputs, setInputs] = useState(datas)
    const dispatch = useDispatch();
    const { errors, register_succeed, message, phone, loading } = useSelector(state => state?.user);

    //erreurs
    useEffect(() => {
        if (!isEmpty(errors)) {
            Toast.show({ type: 'danger', text1: 'Erreurs', text2: errors?.phone || errors?.password || errors?.password_confirm || errors });
            dispatch({ type: _clear_errors })
        }
    }, [errors]);

    //redirection, si reussi
    useEffect(() => {
        if (!isEmpty(register_succeed) && register_succeed && message !== null)
            navigation.navigate('login', { message, phone: register_succeed?.phone || phone });
    }, [register_succeed])

    //soumission de la requette
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(register(inputs))
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
                            <Text style={css.auth.auth_title}>Créer votre compte</Text>

                            <View style={css.auth.input_container}>
                                <Text style={css.auth.input_label}>Numéro de téléphone <Text style={css.auth.require}>*</Text></Text>

                                <View style={css.auth.phone_input_container}>
                                    <TouchableOpacity activeOpacity={0.7} style={css.auth.indicatif_input}><Text >+223</Text></TouchableOpacity>
                                    <Text style={{ borderRightWidth: 1, marginVertical: 9, borderRightColor: Colors.input_border_color }}></Text>
                                    <TextInput keyboardType="number-pad" style={[css.auth.input, css.auth.phone_input]}
                                        value={inputs.phone} onChangeText={text => handleChange('phone', text, setInputs)}
                                    />
                                </View>

                                {/* <InputHandleError message={error?.phone} /> */}
                            </View>

                            <View style={css.auth.input_container}>
                                <Text style={css.auth.input_label}>Mot de passe <Text style={css.auth.require}>*</Text></Text>
                                <TextInput style={css.auth.input} secureTextEntry={true}
                                    value={inputs.password} onChangeText={text => handleChange('password', text, setInputs)}
                                />
                                {/* <InputHandleError message={error?.password || error?.password_confirm} /> */}
                            </View>

                            <View style={css.auth.input_container}>
                                <Text style={css.auth.input_label}>Confirmer le mot de passe <Text style={css.auth.require}>*</Text></Text>
                                <TextInput style={css.auth.input} secureTextEntry={true}
                                    value={inputs.password_confirm} onChangeText={text => handleChange('password_confirm', text, setInputs)}
                                />
                                {/* <InputHandleError message={error?.password_confirm} /> */}
                            </View>



                            <TouchableOpacity onPress={handleSubmit} activeOpacity={0.7} style={[css.auth.auth_submit_btn]}>
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

export default Register