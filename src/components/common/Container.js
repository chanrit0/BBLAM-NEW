/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {SPACING} from 'styles';

export function Container({children, style, props}) {
  return (
    <View
      style={[
        {
          marginHorizontal: SPACING.CONTAINER_MARGIN_HORIZONTAL,
          flex: 1,
        },
        style,
      ]}
      {...props}>
      {children}
    </View>
  );
}
