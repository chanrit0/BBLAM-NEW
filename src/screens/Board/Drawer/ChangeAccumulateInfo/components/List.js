/* eslint-disable react-native/no-inline-styles */
// React
import React from 'react';
import {View} from 'react-native';

// custom
import {Translate} from 'function';
import {ViewScale} from 'utils';

// components
import {Container} from 'components/common';
import {COLORS, FONT_SIZE, FONT_TYPE} from 'styles';
import {TextPoints, TextRegular, TextMedium} from 'components/atoms';

export default ({name = '', date = '', deposit_rate, deposit_rate_status}) => {
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderColor: COLORS.BORDER,
        paddingVertical: ViewScale(15),
        backgroundColor: '#FFF',
      }}>
      <Container
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 0,
          justifyContent: 'space-between',
        }}>
        <TextMedium size={FONT_SIZE.BODY_2} numberOfLines={1} style={{flex: 1}}>
          {name}
        </TextMedium>

        <View style={{alignItems: 'center'}}>
          <TextRegular size={FONT_SIZE.BODY_2}>
            {Translate('textCumulativeRateMoney')}
          </TextRegular>
          <TextPoints
            pointSizeSame
            number={deposit_rate}
            suffix={'%'}
            size={FONT_SIZE.BODY_2}
            style={{color: COLORS.PRIMARY, fontFamily: FONT_TYPE.MEDIUM}}
          />
          <TextRegular size={FONT_SIZE.BODY_3}>
            {`${Translate('textTransactionDate')} `}
            <TextRegular color={'#8c8c8c'} size={FONT_SIZE.BODY_3}>
              {date}
            </TextRegular>
          </TextRegular>
          {deposit_rate_status == 'ไม่อนุมัติ' ? (
            <TextRegular color={COLORS.ERROR} size={FONT_SIZE.BODY_3}>
              {'ไม่อนุมัติ'}
            </TextRegular>
          ) : (
            <TextRegular color={COLORS.SUCCESS} size={FONT_SIZE.BODY_3}>
              {'อนุมัติ'}
            </TextRegular>
          )}
        </View>
      </Container>
    </View>
  );
};
