/* eslint-disable react-native/no-inline-styles */
// React
import React from 'react';
import {View, Text} from 'react-native';

// custom
import {setSpinner, ViewScale} from 'utils';
import styles from '../../Style';

// components
import {Container} from 'components/common';
import {Button, TextMedium, TextRegular} from 'components/atoms';

import TextInputWithTitle from '../../TextInputWithTitle';
import Uploadfile from '../Uploadfile';

// lib
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS, FONT_SIZE} from 'styles';
import {Controller, useForm} from 'react-hook-form';
import {useRecoilValue} from 'recoil';
import {userInfoState} from 'recoil-state';
import {sendChangeCompanyName} from 'services/api/committee';
import {useNavigation} from '@react-navigation/native';
import {
  AlertChangeInfoCommitteeSuccess,
  AlertChangeInfoCommitteeFailedFile,
} from 'components/molecules';
import {Translate} from 'function';
import _ from 'lodash';

export default function index() {
  const navigation = useNavigation();
  const {bottom} = useSafeAreaInsets();
  const userInfo = useRecoilValue(userInfoState);
  const {control, handleSubmit, setError,reset} = useForm({
    defaultValues: {
      info_sub_change_type_id: 10,
      info_topic_change_id: 3,
      current_company_name: '',
      new_company_name: '',
      file_certificate: '',
      fund_code: '',
      com_code: '',
    },
  });

  const _onSend = handleSubmit(
    async data => {
      const formdata = new FormData();
      formdata.append('info_sub_change_type_id', 10);
      formdata.append('info_topic_change_id', 3);
      formdata.append('info_topic_change_id', 4);
      formdata.append('fund_code', userInfo.fund_code);
      formdata.append('com_code', userInfo.com_code);
      formdata.append('current_company_name', data.current_company_name);
      formdata.append('new_company_name', data.new_company_name);
      formdata.append('cig_committee_emoloyer', data.cig_committee_emoloyer);
      formdata.append('cig_committee_emoloyee', data.cig_committee_emoloyee);
      formdata.append('contact_email_committee', data.contact_email_committee);
      formdata.append('file_certificate', data.file_certificate);

      setSpinner(true);
      await sendChangeCompanyName(formdata)
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
                info_sub_change_type_id: 10,
                info_topic_change_id: 3,
                current_company_name: '',
                new_company_name: '',
                file_certificate: '',
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
        name="current_company_name"
        rules={{required: true}}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <TextInputWithTitle
            title={'ชื่อบริษัท (เดิม)'}
            onChangeText={onChange}
            value={value}
            error={error}
          />
        )}
      />
      <Controller
        control={control}
        name="new_company_name"
        rules={{required: true}}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <TextInputWithTitle
            title={'ชื่อบริษัท (ใหม่)'}
            onChangeText={onChange}
            value={value}
            error={error}
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

      <Container>
        <TextMedium
          size={FONT_SIZE.BODY_2}
          style={{marginVertical: ViewScale(20)}}>
          {
            'โปรดระบุรายชื่อกรรมการกองทุนที่ลงนามในเอกสาร \nการเปลี่ยนแปลงครั้งนี้ (กรณีปัจจุบันมีกรรมการกองทุนมากกว่า 2 ท่าน)'
          }
        </TextMedium>
      </Container>

      <Controller
        control={control}
        name="cig_committee_emoloyer"
        rules={{required: true}}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <TextInputWithTitle
            title={'กรรมการกองทุนฝ่ายนายจ้าง'}
            onChangeText={onChange}
            value={value}
            error={error}
          />
        )}
      />
      <Controller
        control={control}
        name="cig_committee_emoloyee"
        rules={{required: true}}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <TextInputWithTitle
            title={'กรรมการกองทุนฝ่ายลูกจ้าง'}
            onChangeText={onChange}
            value={value}
            error={error}
          />
        )}
      />
      <Controller
        control={control}
        name="contact_email_committee"
        rules={{required: true}}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <TextInputWithTitle
            title={'อีเมลที่ต้องการส่งข้อมูลกลับ'}
            onChangeText={onChange}
            value={value}
            error={error}
          />
        )}
      />

      <Container>
        <View
          style={{
            backgroundColor: COLORS.GRAY_4,
            paddingVertical: ViewScale(20),
            paddingHorizontal: ViewScale(5),
            marginTop: ViewScale(50),
          }}>
          <TextRegular style={{textAlign: 'center'}} size={FONT_SIZE.BODY_3}>
            {
              'กรณีเปลี่ยนแปลงชื่อบริษัท ต้องดำเนินการแจ้งเปลี่ยนแปลง\nชื่อบริษัทข้อบังคับกองทุน แบบลายมือชื่อบริษัท ต่อสำนักงานกลต. \nและต้องได้รับการอนุมัติก่อน จึงจะใช้ข้อมูลใหม่ได้'
            }
          </TextRegular>
        </View>
      </Container>

      {/* Confirm btn */}
      <View style={[styles.footerButtonContainer, {marginBottom: bottom}]}>
        <Container>
          <Button type="fill" title="ยืนยัน" onPress={_onSend} />
        </Container>
      </View>
    </View>
  );
}
