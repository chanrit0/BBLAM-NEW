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

import TextInput from '../../TextInput';
import GroupButton from '../../GroupButton';
import RadioPrefix from '../../RadioPrefix';
import EffectiveDate from '../../EffectiveDate';

// lib
import {AntDesign} from 'components/Icons';
import {useRecoilValue} from 'recoil';
import {userInfoState} from 'recoil-state';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {sendChangeCommittee} from 'services/api/committee';
import {useNavigation} from '@react-navigation/core';
import {FONT_SIZE} from 'styles';
import Uploadfile from '../../3_SelectCompany/Uploadfile';
import _ from 'lodash';

export default function ChangeBoard() {
  const navigation = useNavigation();
  const userInfo = useRecoilValue(userInfoState);
  const {control, handleSubmit, watch, setError} = useForm({
    defaultValues: {
      info_sub_change_type_id: 1,
      info_topic_change_id: 1,
      type_committee: 'employer',
      com_code: userInfo.com_code,
      fund_code: userInfo.fund_code,
      effect_date: '',
      data: [{old_prefix: '', old_name: '', new_prefix: '', new_name: ''}],
    },
  });
  const {fields, append, remove} = useFieldArray({
    control,
    name: 'data',
  });

  const _onSend = handleSubmit(
    async data => {
      const formdata = new FormData();

      for (let key in data) {
        if (key != 'data') {
          formdata.append(key, data[key]);
        }
      }

      for (const [index, value] of Object.entries(data.data)) {
        if (value.file !== undefined) {
          formdata.append(`file[${index}]`, value.file);
          delete value.file;
        }
      }

      formdata.append('data', JSON.stringify(data.data));

      setSpinner(true);

      await sendChangeCommittee(formdata)
        .then(response => {
          console.log(JSON.stringify(response, undefined, 2));
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
          console.log(JSON.stringify(error, undefined, 2));

          const errors = error?.errors;

          if (!_.isEmpty(errors)) {
            for (const [key, value] of Object.entries(errors)) {
              setError(key, {
                type: 'server',
                message: value.map(item => item + '\n'),
              });
            }
          }

          navigation.navigate('Alert1', {
            children: <AlertChangeInfoCommitteeFailed />,
            title: Translate('textConfirm2'),
          });
        })
        .finally(() => setSpinner(false));
    },
    error => console.log(error),
  );

  const addData = () => {
    append({old_prefix: '', old_name: '', new_prefix: '', new_name: ''});
  };

  const removeData = index => () => {
    remove(index);
  };

  const isForeigner = value => {
    return value == 'Y' ? true : false;
  };

  return (
    <View style={styles.rootContainer}>
      <Container style={{flex: 0}}>
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: Translate('textInputRequired'),
            },
          }}
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
          <View key={field.id} style={{paddingTop: ViewScale(25)}}>
            {/* delete button */}
            <TouchableOpacity
              style={styles.closecircle}
              onPress={removeData(i)}>
              <AntDesign name="closecircle" size={FONT_SIZE.BODY_1} />
            </TouchableOpacity>
            {/* oldname */}
            <View style={styles.ChangeNameRootContainer}>
              <Container style={styles.ChangeNameContainer}>
                <TextRegular
                  size={FONT_SIZE.BODY_2}
                  style={{marginRight: ViewScale(10)}}>
                  {Translate('textOldName')}
                </TextRegular>
                <Controller
                  rules={{
                    required: {
                      value: true,
                      message: Translate('textInputRequired'),
                    },
                  }}
                  control={control}
                  name={`data.${i}.old_prefix`}
                  render={({field: {onChange}, fieldState: {error}}) => (
                    <RadioPrefix onPress={onChange} error={error} etcActive />
                  )}
                />
              </Container>

              {/* input */}
              <Container style={styles.textInputContainer}>
                <Controller
                  rules={{
                    required: {
                      value: true,
                      message: Translate('textInputRequired'),
                    },
                  }}
                  control={control}
                  name={`data.${i}.old_name`}
                  render={({field: {onChange, value}, fieldState: {error}}) => (
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      error={error}
                      style={{color: 'black'}}
                    />
                  )}
                />
              </Container>
            </View>

            {/* newName */}
            <View style={styles.newNameContainer}>
              <Container style={styles.ChangeNameContainer}>
                <TextRegular
                  size={FONT_SIZE.BODY_2}
                  style={{marginRight: ViewScale(10)}}>
                  {Translate('textChangeTo')}
                </TextRegular>
                <Controller
                  rules={{
                    required: {
                      value: true,
                      message: Translate('textInputRequired'),
                    },
                  }}
                  control={control}
                  name={`data.${i}.new_prefix`}
                  render={({field: {onChange}, fieldState: {error}}) => (
                    <RadioPrefix onPress={onChange} etcActive error={error} />
                  )}
                />
              </Container>

              {/* input */}
              <Container style={styles.textInputContainer}>
                <Controller
                  rules={{
                    required: {
                      value: true,
                      message: Translate('textInputRequired'),
                    },
                  }}
                  control={control}
                  name={`data.${i}.new_name`}
                  render={({field: {onChange, value}, fieldState: {error}}) => (
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      error={error}
                      style={{color: 'black'}}
                    />
                  )}
                />
              </Container>

              <Container style={styles.textInputContainer}>
                <View style={styles.NewIdCardCommitteeContainer}>
                  <TextRegular size={FONT_SIZE.BODY_2}>
                    {Translate('textNewIdCardCommittee')}
                  </TextRegular>
                  <Controller
                    control={control}
                    name={`data.${i}.foreigner`}
                    defaultValue={'N'}
                    render={({field: {onChange, value}}) => (
                      <TouchableOpacity
                        onPress={() => onChange(value == 'N' ? 'Y' : 'N')}
                        style={styles.NewIdCardCommitteeCheckBoxContainer}>
                        <CheckBox value={isForeigner(value)} />
                        <TextRegular size={FONT_SIZE.BODY_2}>
                          {Translate('textForeigner')}
                        </TextRegular>
                      </TouchableOpacity>
                    )}
                  />
                </View>

                {!isForeigner(watch(`data.${i}.foreigner`)) ? (
                  <Controller
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: Translate('textInputRequired'),
                      },
                    }}
                    shouldUnregister={true}
                    name={`data.${i}.idcard`}
                    render={({
                      field: {onChange, value},
                      fieldState: {error},
                    }) => (
                      <TextInput
                        value={value}
                        onChangeText={onChange}
                        error={error}
                        style={{color: 'black'}}
                      />
                    )}
                  />
                ) : (
                  <View style={styles.inputdisabled} />
                )}
              </Container>

              {isForeigner(watch(`data.${i}.foreigner`)) && (
                <Controller
                  control={control}
                  name={`data.${i}.file`}
                  shouldUnregister={true}
                  rules={{
                    required: {
                      value: true,
                      message: Translate('textInputRequired'),
                    },
                  }}
                  defaultValue={null}
                  render={({field: {onChange}, fieldState: {error}}) => (
                    <Uploadfile
                      control={control}
                      onPress={onChange}
                      error={error}
                      title={Translate('textUploadFileForeigner')}
                    />
                  )}
                />
              )}
            </View>
          </View>
        ))}
        {/* add btn */}
        <AddButton onPress={addData} />
      </View>

      <Controller
        control={control}
        name={'effect_date'}
        rules={{
          required: {
            value: true,
            message: Translate('textInputRequired'),
          },
        }}
        render={({field: {onChange}, fieldState: {error}}) => (
          <EffectiveDate onSelected={onChange} error={error} />
        )}
      />

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
}
