/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {Container} from 'components/common';
import {ViewScale} from 'utils';
import {COLORS, FONT_SIZE, FONT_TYPE} from 'styles';
import {TextPoints, TextRegular, TextMedium} from 'components/atoms';

export function ListStrategyInvestment({
  sub_code = '',
  sub_name = '',
  percent_policy = '',
  percent_precent = '',
}) {
  return (
    <View style={{backgroundColor: 'white', paddingVertical: ViewScale(15)}}>
      <Container
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}>
        <View style={{flex: 1}}>
          <TextMedium color={COLORS.PRIMARY}>{sub_code}</TextMedium>
          <TextRegular size={FONT_SIZE.BODY_3}>{sub_name}</TextRegular>
          <TextRegular size={FONT_SIZE.BODY_3}>
            {`สัดส่วนการลงทุนตามนโยบาย `}
            <TextMedium size={FONT_SIZE.BODY_3}>
              {/* {parseInt(percent_policy).toFixed(2)}% */}
              {percent_policy}%
            </TextMedium>
          </TextRegular>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <TextRegular
            size={FONT_SIZE.BODY_2}
            color={'#4c637b'}
            style={{marginBottom: ViewScale(10)}}>
            {'สัดส่วนการลงทุนปัจจุบัน'}
          </TextRegular>
          <TextPoints
            number={percent_precent}
            pointSizeSame
            style={{color: COLORS.PRIMARY, fontFamily: FONT_TYPE.MEDIUM}}
            suffix={'%'}
            size={FONT_SIZE.BODY_1}
          />
        </View>
      </Container>
    </View>
  );
}
