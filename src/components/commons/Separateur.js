import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../libs';

const Separateur = ({ text, w, my, style }) => {
  return (
    <View
      style={[
        styles.separatorContainer,
        { width: w ? w : '100%', marginVertical: my ? my : 10 },
      ]}>
      <View style={styles.separator} />
      <Text style={[styles.separatorText, style]}>{text}</Text>
      <View style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10, justifyContent: "center", marginTop: 20
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.input_border_color,
    marginHorizontal: 10,
  },
  separatorText: {
    fontSize: 16,
    color: '#6D6D72',
  },
});

export default Separateur;
