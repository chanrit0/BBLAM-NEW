import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Linking, Platform} from 'react-native';
import {Translate} from 'function';
import {AlertNotLogin} from 'components/molecules';

// Stack
import HomeStack from './Home';
import PVDStack from './PVD';

// Screen
import AlertScreen from 'screens/Global/Alert';

// config
import TabBarNavigator from '../config/TabBarNavigator';
import {WatchlistAndPortfolio, ModalbblamoneLink} from 'config';

// Recoil
import {useRecoilValue} from 'recoil';
import {userDeviceStatusState, statusPin} from 'recoil-state';

// lib
import ModalMore from 'components/molecules/AlertsTypes/ModalMore';

export default () => {
  const TabBar = createBottomTabNavigator();
  const status = useRecoilValue(userDeviceStatusState);
  const StatusPin = useRecoilValue(statusPin);

  function listenersPVD({navigation}) {
    return {
      tabPress: e => {
        e.preventDefault();

        if (status.isSignIn) {
          if (status.isConnectPVD) {
            if (status.activePasscode) {
              navigation.navigate('PVDStack', {
                screen: 'Portal',
              });
            } else {
              navigation.navigate('PVDStack', {
                screen: 'Passcode',
                params: {method: 'use', goToPath: 'Portal', hasPin: StatusPin},
              });
            }
          } else {
            if (status.activePasscode) {
              navigation.navigate('PVDStack', {
                screen: 'PVDConnect',
              });
            } else {
              navigation.navigate('PVDStack', {
                screen: 'Passcode',
                params: {
                  method: 'use',
                  goToPath: 'PVDConnect',
                  hasPin: StatusPin,
                },
              });
            }
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
      },
    };
  }

  const showNAV = () => {
    return {
      tabPress: e => {
        e.preventDefault();
        Linking.openURL(WatchlistAndPortfolio[4]);
      },
    };
  };

  const showBFFUND = () => {
    return {
      tabPress: e => {
        e.preventDefault();
        // if (Platform.OS == 'ios') {
        Linking.openURL(ModalbblamoneLink[3]);
        // } else {
        //   Linking.openURL(WatchlistAndPortfolio[2]);
        // }
      },
    };
  };

  function showModalMore({navigation}) {
    return {
      tabPress: e => {
        e.preventDefault();

        navigation.navigate('ModalMore');
      },
    };
  }

  return (
    <TabBar.Navigator {...TabBarNavigator}>
      <TabBar.Screen name="Home" component={HomeStack} />
      <TabBar.Screen name="NAV" component={PVDStack} listeners={showNAV} />
      <TabBar.Screen
        name="BFFUND"
        component={PVDStack}
        listeners={showBFFUND}
      />
      <TabBar.Screen
        name="PVDPortal"
        component={AlertScreen}
        listeners={listenersPVD}
      />
      <TabBar.Screen
        name="More"
        component={ModalMore}
        listeners={showModalMore}
      />
    </TabBar.Navigator>
  );
};
