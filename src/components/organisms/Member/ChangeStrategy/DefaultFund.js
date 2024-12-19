// React
import React from 'react';
import {View, StyleSheet, InteractionManager} from 'react-native';

// custom
import {Translate} from 'function';
import {setSpinner, ViewScale} from 'utils';

// components
import {TextRegular, TextLight} from 'components/atoms';
import FundBox from './FundBox';
import {Container} from 'components/common';
import {Button, Picker} from 'components/atoms';
import {Controller, useForm} from 'react-hook-form';
import {useIsFocused, useNavigation} from '@react-navigation/core';
import {sendInvestment} from 'services/api/member';
import {AlertFailed} from 'components/molecules';

export default ({
  data,
  callbackBack,
  typeRebalance,
  choice_no,
  tiRebalance,
}) => {
  const navigation = useNavigation();
  const focused = useIsFocused();
  const [passwordMatch, setPasswordMatch] = React.useState(false);
  const {control, handleSubmit, getValues} = useForm({
    defaultValues: {
      ti_type_change: 'change_investment',
      ti_rebalance: '',
    },
  });

  const sendapi = handleSubmit(
    async data => {
      await sendInvestment({...data, choice_no})
        .then(response => {

          if (response.code == '02' || response.status == 'success') {
            navigation.navigate('SuccessPage', {
              data: response.data,
              choice_name: response.choice_name,
              date: response.date,
            });
          } else {
            navigation.navigate('Alert1', {
              children: AlertFailed(response.message),
              title: Translate('textConfirm2'),
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    error => {
      console.log(error);
    },
  );

  React.useEffect(() => {
    if (passwordMatch === true && focused) {
      InteractionManager.runAfterInteractions(() => {
        sendapi().finally(() => {
          setSpinner(false);
          setPasswordMatch(false);
        });
      });
    }
  }, [passwordMatch, focused]);

  const items = React.useMemo(() => {
    let items = [];
    if (typeRebalance !== '') {
      if (typeRebalance == 'N') {
        if (tiRebalance[0]?.ti_rebalance == 1) {
          return (items = [
            {
              value: '2',
              label: 'เปลี่ยนสัดส่วนเงินลงทุนเข้าใหม่ (Re-Allocate)',
            },
          ]);
        } else if (tiRebalance[0]?.ti_rebalance == 2) {
          return (items = [
            {
              value: '1',
              label: 'ปรับสัดส่วนเงินลงทุนปัจจุบัน (Re-Balance)',
            },
          ]);
        } else if (tiRebalance[0]?.ti_rebalance == 3) {
          return (items = [
            {
              value: '3',
              label:
                'ปรับสัดส่วนเงินลงทุนปัจจุบัน และเปลี่ยนสัดส่วนเงินลงทุนเข้าใหม่ (Re-Balance & Re-Allocate)',
            },
          ]);
        } else {
          return (items = [
            {
              value: '1',
              label: 'ปรับสัดส่วนเงินลงทุนปัจจุบัน (Re-Balance)',
            },
            {
              value: '2',
              label: 'เปลี่ยนสัดส่วนเงินลงทุนเข้าใหม่ (Re-Allocate)',
            },
            {
              value: '3',
              label:
                'ปรับสัดส่วนเงินลงทุนปัจจุบัน \nและเปลี่ยนสัดส่วนเงินลงทุนเข้าใหม่ \n(Re-Balance & Re-Allocate)',
            },
          ]);
        }
      } else {
        return (items = [
          {
            value: '3',
            label: 'ปรับสัดส่วนเงินลงทุนปัจจุบัน และเปลี่ยนสัดส่วนเงินลงทุนเข้าใหม่ (Re-Balance & Re-Allocate)',
          },
        ]);
      }
    }
  }, [typeRebalance]);

  const _Confirm = handleSubmit(
    data => {
      navigation.navigate('CheckPassword', {
        setPasswordMatch,
      });
    },
    error => {
      console.log(error);
    },
  );

  return (
    <View>
      <View>
        {data?.map((item, index) => (
          <FundBox
            key={'FundBox-' + String(index)}
            RName={item.sub_code}
            name={item.sub_name}
            ratio={item.percent}
          />
        ))}
      </View>

      <Container style={{marginTop: ViewScale(20), flex: 0}}>
        <TextRegular>{Translate('textAdjustNewPlan')}</TextRegular>

        <View style={{marginTop: ViewScale(10)}}>
          <Controller
            control={control}
            name="ti_rebalance"
            rules={{required: true}}
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <Picker
                error={error}
                items={items}
                value={value}
                numberOfLines={3}
                onValueChange={onChange}
                placeholder={'ระบุวิธีการปรับแผนการลงทุนใหม่'}
              />
            )}
          />
        </View>
      </Container>

      <Container style={{flex: 0}}>
        <View style={styles.changeMethodContainer}>
          <TextRegular>{Translate('textEffectiveDate')}</TextRegular>
          <View style={styles.dayResult}>
            <TextLight>{'วันคำนวณจำนวนหน่วยที่ใกล้ที่สุด'}</TextLight>
          </View>
        </View>
      </Container>

      {/* Botton */}
      <Container style={{flex: 0}}>
        <View style={styles.containerFooter}>
          <Button
            title={Translate('textBack')}
            type="border"
            style={styles.ButtonLeft}
            onPress={callbackBack}
          />
          <Button
            title={Translate('textConfirm1')}
            type="fill"
            style={styles.ButtonRight}
            onPress={_Confirm}
          />
        </View>
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  dayResult: {
    marginTop: ViewScale(10),
    backgroundColor: '#eef2f6',
    padding: ViewScale(15),
  },
  changeMethodContainer: {
    marginTop: ViewScale(20),
  },
  containerFooter: {
    marginTop: ViewScale(35),
    marginBottom: ViewScale(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ButtonLeft: {
    width: '48%',
  },
  ButtonRight: {
    width: '48%',
  },
});
