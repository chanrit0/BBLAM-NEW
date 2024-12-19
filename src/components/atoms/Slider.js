/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Slider} from 'react-native-elements';
import {ViewScale} from 'utils';
import {COLORS} from 'styles';

export default ({
  onSlidingComplete,
  onSlidingStart,
  onValueChange,
  value,
  step = 1,
  ...props
}) => {
  return (
    <Slider
      minimumTrackTintColor={COLORS.PRIMARY}
      maximumTrackTintColor="#aeb9d7"
      step={step}
      thumbStyle={{
        height: ViewScale(25),
        width: ViewScale(25),
        borderWidth: ViewScale(4),
        borderColor: 'white',
        backgroundColor: COLORS.PRIMARY,
      }}
      onSlidingStart={onSlidingStart}
      onSlidingComplete={onSlidingComplete}
      onValueChange={onValueChange}
      value={value}
      {...props}
    />
  );
};
