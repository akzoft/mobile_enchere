import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'
import MainTabNavigation from './stacks/MainTabNavigation';
import AuthStack from './stacks/AuthStack';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { auth } from '../redux/actions/user.action';
import { _user_gets_fail } from '../redux/constants/constants';
import { isEmpty } from '../utils/functions';
import NetInfo from '@react-native-community/netinfo';
import { Screen404 } from '../../screens';
import { useState } from 'react';
import { activeMode, activeMsg, activeNotif, settings } from '../redux/actions/setting.action';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RootNavigation = () => {
    const Stack = createNativeStackNavigator()

    const dispatch = useDispatch();
    const { isAuth, host } = useSelector(state => state?.user);
    const [isOnline, setIsOnline] = useState()

    useEffect(() => {
        dispatch(auth());
    }, [dispatch]);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsOnline(state.isConnected);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        dispatch(settings())
    }, [dispatch]);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} >
                {isOnline ? (
                    (isAuth && (!isEmpty(host?.facebook) || host?.confirm_facebook_later) && host?.license_status) ?
                        <Stack.Screen name="main" component={MainTabNavigation} /> :
                        <Stack.Screen name="auth" component={AuthStack} />
                ) :
                    <Stack.Screen name="404" component={Screen404} />
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigation