


import React from 'react'
import { Image, ImageBackground, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { Container } from '../../../components'
import { Colors, auth, css, images, isEmpty, toastConfig, updateUser, _clear_errors, _user_update_fail } from '../../../libs'
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import authen from '@react-native-firebase/auth';
import { LoginManager, AccessToken, } from 'react-native-fbsdk-next';


const Synchonisation_Facebook = ({ navigation }) => {
    const dispatch = useDispatch()
    const { host, errors, user_updated } = useSelector(state => state?.user);


    //affiche les erreurs eventuelles apres le dispatch
    useEffect(() => {
        if (!isEmpty(errors)) {
            Toast.show({ type: 'danger', text1: 'Erreurs', text2: errors });
            // dispatch({ type: _clear_errors })
            return;
        }
    }, [errors]);

    useEffect(() => {
        if (!isEmpty(user_updated) && user_updated)
            dispatch(auth())
    }, [user_updated, dispatch])


    const loginBtnFb = async () => {
        try {
            // Attempt login with permissions
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

            if (result.isCancelled) throw 'User cancelled the login process';

            // Once signed in, get the users AccesToken
            const data = await AccessToken.getCurrentAccessToken();

            if (!data) throw 'Something went wrong obtaining access token';

            // Create a Firebase credential with the AccessToken
            const facebookCredential = authen.FacebookAuthProvider.credential(data.accessToken);

            // Sign-in the user with the credential
            const ans = await authen().signInWithCredential(facebookCredential);

            dispatch(updateUser({ id: host?._id, hostID: host?._id, facebook: ans }))
        } catch (error) {
            console.log(error)
        }

    }

    const handleConfirmLater = (e) => {
        const datas = { id: host?._id, hostID: host?._id, phone: host?.phone, confirm_facebook_later: true }
        dispatch(updateUser(datas))
    }

    return (
        <ImageBackground resizeMode="cover" source={images.background} style={css.auth.container}>
            <StatusBar barStyle={"light-content"} backgroundColor={Colors.main} />
            <Toast config={toastConfig} />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={css.auth.scroll_container}>
                <View style={css.auth.main_content}>

                    <Container>
                        <View style={css.auth.auth_container}>
                            <Text style={css.auth.auth_title}>Confirmer le profil</Text>

                            <Text style={css.auth.info_text}>Nous vous invitons à confirmer votre profil en synchronisant à votre profil Facebook afin de pouvoir participer à l'enchère.</Text>

                            <View style={css.auth.input_container}>
                                <TouchableOpacity onPress={() => loginBtnFb()} activeOpacity={0.5} style={[{ padding: 13, borderRadius: 5, backgroundColor: Colors.facebook, flexDirection: 'row', alignItems: "center", justifyContent: "center", gap: 10 },]}>
                                    <View style={{ height: 30, width: 30, borderRadius: 5, backgroundColor: Colors.white, alignItems: "center", justifyContent: "center" }}>
                                        <Image source={images.facebook} style={{ height: 30, width: 30 }} />
                                    </View>
                                    <Text style={[{ color: Colors.white }]}>Synchoniser avec facebook </Text>
                                </TouchableOpacity>
                            </View>



                            <View style={css.auth.separator} />
                            <View style={css.auth.auth_bottom_container}>
                                <Text style={css.auth.auth_bottom_label}>Synchroniser </Text>
                                <TouchableOpacity onPress={handleConfirmLater} style={css.auth.auth_bottom_register_link}>
                                    <Text style={css.auth.auth_bottom_register_link_text}>ultérierement</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </Container>

                </View>
            </ScrollView>
        </ImageBackground>
    )
}

export default Synchonisation_Facebook




