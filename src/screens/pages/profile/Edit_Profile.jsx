import React, { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View, TextInput, StatusBar, } from 'react-native'
import { Container, InputHandleError } from '../../../components';
import { Colors, _clear_errors, _clear_user_updated, css, handleChange, isEmpty, toastConfig, updateUser } from '../../../libs';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';

const EditUserProfile = ({ navigation, route }) => {
    const init = { email: "", town: "" }
    const [inputs, setInputs] = useState(init)
    const [isEditPassword, setIsEditPassword] = useState(false)
    const [password, setPassword] = useState(false)
    const { host, errors, user_updated, message } = useSelector(state => state?.user);
    const dispatch = useDispatch();

    const { themes } = useSelector(state => state?.setting)



    //affiche les erreurs eventuelles apres le dispatch
    useEffect(() => {
        if (errors !== "" && !isEmpty(errors)) {
            Toast.show({ type: 'danger', text1: 'Erreur', text2: errors });
            dispatch({ type: _clear_errors })
        }
    }, [errors, dispatch]);

    useEffect(() => {
        setInputs({ email: host?.email, town: host?.town })
    }, [host])


    useEffect(() => {
        if (user_updated != null && user_updated) {
            navigation.navigate("profile", { message: "Compte mis à jour!" || message })
            dispatch({ type: _clear_user_updated })
        }
    }, [user_updated, dispatch])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (isEditPassword) inputs.password = password
        inputs.hostID = host?._id
        inputs.id = host?._id
        dispatch(updateUser(inputs))
    }


    return (
        <>
            <StatusBar barStyle={"light-content"} backgroundColor={Colors.black} />
            {errors !== "" && <Toast config={toastConfig} />}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[css.auth.scroll_container, { backgroundColor: themes === "sombre" ? Colors.black : "inherit" }]}>

                <View style={css.auth.main_content}>

                    <Container>
                        <View style={[css.auth.auth_container, { backgroundColor: Colors.white }]}>
                            <Text style={css.auth.auth_title}>Editer vos informations de profil</Text>

                            <View style={css.auth.input_container}>
                                <Text style={css.auth.input_label}>E-mail <Text style={css.auth.require}>*</Text></Text>
                                <TextInput style={css.auth.input}
                                    value={inputs.email} onChangeText={text => handleChange('email', text, setInputs)}
                                />
                                <InputHandleError message="" />
                            </View>

                            <View style={css.auth.input_container}>
                                <Text style={css.auth.input_label}>Ville <Text style={css.auth.require}>*</Text></Text>
                                <TextInput style={css.auth.input}
                                    value={inputs.town} onChangeText={text => handleChange('town', text, setInputs)}
                                />
                                <InputHandleError message="" />
                            </View>


                            {isEditPassword &&
                                <View style={css.auth.input_container}>
                                    <Text style={css.auth.input_label}>Mot de passe <Text style={css.auth.require}>*</Text></Text>
                                    <TextInput style={css.auth.input} secureTextEntry={true}
                                        value={inputs.password} onChangeText={text => setPassword(text)}
                                    />
                                    <InputHandleError message="" />
                                </View>
                            }

                            <TouchableOpacity onPress={handleSubmit} activeOpacity={0.7} style={[css.auth.auth_submit_btn, { backgroundColor: Colors.black, borderRadius: 0 }]}>
                                <Text style={css.auth.auth_submit_btn_text}>Enregistrer</Text>
                            </TouchableOpacity>

                            <View style={css.auth.separator} />
                            <View style={css.auth.auth_bottom_container}>
                                <Text style={css.auth.auth_bottom_label}>Souhaitez-vous modifier votre mot de passe?</Text>
                                <TouchableOpacity onPress={() => setIsEditPassword(!isEditPassword)} style={css.auth.auth_bottom_register_link}>
                                    <Text style={css.auth.auth_bottom_register_link_text}>{isEditPassword ? "Non" : "Oui"}</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </Container>

                </View>
            </ScrollView>
        </>
    )
}

export default EditUserProfile
