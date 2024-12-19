import React from 'react';
import {View} from 'react-native';
import {TextMedium} from 'components/atoms';
import {COLORS} from 'styles';
import {ViewScale} from 'utils';

export default () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: ViewScale(200),
        backgroundColor: '#FFF',
      }}>
      <TextMedium color={COLORS.THIRDARY}>{'ยังไม่มีข้อมูล'}</TextMedium>
    </View>
  );
};
