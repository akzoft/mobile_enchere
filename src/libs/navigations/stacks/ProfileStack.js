import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Support, My_Auctions, Detail, Edit_Profile, Make_A_Bid, Profile, Settings, FacebookValidation, MySales, MyPurchases, MyFavorites, Evaluations, Historiques, Invitations, Vitepay_confirm } from '../../../screens'
import { Header } from '../../../components'
import { useLayoutEffect } from 'react'
import { getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { checking } from '../../redux/actions/user.action'




const SettingStack = () => {
    const accStack = createNativeStackNavigator()

    return (
        <accStack.Navigator screenOptions={{ header: ({ navigation }) => <Header navigation={navigation} stackHeader={true} /> }}>
            <accStack.Screen name="setting" component={Settings} />
            <accStack.Screen name="support" component={Support} />
        </accStack.Navigator>
    )
}


const ProfileStack = ({ route }) => {
    const profStack = createNativeStackNavigator()
    const navigation = useNavigation()
    const [screen, setScreen] = useState("")
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checking());
    }, [dispatch, screen]);

    useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        setScreen(getFocusedRouteNameFromRoute(route))

        switch (routeName) {
            case "detail":
            case "make_a_bid":
            case "edit_profile":
            case "facebook_validation":
            case "my_auctions":
            case "my_sales":
            case "my_purchases":
            case "my_favorites":
            case "evaluations":
            case "invitations":
            case "historiques":
            case "parametre":
            case "vitepay_confirm":
                navigation.setOptions({ tabBarStyle: { display: "none" } });
                break;

            default:
                navigation.setOptions({ tabBarStyle: { display: "flex" } });
                break;
        }
    }, [navigation, route]);

    return (
        <profStack.Navigator screenOptions={{ header: ({ navigation }) => <Header navigation={navigation} stackHeader={true} /> }}>
            <profStack.Screen name="profile" component={Profile} options={{ header: ({ navigation }) => <Header navigation={navigation} tabHeader={true} /> }} />
            {/* concerne les enchères */}
            <profStack.Screen name="detail" component={Detail} />
            <profStack.Screen name="make_a_bid" component={Make_A_Bid} />

            {/* concerne le profile */}
            <profStack.Screen name="edit_profile" component={Edit_Profile} />
            <profStack.Screen name="facebook_validation" component={FacebookValidation} />
            <profStack.Screen name="my_auctions" component={My_Auctions} />
            <profStack.Screen name="my_sales" component={MySales} />
            <profStack.Screen name="my_purchases" component={MyPurchases} />
            <profStack.Screen name="my_favorites" component={MyFavorites} />
            <profStack.Screen name="evaluations" component={Evaluations} />
            <profStack.Screen name="historiques" component={Historiques} />
            <profStack.Screen name="invitations" component={Invitations} />
            <profStack.Screen name="parametre" component={SettingStack} options={{ headerShown: false }} />
            <profStack.Screen name="vitepay_confirm" component={Vitepay_confirm} />
        </profStack.Navigator>
    )
}

export default ProfileStack

const styles = StyleSheet.create({})