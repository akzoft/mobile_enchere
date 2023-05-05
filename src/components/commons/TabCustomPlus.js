import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, images } from '../../libs'
import { Platform } from 'react-native'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native'

const TabCustomPlus = ({ navigation }) =>
    <TouchableOpacity onPress={() => navigation.navigate("Nouvelle")} activeOpacity={0.7}>
        <View style={{ width: 55, height: 55, backgroundColor: Colors.main, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginBottom: Platform.OS == "android" ? 35 : 30 }}>
            <Image source={images.plus} style={{ width: 22, height: 22, tintColor: 'white' }} />
        </View>
    </TouchableOpacity>



export default TabCustomPlus
