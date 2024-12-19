/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */

// React
import React from 'react';

// lib
import CircleCheckBox from './CircleCheckBox';
import SqaureCheckBox from './SquareCheckBox';

export default ({
  isCustom = false,
  onCheck = false,
  value,
  style,
  tintColors,
  tintColor,
  ...props
}) => {
  if (!isCustom) {
    return (
      <SqaureCheckBox
        style={style}
        value={value}
        tintColors={tintColors}
        tintColor={tintColor}
        {...props}
      />
    );
  } else {
    return <CircleCheckBox onCheck={onCheck} style={style} />;
  }
};
