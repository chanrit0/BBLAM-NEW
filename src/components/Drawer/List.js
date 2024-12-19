/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {Container} from 'components/common';
import {TouchableHighlight} from 'components/base';
import {TextMedium} from 'components/atoms';
import {ViewScale} from 'utils';
import {COLORS} from 'styles';
import {
  DRAWER_BODY_CONTAINER,
  DRAWER_PADDING_VERTICAL,
  DRAWER_SHIFT_ICONS,
} from 'styles';

export default function List({onPress, icon, title, RightChild}) {
  return (
    <TouchableHighlight
      style={{
        paddingRight: ViewScale(20),
        borderBottomWidth: 0.5,
        borderColor: COLORS.PRIMARY,
        paddingVertical: DRAWER_PADDING_VERTICAL,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      onPress={onPress}>
      <>
        <Container>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>{icon}</View>
            <View style={{flexDirection: 'row'}}>
              <TextMedium
                color={COLORS.PRIMARY}
                style={{
                  marginLeft: DRAWER_SHIFT_ICONS,
                  flexWrap: 'wrap',
                }}>
                {title}
              </TextMedium>
            </View>
          </View>
        </Container>
        {RightChild}
      </>
    </TouchableHighlight>
  );
}
