import { useNavigation } from '@react-navigation/native'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { View, Text, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Colors, isEmpty } from '../../../libs'
import { useDispatch, useSelector } from 'react-redux'
import { dislike_enchere, like_enchere } from '../../../libs/redux/actions/enchere.action'
import CountdownTimer from '../../commons/timer/CountdownTimer'
import { api_public } from '../../../libs/redux/constants/constants'

const SearchedItem = ({ data, theme }) => {
  const navigation = useNavigation()

  const { host } = useSelector(state => state?.user)
  const dispatch = useDispatch()

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('detail', { data })} style={[styles.container, { backgroundColor: theme === "sombre" ? Colors.home_card : Colors.white }]}>
      <View style={styles.content}>
        <View style={styles.image_box}>
          <Image source={{ uri: `${api_public}/images/${data?.medias[0]}` }} style={styles.image} />
        </View>
        <View style={styles.restaurant_infos}>
          <View style={styles.top}>
            <Text style={{ fontWeight: 'bold', fontSize: 17, color: theme === "sombre" ? Colors.white : Colors.white }}>
              {(data.title && data.title.length <= 16) ? data.title.slice(0, 16) : data.title.slice(0, 16) + "..."}
            </Text>

            {!isEmpty(host) && !isEmpty(data) && host._id !== data.sellerID &&
              <TouchableOpacity>
                {data.likes.includes(host?._id) ?
                  <Ionicons name={'md-bookmark'} color={Colors.main} size={25} onPress={() => dispatch(dislike_enchere(data?._id, host?._id, { user_id: host?._id }))} /> :
                  <Ionicons name={'ios-bookmark-outline'} color={theme === "sombre" ? Colors.white : Colors.gray} size={25} onPress={() => dispatch(like_enchere(data?._id, host?._id, { user_id: host?._id }))} />
                }
              </TouchableOpacity>
            }
          </View>

          <Text style={{ fontWeight: '300', fontSize: 12, color: Colors.main }}>
            {data?.started_price} FCFA
          </Text>

          <View style={styles.center}>
            {data?.categories?.slice(0, 3)?.map((categorie, i) =>
              <View key={i} style={{ flexDirection: 'row' }}>
                <Text style={{ color: theme === "sombre" ? "wheat" : Colors.white, fontSize: 12 }}>
                  {categorie}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.bottom}>
            <View style={{ flexDirection: 'row' }}>
              <Ionicons name="location-sharp" color={theme === "sombre" ? Colors.white : Colors.dark} size={16} />
              <Text style={{ fontSize: 12, color: theme === "sombre" ? Colors.white : Colors.dark }}> {data.town ? data.town.length <= 14 ? data.town.slice(0, 14) : data.town.slice(0, 14) + "..." : "Non renseignée"}</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: "center" }}>
              {/* <Ionicons name="ios-time-outline" size={19} /> */}
              <CountdownTimer targetDate={new Date(data?.expiration_time).getTime()} size={13} txtSize={5} hideLabel={false} />
            </View>

          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default SearchedItem

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white, shadowColor: Colors.dark, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.5, shadowRadius: 20, elevation: 2, borderRadius: 5, marginVertical: 5, marginHorizontal: 1 },

  content: { width: '100%', flexDirection: 'row', padding: 15 },
  image_box: { width: '30%', height: 120, backgroundColor: 'gray' },
  restaurant_infos: { paddingLeft: 10, paddingTop: 10, width: '70%' },
  image: { width: '100%', height: "100%", resizeMode: 'cover' },

  top: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  center: { flexDirection: 'row', marginVertical: 10, gap: 10, width: '70%' },
  bottom: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
})
