// React
import React from 'react';
import {View, StyleSheet} from 'react-native';

// custom
import {setSpinner, ViewScale} from 'utils';

// components
import {Translate} from 'function';
import {Container} from 'components/common';
import {Button, AddButton} from 'components/atoms';
import {TextRegular} from 'components/atoms';
import styles from '../../Style';
import {
  AlertChangeInfoCommitteeSuccess,
  AlertChangeInfoCommitteeFailed,
} from 'components/molecules';

import GroupButton from '../../GroupButton';
import EffectiveDate from '../../EffectiveDate';
import TextInputPrefix from '../TextInputPrefix';

// data
import {useNavigation} from '@react-navigation/core';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {useRecoilValue} from 'recoil';
import {userInfoState} from 'recoil-state';
import {sendChangeSignCommitee} from 'services/api/committee';

export default function ChangeSignBoard() {
  const navigation = useNavigation();
  const userInfo = useRecoilValue(userInfoState);
  const {control, handleSubmit} = useForm({
    defaultValues: {
      info_sub_change_type_id: 4,
      info_topic_change_id: 1,
      type_committee: 'employer', // employee , employer
      com_code: userInfo.com_code,
      fund_code: userInfo.fund_code,
      effect_date: '',
      data: [{prefix: '', name: ''}],
    },
  });

  const {fields, append, remove} = useFieldArray({
    control,
    name: 'data',
  });

  const {bottom} = useSafeAreaInsets();

  // function
  // function
  const _onSend = handleSubmit(
    async data => {
      setSpinner(true);
      await sendChangeSignCommitee(data)
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
      console.log({error});
    },
  );
  const addData = () => {
    append({prefix: '', name: ''});
  };
  const removeData = index => () => {
    remove(index);
  };

  return (
    <View style={styles.rootContainer}>
      <Container style={{flex: 0}}>
        <Controller
          control={control}
          rules={{required: true}}
          name="type_committee"
          render={({field: {onChange}}) => (
            <GroupButton
              items={['ฝ่ายนายจ้าง', 'ฝ่ายลูกจ้าง']}
              itemsSend={['employer', 'employee']}
              onSelectedIndex={onChange}
            />
          )}
        />
      </Container>

      {/* section2 */}
      <View style={styles.section2Container}>
        <Container style={{flex: 0, marginBottom: ViewScale(10)}}>
          <TextRegular>
            {'ลายมือชื่อ (ลายเซ็น) ที่ต้องการเปลี่ยนแปลง'}
          </TextRegular>
        </Container>

        {/* section2 */}
        {fields.map((field, index) => (
          <View
            key={field.id}
            style={{
              marginBottom: ViewScale(10),
            }}>
            <TextInputPrefix
              control={control}
              index={index}
              onPress={removeData(index)}
            />
          </View>
        ))}

        {/* add btn */}
        <AddButton onPress={addData} />
      </View>

      {/* section3 */}

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
