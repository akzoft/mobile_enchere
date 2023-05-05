import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Detail, Home, Make_A_Bid, My_Auctions, Vitepay_confirm } from '../../../screens'
import { Header } from '../../../components'
import { getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native'
import { useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import { checking } from '../../redux/actions/user.action'

const HomeStack = ({ route }) => {
    const homStack = createNativeStackNavigator()
    const dispatch = useDispatch();
    const [screen, setScreen] = useState("")

    useEffect(() => {
        dispatch(checking());
    }, [dispatch, screen]);

    const navigation = useNavigation()
    useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        setScreen(getFocusedRouteNameFromRoute(route))
        switch (routeName) {

            case "my_auctions":
            case "detail":
            case "make_a_bid":
            case "my_auctions":
            case "vitepay_confirm":
            case "vitepay_cancel":
                navigation.setOptions({ tabBarStyle: { display: "none" } });
                break;

            default:
                navigation.setOptions({ tabBarStyle: { display: "flex" } });
                break;
        }
    }, [navigation, route]);

    return (
        <homStack.Navigator screenOptions={{ header: ({ navigation }) => <Header navigation={navigation} stackHeader={true} />, }}>
            <homStack.Screen name="home" component={Home} options={{ header: ({ navigation }) => <Header navigation={navigation} tabHeader={true} /> }} />
            <homStack.Screen name="detail" component={Detail} />
            <homStack.Screen name="make_a_bid" component={Make_A_Bid} />
            <homStack.Screen name="my_auctions" component={My_Auctions} />
            <homStack.Screen name="vitepay_confirm" component={Vitepay_confirm} />
        </homStack.Navigator>
    )
}

export default HomeStack

const styles = StyleSheet.create({})