// React
import React from 'react';
import {View, Text} from 'react-native';

// custom
import {setSpinner, ViewScale} from 'utils';
import styles from '../../Style';

// components
import {Container} from 'components/common';
import {Button} from 'components/atoms';

import EffectiveDate from '../../EffectiveDate';
import TextInputWithTitle from '../../TextInputWithTitle';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from 'styles';
import {Controller, useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {useRecoilValue} from 'recoil';
import {userInfoState} from 'recoil-state';
import {sendChangeCompanyAddressDocument} from 'services/api/committee';
import {AlertChangeInfoCommitteeSuccess} from 'components/molecules';
import {Translate} from 'function';
import _ from 'lodash';

export default function index() {
  const {bottom} = useSafeAreaInsets();
  const userInfo = useRecoilValue(userInfoState);
  const navigation = useNavigation();
  const {control, getValues, handleSubmit, setError} = useForm({
    defaultValues: {
      info_sub_change_type_id: 12,
      info_topic_change_id: 3,
      address_contact_company: '',
      effect_date: '',
      file_certificate: '',
      fund_code: '',
      com_code: '',
    },
  });

  const _onSend = handleSubmit(
    async data => {
      const formdata = new FormData();
      formdata.append('info_sub_change_type_id', data.info_sub_change_type_id);
      formdata.append('info_topic_change_id', data.info_topic_change_id);
      formdata.append('effect_date', data.effect_date);
      formdata.append('address_contact_company', data.address_contact_company);
      formdata.append('fund_code', userInfo.fund_code);
      formdata.append('com_code', userInfo.com_code);

      setSpinner(true);
      await sendChangeCompanyAddressDocument(formdata)
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
        name="address_contact_company"
        rules={{required: true}}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <TextInputWithTitle
            title={'ที่อยู่ (ใหม่)'}
            onChangeText={onChange}
            height={ViewScale(150)}
            value={value}
            error={error}
            inputType="textarea"
            textAreaProps={{w: {base: '100%'}}}
          />
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
