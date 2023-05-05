import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import NetInfo from '@react-native-community/netinfo';
import { Colors } from '../../../libs';
import { useState } from 'react';
import { Reloader } from '../../../components';


const Screen404 = ({ route }) => {
    const [isOnline, setIsOnline] = useState()
    const [refreshing, setRefreshing] = useState(false);

    const checkConnection = () => {
        NetInfo.fetch().then(state => {
            setIsOnline(state.isConnected);
        });
    };


    // useEffect(() => {
    //     if (isOnline) navigation.navigate("auth")
    // }, [isOnline])



    // const onRefresh = useCallback(() => {
    //     setRefreshing(true);

    //     NetInfo.fetch().then(state => {
    //         setIsOnline(state.isConnected);
    //         setRefreshing(false);
    //     });

    //     setTimeout(() => setRefreshing(false), 2000);
    // }, []);


    return (

        <Reloader>
            <View style={styles.container}>
                <Text>Aucune connexion Internet</Text>
                <TouchableOpacity style={styles.actualisation} onPress={checkConnection}>
                    <Text>Vous êtes hors ligne</Text>
                </TouchableOpacity>
            </View>
        </Reloader>
    )
}

export default Screen404


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    actualisation: {
        marginVertical: 40,
        padding: 10,
        backgroundColor: Colors.light_gray
    },
})