import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import { Text, View } from 'react-native';
import { Colors } from '../../libs';

const Note = ({ value, text }) => {
  const size = 12;
  const color = Colors.star;

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',

        width: '100%',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '25%',
        }}>
        <FontAwesome
          name={value >= 1 ? 'star' : value >= 0.5 ? 'star-half-o' : 'star-o'}
          size={size}
          color={color}
        />
        <FontAwesome
          name={value >= 2 ? 'star' : value >= 1.5 ? 'star-half-o' : 'star-o'}
          size={size}
          color={color}
        />
        <FontAwesome
          name={value >= 3 ? 'star' : value >= 2.5 ? 'star-half-o' : 'star-o'}
          size={size}
          color={color}
        />
        <FontAwesome
          name={value >= 4 ? 'star' : value >= 3.5 ? 'star-half-o' : 'star-o'}
          size={size}
          color={color}
        />
        <FontAwesome
          name={value >= 5 ? 'star' : value >= 4.5 ? 'star-half-o' : 'star-o'}
          size={size}
          color={color}
        />
        {value && (
          <Text style={{ marginLeft: 5, fontSize: 10, flexDirection: 'row' }}>
            ({value})
          </Text>
        )}
      </View>

      {text && <Text style={{ fontSize: 12 }}>{text} Commentaires</Text>}
    </View>
  );
};

export default Note;
