import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native'
import { Colors } from '../../libs'

const Loading = ({ text, size, color }) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle={"light-content"} backgroundColor={Colors.black} />
            <ActivityIndicator size={size ? size : "large"} color={color ? color : "#0000ff"} />
            {text && <Text> {text} </Text>}
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({ container: { flex: 1, alignItems: "center", justifyContent: "center" } })