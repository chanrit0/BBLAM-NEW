import {TextMedium} from 'components/atoms';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {COLORS, FONT_SIZE} from 'styles';
import {ViewScale} from 'utils';

export default ({
  image = null,
  title = '',
  focus = false,
  onPress,
  style,
  color = 'black',
}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <FastImage
        source={image}
        style={[styles.image, focus && {opacity: 0.2}]}
        resizeMode={FastImage.resizeMode.contain}
      />
      <TextMedium
        style={[styles.text, {color}, focus && {opacity: 0.2}]}
        numberOfLines={1}>
        {title}
      </TextMedium>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: FONT_SIZE.BODY_3,
    textAlign: 'center',
    color: COLORS.GRAY_3,
    opacity: 1,
  },
  image: {
    width: ViewScale(50),
    height: ViewScale(50),
    opacity: 1,
  },
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexGrow: 1,
    width: wp(15),
  },
});
