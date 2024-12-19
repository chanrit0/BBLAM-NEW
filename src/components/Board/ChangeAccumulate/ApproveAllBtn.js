/* eslint-disable react-native/no-inline-styles */
// React
import React from 'react';
import {TouchableOpacity} from 'react-native';

// custom
import {Translate} from 'function';
import {ViewScale} from 'utils';

// components
import {TextMedium} from 'components/atoms';
import {AntDesign} from 'components/Icons';
import {COLORS, FONT_SIZE} from 'styles';

export default function ApproveAllBtn({onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignSelf: 'flex-end',
        backgroundColor: COLORS.PRIMARY,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: ViewScale(20),
        paddingVertical: ViewScale(10),
      }}>
      <AntDesign name={'checkcircleo'} color={COLORS.WHITE} />
      <TextMedium
        color={COLORS.WHITE}
        size={FONT_SIZE.BODY_2}
        style={{
          marginLeft: ViewScale(10),
        }}>
        {Translate('textApproveAll')}
      </TextMedium>
    </TouchableOpacity>
  );
}
