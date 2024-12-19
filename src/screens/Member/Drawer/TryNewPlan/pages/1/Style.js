import React from 'react';
import {TextRegular} from 'components/atoms';
import {StyleSheet, View} from 'react-native';
import {ViewScale, FontScale} from 'utils';
import {COLORS, FONT_SIZE, FONT_TYPE} from 'styles';

export default styles = StyleSheet.create({
  headerContainer: {
    paddingBottom: ViewScale(15),
    borderColor: COLORS.BORDER,
    borderBottomWidth: 1,
  },
  rowContainer: {
    marginTop: ViewScale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowInput: {flexDirection: 'row', alignItems: 'center'},
  eachTitle: {
    fontSize: FontScale(18),
  },
  eachTitleHypothesis:{fontSize: FontScale(18),textDecorationLine: 'underline'},
  eachDesc: {
    fontSize: FontScale(14),
  },
});

export const SliderProps = {
  step: 1,
  thumbStyle: {
    height: ViewScale(25),
    width: ViewScale(25),
    borderWidth: ViewScale(4),
    borderColor: COLORS.WHITE,
    backgroundColor: COLORS.PRIMARY,
  },
};

export const InputSmallProps = error => ({
  inputStyle: {textAlign: 'center', fontSize: FONT_SIZE.BODY_2},
  errorStyle: {
    textAlign: 'center',
    fontFamily: FONT_TYPE.REGULAR,
    fontSize: FONT_SIZE.BODY_3,
  },
  inputContainerStyle: {
    borderWidth: 0,
    borderBottomColor: error ? COLORS.ERROR : COLORS.BORDER,
  },
  containerStyle: {
    width: ViewScale(150),
  },
});

export const InputFullProps = (text = '???') => ({
  rightIcon: () => (
    <View style={{flexDirection: 'row'}}>
      <View
        style={{
          borderWidth: 1,
          borderColor: COLORS.BORDER,
          marginRight: ViewScale(10),
        }}
      />
      <TextRegular>{text}</TextRegular>
    </View>
  ),
});
