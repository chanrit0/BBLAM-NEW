/* eslint-disable react-native/no-inline-styles */
// React
import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

// recoil
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {promiseSetRecoil} from 'recoil-outside';
import {smallAlertState, userDeviceStatusState} from 'recoil-state';

// custom
import {Translate} from 'function';
import {COLORS, SPACING, FONT_TYPE, FONT_SIZE} from 'styles';

// components
import {Container} from 'components/common';
import {Button, SafeAreaView, InputElement, TextMedium} from 'components/atoms';
import Header from 'components/header/MainHeader';
import {isIOS, setSpinner, ViewScale} from 'utils';
// lib
import _ from 'lodash';
import {useForm} from 'react-hook-form';
import {ResetPassword, ChangePasswordApi} from 'services/api/Autorization';
import {
  AlertChangePasswordSuccess,
  AlertChangePasswordFail,
} from 'components/molecules';
// api
import {logout} from 'services/api';

export default ({navigation, route: {params}}) => {
  const ref_no = params?.ref_no;
  const otp = params?.otp;
  const changePass = params?.changePass;
  const {control, watch, handleSubmit} = useForm();
  const NewPassword = watch('NewPassword');
  const ConfirmPassword = watch('ConfirmNewPassword');

  // global state
  const setSmallAlert = useSetRecoilState(smallAlertState);
  const userDeviceStatus = useRecoilValue(userDeviceStatusState);
  // const [changePass, setChangePass] = React.useState(params?.changePass)

  // local
  const [errors, setErrors] = React.useState(null);
  const _onPress = async data => {
    if (onBlur()) return;

    if (!userDeviceStatus.isSignIn) {
      await ResetPassword({
        password: data.NewPassword,
        password_confirmation: data.ConfirmNewPassword,
        ref_no,
        otp,
      })
        .then(response => {
          console.log({response});
          if (response?.code === '02') {
            navigation.navigate('Alert1', {
              children: <AlertChangePasswordSuccess />,
              title: Translate('textConfirm2'),
              onPress: () => navigation.navigate('SignIn'),
            });
          } else if (response?.code === '04') {
            console.log('fail');
          }
        })
        .catch(error => console.log(error));
    } else {
      await ChangePasswordApi({
        old_password: data.CurrentPassword,
        password: data.NewPassword,
        password_confirmation: data.ConfirmNewPassword,
      })
        .then(response => {
          if (response?.code === '02') {
            navigation.navigate('Alert1', {
              children: <AlertChangePasswordSuccess />,
              title: Translate('textConfirm2'),
              onPress: () => {
                _logOutFunc();
              },
            });
          } else if (response?.code === '04') {
            setSmallAlert({visible: true, value: 'รหัสผ่านเดิมไม่ถูกต้อง'});
          } else if (response?.code == '05') {
            navigation.navigate('Alert1', {
              children: <AlertChangePasswordFail message={response?.message} />,
              title: Translate('textConfirm2'),
              onPress: () => navigation.goBack(),
            });
          } else {
            console.log('Error ChangPassWord!!!');
          }
        })
        .catch(error => console.log(error));
    }
  };

  const _logOutFunc = async () => {
    setSpinner(true);

    await logout()
      .then(() => {
        promiseSetRecoil(userDeviceStatusState, {
          isSignIn: false, // เช็คเข้าสู่ระบบ BBLAM_ONE ยัง
          isConnectPVD: false, // เชื่อมต่อข้อมูลกับ PVD แล้วหรือยัง
          activePasscode: false, // -> จับเวลาการ activePasscode
        });

        navigation.reset({
          index: 0,
          routes: [{name: 'BBLAMONERoute'}],
        });
      })
      .catch(error => {
        console.log('ERROR BBLAM>>', error);
      })
      .finally(() => setSpinner(false));
  };

  const onBlur = () => {
    if (NewPassword !== ConfirmPassword) {
      setErrors({
        errorStyle: {
          alignSelf: 'flex-end',
          fontFamily: FONT_TYPE.REGULAR,
          fontSize: FONT_SIZE.BODY_2,
          color: COLORS.ERROR,
        },
        errorMessage: Translate('textPasswordNotValid'),
        inputContainerStyle: {
          borderBottomColor: COLORS.ERROR,
        },
      });
      return true;
    } else {
      setErrors(null);
      return false;
    }
  };

  const _onError = React.useCallback(error => {
    onBlur();
    console.log({error});
  });

  return (
    <SafeAreaView>
      <StatusBar animated barStyle={'dark-content'} />
      <Header navigation={navigation} />
      <KeyboardAvoidingView behavior={isIOS ? 'padding' : ''} style={{flex: 1}}>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}>
          <View style={styles.rootContainer}>
            <Container>
              <TextMedium color={COLORS.PRIMARY} size={FONT_SIZE.TITLE_3}>
                {!changePass
                  ? Translate('textChangePasswordHead')
                  : Translate('textForgotassword')}
              </TextMedium>
              {changePass && (
                <TextMedium color={COLORS.PRIMARY} size={FONT_SIZE.BODY_1}>
                  {Translate('textNewSetPass')}
                </TextMedium>
              )}

              <View style={{marginTop: ViewScale(50)}}>
                {/* CurrentPassword */}
                {!changePass && (
                  <InputElement
                    ControllerProps={{
                      control,
                      name: 'CurrentPassword',
                      rules: userDeviceStatus.isSignIn && {
                        required: Translate('textInputRequired'),
                      },
                    }}
                    InputProps={{
                      label: Translate('textCurrentPassword'),
                      placeholder: `${Translate('textFillInput')}${Translate(
                        'textCurrentPassword',
                      )}`,
                    }}
                    isPassword
                  />
                )}
                <InputElement
                  ControllerProps={{
                    control,
                    name: 'NewPassword',
                    rules: {
                      required: Translate('textInputRequired'),
                      pattern: {
                        value:
                          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#\$%\^\&*\)\(+=._-]).{8,}$/,
                        message: 'รูปแบบไม่ถูกต้อง',
                      },
                    },
                  }}
                  InputProps={{
                    label: Translate('textNewPassword'),
                    placeholder: `${Translate('textFillInput')}${Translate(
                      'textNewPassword',
                    )}`,
                  }}
                  watch={NewPassword}
                  isPassword
                  isShowPasswordGUI
                />
                <InputElement
                  ControllerProps={{
                    control,
                    name: 'ConfirmNewPassword',
                    rules: {
                      required: Translate('textInputRequired'),
                    },
                  }}
                  InputProps={{
                    label: Translate('textReConfirmNewPassword'),
                    placeholder: `${Translate('textFillInput')}${Translate(
                      'textReConfirmNewPassword',
                    )}`,
                    onBlur: onBlur,
                    ...errors,
                  }}
                  watch={ConfirmPassword}
                  isPassword
                />
              </View>
            </Container>
            <Container
              style={{
                flex: 0,
                marginTop: ViewScale(20),
                marginBottom: SPACING.FOOTER_HEIGHT,
              }}>
              <Button
                type={'fill'}
                title={Translate('textChangePassword')}
                onPress={handleSubmit(_onPress, _onError)}
              />
            </Container>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textLabel: {
    color: COLORS.PRIMARY,
  },
  rootContainer: {
    flex: 1,
    marginTop: ViewScale(30),
  },
});
