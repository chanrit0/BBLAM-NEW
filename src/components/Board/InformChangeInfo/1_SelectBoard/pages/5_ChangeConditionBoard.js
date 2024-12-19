/* eslint-disable react-native/no-inline-styles */
// React
import React from 'react';
import {View, TouchableOpacity} from 'react-native';

// custom
import {setSpinner, ViewScale} from 'utils';
import styles from '../../Style';

// components
import {Container} from 'components/common';
import {CheckBox, Button} from 'components/atoms';
import {TextRegular} from 'components/atoms';

import EffectiveDate from '../../EffectiveDate';
import GroupButton from '../../GroupButton';
import TextInput from '../../TextInput';

// lib
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS, FONT_SIZE} from 'styles';
import {isIOS} from 'utils';
import {useRecoilValue} from 'recoil';
import {userInfoState} from 'recoil-state';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {sendChangeConditionCommittee} from 'services/api/committee';
import {useNavigation} from '@react-navigation/core';
import {
  AlertChangeInfoCommitteeFailed,
  AlertChangeInfoCommitteeSuccess,
} from 'components/molecules';
import {Translate} from 'function';
import _ from 'lodash';

// data
const condition = [
  'กรรมการกองทุนฝ่ายนายจ้าง ลงลายมือชื่อร่วมกับกรรมการ\nกองทุนฝ่ายลูกจ้าง',
  'กรรมการกองทุนฝ่ายนายจ้าง 1 ท่าน ลงลายมือชื่อร่วมกับ\nกรรมการกองทุนฝ่ายลูกจ้าง 1 ท่าน',
  'กรรมการกองทุนเฉพาะส่วนฝ่ายนายจ้างและฝ่ายลูกจ้าง\nอย่างน้อยฝ่ายละ 1 ท่าน ลงนามร่วมกัน',
  'กรรมการกองทุนเฉพาะส่วน 2 ท่าน ลงนามร่วมกัน โดยต้องเป็น\nกรรมการกองทุนเฉพาะส่วนฝ่ายนายจ้างอย่างน้อย 1 ท่าน',
  'กรรมการกองทุนเฉพาะส่วนท่านใดท่านหนึ่งลงนาม',
  'กรรมการกองทุนเฉพาะส่วนอย่างน้อย 1 ท่านลงนาม',
  'อื่น ๆ',
];

export default function ChangeConditionBoard() {
  const navigation = useNavigation();
  const userInfo = useRecoilValue(userInfoState);
  const {control, handleSubmit, getValues, formState, setError} = useForm({
    defaultValues: {
      info_sub_change_type_id: 5,
      info_topic_change_id: 1,
      com_code: userInfo.com_code,
      fund_code: userInfo.fund_code,
      effect_date: '',
    },
  });

  const {bottom} = useSafeAreaInsets();
  // function
  const _onSend = handleSubmit(
    async data => {
      data.current_condition += 1;
      data.new_condition += 1;

      if (data.current_condition === 7) {
        delete data.current_condition;
        if (data.current_condition_other === undefined) {
          data.current_condition_other = '';
        }
      } else {
        delete data.current_condition_other;
      }

      if (data.new_condition === 7) {
        delete data.new_condition;
        if (data.new_condition_other === undefined) {
          data.new_condition_other = '';
        }
      } else {
        delete data.new_condition_other;
      }

      setSpinner(true);
      await sendChangeConditionCommittee(data)
        .then(response => {
          if (response.code == '02') {
            navigation.navigate('Alert1', {
              children: <AlertChangeInfoCommitteeSuccess />,
              title: Translate('textConfirm2'),
              onPress: () => {
                navigation.popToTop();
              },
            });
          }
        })
        .catch(error => {
          const errors = error?.errors;

          if (!_.isEmpty(errors)) {
            for (const [key, value] of Object.entries(errors)) {
              setError(key, {
                type: 'server',
                message: value.map(item => item + '\n'),
              });
            }
          }

          if (error.code == '00') {
            navigation.navigate('Alert1', {
              children: <AlertChangeInfoCommitteeFailed />,
              title: Translate('textConfirm2'),
            });
          }
        })
        .finally(() => setSpinner(false));
    },
    error => {
      console.log(error);
    },
  );

  const ConditionCheckBox = ({data, value, onChange, error, other_name}) => {
    const onChangeIn = index => () => {
      onChange(index);
    };

    return (
      <View style={{marginTop: ViewScale(10)}}>
        {data.map((item, index) => (
          <View key={'conditionId-' + index}>
            {index === data.length - 1 ? (
              <Controller
                control={control}
                name={other_name}
                render={({field: {onChange}}) => (
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: ViewScale(10),
                    }}
                    onPress={onChangeIn(index)}>
                    <CheckBox value={value == index} />
                    <TextRegular
                      style={{
                        color: error ? COLORS.ERROR : 'black',
                        marginLeft: !isIOS ? ViewScale(10) : 0,
                      }}>
                      {'อื่น ๆ'}
                    </TextRegular>
                    <View style={{flex: 1, marginLeft: ViewScale(10)}}>
                      <TextInput onChangeText={onChange} />
                    </View>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <TouchableOpacity
                onPress={onChangeIn(index)}
                key={'ConditionCheckBoxoldId-' + index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: ViewScale(15),
                }}>
                <CheckBox value={value == index} />
                <TextRegular
                  size={FONT_SIZE.BODY_2}
                  style={{
                    marginLeft: !isIOS ? ViewScale(15) : null,
                    color: error ? COLORS.ERROR : 'black',
                  }}>
                  {item}
                </TextRegular>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View>
      <Container style={{flex: 0, paddingTop: ViewScale(15)}}>
        <TextRegular size="18">
          {'โปรดเลือกเงื่อนไขลงนามในปัจจุบัน'}
        </TextRegular>
        {/* nowCondition */}
        <Controller
          rules={{required: true}}
          control={control}
          name="current_condition"
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <>
              <ConditionCheckBox
                field={getValues('current_condition_other')}
                other_name={'current_condition_other'}
                data={condition}
                value={value}
                error={error}
                onChange={onChange}
              />
            </>
          )}
        />
      </Container>

      {/* newCondition */}
      <View
        style={{
          borderColor: COLORS.BORDER,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          paddingVertical: ViewScale(15),
        }}>
        <Container>
          <TextRegular size="18">{'โปรดเลือกเงื่อนไขการลงนามใหม่'}</TextRegular>
          <Controller
            rules={{required: true}}
            control={control}
            name="new_condition"
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <>
                <ConditionCheckBox
                  field={getValues('new_condition_other')}
                  other_name={'new_condition_other'}
                  data={condition}
                  value={value}
                  error={error}
                  onChange={onChange}
                />
              </>
            )}
          />
        </Container>
      </View>

      {/* <EffectiveDate /> */}
      <Controller
        control={control}
        name={'effect_date'}
        rules={{required: true}}
        render={({field: {onChange}, fieldState: {error}}) => (
          <EffectiveDate onSelected={onChange} error={error} />
        )}
      />

      {/* Confirm btn */}
      <View style={[styles.footerButtonContainer, {marginBottom: bottom}]}>
        <Container>
          <Button type="fill" title="ยืนยัน" onPress={_onSend} />
        </Container>
      </View>
    </View>
  );
}
