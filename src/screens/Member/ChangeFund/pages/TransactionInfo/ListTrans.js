/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {TextLight, TextMedium} from 'components/atoms';
import {Entypo, Ionicons} from 'components/Icons';
import {Translate} from 'function';
import {ViewScale, FontScale} from 'utils';
import {COLORS, FONT_SIZE} from 'styles';

export default ({
  callbackCancel,
  callbackChevron,
  policy_investment_name,
  transaction_date,
  hasCancelBtn = false,
  send_date = false,
}) => {
  return (
    <TouchableOpacity
      onPress={callbackChevron}
      style={{
        // borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: COLORS.BORDER,
        flexDirection: 'row',
        // justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        paddingVertical: ViewScale(15),
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 0.2,
        }}>
        <Entypo
          name="shuffle"
          color={COLORS.SECONDARY}
          style={{marginTop: ViewScale(15)}}
          size={FontScale(28)}
        />
      </View>
      {/* containerRight */}
      <View
        style={{
          flexDirection: 'column',
          flex: 0.8,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 0.3}}>
            <TextLight size={FONT_SIZE.BODY_3}>
              {Translate('textInvestmentPolicy')}
            </TextLight>
            <TextLight size={FONT_SIZE.BODY_3} style={styles.textDown}>
              {Translate('textTransactionDate')}
            </TextLight>
          </View>

          <View style={{flex: 0.5}}>
            <TextLight size={FONT_SIZE.BODY_3} color={COLORS.PRIMARY}>
              {policy_investment_name}
            </TextLight>
            <TextLight size={FONT_SIZE.BODY_3} style={styles.textDown}>
              {transaction_date}
            </TextLight>
          </View>

          <View style={{flex: 0.2}}>
            <View style={{padding: ViewScale(15)}}>
              <Ionicons
                name="chevron-forward-circle"
                color={COLORS.PRIMARY}
                size={FontScale(26)}
              />
            </View>
          </View>
        </View>
        {hasCancelBtn && (
          <>
            {send_date == false ? (
              <TouchableOpacity
                onPress={callbackCancel}
                style={{
                  marginTop: ViewScale(10),
                  alignSelf: 'flex-start',
                  backgroundColor: '#f7f7f9',
                  paddingVertical: ViewScale(5),
                  paddingHorizontal: ViewScale(30),
                }}>
                <TextMedium color={COLORS.THIRDARY} size={FONT_SIZE.BODY_2}>
                  {'ยกเลิกรายการ'}
                </TextMedium>
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textDown: {
    marginTop: ViewScale(10),
  },
});
