/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {TextRegular, TextMedium, TextLight} from 'components/atoms';
import {setSpinner, ViewScale} from 'utils';
import {Container} from 'components/common';
import {COLORS, FONT_SIZE} from 'styles';

export function ListCumulative({
  created_at_th = '',
  deposit_rate_old = '',
  deposit_rate = '',
  deposit_rate_status,
  handleCancel,
  type,
}) {
  return (
    <View
      style={{
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: COLORS.BORDER,
        paddingVertical: ViewScale(15),
      }}>
      <Container style={{alignItems: 'flex-end'}}>
        {type === 'complete' && (
          <TextRegular
            color={
              deposit_rate_status == 'ไม่อนุมัติ'
                ? COLORS.ERROR
                : COLORS.SUCCESS
            }
            size={FONT_SIZE.BODY_2}
            style={{marginBottom: ViewScale(5)}}>
            {deposit_rate_status}
          </TextRegular>
        )}
      </Container>
      <Container
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: ViewScale(10),
        }}>
        <View>
          <TextRegular>{'อัตราสะสมใหม่'}</TextRegular>
          <TextLight size={FONT_SIZE.BODY_2}>
            {'อัตราเงินสะสมเดิม '}
            <TextMedium>{`${deposit_rate_old}`}</TextMedium>
          </TextLight>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <TextMedium color={COLORS.PRIMARY}>
            {`${parseFloat(deposit_rate).toFixed(2)}%`}
          </TextMedium>
          <TextRegular size={FONT_SIZE.BODY_2}>
            {'วันที่ทำรายการ '}
            <TextLight size={FONT_SIZE.BODY_2}>{created_at_th}</TextLight>
          </TextRegular>
        </View>
      </Container>
      {type === 'pending' && (
        <Container style={{alignItems: 'flex-start'}}>
          <TouchableOpacity
            onPress={handleCancel}
            style={{
              backgroundColor: COLORS.GRAY_4,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: ViewScale(5),
              width: ViewScale(150),
            }}>
            <TextMedium size={FONT_SIZE.BODY_3} color={COLORS.THIRDARY}>
              ยกเลิกรายการ
            </TextMedium>
          </TouchableOpacity>
        </Container>
      )}
    </View>
  );
}