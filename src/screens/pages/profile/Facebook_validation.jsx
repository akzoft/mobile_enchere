


import React from 'react'
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { Container } from '../../../components'
import { Colors, css, images, isEmpty, updateUser } from '../../../libs'
import { useDispatch, useSelector } from 'react-redux'
import authen from '@react-native-firebase/auth';
import { LoginManager, AccessToken, } from 'react-native-fbsdk-next';
import { Image } from 'react-native'

const FacebookValidation = ({ navigation }) => {
    const dispatch = useDispatch();
    const { themes } = useSelector(state => state?.setting)
    const { host } = useSelector(state => state?.user)

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
            const toStore = { id: ans.additionalUserInfo.profile.id, first_name: ans.additionalUserInfo.profile.first_name, last_name: ans.additionalUserInfo?.profile?.last_name, picture_url: ans.additionalUserInfo.profile.picture.data.url }

            dispatch(updateUser({ id: host?._id, hostID: host?._id, facebook: toStore }))
        } catch (error) {
            console.log(error)
        }

    }

    const handleRemove = () => {
        dispatch(updateUser({ id: host?._id, hostID: host?._id, facebook: null }))
    }


    return (

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[css.auth.scroll_container, { backgroundColor: themes === "sombre" ? Colors.black : Colors.white }]}>
            <StatusBar barStyle={"light-content"} backgroundColor={Colors.black} />
            <View style={css.auth.main_content}>

                <Container>
                    <View style={[css.auth.auth_container, { backgroundColor: Colors.white }]}>
                        <Text style={css.auth.auth_title}>Confirmer votre profil facebook</Text>

                        <Text style={css.auth.info_text}>Veuillez confirmer votre profil pour disposer des de participation aux enchères.</Text>

                        {(isEmpty(host?.facebook) || host?.facebook === null) ?
                            <View style={css.auth.input_container}>
                                <TouchableOpacity onPress={() => loginBtnFb()} activeOpacity={0.5} style={[{ padding: 13, borderRadius: 5, backgroundColor: Colors.facebook, flexDirection: 'row', alignItems: "center", justifyContent: "center", gap: 10 },]}>
                                    <View style={{ height: 30, width: 30, borderRadius: 5, backgroundColor: Colors.white, alignItems: "center", justifyContent: "center" }}>
                                        <Image source={images.facebook} style={{ height: 30, width: 30 }} />
                                    </View>
                                    <Text style={[{ color: Colors.white }]}>Synchoniser avec facebook </Text>
                                </TouchableOpacity>
                            </View> :
                            <View style={css.auth.input_container}>
                                <TouchableOpacity onPress={() => handleRemove()} activeOpacity={0.5} style={[{ padding: 13, borderRadius: 5, backgroundColor: Colors.facebook, flexDirection: 'row', alignItems: "center", justifyContent: "center", gap: 10 },]}>
                                    <View style={{ height: 30, width: 30, borderRadius: 5, backgroundColor: Colors.white, alignItems: "center", justifyContent: "center" }}>
                                        <Image source={images.facebook} style={{ height: 30, width: 30 }} />
                                    </View>
                                    <Text style={[{ color: Colors.white }]}>Désynchoniser avec facebook </Text>
                                </TouchableOpacity>
                            </View>
                        }



                        <View style={css.auth.separator} />
                        <View style={[css.auth.auth_bottom_container]}>
                            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7} style={[css.auth.auth_submit_btn, { backgroundColor: Colors.black, borderRadius: 5 }]}>
                                <Text style={css.auth.auth_submit_btn_text}>Annuler</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Container>

            </View>
        </ScrollView>
    )
}

export default FacebookValidation




