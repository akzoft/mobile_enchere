import { useNavigation } from '@react-navigation/native';
import { BackHandler, Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Colors, api_public, convertDateToMillis, css } from '../../../libs';
import { useEffect } from 'react';
import CountdownTimer from '../../commons/timer/CountdownTimer';

const HistoriqueItem = ({ data, toggleOverlay, setData }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    toggleOverlay()
    setData(data)
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      style={styles.container}>

      <View style={styles.content}>
        <View style={styles.image_box}>
          <Image source={{ uri: `${api_public}/images/${data?.medias[0]}` }} style={styles.image} />
        </View>
        <View style={styles.restaurant_infos}>
          <View style={styles.top}>
            <Text
              style={{ fontWeight: 'bold', fontSize: 17, color: Colors.dark }}>
              {data?.title?.slice(0, 16)}{data?.title?.length > 16 && "..."}
            </Text>
            <TouchableOpacity onPress={toggleOverlay}>
              <Entypo
                name="dots-three-vertical"

                size={19}
              />
            </TouchableOpacity>
          </View>

          <Text
            style={{ fontWeight: '300', fontSize: 12, color: Colors.main }}>
            {data?.started_price} FCFA
          </Text>

          <View style={styles.center}>
            {data?.categories?.slice(0, 3)?.map((categorie, i) =>
              <View key={i} style={{ flexDirection: 'row' }}>
                <Text style={{ color: Colors.brown, fontSize: 12 }}>
                  {categorie}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.bottom}>
            <View style={{ flexDirection: 'row' }}>
              <Ionicons name="location-sharp" color={Colors.dark} size={19} />
              <Text style={{ fontSize: 13, color: Colors.dark }}> {data?.sellerID?.town?.slice(0, 14)}{data?.sellerID?.town?.length > 14 && "..."}</Text>
            </View>

            <View style={css.details.delai}>
              <Ionicons name="ios-time-outline" size={16} />
              <CountdownTimer targetDate={convertDateToMillis(data?.expiration_time)} size={13} hideLabel={true} />
            </View>

          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default HistoriqueItem;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    shadowColor: Colors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 2,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 1,
  },

  content: {
    width: '100%',
    flexDirection: 'row',
    padding: 15,
  },
  image_box: { width: '30%', height: 120, backgroundColor: 'gray' },
  restaurant_infos: { paddingLeft: 10, paddingTop: 10, width: '70%' },
  image: { width: '100%', height: "100%", resizeMode: 'cover' },

  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  center: {
    flexDirection: 'row',
    marginVertical: 10, gap: 10,
    width: '70%',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
