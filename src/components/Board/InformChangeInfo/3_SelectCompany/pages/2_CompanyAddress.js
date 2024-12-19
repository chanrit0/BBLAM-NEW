/* eslint-disable react-native/no-inline-styles */
// React
import React from 'react';
import {View, TouchableOpacity} from 'react-native';

// custom
import {isTablet, setSpinner, ViewScale} from 'utils';
import styles from '../../Style';

// components
import {Container} from 'components/common';
import {Button, CheckBox, TextRegular} from 'components/atoms';

import TextInputWithTitle from '../../TextInputWithTitle';
import Uploadfile from '../Uploadfile';
import EffectiveDate from '../../EffectiveDate';

// lib
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS, FONT_SIZE} from 'styles';
import {Controller, useForm} from 'react-hook-form';
import {useRecoilValue} from 'recoil';
import {userInfoState} from 'recoil-state';
import {sendChangeCompanyAddress} from 'services/api/committee';
import {useNavigation} from '@react-navigation/native';
import {
  AlertChangeInfoCommitteeSuccess,
  AlertChangeInfoCommitteeFailedFile,
} from 'components/molecules';
import {Translate} from 'function';
import _ from 'lodash';

export default function index() {
  const {bottom} = useSafeAreaInsets();
  const userInfo = useRecoilValue(userInfoState);
  const navigation = useNavigation();
  const {control, handleSubmit, setError,reset} = useForm({
    defaultValues: {
      info_sub_change_type_id: 11,
      info_topic_change_id: 3,
      effect_date: '',
      address_company: '',
      file_certificate: '',
      dup_contact: false,
      fund_code: '',
      com_code: '',
    },
  });

  const _onSend = handleSubmit(
    async data => {
      const formdata = new FormData();
      formdata.append('info_sub_change_type_id', data.info_sub_change_type_id);
      formdata.append('info_topic_change_id', data.info_topic_change_id);
      formdata.append('dup_contact', data.dup_contact);
      formdata.append('effect_date', data.effect_date);
      formdata.append('address_company', data.address_company);
      formdata.append('file_certificate', data.file_certificate);
      formdata.append('fund_code', userInfo.fund_code);
      formdata.append('com_code', userInfo.com_code);

      setSpinner(true);
      await sendChangeCompanyAddress(formdata)
        .then(response => {
          if (response.code == '02' || response.status == 'success') {
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
          navigation.navigate('Alert1', {
            children: <AlertChangeInfoCommitteeFailedFile />,
            title: Translate('textConfirm2'),
            onPress: () => {
              reset({
                info_sub_change_type_id: 11,
                info_topic_change_id: 3,
                effect_date: '',
                address_company: '',
                file_certificate: '',
                dup_contact: false,
                fund_code: '',
                com_code: '',
              });
            },
          });
        })
        .finally(() => setSpinner(false));
    },
    error => {
      console.log(error);
    },
  );

  return (
    <View>
      <Controller
        control={control}
        name="address_company"
        defaultValue={false}
        rules={{required: true}}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <TextInputWithTitle
            inputType={'textarea'}
            title={'ที่อยู่ (ใหม่)'}
            height={ViewScale(150)}
            onChangeText={onChange}
            value={value}
            error={error}
            textAreaProps={{w: {base: '100%'}}}
            containerStyle={{flexDirection: 'column', alignItems: 'center'}}
            titleSideComp={
              <Controller
                control={control}
                name="dup_contact"
                render={({field: {onChange, value}}) => (
                  <TouchableOpacity
                    onPress={() => {
                      onChange(!value);
                    }}
                    style={{
                      flex: 1,
                      marginLeft: ViewScale(10),
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <CheckBox disabled value={value} />
                    <TextRegular color={COLORS.PRIMARY} size={FONT_SIZE.BODY_3}>
                      {`ที่อยู่บริษัทและที่อยู่สำหรับ${
                        isTablet ? '' : '\n'
                      }การรับ-ส่งเอกสาร เป็นที่เดียวกัน`}
                    </TextRegular>
                  </TouchableOpacity>
                )}
              />
            }
          />
        )}
      />

      <Controller
        control={control}
        name={'file_certificate'}
        rules={{required: true}}
        render={({field: {onChange}, fieldState: {error}}) => (
          <Uploadfile control={control} onPress={onChange} error={error} />
        )}
      />

      <View
        style={{
          marginTop: ViewScale(20),
          borderBottomColor: COLORS.BORDER,
          borderBottomWidth: 0.5,
        }}
      />

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
}
