/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React from 'react';
import {Text} from 'react-native';
import {FontScale} from 'utils';
import {COLORS, FONT_SIZE, FONT_TYPE} from 'styles';
import _ from 'lodash';

export default ({size, style, color, children}) => (
  <Text
    style={[
      {
        fontFamily: FONT_TYPE.LIGHT,
        fontSize: size !== undefined ? parseInt(size) : FONT_SIZE.BODY_1,
        color: _.isEmpty(color) ? COLORS.BLACK_1 : color,
      },
      style,
    ]}>
    {children}
  </Text>
);
