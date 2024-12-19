import React from 'react';
import styles from './Style';

import CheckBoxComunity from '@react-native-community/checkbox';
import {COLORS} from 'styles';

const SqaureCheckBox = ({style, value, tintColor, tintColors, ...props}) => {
  return (
    <CheckBoxComunity
      style={[styles.SquareCheckBox, style]}
      disabled={true}
      onFillColor={COLORS.PRIMARY}
      onTintColor={COLORS.PRIMARY}
      onCheckColor={'white'}
      boxType={'square'}
      tintColors={tintColors ? tintColors : {true: COLORS.PRIMARY}}
      tintColor={tintColor}
      animationDuration={0}
      value={value}
      {...props}
    />
  );
};

export default SqaureCheckBox;
