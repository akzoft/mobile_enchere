import React from 'react';
import { Text, View } from 'react-native';

const Message = ({ bg, color, children, size }) => {
  return (
    <View style={{ backgroundColor: bg.white, borderRadius: 5 }}>
      <Text style={{ color: color, fontSize: size, letterSpacing: 1, fontWeight: "300", textAlign: "justify" }}>
        {children}
      </Text>
    </View>
  );
};

export default Message;
