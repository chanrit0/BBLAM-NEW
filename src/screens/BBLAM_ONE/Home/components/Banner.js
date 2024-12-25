// React
import React from 'react';
import { View, Dimensions } from 'react-native';

// custom
import { isTablet, ViewScale } from 'utils';

//components

// lib
import Swiper from 'react-native-swiper';

export default function Banner({ children }) {
  const height = Dimensions.get('window').height;

  return (
    <View
      style={{
        height: height * (isTablet ? 0.3 : 0.215),
        marginBottom: ViewScale(30),
        width: '100%',
      }}>
      <Swiper loop autoplay removeClippedSubviews={false}  {...swiperStyle}>
        {children}
      </Swiper>
    </View>
  );
}

const DOT_SIZE = 7;
const swiperStyle = {
  autoplayTimeout: 5,
  paginationStyle: {
    bottom: -ViewScale(DOT_SIZE * 3),
  },
  dotStyle: {
    height: ViewScale(DOT_SIZE),
    width: ViewScale(DOT_SIZE),
    borderRadius: ViewScale(DOT_SIZE),
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  activeDotStyle: {
    height: ViewScale(DOT_SIZE),
    width: ViewScale(DOT_SIZE),
    borderRadius: ViewScale(DOT_SIZE),
    backgroundColor: '#FFF',
  },
};
