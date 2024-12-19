/* eslint-disable react-native/no-inline-styles */
// React
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

// custom
import {Translate} from 'function';
import {ViewScale, setSpinner} from 'utils';
import {COLORS, SPACING, FONT_SIZE} from 'styles';
import {RetrieveSecureData} from '../../utils/storage';

// components
import {Container} from 'components/common';
import {
  Button,
  SafeAreaView,
  InputElement,
  TextMedium,
  TextRegular,
} from 'components/atoms';
import Header from 'components/header/MainHeader';
import {AlertDeleteComplete} from 'components/molecules';

// hooks
import {isIOS, showSmallAlert} from 'utils';

// lib
import _ from 'lodash';
import {useForm} from 'react-hook-form';
import {useRecoilValue, useResetRecoilState} from 'recoil';
import {userDeviceStatusState, userInfoState} from 'recoil-state';
import {promiseSetRecoil} from 'recoil-outside';
import {DeleteAccount,logout} from 'services/api/Autorization';

export default ({navigation}) => {
  const {control, watch, handleSubmit} = useForm();

  const ResetUserInfo = useResetRecoilState(userInfoState);
  const userDeviceStatus = useRecoilValue(userDeviceStatusState);

  const [token, setToken] = useState();
  const legn = Translate('text_lang');

  useEffect(() => {
    GetToken();
  }, []);

  const GetToken = async () => {
    const token = await RetrieveSecureData('token');
    setToken(token.access_token);
  };

  const _onPress = async data => {
    if (userDeviceStatus.isSignIn) {
      setSpinner(true);

      await DeleteAccount({
        password: data.password,
        token: token,
        lang: legn,
      })
        .then(async res => {
          await logout()
            .then(() => {
              console.log('BBLAM: Token has been revoked');
              promiseSetRecoil(userDeviceStatusState, {
                isSignIn: false, // เช็คเข้าสู่ระบบ BBLAM_ONE ยัง
                isConnectPVD: false, // เชื่อมต่อข้อมูลกับ PVD แล้วหรือยัง
                activePasscode: false, // -> จับเวลาการ activePasscode
              });
              navigation.navigate('Alert1', {
                children: <AlertDeleteComplete />,
                title: Translate('textConfirm2'),
                onPress: () => {
                  // navigation.navigate('Main');
                  // ResetUserInfo();
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'BBLAMONERoute'}],
                  });
                  ResetUserInfo();
                },
              });
            })
            .catch(error => {
              console.log('ERROR BBLAM>>', error);
            })
            .finally(() => setSpinner(false));
        })
        .catch(error => {
          console.log('BBLAMERROR', error), showSmallAlert(error.message);
        })
        .finally(() => setSpinner(false));
    } else {
      console.log('BBLAMERROR>>>>>');
    }
  };

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
              <TextMedium color={COLORS.PRIMARY} size={FONT_SIZE.TITLE_4}>
                {Translate('textPassword')} (Password)
              </TextMedium>
              <TextRegular color={COLORS.THIRDARY}>
                {'โปรดกรอกรหัสผ่านเพื่อลบบัญชี'}
              </TextRegular>
              <View style={{marginTop: ViewScale(50)}}>
                <TextMedium color={COLORS.BLACK}>
                  {
                    'หากคุณปิดใช้งานบัญชีของคุณ คุณจะไม่สามารถ \nเข้าใช่งานระบบ BBLAM'
                  }
                </TextMedium>
              </View>
              <View style={{marginTop: ViewScale(100)}}>
                <InputElement
                  ControllerProps={{
                    control,
                    name: 'password',
                    rules: {
                      required: Translate('textInputRequired'),
                    },
                  }}
                  InputProps={{
                    placeholder: `กรอกรหัสผ่าน (Password)`,
                  }}
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
                title={Translate('textConfirm')}
                onPress={handleSubmit(_onPress)}
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
