// react
import React from 'react';

// custom
import {View, TouchableOpacity} from 'react-native';
import styles from '../Style';
import {ViewScale, FontScale} from 'utils';
import {Controller} from 'react-hook-form';

// global components
import {PhoneMessage} from 'components/Icons/Customs';
import {Container} from 'components/common';
import {TextBold, TextRegular, TextMedium, InputBorder} from 'components/atoms';

export default ({control, onPress}) => {
  return (
    <Container style={styles.container}>
      <PhoneMessage />
      <TextBold style={styles.headerText}>{'ยืนยันตัวตนด้วย OTP'}</TextBold>
      <TextRegular style={[styles.DescText, {marginTop: ViewScale(50)}]}>
        {
          'ระบุรหัส OTP ที่ได้รับทาง SMS รหัส OTP ที่ได้รับจะมีอายุการใช้งาน 5 นาที'
        }
      </TextRegular>

      <View style={{marginTop: ViewScale(20), width: '100%'}}>
        <Controller
          control={control}
          name={'otp'}
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <InputBorder
              ControllerProps={{control}}
              onChange={onChange}
              value={value}
              keyboardType={'number-pad'}
              style={{textAlign: 'center', fontSize: FontScale(35)}}
              maxLength={6}
            />
          )}
        />
      </View>
      <View style={styles.RequestOTPAgain}>
        <TextRegular>{'หากยังไม่ได้รับ OTP'}</TextRegular>
        <View style={{flexDirection: 'row'}}>
          <TextRegular>{'กรุณากด '}</TextRegular>
          <TouchableOpacity onPress={onPress}>
            <TextMedium style={styles.textUnderline}>
              {'ส่งรหัสอีกครั้ง'}
            </TextMedium>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};
