/* eslint-disable react-native/no-inline-styles */
// React
import React from 'react';
import {View, StyleSheet} from 'react-native';

// custom
import {ViewScale, FontScale} from 'utils';

// components
import {Container} from 'components/common';
import {
  TextPoints,
  LineHorizontal,
  TextRegular,
  TextMedium,
  TextLight,
} from 'components/atoms';
import {Ionicons} from 'components/Icons';
import {BtnCancel, BtnConfirm} from './Btn';
import {COLORS, FONT_SIZE, FONT_TYPE} from 'styles';
import {Translate} from 'function';

export default function ListWaiting({
  name = '',
  accOld = '',
  accNew = '',
  date = '',
  onCancel,
  onApprove,
}) {
  return (
    <>
      <View
        style={{backgroundColor: COLORS.WHITE, paddingVertical: ViewScale(15),alignItems: 'center'}}>
        <Container style={{flex: 0}}>
          <TextMedium>{name}</TextMedium>

          <View style={styles.grayBox}>
            <TextRegular size={FONT_SIZE.BODY_2}>{`${Translate(
              'textCumulativeRate',
            )} `}</TextRegular>
            {accOld === 'N/A' ? (
              <TextMedium size={FONT_SIZE.BODY_2}>{accOld}</TextMedium>
            ) : (
              <TextPoints
                number={accOld}
                size={FONT_SIZE.BODY_2}
                pointSizeSame
                style={{fontFamily: FONT_TYPE.MEDIUM}}
                suffix={'%'}
              />
            )}

            <Ionicons
              name="ios-arrow-forward"
              style={{
                marginHorizontal: ViewScale(10),
                fontSize: FontScale(20),
                color: COLORS.PRIMARY,
              }}
            />
            <TextRegular size={FONT_SIZE.BODY_2}>
              {`${Translate('textNewCumulativeRate')} `}
              {accNew === 'N/A' ? (
                <TextMedium size={FONT_SIZE.BODY_2} color={COLORS.PRIMARY}>
                  {accNew}
                </TextMedium>
              ) : (
                <TextPoints
                  number={accNew}
                  size={FONT_SIZE.BODY_2}
                  pointSizeSame
                  style={{fontFamily: FONT_TYPE.MEDIUM, color: COLORS.PRIMARY}}
                  suffix={'%'}
                />
              )}
            </TextRegular>
          </View>

          <View style={{marginTop: ViewScale(10)}}>
            <TextLight size={FONT_SIZE.BODY_3}>
              {`${Translate('textTransactionDate')} `}
              <TextRegular size={FONT_SIZE.BODY_3} color={'#666464'}>
                {date}
              </TextRegular>
            </TextLight>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-end',
              marginTop: ViewScale(20),
            }}>
            <BtnCancel onPress={onCancel} />
            <BtnConfirm onPress={onApprove} />
          </View>
        </Container>
      </View>
      <LineHorizontal />
    </>
  );
}

const styles = StyleSheet.create({
  grayBox: {
    padding: ViewScale(5),
    marginTop: ViewScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eef2f6',
    alignSelf: 'flex-start',
  },
});
