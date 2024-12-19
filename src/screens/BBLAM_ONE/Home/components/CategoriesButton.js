import {TextMedium} from 'components/atoms';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

import {COLORS, SPACING} from 'styles';
import {FontScale, ViewScale} from 'utils';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

export default ({
  image = null,
  title = '',
  focus = false,
  color = 'black',
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.button_container}>
        <Image source={image} style={styles.image} resizeMode={'contain'} />
        <TextMedium style={[styles.text, {color: color}]}>{title}</TextMedium>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: ViewScale(10),
    fontSize: FontScale(14),
    textAlign: 'center',
    color: COLORS.GRAY_3,
    width: ViewScale(100),
  },
  image: {
    width: ViewScale(50),
    height: ViewScale(50),
  },
  container: {
    marginBottom: ViewScale(10),
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexGrow: 1,
    width: wp(25) - SPACING.CONTAINER_MARGIN_HORIZONTAL,
  },
  button_container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
