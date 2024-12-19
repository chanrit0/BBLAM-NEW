import React from 'react';
import {View, Text, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ViewScale} from 'utils';

export default function NewsCarousel({content, title, image}) {
  return (
    <View>
      {/* <LinearGradient
        colors={[colors.primaryColor, 'transparent']}
        locations={[0.1, 1]}
        useAngle={true}
        angle={0}
        style={{position: 'absolute', width: '100%', height: '100%', zIndex: 1}}
      />
      <Image
        source={{uri: image}}
        resizeMode={'cover'}
        style={{
          flex: 1,
        }}
      /> */}
    </View>
  );
}
