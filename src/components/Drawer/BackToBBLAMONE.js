import {Container} from 'components/common';
import {MaterialCommunityIcons} from 'components/Icons';
import {TextMedium} from 'components/atoms';
import React from 'react';
import {View, TouchableOpacity, SafeAreaView} from 'react-native';
import {COLORS, DRAWER_SHIFT_ICONS, SPACING} from 'styles';
import {DRAWER_PADDING_VERTICAL} from 'styles/spacing';
import {FontScale} from 'utils';

export default ({onPress}) => {
  return (
    <View style={{marginBottom: SPACING.FOOTER_HEIGHT}}>
      <TouchableOpacity onPress={onPress}>
        <Container style={{flex: 0}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: DRAWER_PADDING_VERTICAL,
            }}>
            <MaterialCommunityIcons
              name="chevron-left-circle"
              size={FontScale(20)}
              color={COLORS.PRIMARY}
            />
            <TextMedium
              style={{
                marginLeft: DRAWER_SHIFT_ICONS,
                flexWrap: 'wrap',
                color: COLORS.PRIMARY,
              }}>
              {'กลับไป BBLAM'}
            </TextMedium>
          </View>
        </Container>
      </TouchableOpacity>
      <SafeAreaView />
    </View>
  );
};
