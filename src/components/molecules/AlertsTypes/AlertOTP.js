import React from 'react';
import {View, TouchableOpacity, StyleSheet, Keyboard} from 'react-native';
import {Translate} from 'function';
import {ViewScale} from 'utils';
import {COLORS, FONT_SIZE} from 'styles';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {TextRegular, TextMedium, TextLight, Alert} from 'components/atoms';
import _ from 'lodash';
import {isTablet} from 'react-native-device-info';
import {useNavigation} from '@react-navigation/core';
import {
  forgotPasswordApi,
  ValidateOTPForgotPassword,
} from 'services/api/Autorization';
import {smallAlertState} from 'recoil-state';
import {useSetRecoilState} from 'recoil';

export default ({route: {params}}) => {
  // CONSTANT
  const TIMEOUT_REF_CODE = 300; // -> 5 นาที

  const navigation = useNavigation();
  const phone = params?.phone ?? null;
  const ref_noParams = params?.ref_no ?? null;
  const sendingData = params?.sendingData ?? null;

  // global
  const setSmallAlert = useSetRecoilState(smallAlertState);

  const [ref_no, setRef_no] = React.useState(ref_noParams);
  const [widthOtp, setWidthOtp] = React.useState(0);
  const [marginBottom, setMarginBottom] = React.useState(0);
  const [otp, setOtp] = React.useState('');
  const [timeoutOTP, setTimeoutOTP] = React.useState(TIMEOUT_REF_CODE);

  // Countdown Ref code
  React.useEffect(() => {
    const timeoutotp = setInterval(() => {
      setTimeoutOTP(value => {
        if (value <= 0) {
          clearInterval(timeoutotp);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    const onFocus = Keyboard.addListener('keyboardWillShow', e => {
      setMarginBottom(e.endCoordinates.height);
    });

    const onBlur = Keyboard.addListener('keyboardWillHide', e => {
      setMarginBottom(0);
    });

    return () => {
      clearInterval(timeoutotp);
      onFocus.remove();
      onBlur.remove();
    };
  }, []);

  const sendOTP = async () => {
    await ValidateOTPForgotPassword({
      otp: otp,
      ref_no: ref_no,
    })
      .then(response => {
        console.log({response});
        const code = response?.code;
        if (code === '02') {
          navigation.navigate('ChangePassword', {
            method: 'forgotpassword',
            ref_no,
            otp,
            changePass : true
          });
        } else if (code === '04') {
          setSmallAlert({visible: true, value: 'รหัส OTP หมดเวลา'});
        } else if (code === '05') {
          setSmallAlert({visible: true, value: 'รหัส OTP ไม่ถูกต้อง'});
        }
      })
      .catch(error => {
        setSmallAlert({visible: true, value: error.errors.otp[0]});
      });
  };

  const resendOTP = async () => {
    await forgotPasswordApi(sendingData)
      .then(response => {
        // console.log({response});
        setRef_no(response?.ref_no);
        setTimeoutOTP(TIMEOUT_REF_CODE);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onPressCancel = React.useCallback(() => {
    navigation.goBack();
  }, []);

  const BackdropTouch = React.useCallback(() => {
    Keyboard.dismiss();
  }, []);

  return (
    <Alert
      TouchableBackdrop={BackdropTouch}
      marginBottom={marginBottom}
      style={{width: '90%'}}>
      <View style={[styles.container]}>
        <View style={styles.OverlayContainer}>
          <View style={styles.OtpTextContainer}>
            <TextMedium style={styles.OtpTextHeader}>
              OTP Verification
            </TextMedium>
            <TextLight style={styles.OtpTextBody}>
              {Translate('textOTPDesc')}
            </TextLight>
            <TextRegular style={styles.OtpTextPhoneNumber}>{phone}</TextRegular>
          </View>

          <View style={styles.OtpContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextLight size={FONT_SIZE.BODY_3}>Ref. {ref_no} </TextLight>
              <TextLight size={FONT_SIZE.BODY_4} color={COLORS.THIRDARY}>
                ({timeoutOTP})
              </TextLight>
            </View>
            <View
              onLayout={({nativeEvent}) => {
                setWidthOtp(nativeEvent.layout.width);
              }}>
              <OTPInputView
                pinCount={6}
                style={[styles.otpView]}
                onCodeFilled={setOtp}
                codeInputFieldStyle={[
                  styles.codeInputFieldStyle,
                  {
                    width: widthOtp / 6 - ViewScale(8),
                  },
                ]}
                codeInputHighlightStyle={styles.codeInputHighlightStyle}
              />
            </View>
          </View>

          <View style={styles.requestOtpContainer}>
            <TouchableOpacity
              style={styles.requestOtpbutton}
              onPress={resendOTP}>
              <TextLight style={styles.requestOtpText}>
                {Translate('textRequestOTP')}
              </TextLight>
            </TouchableOpacity>
          </View>
          <View>
            <TextLight style={styles.contact} color="#4c637b">
              {Translate('textOTPNote1')}
            </TextLight>
            <TextLight style={styles.contact} color="#4c637b">
              {Translate('textOTPNote2')}
            </TextLight>
          </View>
        </View>
        {/* Button  */}
        <View style={styles.Container}>
          {/* Cancel */}
          <TouchableOpacity style={styles.borderButton} onPress={onPressCancel}>
            <TextRegular style={styles.textButtonCancel}>
              {Translate('textCancel')}
            </TextRegular>
          </TouchableOpacity>
          {/* Confirm */}
          <TouchableOpacity style={styles.fillButton} onPress={sendOTP}>
            <TextRegular style={styles.textButtonConfirm}>
              {Translate('textConfirm')}
            </TextRegular>
          </TouchableOpacity>
        </View>
      </View>
    </Alert>
  );
};

const value = {
  paddingButton: ViewScale(15), // Overlay Button
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  OtpContainer: {
    marginTop: ViewScale(10),
  },
  codeInputHighlightStyle: {
    borderColor: COLORS.PRIMARY,
  },
  codeInputFieldStyle: {
    borderColor: COLORS.SECONDARY,
    height: '100%',
    color: 'black',
    fontSize: FONT_SIZE.TITLE_1,
  },
  otpView: {
    marginTop: ViewScale(10),
    height: isTablet() ? ViewScale(100) : ViewScale(70),
  },
  backdropStyle: {
    backgroundColor: COLORS.PRIMARY,
    opacity: 0.6,
  },
  Container: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
  },
  fillButton: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: ViewScale(10),
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: value.paddingButton,
    paddingBottom: value.paddingButton,
  },
  borderButton: {
    borderWidth: 1,
    color: COLORS.PRIMARY,
    borderColor: '#1a3686',
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: value.paddingButton,
    paddingBottom: value.paddingButton,
  },
  textButtonConfirm: {
    color: 'white',
  },
  textButtonCancel: {},
  OverlayContainer: {
    padding: ViewScale(20),
  },
  OverlayStyle: {
    padding: 0,
    borderRadius: 0,
    width: wp(90),
  },
  ContainerOverlayButton: {
    display: 'flex',
    flexDirection: 'row',
  },
  otpStyles: {
    backgroundColor: 'white',
    borderColor: '#caccd5',
    borderWidth: 1,
  },
  otpContainerStyle: {
    marginTop: ViewScale(30),
  },
  requestOtpContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    marginTop: ViewScale(10),
    marginBottom: ViewScale(10),
  },
  requestOtpText: {
    fontSize: FONT_SIZE.BODY_2,
    textDecorationLine: 'underline',
    color: COLORS.PRIMARY,
  },
  OtpTextContainer: {},
  OtpTextHeader: {
    fontSize: FONT_SIZE.TITLE_1,
  },
  OtpTextBody: {
    marginTop: ViewScale(10),
    fontSize: FONT_SIZE.TITLE_1,
    color: COLORS.FOURTHDARY,
  },
  OtpTextPhoneNumber: {
    fontSize: FONT_SIZE.TITLE_1,
  },
  contact: {
    fontSize: FONT_SIZE.TITLE_1,
    textAlign: 'center',
  },
});
