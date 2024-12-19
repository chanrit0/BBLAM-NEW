// React
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

// custom
import {ViewScale} from 'utils';
import {COLORS, FONT_SIZE, SPACING} from 'styles';

// components
import {TextRegular} from 'components/atoms';

export default function Button({label, onPress, id, value, width}) {
  const _setId = () => {
    onPress(id);
  };

  return (
    <TouchableOpacity
      style={[
        {paddingHorizontal: ViewScale(30)},
        value === id ? styles.boxActive : styles.boxInActive,
        {width: width, height: SPACING.INPUT_HEIGHT, justifyContent: 'center'},
      ]}
      onPress={_setId}>
      <TextRegular
        size={FONT_SIZE.BODY_2}
        style={value === id ? styles.textActive : styles.textInActive}>
        {label}
      </TextRegular>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  boxInActive: {
    padding: ViewScale(10),
    backgroundColor: COLORS.WHITE,
    marginRight: ViewScale(10),
  },
  boxActive: {
    padding: ViewScale(10),
    backgroundColor: COLORS.PRIMARY,
    marginRight: ViewScale(10),
  },
  textActive: {
    color: COLORS.WHITE,
    textAlign: 'center',
  },
  textInActive: {
    textAlign: 'center',
    color: COLORS.BLACK,
  },
});
