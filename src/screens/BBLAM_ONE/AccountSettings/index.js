// React
import React from 'react';
import {TouchableOpacity, Image, View, StatusBar} from 'react-native';

// custom
import Header from 'components/header/MainHeader';
import styles from './Style';
import {Translate} from 'function';
import {setSpinner, ViewScale} from 'utils';
import {COLORS, FONT_SIZE} from 'styles';

// components
import {Container} from 'components/common';
import {LineHorizontal, TextMedium} from 'components/atoms';
import {AntDesign} from 'components/Icons';
import {AlertLogoutComplete, AlertLogoutFailed} from 'components/molecules';
import List from './components/List';
import {Globe} from 'components/Icons/Customs';

// recoil
import {promiseSetRecoil} from 'recoil-outside';
import {useRecoilValue, useResetRecoilState, useRecoilState} from 'recoil';
import {
  userDeviceStatusState,
  userInfoState,
  languageState,
} from 'recoil-state';

// services
import {logout} from 'services/api';

// libs
import {SafeAreaView} from 'react-native-safe-area-context';
import _ from 'lodash';

// constant
import {DRAWER_WIDTH_HEIGHT_ICONS} from 'styles';

// hooks
import useSetLanguage from 'hooks/useSetLanguage';

const thaiImage = require('assets/images/thaiFlag.png');
const engImage = require('assets/images/engFlag.png');

export default ({navigation}) => {
  // const ResetData = useResetRecoilState(userDeviceStatusState);
  const ResetUserInfo = useResetRecoilState(userInfoState);
  const userInfoData = useRecoilValue(userInfoState);
  // const userDeviceStatus = useRecoilValue(userDeviceStatusState);

  const [appLanguage, setAppLang] = useRecoilState(languageState);

  const _logOutFunc = async () => {
    console.log('Logout ...');

    setSpinner(true);

    await logout()
      .then(() => {
        console.log('BBLAM: Token has been revoked');
        // ResetData();
        promiseSetRecoil(userDeviceStatusState, {
          isSignIn: false, // เช็คเข้าสู่ระบบ BBLAM_ONE ยัง
          isConnectPVD: false, // เชื่อมต่อข้อมูลกับ PVD แล้วหรือยัง
          activePasscode: false, // -> จับเวลาการ activePasscode
        });

        navigation.navigate('Alert1', {
          children: <AlertLogoutComplete />,
          title: Translate('textConfirm2'),
          onPress: () => {
            navigation.goBack();
            ResetUserInfo();
          },
        });
      })
      .catch(error => {
        navigation.navigate('Alert1', {
          children: <AlertLogoutFailed />,
          title: Translate('textConfirm2'),
        });
      })
      .finally(() => setSpinner(false));
  };

  const navigatePasscode = () => {
    navigation.navigate('AlertPincodeFail', {
      TouchableBackdrop: true,
      checkPincode: true,
      onPress: () => {
        navigation.navigate('Passcode', {
          type: 1,
          method: 'set',
          CheckPincode: true,
        });
      },
    });
  };

  const navigateDeleteAcc = () => {
    navigation.navigate('DeleteAccount');
  };

  const navigateChangePassword = () => {
    navigation.navigate('ChangePassword');
  };

  const _ChangeLanguage = () => {
    const Clang = appLanguage === 'TH' ? 'EN' : 'TH';
    useSetLanguage(Clang);
    setAppLang(Clang);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} animated />
      <Header navigation={navigation} />
      <Container style={styles.titleContainer}>
        <TextMedium style={styles.title}>{'Account Settings'}</TextMedium>
      </Container>
      <LineHorizontal />
      <List
        title={Translate('textEmail')}
        content={!_.isEmpty(userInfoData?.email) ? userInfoData.email : '-'}
        // onPress={!_.isEmpty(userInfoData?.email) ? navigateEmail : null}
        styleContentRight={
          !_.isEmpty(userInfoData?.email) && styles.passwordUnderline
        }
      />
      <List
        title={Translate('textPhone')}
        content={!_.isEmpty(userInfoData?.phone) ? userInfoData?.phone : '-'}
      />
      <List
        title={Translate('textPassword')}
        content={Translate('textChangePassword')}
        styleContentRight={styles.passwordUnderline}
        onPress={navigateChangePassword}
      />
      <List
        title={Translate('textChangePasscode')}
        content={Translate('textChangePassword')}
        onPress={navigatePasscode}
        styleContentRight={styles.passwordUnderline}
      />
      {/* <List
        title={Translate('textChangeLanguage')}
        icon={
          <Globe
            width={DRAWER_WIDTH_HEIGHT_ICONS}
            height={DRAWER_WIDTH_HEIGHT_ICONS}
          />
        }
        RightChild={
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={appLanguage === 'TH' ? thaiImage : engImage}
              resizeMode={'contain'}
              style={{
                width: ViewScale(25),
                height: ViewScale(25),
              }}
            />
            <TextMedium style={{marginLeft: ViewScale(10)}}>
              {appLanguage === 'TH' ? 'ไทย' : 'English'}
            </TextMedium>
          </View>
        }
        onPress={_ChangeLanguage}
      /> */}
      <View style={styles.paddingDelete25}>
        <TouchableOpacity onPress={() => navigateDeleteAcc()}>
          <TextMedium style={styles.logout}>
            {Translate('text_DeleteAccount')}
          </TextMedium>
        </TouchableOpacity>
      </View>
      <View style={styles.containerLogout}>
        <TouchableOpacity onPress={_logOutFunc} style={styles.buttonLogout}>
          <View style={styles.viewList}>
            <AntDesign
              name={'poweroff'}
              color={COLORS.ERROR}
              size={FONT_SIZE.TITLE_1}
              style={styles.icon}
            />
            <TextMedium style={styles.logout}>
              {Translate('textLogout')}
            </TextMedium>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
