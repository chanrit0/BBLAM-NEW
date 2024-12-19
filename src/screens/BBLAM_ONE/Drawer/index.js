// React
import React from 'react';
import {View, Image, Linking} from 'react-native';

// customs
import {ViewScale, FontScale} from 'utils';
import {COLORS} from 'styles';
import styles from './Style';

// global components
import {Avatar, LineHorizontal, TextMedium} from 'components/atoms';
import {Container} from 'components/common';
import {AntDesign, SimpleLineIcons} from 'components/Icons';

// config
import {WatchlistAndPortfolio, ModalbblamoneLink} from 'config';

// local components
import Button from './components/Button';

// recoil
import {useRecoilValue} from 'recoil';
import {userDeviceStatusState, userInfoState, statusPin} from 'recoil-state';
import {AlertNotAvaliable} from 'components/molecules';
import {Translate} from 'function';

// lib
import {hasUserSetPinCode} from '@haskkor/react-native-pincode';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default ({navigation}) => {
  // global state
  const {top} = useSafeAreaInsets();
  const userDeviceStatus = useRecoilValue(userDeviceStatusState);
  const userInfo = useRecoilValue(userInfoState);
  const StatusPin = useRecoilValue(statusPin);
  const StatusSetting = true;

  const routeAccountSettings = async () => {
    // if (userDeviceStatus.activePasscode) {
    //   navigation.navigate('AccountSettings');
    // } else {
    navigation.navigate('Drawer', {
      screen: 'Passcode',
      params: {
        method: 'use',
        goToPath: 'AccountSettings',
        hasPin: StatusPin,
        StatusSetting: StatusSetting,
      },
    });
    // }
  };

  const showAlertNotAvaliable = () => {
    navigation.navigate('Alert1', {
      children: <AlertNotAvaliable />,
      title: Translate('textConfirm2'),
    });
  };
  const showNAV = () => {
    Linking.openURL(WatchlistAndPortfolio[4]);
  };

  const showBFFUND = () => {
    // if (Platform.OS == 'ios') {
    Linking.openURL(ModalbblamoneLink[3]);
    // } else {
    //   Linking.openURL(WatchlistAndPortfolio[2]);
    // }
  };

  const goToPVD = async () => {
    const hasPin = await hasUserSetPinCode();
    if (userDeviceStatus.isSignIn) {
      if (userDeviceStatus.isConnectPVD) {
        if (userDeviceStatus.activePasscode) {
          navigation.navigate('PVDStack', {
            screen: 'Portal',
          });
        } else {
          navigation.navigate('PVDStack', {
            screen: 'Passcode',
            params: {
              method: 'use',
              goToPath: 'Portal',
              hasPin: hasPin,
            },
          });
        }
      } else {
        navigation.navigate('PVDStack', {
          screen: 'PVDConnect',
        });
      }
    } else {
      navigation.navigate('Alert1', {
        title: `${Translate('textLogIn')} / ${Translate('textRegister')}`,
        onPress: () => {
          navigation.navigate('PVDStack');
        },
        children: <AlertNotLogin />,
        TouchableBackdrop: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={{height: top, backgroundColor: COLORS.PRIMARY}} />
      <Container style={[styles.nameContainer, {marginBottom: ViewScale(20)}]}>
        <Avatar color={COLORS.PRIMARY} />
        <TextMedium style={styles.name}>
          {/* {`${userInfo.name} ${userInfo.surname}`} */}
          {`${userInfo.fullname ?? ''}`}
        </TextMedium>
      </Container>
      <LineHorizontal />
      <Container style={[styles.nameContainer]}>
        <Button
          icon={
            <SimpleLineIcons
              name={'user'}
              size={FontScale(24)}
              color={COLORS.PRIMARY}
            />
          }
          style={styles.drawerButton}
          title={'   Profile'}
          onPress={showAlertNotAvaliable}
        />
        <Button
          icon={
            <Image
              resizeMode={'contain'}
              style={{
                width: FontScale(24),
                height: FontScale(24),
              }}
              source={require('assets/icons/NAV_active.png')}
            />
            // <AntDesign
            //   name={'staro'}
            //   color={COLORS.PRIMARY}
            //   size={FontScale(24)}
            // />
          }
          style={styles.drawerButton}
          title={'   ' + Translate('textTabBarBBLAMONE')[1]}
          onPress={() => {
            showNAV();
          }}
        />
        <Button
          icon={
            <Image
              resizeMode={'contain'}
              style={{
                width: FontScale(40),
                height: FontScale(20),
              }}
              source={require('assets/icons/bf_fund.png')}
            />
          }
          style={styles.drawerButton}
          title={Translate('textTabBarBBLAMONE')[2]}
          onPress={() => {
            showBFFUND();
          }}
        />

        <Button
          icon={
            <Image
              resizeMode={'contain'}
              style={{
                transform: [{translateY: 3}],
                width: FontScale(40),
                height: FontScale(30),
              }}
              source={require('assets/icons/PVD_Connext.png')}
            />
          }
          style={styles.drawerButton}
          title={Translate('textTabBarBBLAMONE')[3]}
          onPress={goToPVD}
        />
      </Container>
      <LineHorizontal />
      <Container style={[styles.nameContainer]}>
        <Button
          icon={
            <AntDesign
              name={'setting'}
              size={FontScale(24)}
              color={COLORS.PRIMARY}
            />
          }
          style={styles.drawerButton}
          title={'   Account Settings'}
          onPress={routeAccountSettings}
        />
      </Container>
    </View>
  );
};
