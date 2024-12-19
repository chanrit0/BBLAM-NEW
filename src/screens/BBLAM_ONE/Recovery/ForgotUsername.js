/* eslint-disable react-native/no-inline-styles */
// React
import React from 'react';
import {View, SafeAreaView, ScrollView} from 'react-native';

// custom
import {Translate} from 'function';
import {ViewScale} from 'utils';
import styles from './Style';
import {COLORS, SPACING} from 'styles';

// components
import Header from 'components/header/MainHeader';
import Otp from 'components/Modal/Otp';
import {Ionicons} from 'components/Icons';
import OverlayBBLAM from 'components/Modal/Overlay';
import {Container} from 'components/common';
import {Button, InputElement} from 'components/atoms';
import {TextMedium, TextLight, TextRegular} from 'components/atoms';

// lib
import {useForm} from 'react-hook-form';
import _ from 'lodash';
import {KeyboardAvoidingView} from 'react-native';
import {isIOS} from 'utils';

export default function ForgotUsername({navigation}) {
  // useState
  const [scroll, setScroll] = React.useState(false);
  const [visibleEmail, setVisibleEmail] = React.useState(false);
  const [visibleOtp, setVisibleOtp] = React.useState(false);
  const {control, handleSubmit} = useForm();

  // function

  const sendingData = React.useCallback(async () => {
    // Devtest
    const hasEmail = true;
    console.log('sending Data');

    if (hasEmail) {
      setVisibleEmail(true);
    } else {
      setVisibleOtp(true);
    }
  }, []);

  //   Sending OTP Function

  const confirmButtonOtp = React.useCallback(() => {
    // Devtest
    console.log('Press Confirm Button');
    setVisibleOtp(false);
  }, []);

  const requestAgainButtonOtp = React.useCallback(() => {
    // Devtest
    console.log('Press Request OTP Again');
  }, []);

  // Sending Email

  const confirmButtonEmail = React.useCallback(() => {
    // Devtest
    console.log('Press Confirm Button Email');
    setVisibleEmail(false);
  }, []);

  const _onError = ({error}) => {
    console.log({error});
  };

  return (
    <>
      <SafeAreaView />
      <Header navigation={navigation} />
      <KeyboardAvoidingView style={{flex: 1}} behavior={isIOS ? 'padding' : ''}>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}>
          <Container style={{flexGrow: 1, justifyContent: 'center'}}>
            <View style={{flexGrow: 0.5}}>
              {/* header */}
              <TextMedium style={styles.headerText}>
                {Translate('textForgotUsername')}
              </TextMedium>

              {/* description */}
              <TextLight style={styles.headerTextDesc}>
                {Translate('textForgotUsernameDescription')}
              </TextLight>

              {/* input form */}
              <View style={styles.inputContainer}>
                {/* input */}

                <InputElement
                  ControllerProps={{
                    control,
                    name: 'ComCode',
                    rules: {required: Translate('textInputRequired')},
                  }}
                  InputProps={{
                    placeholder: Translate('textComCode'),
                  }}
                />

                <InputElement
                  ControllerProps={{
                    control,
                    name: 'MemCode',
                    rules: {required: Translate('textInputRequired')},
                  }}
                  InputProps={{
                    placeholder: Translate('textMemCode'),
                  }}
                />

                <InputElement
                  ControllerProps={{
                    control,
                    name: 'FundCode',
                    rules: {required: Translate('textInputRequired')},
                  }}
                  InputProps={{
                    placeholder: Translate('textFundCode'),
                  }}
                />
              </View>
            </View>
          </Container>
          <Container
            style={{
              flex: 0,
              marginTop: ViewScale(20),
              marginBottom: SPACING.FOOTER_HEIGHT,
            }}>
            <Button
              title={Translate('textSendButton')}
              type="fill"
              onPress={handleSubmit(sendingData, _onError)}
            />
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <SafeAreaView />

      {/* Overlay */}
      {visibleOtp && (
        <Otp
          isVisible={visibleOtp}
          callbackCancel={() => setVisibleOtp(false)}
          callbackConfirm={confirmButtonOtp}
          callbackRequestAgain={requestAgainButtonOtp}
        />
      )}

      {visibleEmail && (
        <OverlayBBLAM
          isVisible={visibleEmail}
          callbackConfirm={confirmButtonEmail}
          title="ตกลง">
          <TextRegular style={styles.OverlayHeaderText}>
            {'โปรดตรวจสอบขอีเมลองท่าน'}
          </TextRegular>
          <View style={styles.OverlayContainerEmail}>
            <Ionicons
              name="ios-mail-outline"
              type="ionicon"
              size={ViewScale(70)}
              style={styles.OverlayIcon}
              color={COLORS.PRIMARY}
            />
            <View style={styles.OverlayEmailDescriptionContainer}>
              <TextRegular style={styles.hideEmail}>
                {'myxxx@gmail.com'}
              </TextRegular>
              <View style={styles.OverlayEmailDescription}>
                <TextRegular style={styles.OverlayEmailDescriptionText}>
                  {'หากอีเมลของท่านไม่ถูกต้อง'}
                </TextRegular>
                <TextRegular style={styles.OverlayEmailDescriptionText}>
                  {'กรุณาติดต่อคณะกรรมการกองทุน'}
                </TextRegular>
              </View>
            </View>
          </View>
        </OverlayBBLAM>
      )}
    </>
  );
}
