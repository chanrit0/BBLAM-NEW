// React
import React from 'react';
import {View, TouchableOpacity} from 'react-native';

// custom
import {Translate} from 'function';
import {setSpinner, ViewScale} from 'utils';
import styles from '../../Style';

// components
import {Container} from 'components/common';
import {Button, AddButton, TextRegular, CheckBox} from 'components/atoms';
import {
  AlertChangeInfoCommitteeSuccess,
  AlertChangeInfoCommitteeFailed,
} from 'components/molecules';

import GroupButton from '../../GroupButton';

// lib
import {AntDesign} from 'components/Icons';
import {useRecoilValue} from 'recoil';
import {userInfoState} from 'recoil-state';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {sendChangeEmailCommittee} from 'services/api/committee';
import {COLORS, FONT_SIZE} from 'styles';
import TextInputWithTitle from '../../TextInputWithTitle';
import {useNavigation} from '@react-navigation/native';
import _ from 'lodash';

export default () => {
  const navigation = useNavigation();
  const userInfo = useRecoilValue(userInfoState);
  const {control, handleSubmit, setError} = useForm({
    defaultValues: {
      info_sub_change_type_id: '13',
      info_topic_change_id: '1',
      type_committee: 'employer',
      com_code: userInfo.com_code,
      fund_code: userInfo.fund_code,
      data: [{old_email: '', new_email: ''}],
    },
  });
  const {fields, append, remove} = useFieldArray({
    control,
    name: 'data',
  });

  const _onSend = handleSubmit(
    async data => {
      setSpinner(true);
      await sendChangeEmailCommittee(data)
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
    error => console.log(error),
  );

  const addData = () => {
    append({old_email: '', new_email: ''});
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

      {/* select */}
      <View style={styles.form}>
        {fields.map((field, i) => (
          <View key={field.id}>
            {/* delete button */}
            <TouchableOpacity
              style={styles.closecircle}
              onPress={removeData(i)}>
              <AntDesign name="closecircle" size={FONT_SIZE.BODY_1} />
            </TouchableOpacity>
            {/* oldname */}
            <View style={styles.ChangeNameRootContainer}>
              <Controller
                rules={{required: true}}
                control={control}
                name={`data.${i}.old_email`}
                render={({field: {onChange, value}, fieldState: {error}}) => (
                  <TextInputWithTitle
                    title={'อีเมลเดิม'}
                    onChangeText={onChange}
                    value={value}
                    error={error}
                  />
                )}
              />
            </View>

            {/* newName */}
            <View style={styles.newNameContainer}>
              <Controller
                rules={{required: true}}
                control={control}
                name={`data.${i}.new_email`}
                render={({field: {onChange, value}, fieldState: {error}}) => (
                  <TextInputWithTitle
                    title={'เปลี่ยนเป็น'}
                    onChangeText={onChange}
                    value={value}
                    error={error}
                  />
                )}
              />
            </View>

            {/* change all company */}
            <View style={styles.newNameContainer}>
              <Controller
                rules={{required: true}}
                control={control}
                name={`data.${i}.only_company`}
                render={({field: {onChange, value}, fieldState: {error}}) => (
                  <Container>
                    <TextRegular size={FONT_SIZE.BODY_2}>
                      {'ท่านต้องการเปลี่ยนอีเมลทุกบริษัทหรือไม่'}
                    </TextRegular>
                    <View
                      style={[
                        styles._4CheckBoxContainer,
                        {marginTop: ViewScale(10)},
                      ]}>
                      <TouchableOpacity
                        style={styles._4CheckBoxContainer}
                        onPress={() => {
                          onChange('Y');
                        }}>
                        <CheckBox
                          isCustom
                          onCheck={value === 'Y'}
                          style={error && {borderColor: COLORS.ERROR}}
                        />
                        <TextRegular>{Translate('textYes')}</TextRegular>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          onChange('N');
                        }}
                        style={[
                          styles._4CheckBoxContainer,
                          {marginLeft: ViewScale(20)},
                        ]}>
                        <CheckBox
                          isCustom
                          onCheck={value === 'N'}
                          style={error && {borderColor: COLORS.ERROR}}
                        />
                        <TextRegular>{Translate('textNo1')}</TextRegular>
                      </TouchableOpacity>
                    </View>
                  </Container>
                )}
              />
            </View>
          </View>
        ))}
        {/* add btn */}
        <AddButton onPress={addData} />
      </View>
      {/* 
      <Controller
        control={control}
        name={'effect_date'}
        rules={{required: true}}
        render={({field: {onChange}, fieldState: {error}}) => (
          <EffectiveDate onSelected={onChange} error={error} />
        )}
      /> */}

      {/* Confirm btn */}
      <View style={[styles.footerButtonContainer]}>
        <Container>
          <Button
            type="fill"
            title={Translate('textConfirm')}
            onPress={_onSend}
          />
        </Container>
      </View>
    </View>
  );
};
