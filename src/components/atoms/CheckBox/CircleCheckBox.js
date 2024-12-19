import {View} from 'react-native';
import React from 'react';
import {COLORS} from 'styles';
import {ViewScale} from 'utils';
import styles from './Style';

const CircleCheckBox = ({onCheck, style}) => {
  return (
    <View
      style={[
        styles.CircleOutline,
        {
          borderColor: !onCheck ? COLORS.BORDER_1 : COLORS.PRIMARY,
        },
        style,
      ]}>
      <View
        style={[
          styles.CircleInline,
          {
            backgroundColor: !onCheck ? null : COLORS.PRIMARY,
          },
        ]}
      />
    </View>
  );
};

export default CircleCheckBox;
