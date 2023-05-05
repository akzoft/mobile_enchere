import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../libs';

const Confidentiality = ({ navigation }) => {


    return (
        <View>
            <StatusBar barStyle={"light-content"} backgroundColor={Colors.black} />
            <Text>Confidentiality</Text>
        </View>
    )
}

export default Confidentiality

const styles = StyleSheet.create({})