import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeStack from './HomeStack'
import ExploreStack from './ExploreStack'
import ProfileStack from './ProfileStack'
import SearchStack from './SearchStack'
import NewAuctionStack from './NewAuctionStack'
import { Colors } from '../../constants/Typography.js'
import { TabCustomPlus } from '../../../components/index.js'
import { useKeyboard } from '@react-native-community/hooks'
import { auth, checking } from '../../redux/actions/user.action'
import { useDispatch, useSelector } from 'react-redux'
import { useLayoutEffect } from 'react'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { useState } from 'react'
import { get_all_encheres } from '../../redux/actions/enchere.action'
import { get_all_user_fb_token } from '../../redux/actions/notification.action'

const MainTabNavigation = ({ navigation, route }) => {
    const tb = createBottomTabNavigator()
    const keyboard = useKeyboard()
    const isKeyboardShown = keyboard.keyboardShown
    const dispatch = useDispatch();
    const [screen, setScreen] = useState("")

    const { host } = useSelector(state => state?.user)

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

    useEffect(() => {
        dispatch(get_all_encheres(host?._id))
        dispatch(get_all_user_fb_token(host?._id))
    }, [])


    return (
        <tb.Navigator initialRouteName='Acceuil' screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true, tabBarStyle: { height: 65, backgroundColor: Colors.white, borderTopLeftRadius: 25, borderTopRightRadius: 25, elevation: 10 } }}>
            <tb.Screen name="Acceuil" component={HomeStack} options={{ title: "Accueil", tabBarIcon: (({ color, focused, size }) => { size = size + 3; color = focused ? Colors.main : Colors.black; return <Entypo name='home' size={size} color={color} /> }), tabBarLabel: (({ color, focused }) => { color = focused ? Colors.main : Colors.black; return <Text style={{ color, fontSize: 12 }}>Accueil</Text> }), headerShown: false }} />
            <tb.Screen name="Explorer" component={ExploreStack} options={{ title: "Explorer", tabBarIcon: (({ color, focused, size }) => { size = size + 3; color = focused ? Colors.main : Colors.black; return <MaterialIcons name='dashboard' size={size} color={color} /> }), tabBarLabel: (({ color, focused }) => { color = focused ? Colors.main : Colors.black; return <Text style={{ color, fontSize: 12 }}>Explorer</Text> }), headerShown: false }} />
            <tb.Screen name="Nouvelle" component={NewAuctionStack} options={({ navigation }) => ({ title: "Création d'une nouvelle enchère", tabBarIcon: () => !isKeyboardShown && <TabCustomPlus navigation={navigation} />, tabBarLabel: (({ color, focused }) => { color = focused ? Colors.main : Colors.black; return <Text style={{ color, fontSize: 12 }}>Créer</Text> }), tabBarHideOnKeyboard: true, tabBarVisible: !isKeyboardShown, headerShown: false })} />
            <tb.Screen name="Recherche" component={SearchStack} options={{ title: "Recherche", tabBarIcon: (({ color, focused, size }) => { size = size + 3; color = focused ? Colors.main : Colors.black; return <Fontisto name='search' size={size} color={color} /> }), tabBarLabel: (({ color, focused }) => { color = focused ? Colors.main : Colors.black; return <Text style={{ color, fontSize: 12 }}>Recherche</Text> }), headerShown: false }} />
            <tb.Screen name="Profil" component={ProfileStack} options={{ title: "Profile", tabBarIcon: (({ color, focused, size }) => { size = size + 3; color = focused ? Colors.main : Colors.black; return <FontAwesome name='user' size={size} color={color} /> }), tabBarLabel: (({ color, focused }) => { color = focused ? Colors.main : Colors.black; return <Text style={{ color, fontSize: 12 }}>Profile</Text> }), tabBarHideOnKeyboard: true, tabBarVisible: !isKeyboardShown, headerShown: false }} />
        </tb.Navigator>
    )
}

export default MainTabNavigation

const styles = StyleSheet.create({})