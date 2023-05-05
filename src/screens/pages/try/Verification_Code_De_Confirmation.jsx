


import React, { useRef, useState } from 'react'
import { ImageBackground, StatusBar, ScrollView, TextInput, Text, TouchableOpacity, View } from 'react-native'
import { Container, InputHandleError } from '../../../components'
import { Colors, _clear_errors, _clear_message, css, images, isEmpty, toastConfig, verify_confirm_code } from '../../../libs'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Toast from 'react-native-toast-message';

const Verification_Code_De_Confirmation = ({ navigation, route }) => {
    const routes = route?.params
    const phone_datas = { 1: '', 2: '', 3: '', 4: '' }
    const [inputs, setInputs] = useState(phone_datas);
    const { errors, phone, code_is_correct, message } = useSelector(state => state?.user);
    const dispatch = useDispatch();


    const one = useRef();
    const two = useRef();
    const three = useRef();
    const four = useRef();


    useEffect(() => {
        if (!isEmpty(routes?.message) && !isEmpty(phone)) {
            Toast.show({ type: 'info', text1: 'Infos', text2: routes?.message });
            routes.message = ""
        }
    }, [phone, routes])

    useEffect(() => {
        if (!isEmpty(errors)) {
            Toast.show({ type: 'danger', text1: 'Erreurs', text2: errors });
            dispatch({ type: _clear_errors })
        }
    }, [errors]);

    useEffect(() => {
        if (code_is_correct && phone !== null && message !== null)
            navigation.navigate('reset_password', { message, phone });
    }, [code_is_correct])


    const handleSubmit = (e) => {
        e.preventDefault()
        const code = inputs[1] + inputs[2] + inputs[3] + inputs[4]
        const datas = { code, phone: phone }
        dispatch(verify_confirm_code(datas))
    }

    return (
        <ImageBackground resizeMode="cover" source={images.background} style={css.auth.container}>
            <StatusBar barStyle={"light-content"} backgroundColor={Colors.main} />
            <Toast config={toastConfig} />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={css.auth.scroll_container}>
                <View style={css.auth.main_content}>

                    <Container>
                        <View style={css.auth.auth_container}>
                            <Text style={css.auth.auth_title}>Confirmer le numéro de téléphone</Text>

                            <Text style={css.auth.info_text}>Un code vous sera envoyé par sms sur le numéro <Text style={{ color: Colors.info, fontSize: 14 }}>79364153.</Text></Text>

                            <Text style={{ marginVertical: 5, fontSize: 17, fontWeight: 200 }}>Veuillez inscrire le code</Text>
                            <View style={css.auth.input_container}>
                                <Text style={css.auth.input_label}>Code de confirmation <Text style={css.auth.require}>*</Text></Text>

                                <View style={css.auth.code_items}>
                                    <View style={css.auth.code_item}>
                                        <TextInput style={css.auth.code_input}
                                            keyboardType="number-pad"
                                            maxLength={1}
                                            ref={one}
                                            onChangeText={text => {
                                                setInputs({ ...inputs, 1: text });
                                                text && two.current.focus();
                                            }}
                                        />
                                    </View>

                                    <View style={css.auth.code_item}>
                                        <TextInput style={css.auth.code_input}
                                            keyboardType="number-pad"
                                            maxLength={1}
                                            ref={two}
                                            onChangeText={text => {
                                                setInputs({ ...inputs, 2: text });
                                                text ? three.current.focus() : one.current.focus();
                                            }}
                                        />
                                    </View>

                                    <View style={css.auth.code_item}>
                                        <TextInput style={css.auth.code_input}
                                            keyboardType="number-pad"
                                            maxLength={1}
                                            ref={three}
                                            onChangeText={text => {
                                                setInputs({ ...inputs, 3: text });
                                                text && four.current.focus();
                                            }}
                                        />
                                    </View>

                                    <View style={css.auth.code_item}>
                                        <TextInput style={css.auth.code_input}
                                            keyboardType="number-pad"
                                            maxLength={1}
                                            ref={four}
                                            onChangeText={text => {
                                                setInputs({ ...inputs, 4: text });
                                            }}
                                        />
                                    </View>
                                </View>
                            </View>
                            <InputHandleError message={""} />





                            <TouchableOpacity onPress={handleSubmit} activeOpacity={0.7} style={css.auth.auth_submit_btn}>
                                <Text style={css.auth.auth_submit_btn_text}>Confirmer</Text>
                            </TouchableOpacity>

                            <View style={{ width: "100%", height: 1, backgroundColor: Colors.main, marginTop: 30 }} />

                            <TouchableOpacity style={css.auth.auth_bottom_container}>
                                <Text>Vous n'avez pas réçu de code? Veuillez verifier et <Text style={css.auth.auth_bottom_register_link_text}>réessayer</Text></Text>
                            </TouchableOpacity>


                        </View>
                    </Container>

                </View>
            </ScrollView>
        </ImageBackground>

    )
}

export default Verification_Code_De_Confirmation






