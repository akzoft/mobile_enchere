import React, { useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';
import Message from './Message';
import Note from './Note';
import { Colors } from '../../libs';
import { SelectList } from 'react-native-dropdown-select-list';

const Commentaires = ({ commentaire }) => {
  const [note, setNote] = useState();
  const [comment, setComment] = useState('');
  const noteItem = [{ key: '1', value: 'Mauvais' }, { key: '2', value: 'Mediocre' }, { key: '3', value: 'Moyen' }, { key: '4', value: 'Bon' }, { key: '5', value: 'Excellent' },]


  return (
    <View>


      <View style={{ marginTop: 25 }}>

        <View>
          <View>
            <Text style={{ fontSize: 15, fontWeight: '200' }}>Note</Text>



            <SelectList
              setSelected={(val) => setNote(val)}
              data={noteItem}
              save="value"
              search={false}
              defaultOption={noteItem[2]}
              dropdownStyles={{ borderWidth: 1, borderColor: Colors.input_border_color, borderRadius: 5 }}
              boxStyles={{ borderWidth: 1, borderColor: Colors.input_border_color, borderRadius: 5 }}
            />
          </View>

          <View>
            <Text
              style={{ fontSize: 15, fontWeight: '200', marginVertical: 15 }}>
              Ecrire un commentaire
            </Text>
            <TextInput
              numberOfLines={5}
              style={{ width: '100%', justifyContent: 'center', backgroundColor: Colors.light_gray, }}
              placeholder="Votre commentaire ici.."
              multiline
              onChangeText={setComment}
              value={comment}
            />
          </View>

          <TouchableOpacity style={{ backgroundColor: Colors.black, marginVertical: 5, padding: 12, borderRadius: 5, }}>
            <Text style={{ textAlign: 'center', color: Colors.white, }}>Commenter</Text>
          </TouchableOpacity>

          <Message color={Colors.white} bg={Colors.dark}>
            Connectez vous pour pouvoir commenter
          </Message>
        </View>
      </View>

      {!commentaire ? (
        <Message color={Colors.main} bg={Colors.light_gray} bold>
          PAS DE COMMENTAIRE
        </Message>
      ) : (
        <>
          <View
            style={{
              padding: 3,
              backgroundColor: Colors.light_gray,
              marginTop: 5,
              borderRadius: 5,
            }}>
            <Text style={{ fontSize: 15, color: Colors.dark }}>
              Akougnon DOLO
            </Text>
            <Note value={3.5} />
            <Text style={{ fontSize: 11, marginVertical: 2 }}>
              Jan 13 2023
            </Text>
            <Message color={Colors.dark} bg={Colors.white} size={12} >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Architecto asperiores eius possimus laudantium eligendi doloribus
            </Message>
          </View>

          <View
            style={{
              padding: 3,
              backgroundColor: Colors.light_gray,
              marginTop: 5,
              borderRadius: 5,
            }}>
            <Text style={{ fontSize: 15, color: Colors.dark }}>
              Akougnon DOLO
            </Text>
            <Note value={3.5} />
            <Text my={2} fontSize={11}>
              Jan 13 2023
            </Text>
            <Message color={Colors.dark} bg={Colors.white} size={12}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Architecto asperiores eius possimus laudantium eligendi doloribus
            </Message>
          </View>

          <View
            style={{
              padding: 3,
              backgroundColor: Colors.light_gray,
              marginTop: 5,
              borderRadius: 5,
            }}>
            <Text style={{ fontSize: 15, color: Colors.dark }}>
              Akougnon DOLO
            </Text>
            <Note value={3.5} />
            <Text my={2} fontSize={11}>
              Jan 13 2023
            </Text>
            <Message color={Colors.dark} bg={Colors.white} size={12}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Architecto asperiores eius possimus laudantium eligendi doloribus
            </Message>
          </View>
        </>
      )}
    </View>
  );
};

export default Commentaires;
