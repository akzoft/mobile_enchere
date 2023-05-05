import React from 'react';
import { View, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { Colors, images } from '../../libs';

const CustSwiper = () => {
  const data = [{ id: 1, image: images.background }, { id: 2, image: images.ok }, { id: 3, image: images.background }, { id: 4, image: images.ok }]

  return (
    <View style={{ flex: 1, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.15)' }}>
      <Swiper autoplay={true} activeDotStyle={{ backgroundColor: Colors.main }}>
        {data.map(item => (
          <View key={item.id} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={item.image} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

export default CustSwiper;
