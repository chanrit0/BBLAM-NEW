/* eslint-disable react-native/no-inline-styles */
// React
import React from 'react';
import {View, Text} from 'react-native';

// custom
import {setSpinner, ViewScale} from 'utils';

// components
import {Container} from 'components/common';

import GroupButton from '../GroupButton';
import Del from './Del';
import Add from './Add';
import {useNavigation} from '@react-navigation/core';
import {userInfoState} from 'recoil-state';
import {useRecoilValue} from 'recoil';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import EffectiveDate from '../EffectiveDate';
import styles from '../Style';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Button} from 'components/atoms';
import {
  AlertChangeInfoCommitteeFailed,
  AlertChangeInfoCommitteeSuccess,
} from 'components/molecules';
import {Translate} from 'function';
import {sendChangeCoordinator} from 'services/api/committee';
import _ from 'lodash';

export default () => {
  const navigation = useNavigation();
  const {bottom} = useSafeAreaInsets();
  const userInfo = useRecoilValue(userInfoState);
  const {control, handleSubmit, watch, setValue, setError} = useForm({
    defaultValues: {
      info_topic_change_id: 2,
      type_contact: 'reporter',
      type_manage: 'add',
      com_code: userInfo.com_code,
      fund_code: userInfo.fund_code,
      effect_date: '',
      data: [{}],
    },
  });
  const {fields, append, remove} = useFieldArray({
    control,
    name: 'data',
  });

  const addDataAdd = React.useCallback(() => {
    append({
      name: '',
      position: '',
      address_company: '',
      phone: '',
      fax: ' ',
      email: '',
    });
  }, []);

  const addDataDel = React.useCallback(() => {
    append({
      name: '',
      email: '',
    });
  }, []);

  const removeData = React.useCallback(
    index => () => {
      remove(index);
    },
    [],
  );

  const _onSend = handleSubmit(
    async data => {
      setSpinner(true);
      console.log(data);
      await sendChangeCoordinator(data)
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

  React.useEffect(() => {
    setValue('data', [{}]);
  }, [watch('type_manage')]);

  return (
    <View style={{flex: 1}}>
      <Container style={{flex: 0}}>
        <Controller
          control={control}
          rules={{required: true}}
          name="type_manage"
          render={({field: {onChange}}) => (
            <GroupButton
              items={['เพิ่ม', 'ลด']}
              itemsSend={['add', 'del']}
              onSelectedIndex={onChange}
              containerStyle={{marginTop: ViewScale(10)}}
              buttonStyle={{
                width: ViewScale(110),
              }}
            />
          )}
        />
        <Controller
          control={control}
          rules={{required: true}}
          name="type_contact"
          render={({field: {onChange}}) => (
            <GroupButton
              items={['ผู้รับรายงาน', 'ผู้ประสานงาน']}
              itemsSend={['reporter', 'coordinator']}
              onSelectedIndex={onChange}
              containerStyle={{
                marginTop: ViewScale(10),
                width: '100%',
                backgroundColor: ' red',
              }}
              buttonStyle={{
                flex: 1,
              }}
            />
          )}
        />
      </Container>

      {watch('type_manage') === 'add' ? (
        <Add
          fields={fields}
          control={control}
          addData={addDataAdd}
          removeData={removeData}
        />
      ) : (
        <Del
          fields={fields}
          control={control}
          addData={addDataDel}
          removeData={removeData}
        />
      )}

      <Controller
        control={control}
        name={'effect_date'}
        rules={{required: true}}
        render={({field: {onChange}, fieldState: {error}}) => (
          <EffectiveDate
            onSelected={onChange}
            error={error}
            title={Translate('textEffectiveDateForce1')}
          />
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
};
