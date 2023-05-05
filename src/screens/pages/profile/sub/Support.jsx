import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../../libs';

const Support = ({ navigation, route }) => {

    return (
        <View>
            <StatusBar barStyle={"light-content"} backgroundColor={Colors.black} />
            <Text>Support</Text>
        </View>
    )
}

export default Support

const styles = StyleSheet.create({})