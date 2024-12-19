import {Container} from 'components/common';
import {TextMedium} from 'components/atoms';
import {Translate} from 'function';
import {ViewScale} from 'utils';
import React from 'react';
import {View} from 'react-native';
import {COLORS, FONT_SIZE} from 'styles';

export default MainTitleChangeFund = ({data}) => {
  return (
    <Container style={{flex: 0}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: ViewScale(15),
        }}>
        <TextMedium size={FONT_SIZE.BODY_3}>
          {Translate('textChangeFundMainCurrentInvestmentTitle')}
        </TextMedium>
        <View style={{backgroundColor: COLORS.PRIMARY}}>
          <TextMedium
            size={FONT_SIZE.BODY_3}
            style={{color: '#FFF', margin: ViewScale(8)}}>
            {data?.user_investment?.sub_name ?? '-'}
          </TextMedium>
        </View>
      </View>
    </Container>
  );
};
