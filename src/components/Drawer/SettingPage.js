// React
import React from 'react';
import {View, Image} from 'react-native';

// custom

// components
import List from './List';
import {useResetRecoilState, useRecoilState} from 'recoil';
import {userDeviceStatusState, languageState, spinnerState} from 'recoil-state';
import {Lock, Globe} from 'components/Icons/Customs';
import {TextMedium} from 'components/atoms';
import {Translate} from 'function';
import {ViewScale} from 'utils';

// hooks
import useSetLanguage from 'hooks/useSetLanguage';

// constant
import {DRAWER_WIDTH_HEIGHT_ICONS} from 'styles';
import {useNavigation} from '@react-navigation/core';
import bblam from 'services/api';

const thaiImage = require('assets/images/thaiFlag.png');
const engImage = require('assets/images/engFlag.png');

export default function SettingPage() {
  const ResetData = useResetRecoilState(userDeviceStatusState);
  const [appLanguage, setAppLang] = useRecoilState(languageState);
  const [spinner, setSpinner] = useRecoilState(spinnerState);

  const navigation = useNavigation();

  const _ChangePassword = () => {
    navigation.navigate('ChangePassword');
  };

  const _ChangePasscode = () => {
    navigation.navigate('Passcode', {method: 'change'});
  };

  const _ChangeLanguage = () => {
    const Clang = appLanguage === 'TH' ? 'EN' : 'TH';
    useSetLanguage(Clang);
    setAppLang(Clang);
  };

  const _logOutFunc = async () => {
    console.log('Logout ...');
    try {
      await bblam
        .get('/logout')
        .then(response => {
          if (response.status === 200) {
            console.log('BBLAM: Token has been revoked');
            ResetData();
          }
        })
        .catch(error => {
          console.log(error?.response?.data?.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <List
        title={Translate('textChangePassword')}
        icon={
          <Lock
            width={DRAWER_WIDTH_HEIGHT_ICONS}
            height={DRAWER_WIDTH_HEIGHT_ICONS}
          />
        }
        onPress={_ChangePassword}
      />
      <List
        title={Translate('textChangePasscode')}
        icon={
          <Lock
            width={DRAWER_WIDTH_HEIGHT_ICONS}
            height={DRAWER_WIDTH_HEIGHT_ICONS}
          />
        }
        onPress={_ChangePasscode}
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
    </View>
  );
}
