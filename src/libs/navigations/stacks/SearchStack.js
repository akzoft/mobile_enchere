import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Detail, Filter, Make_A_Bid, Search, Vitepay_confirm } from '../../../screens'
import { Header } from '../../../components'
import { getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native'
import { useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'
import { checking } from '../../redux/actions/user.action'
import { useEffect } from 'react'

const SearchStack = ({ route }) => {
    const searcStack = createNativeStackNavigator()
    const navigation = useNavigation()
    const dispatch = useDispatch();
    const [screen, setScreen] = useState("")

    useEffect(() => {
        dispatch(checking());
    }, [dispatch, screen]);

    useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route)
        setScreen(getFocusedRouteNameFromRoute(route))
        switch (routeName) {

            case "my_auctions":
            case "filter":
            case "detail":
            case "make_a_bid":
            case "vitepay_confirm":
                navigation.setOptions({ tabBarStyle: { display: "none" } })
                break

            default:
                navigation.setOptions({ tabBarStyle: { display: "flex" } })
                break
        }
    }, [navigation, route])

    return (
        <searcStack.Navigator screenOptions={{ header: ({ navigation }) => <Header navigation={navigation} stackHeader={true} /> }}>
            <searcStack.Screen name="search" component={Search} options={{ headerShown: false }} />
            <searcStack.Screen name="filter" component={Filter} />
            <searcStack.Screen name="detail" component={Detail} />
            <searcStack.Screen name="make_a_bid" component={Make_A_Bid} />
            <searcStack.Screen name="vitepay_confirm" component={Vitepay_confirm} />
        </searcStack.Navigator>
    )
}

export default SearchStack

const styles = StyleSheet.create({})