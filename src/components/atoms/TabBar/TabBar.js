/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {COLORS, FONT_SIZE, FONT_TYPE} from 'styles';
import {TabBar as RNTabBar} from 'react-native-tab-view';

export default props => {
  return (
    <RNTabBar
      indicatorStyle={{backgroundColor: COLORS.PRIMARY}}
      style={{backgroundColor: COLORS.WHITE, width: 'auto'}}
      inactiveColor={COLORS.BLACK}
      activeColor={COLORS.PRIMARY}
      labelStyle={{
        fontSize: FONT_SIZE.BODY_1,
        fontFamily: FONT_TYPE.REGULAR,
      }}
      {...props}
    />
  );
};
