import React from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';
import { Colors } from '../../../libs';
import { colors } from 'react-native-elements';

const DateTimeDisplay = ({ value, type, isDanger, hideLabel, size, txtSize }) => {
    return (
        <View style={{ alignItems: "center", margin: 0, padding: 0, justifyContent: "center" }}>
            <View style={{ borderRadius: 5, alignItems: "center", justifyContent: "center", backgroundColor: colors.black, width: 25, height: 25, borderWidth: 1, borderColor: Colors.white }}><Text style={{ color: isDanger ? Colors.danger : Colors.white, fontSize: size, fontWeight: "bold" }}>{value}</Text></View>
            {!hideLabel && <Text style={{ color: isDanger ? Colors.danger : Colors.dark, fontSize: txtSize }}>{type}</Text>}
        </View>
    );
};

export default DateTimeDisplay;