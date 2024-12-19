/* eslint-disable react-native/no-inline-styles */
// React
import React from 'react';

// custom
import {Translate} from 'function';
import {ViewScale} from 'utils';

// components
import {TextRegular} from 'components/atoms';
import {TouchableRipple} from 'react-native-paper';
import {COLORS} from 'styles';

const padding_horizontal = 35;
const padding_vertical = 2;

export function BtnCancel({onPress}) {
  return (
    <TouchableRipple
      onPress={onPress}
      style={{
        borderWidth: 1,
        borderColor: COLORS.PRIMARY,
        paddingVertical: ViewScale(padding_vertical),
        paddingHorizontal: ViewScale(padding_horizontal),
      }}>
      <TextRegular color={COLORS.PRIMARY}>
        {Translate('textCancel')}
      </TextRegular>
    </TouchableRipple>
  );
}

export function BtnConfirm({onPress}) {
  return (
    <TouchableRipple
      onPress={onPress}
      style={{
        backgroundColor: COLORS.PRIMARY,
        paddingVertical: ViewScale(padding_vertical),
        paddingHorizontal: ViewScale(padding_horizontal),
        marginLeft: ViewScale(10),
      }}>
      <TextRegular color={COLORS.WHITE}>{Translate('textApprove')}</TextRegular>
    </TouchableRipple>
  );
}
