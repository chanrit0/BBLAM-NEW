import { Container } from 'components/common';
import { Entypo, MaterialIcons } from 'components/Icons';
import { Button, TextMedium } from 'components/atoms';
import { Translate } from 'function';
import { ViewScale, FontScale } from 'utils';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { COLORS } from 'styles';
import { useNavigation } from '@react-navigation/core';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AlertFailed } from 'components/molecules';

export default ({
  investment_auto_status,
  investment_status,
  investment_inactive,
  autorebalance_check,
  date_permission = true,
  date_permission_text = ''
}) => {
  // console.log(
  //   'STATUS BTMMMMMMMMMMMMM' + 'autorebalance_check<>' + autorebalance_check,
  //   +'investment_status<>' + investment_status,
  //   +'investment_inactive<>' + investment_inactive,
  //   'investment_auto_status<>' + investment_auto_status,
  // );
  const navigation = useNavigation();
  const { bottom } = useSafeAreaInsets();

  return (
    <Container style={{ justifyContent: 'flex-end', marginBottom: bottom }}>
      <TouchableOpacity
        style={{
          alignSelf: 'center',
          marginTop: ViewScale(20),
        }}
        onPress={() => navigation.navigate('TransactionInfo')}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: ViewScale(180),
          }}>
          <MaterialIcons
            name="history"
            color={COLORS.PRIMARY}
            size={ViewScale(20)}
          />
          <TextMedium
            color={COLORS.PRIMARY}
            style={{ marginLeft: ViewScale(10) }}>
            {Translate('textTransactionInfoTitle')}
          </TextMedium>
          <MaterialIcons
            name="chevron-right"
            color={COLORS.PRIMARY}
            size={ViewScale(25)}
          />
        </View>
      </TouchableOpacity>
      <Button
        title={Translate('textChangeFundTitle')}
        type={'fill'}
        // disabled={!investment_status}
        disabled={
          investment_status ? (investment_inactive ? true : false) : true
        }
        onPress={() => {
          if (!date_permission) {
            navigation.navigate('Alert1', {
              children: AlertFailed(date_permission_text),
              title: Translate('textConfirm2'),
            });
          } else {
            navigation.navigate('ChangeStrategy');
          }
        }}
        style={{
          marginTop: ViewScale(20),
        }}
        textStyle={{ fontSize: FontScale(16) }}
        lefticon={
          <Entypo
            name="shuffle"
            style={{ marginRight: ViewScale(10) }}
            size={FontScale(16)}
            color={'#FFF'}
          />
        }
      />
      <Button
        title={Translate('textChangeFundAutoBalanceTitle')}
        type={'fill'}
        ButtonStyle={{
          backgroundColor: '#1c2c5b',
        }}
        disabled={
          // investment_status
          //   ?
          investment_inactive
            ? true
            // : autorebalance_check && investment_auto_status
            : investment_auto_status
              ? autorebalance_check ? false : true
              : true
          // : true
        }
        style={{
          marginVertical: ViewScale(10),
        }}
        onPress={() => {
          if (!date_permission) {
            navigation.navigate('Alert1', {
              children: AlertFailed(date_permission_text),
              title: Translate('textConfirm2'),
            });
          } else {
            navigation.navigate('AutoBalance');
          }
        }}
        textStyle={{ fontSize: FontScale(16) }}
      />
    </Container>
  );
};
