/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React from 'react';
import {Text} from 'react-native';
import _ from 'lodash';
import {COLORS, FONT_SIZE, FONT_TYPE} from 'styles';

export default ({size, color, style, children}) => (
  <Text
    style={[
      {
        fontFamily: FONT_TYPE.SEMI_BOLD,
        fontSize: size !== undefined ? parseInt(size) : FONT_SIZE.BODY_1,
        color: _.isEmpty(color) ? COLORS.BLACK_1 : color,
      },
      style,
    ]}>
    {children}
  </Text>
);
