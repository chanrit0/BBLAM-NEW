import React from 'react';
import {View} from 'react-native';
import {COLORS} from 'styles';

export default ({style, ...props}) => {
  return (
    <View
      {...props}
      style={[{borderColor: COLORS.BORDER, borderWidth: 0.5}, style]}
    />
  );
};
