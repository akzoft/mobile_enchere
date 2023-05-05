import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Detail, My_Auctions, New_Auction, Vitepay_confirm } from '../../../screens'
import { Header } from '../../../components'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native'
import { useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { checking } from '../../redux/actions/user.action'
import { useEffect } from 'react'

const NewAuctionStack = ({ route }) => {
    const newAucStack = createNativeStackNavigator()
    const navigation = useNavigation()
    const dispatch = useDispatch();
    const [screen, setScreen] = useState("")

    useEffect(() => {
        dispatch(checking());
    }, [dispatch, screen]);

    useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        setScreen(getFocusedRouteNameFromRoute(route))
        switch (routeName) {
            case "my_auctions":
            case "detail":
            case "vitepay_confirm":
                navigation.setOptions({ tabBarStyle: { display: "none" } });
                break;

            default:
                navigation.setOptions({ tabBarStyle: { display: "flex" } });
                break;
        }
    }, [navigation, route]);

    return (
        <newAucStack.Navigator screenOptions={{ header: ({ navigation }) => <Header navigation={navigation} stackHeader={true} /> }}>
            <newAucStack.Screen name="new" component={New_Auction} options={{ header: ({ navigation }) => <Header navigation={navigation} tabHeader={true} /> }} />
            <newAucStack.Screen name="my_auctions" component={My_Auctions} />
            <newAucStack.Screen name="detail" component={Detail} />
            <newAucStack.Screen name="vitepay_confirm" component={Vitepay_confirm} />
        </newAucStack.Navigator>
    )
}

export default NewAuctionStack

const styles = StyleSheet.create({})