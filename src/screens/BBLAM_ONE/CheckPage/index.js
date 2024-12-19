// react
import React from 'react';
import {View} from 'react-native';

// custom
import {SPACING} from 'styles';
import {Translate} from 'function';

// global components
import Header from 'components/header/MainHeader';
import {Container} from 'components/common';
import {Button, SafeAreaView, KeyboardDismiss} from 'components/atoms';
import {
  AlertVerifyFailed,
  AlertVerifyPVDSuccess,
  AlertVerifySuccess,
  AlertWrongOTP,
  AlertVerifyPVDEmailSuccess,
  AlertVerifyMemberSuccess,
} from 'components/molecules';

// local components
import OTP from './components/OTP';
import OTPForm from './components/OTPForm';
import ConfirmEmail from './components/ConfirmEmail';

// lib
import {useForm} from 'react-hook-form';

// recoil
import {useRecoilState} from 'recoil';
import {userAuthenState, userDeviceStatusState} from 'recoil-state';

// services
import {
  ChangeEmailConfirm,
  register,
  resendChangeNewEmail,
  resendEmail,
  resendPhone,
  resendValidateRefCode,
  validateRefCode,
} from 'services/api';

export default ({navigation, route}) => {
  // global
  const [userAuthenData, setUserAuthenData] = useRecoilState(userAuthenState);
  const path = route.params.path; // -> email , phonenumber, phonenumberForm
  const method = route.params?.method;
  // const [refNo, setRefNo] = React.useState(route.params?.ref_no);

  const [userDeviceStatus, setUserDeviceStatus] = useRecoilState(
    userDeviceStatusState,
  );
  const {control, handleSubmit} = useForm();

  const _onPressEmail = async () => {
    // send data to server ~

    if (userDeviceStatus.isSignIn) {
      if (method === 'ChangeEmail') {
        await ChangeEmailConfirm();
      } else {
        await validateRefCode({
          ref_code: userAuthenData?.ref_code,
          fund_code: userAuthenData?.fund_code,
          com_code: userAuthenData?.com_code,
          ref_no: userAuthenData?.ref_no,
        })
          .then(response => {
            const code = response?.code;
            // console.log({response});

            if (String(code) === '04') {
              navigation.navigate('Alert1', {
                children: <AlertVerifyFailed />,
                title: Translate('textConfirm2'),
              });
            } else if (String(code) === '02') {
              const {isConnectPVD, ...userDeviceStatusOthers} =
                userDeviceStatus;
              setUserAuthenData(null);
              setUserDeviceStatus({
                ...userDeviceStatusOthers,
                isConnectPVD: true,
              });
              navigation.navigate('Alert1', {
                children: <AlertVerifyPVDSuccess />,
                title: Translate('textConfirm2'),
                onPress: () => {
                  navigation.reset({
                    index: 1,
                    routes: [{name: 'BBLAMONERoute', name: 'Portal'}],
                  });
                },
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    } else {
      await register(userAuthenData)
        .then(response => {
          const code = response?.code;
          if (code === '02') {
            const {isConnectPVD, ...userDeviceStatusOthers} = userDeviceStatus;
            setUserAuthenData(null);
            setUserDeviceStatus({
              isConnectPVD: true,
              ...userDeviceStatusOthers,
            });
            if (userAuthenData.isCommittee) {
              navigation.navigate('Alert1', {
                children: <AlertVerifyPVDEmailSuccess />,
                title: Translate('textConfirm2'),
                onPress: () => {
                  navigation.popToTop();
                },
              });
            } else {
              navigation.navigate('Alert1', {
                children: <AlertVerifyMemberSuccess />,
                title: Translate('textConfirm2'),
                onPress: () => {
                  navigation.popToTop();
                },
              });
            }
          }
        })
        .catch(error => {
          const code = error?.code;
          if (code === '00') {
            navigation.navigate('Alert1', {
              children: <AlertVerifyFailed />,
              title: Translate('textConfirm2'),
            });
          }
        });
    }
  };

  const _onPressResendEmail = async () => {
    if (userDeviceStatus.isSignIn) {
      await resendValidateRefCode({
        ref_code: userAuthenData.ref_code,
        com_code: userAuthenData.com_code,
        fund_code: userAuthenData.fund_code,
      })
        .then(response => {
          const ref_no = response?.ref_no;
          const code = response?.code;
          console.log({response});
          if (String(code) === '02') {
            setUserAuthenData(value => {
              let temp = {...value};
              temp['ref_no'] = ref_no;
              return temp;
            });

            console.log('sending Success');
          }
        })
        .catch(error => {
          console.log('Sending Error');
        });
    } else {
      await resendEmail({username: userAuthenData.email})
        .then(response => {
          console.log('Sending Success');
          const ref_no = response?.ref_no;
          setUserAuthenData(value => {
            let temp = {...value};
            temp['ref_no'] = ref_no;
            return temp;
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const _onPressPhoneNumber = handleSubmit(
    async data => {
      if (path !== 'phonenumberForm') {
        return navigation.push('CheckPage', {path: 'phonenumberForm'});
      } else {
        if (userDeviceStatus.isSignIn) {
          console.log({userAuthenData});
          await validateRefCode({
            ref_code: userAuthenData?.ref_code,
            fund_code: userAuthenData?.fund_code,
            com_code: userAuthenData?.com_code,
            ref_no: userAuthenData?.ref_no,
            otp: data.otp,
          })
            .then(response => {
              const code = response?.code;
              console.log({response});
              if (String(code) === '04') {
                navigation.navigate('Alert1', {
                  children: <AlertWrongOTP />,
                  title: Translate('textConfirm2'),
                });
              } else if (String(code) === '02') {
                const {isConnectPVD, ...userDeviceStatusOthers} =
                  userDeviceStatus;
                navigation.navigate('Alert1', {
                  children: <AlertVerifyPVDSuccess />,
                  title: Translate('textConfirm2'),
                  onPress: () => {
                    navigation.popToTop();
                  },
                });
                setUserDeviceStatus({
                  isConnectPVD: true,
                  ...userDeviceStatusOthers,
                });
                setUserAuthenData(null);
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          await register({...userAuthenData, otp: data.otp})
            .then(response => {
              const code = response?.code;
              if (code === '02') {
                const {isConnectPVD, ...userDeviceStatusOthers} =
                  userDeviceStatus;
                setUserAuthenData(null);
                setUserDeviceStatus({
                  isConnectPVD: true,
                  ...userDeviceStatusOthers,
                });
                navigation.navigate('Alert1', {
                  children: <AlertVerifyMemberSuccess />,
                  title: Translate('textConfirm2'),
                  onPress: () => {
                    navigation.popToTop();
                  },
                });
              } else {
                console.log(response);
              }
            })
            .catch(error => {
              const code = String(error?.code);
              if (code === '00') {
                navigation.navigate('Alert1', {
                  children: <AlertWrongOTP />,
                  title: Translate('textConfirm2'),
                });
              }
            });
        }
      }
    },
    error => {
      console.log(error);
    },
  );

  const _onPressResendPhoneNumber = async () => {
    if (userDeviceStatus.isSignIn) {
      await resendValidateRefCode({
        ref_code: userAuthenData?.ref_code,
        com_code: userAuthenData?.com_code,
        fund_code: userAuthenData?.fund_code,
      })
        .then(response => {
          const ref_no = response?.ref_no;
          const code = response?.code;
          console.log({response});
          if (String(code) === '02') {
            setUserAuthenData(value => {
              let temp = {...value};
              temp['ref_no'] = ref_no;
              return temp;
            });
          }
        })
        .catch(error => {
          console.log('Sending Error');
        });
    } else {
      await resendPhone({username: userAuthenData.phone})
        .then(response => {
          console.log({response});
          const code = String(response?.code);
          const ref_no = response?.ref_no;
          const status = response?.status;

          if (code === '02') {
            setUserAuthenData(value => {
              let temp = {...value};
              temp['ref_no'] = ref_no;
              return temp;
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const _onPressResendEmail_ChangeEmail = async () => {
    await resendChangeNewEmail();
  };

  return (
    <SafeAreaView>
      <Header navigation={navigation} />
      <KeyboardDismiss>
        <View style={{flex: 1}}>
          {path === 'email' && (
            <ConfirmEmail
              email={userAuthenData?.emailMock}
              onPress={
                method === 'ChangeEmail'
                  ? _onPressResendEmail_ChangeEmail
                  : _onPressResendEmail
              }
            />
          )}
          {path === 'phonenumber' && (
            <OTP phonenumber={userAuthenData?.phoneMock} />
          )}
          {path === 'phonenumberForm' && (
            <OTPForm control={control} onPress={_onPressResendPhoneNumber} />
          )}
        </View>

        <Container style={{flex: 0, marginBottom: SPACING.FOOTER_HEIGHT}}>
          <Button
            title={
              path == 'email'
                ? Translate('textResendEmail1RemindDeteil1_1')
                : Translate('textNext')
            }
            type="fill"
            onPress={path === 'email' ? _onPressEmail : _onPressPhoneNumber}
          />
        </Container>
      </KeyboardDismiss>
    </SafeAreaView>
  );
};
