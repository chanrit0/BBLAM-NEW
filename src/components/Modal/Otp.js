import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Keyboard,
} from 'react-native';
import {Translate} from 'function';
import {ViewScale} from 'utils';
import {COLORS, FONT_SIZE} from 'styles';
import {Overlay} from 'react-native-elements';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {TextRegular, TextMedium, TextLight} from 'components/atoms';
import _ from 'lodash';
import {isTablet} from 'react-native-device-info';
export default function Otp({
  backdropStyle,
  children,
  fullScreen,
  isVisible,
  ModalComponent,
  onBackdropPress,
  overlayStyle,

  callbackCancel,
  callbackConfirm,
  callbackRequestAgain,

  onCodeChanged,
  code,
  onCodeFilled,

  RefTimeout,
  setRefTimeout,
  RefCode,

  data,
}) {
  const datas = {
    phoneNumber: _.isEmpty(data) ? '????' : data.phoneNumber,
  };
  const [widthOtp, setWidthOtp] = React.useState(0);
  const [heightOverlay, setHeightOverlay] = React.useState(0);
  const [marginBottom, setMarginBottom] = React.useState(0);

  // Countdown Ref code
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (RefTimeout > 0) {
        setRefTimeout(RefTimeout - 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    const onFocus = Keyboard.addListener('keyboardWillShow', e => {
      setMarginBottom(e.endCoordinates.height);
    });

    const onBlur = Keyboard.addListener('keyboardWillHide', e => {
      setMarginBottom(0);
    });

    return () => {
      onFocus.remove();
      onBlur.remove();
      clearInterval(interval);
    };
  });

  return (
    <Overlay
      isVisible={isVisible}
      ModalComponent={ModalComponent}
      fullScreen={fullScreen}
      overlayStyle={[styles.OverlayStyle, overlayStyle]}
      onBackdropPress={() => {
        Keyboard.dismiss();
      }}
      backdropStyle={[styles.backdropStyle, {backdropStyle}]}>
      <ScrollView scrollEnabled={false} keyboardShouldPersistTaps={'handled'}>
        <View style={styles.OverlayContainer}>
          <View style={styles.OtpTextContainer}>
            <TextMedium style={styles.OtpTextHeader}>
              OTP Verification
            </TextMedium>
            <TextLight style={styles.OtpTextBody}>
              {Translate('textOTPDesc')}
            </TextLight>
            <TextRegular style={styles.OtpTextPhoneNumber}>
              {datas.phoneNumber}
            </TextRegular>
          </View>

          <View style={styles.OtpContainer}>
            <TextLight size={FONT_SIZE.BODY_3}>
              Ref. {RefCode}{' '}
              <TextLight size={FONT_SIZE.BODY_2} color={COLORS.SECONDARY}>
                ({RefTimeout})
              </TextLight>
            </TextLight>
            <View
              onLayout={({nativeEvent}) => {
                setWidthOtp(nativeEvent.layout.width);
              }}>
              <OTPInputView
                pinCount={6}
                style={[styles.otpView]}
                onCodeFilled={onCodeFilled}
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
              onPress={callbackRequestAgain}>
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
          <TouchableOpacity
            style={styles.borderButton}
            onPress={callbackCancel}>
            <TextRegular style={styles.textButtonCancel}>
              {Translate('textCancel')}
            </TextRegular>
          </TouchableOpacity>
          {/* Confirm */}
          <TouchableOpacity style={styles.fillButton} onPress={callbackConfirm}>
            <TextRegular style={styles.textButtonConfirm}>
              {Translate('textConfirm')}
            </TextRegular>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Overlay>
  );
}

const value = {
  paddingButton: ViewScale(15), // Overlay Button
};

const styles = StyleSheet.create({
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
    fontSize: FONT_SIZE.TITLE_2,
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
    fontSize: FONT_SIZE.BODY_1,
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
