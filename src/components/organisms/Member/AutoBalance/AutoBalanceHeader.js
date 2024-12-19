import {Container} from 'components/common';
import {TextMedium} from 'components/atoms';
import {Translate} from 'function';
import {ViewScale} from 'utils';
import React from 'react';
import {View} from 'react-native';
import {COLORS, FONT_SIZE, SPACING} from 'styles';

export default () => {
  return (
    <Container>
      <View
        style={{
          backgroundColor: '#1c2c5b',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: ViewScale(15),
          marginBottom: ViewScale(10),
          paddingVertical: ViewScale(10),
          height: SPACING.INPUT_HEIGHT,
        }}>
        <TextMedium color={COLORS.WHITE} size={FONT_SIZE.BODY_2}>
          {Translate('textChangeFundAutoBalanceTitle')}
        </TextMedium>
      </View>
    </Container>
  );
};
