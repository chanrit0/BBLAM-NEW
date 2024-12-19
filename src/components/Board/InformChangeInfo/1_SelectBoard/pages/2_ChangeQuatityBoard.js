// React
import React from 'react';
import {View, TouchableOpacity} from 'react-native';

// custom
import {setSpinner, ViewScale} from 'utils';
import styles from '../../Style';

// components
import {Container} from 'components/common';
import {Button, TextRegular, AddButton, CheckBox} from 'components/atoms';

import GroupButton from '../../GroupButton';
import RadioPrefix from '../../RadioPrefix';
import TextInput from '../../TextInput';
import EffectiveDate from '../../EffectiveDate';

import TextInputPrefix from '../TextInputPrefix';

// data
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FONT_SIZE} from 'styles';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {useRecoilValue} from 'recoil';
import {userInfoState} from 'recoil-state';
import {
  AlertChangeInfoCommitteeFailed,
  AlertChangeInfoCommitteeSuccess,
} from 'components/molecules';
import {sendChangeQuantityCommittee} from 'services/api/committee';
import {useNavigation} from '@react-navigation/core';
import {Translate} from 'function';
import Uploadfile from '../../3_SelectCompany/Uploadfile';
import _ from 'lodash';

export default function ChangeQuatityBoard() {
  const navigation = useNavigation();
  const userInfo = useRecoilValue(userInfoState);
  const {control, handleSubmit, watch, getValues, setError} = useForm({
    defaultValues: {
      info_sub_change_type_id: 2,
      info_topic_change_id: 1,
      type_committee: 'employer', // employee , employer
      type_manage: 'add', // add , del
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
      await sendChangeQuantityCommittee(formdata)
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

  const isForeigner = value => {
    return value == 'Y' ? true : false;
  };

  return (
    <View>
      <Container>
        {/* section1 */}
        <Controller
          control={control}
          name="type_manage"
          render={({field: {onChange}}) => (
            <GroupButton
              items={['เพิ่ม', 'ลด']}
              itemsSend={['add', 'del']}
              onSelectedIndex={onChange}
              containerStyle={{marginTop: ViewScale(10)}}
              buttonStyle={{
                width: ViewScale(150),
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="type_committee"
          render={({field: {onChange}}) => (
            <GroupButton
              items={['ฝ่ายนายจ้าง', 'ฝ่ายลูกจ้าง']}
              itemsSend={['employer', 'employee']}
              onSelectedIndex={onChange}
              containerStyle={{marginTop: ViewScale(10)}}
              buttonStyle={{
                width: ViewScale(150),
              }}
            />
          )}
        />

        <View style={styles.section1PickerContainer}>
          <View style={styles.section1PickerLeftRightContainer}>
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: Translate('textInputRequired'),
                },
                pattern: /[0-9]+/,
              }}
              name="old_count"
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <TextInput
                  onChangeText={onChange}
                  value={value}
                  error={error}
                  containerStyle={{flex: 1}}
                  placeholder={'จากเดิม'}
                  style={{color: 'black'}}
                />
              )}
            />
            <TextRegular style={styles.section1PickerText}>{'ราย'}</TextRegular>
          </View>
          <View style={styles.section1PickerLeftRightContainer}>
            <Controller
              control={control}
              rules={{
                required: true,
                pattern: /[0-9]+/,
                validate: {
                  compare: v => {
                    if (getValues('type_manage') === 'add') {
                      console.log(
                        parseInt(getValues('old_count')) > parseInt(v),
                      );
                      return parseInt(getValues('old_count')) < parseInt(v);
                    } else {
                      return parseInt(getValues('old_count')) > parseInt(v);
                    }
                  },
                },
              }}
              name="new_count"
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <TextInput
                  onChangeText={onChange}
                  value={value}
                  error={error}
                  containerStyle={{flex: 1}}
                  placeholder={'เป็น'}
                  style={{color: 'black'}}
                />
              )}
            />
            <TextRegular style={styles.section1PickerText}>{'ราย'}</TextRegular>
          </View>
        </View>
      </Container>

      <View style={styles.section2Container}>
        <Container style={{flex: 0}}>
          <TextRegular>
            {'รายชื่อที่ต้องการ'}
            {watch('type_manage') === 'add' ? 'เพิ่ม' : 'ลด'}
          </TextRegular>
        </Container>

        {/* section2 */}
        {fields.map((field, index) => (
          <View key={field.id} style={styles.styleData}>
            <TextInputPrefix
              control={control}
              index={index}
              onPress={removeData(index)}
            />
            {watch('type_manage') === 'add' && (
              <Container style={styles.textInputContainer}>
                <View style={styles.NewIdCardCommitteeContainer}>
                  <TextRegular size={FONT_SIZE.BODY_2}>
                    {Translate('textNewIdCardCommittee')}
                  </TextRegular>
                  <Controller
                    control={control}
                    name={`data.${index}.foreigner`}
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

                {!isForeigner(watch(`data.${index}.foreigner`)) ? (
                  <Controller
                    control={control}
                    rules={{required: true}}
                    shouldUnregister={true}
                    name={`data.${index}.idcard`}
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
            )}
            {isForeigner(watch(`data.${index}.foreigner`)) && (
              <Controller
                control={control}
                name={`data.${index}.file`}
                shouldUnregister={true}
                rules={{required: true}}
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
