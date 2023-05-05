import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Detail, Explore, Make_A_Bid, My_Auctions, Vitepay_confirm } from '../../../screens'
import { Header } from '../../../components'
import { getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native'
import { useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import { checking } from '../../redux/actions/user.action'

const ExploreStack = ({ route }) => {
    const ExpStack = createNativeStackNavigator()
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
            case "make_a_bid":
            case "my_auctions":
            case "vitepay_confirm":
                navigation.setOptions({ tabBarStyle: { display: "none" } });
                break;

            default:
                navigation.setOptions({ tabBarStyle: { display: "flex" } });
                break;
        }
    }, [navigation, route]);


    return (
        <ExpStack.Navigator screenOptions={{ header: ({ navigation }) => <Header navigation={navigation} stackHeader={true} /> }}>
            <ExpStack.Screen name="explore" component={Explore} options={{ header: ({ navigation }) => <Header navigation={navigation} tabHeader={true} /> }} />
            <ExpStack.Screen name="detail" component={Detail} />
            <ExpStack.Screen name="make_a_bid" component={Make_A_Bid} />
            <ExpStack.Screen name="my_auctions" component={My_Auctions} />
            <ExpStack.Screen name="vitepay_confirm" component={Vitepay_confirm} />
        </ExpStack.Navigator>
    )
}

export default ExploreStack

const styles = StyleSheet.create({})