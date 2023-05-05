import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { Colors } from '../../libs'

const InputHandleError = ({ message, style }) => {
    return (
        <Text style={[styles.message, style]}>{message}</Text>
    )
}

export default InputHandleError

const styles = StyleSheet.create({
    message: {
        color: Colors.danger,
        textAlign: 'right',
        fontSize: 12, fontStyle: "italic",
    }
})