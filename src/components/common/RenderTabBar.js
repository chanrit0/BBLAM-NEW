/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {FontScale} from 'utils';
import {TabBar} from 'react-native-tab-view';
import {COLORS, FONT_TYPE} from 'styles';

export function RenderTabBar(props) {
  return (
    <>
      <TabBar
        {...props}
        indicatorStyle={{backgroundColor: COLORS.PRIMARY}}
        style={{backgroundColor: '#FFF'}}
        inactiveColor="#000"
        activeColor={COLORS.PRIMARY}
        labelStyle={{
          fontSize: FontScale(22),
          fontFamily: FONT_TYPE.REGULAR,
          fontWeight: 'bold',
        }}
      />
    </>
  );
}
