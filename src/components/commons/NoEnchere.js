import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../libs'

const NoEnchere = ({ message, theme, style }) => <Text style={[styles.message, style, { color: theme === "sombre" ? Colors.white : Colors.black }]}> {message} </Text>

export default NoEnchere

const styles = StyleSheet.create({
    message: { fontSize: 17 }
})