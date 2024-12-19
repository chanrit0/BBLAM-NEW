/* eslint-disable react-native/no-inline-styles */

// React
import React from 'react';
import {View} from 'react-native';

// custom
import {Translate} from 'function';
import {ViewScale} from 'utils';

// components
import {Container} from 'components/common';
import {TextRegular, TextMedium} from 'components/atoms';
import {COLORS, FONT_SIZE, SPACING} from 'styles';

export default ({RName = '', name = '', ratio = ''}) => {
  return (
    <Container style={{flex: 0}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: ViewScale(20),
          borderColor: COLORS.BORDER,
          borderBottomWidth: 0.5,
        }}>
        <View style={{flex: 1, paddingRight: ViewScale(20)}}>
          <TextMedium color={COLORS.PRIMARY}>{RName}</TextMedium>
          <TextRegular size={FONT_SIZE.BODY_3}>{name}</TextRegular>
        </View>
        <View style={{alignItems: 'center'}}>
          <TextRegular size={FONT_SIZE.BODY_3}>
            {Translate('textYourInvestmentPolicyInvestmentPolicyRate')}
          </TextRegular>
          <TextMedium color={COLORS.PRIMARY}>
            {parseFloat(ratio).toFixed(2)}%
          </TextMedium>
        </View>
      </View>
    </Container>
  );
};
