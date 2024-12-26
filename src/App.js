/* eslint-disable no-sparse-arrays */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  LogBox,
  DevSettings,
  Text,
  TextInput,
} from 'react-native';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {RecoilRoot} from 'recoil';
import RecoilOutside, {
  promiseGetRecoil,
  promiseSetRecoil,
} from 'recoil-outside';
import 'react-native-gesture-handler';

import Route from './routes';
import useSetLanguage from 'hooks/useSetLanguage';
import {ClearData, ClearSecureData, Initlanguage} from 'utils';
import {NativeBaseProvider} from 'native-base';
import InteractionProvider from 'react-native-interaction-provider';

import Loading from './Loading';
import {navigationRef} from 'routes/RootNavigation';
import {TextMedium} from 'components/atoms';
import {Translate} from 'function';
import {userDeviceStatusState, userInfoState} from 'recoil-state';
import _ from 'lodash';
// import OTPublishersNativeSDK from 'react-native-onetrust-cmp';

Text.defaultProps = {};
Text.defaultProps.maxFontSizeMultiplier = 1;
TextInput.defaultProps = {
  ...(TextInput.defaultProps || {}),
  allowFontScaling: false,
};

const App = () => {
  if (__DEV__) {
    LogBox.ignoreLogs([
      'Setting a timer for a long period of time',
      'Non-serializable values were found in the navigation state',
      'Did not retain recoil value on render',
      'Require cycle: node_modules/victory-core/node_modules/d3-interpolate/src/value.js',
      'Require cycle: node_modules/victory-native/node_modules/victory-axis/node_modules/d3-interpolate/src/value.js',
      'Duplicate atom key',
      'componentWillMount has been renamed',
      'Warning: Slice: Support for defaultProps will be removed',
      'Got a component with the name "index"', // มาแก้ทีหลัง
    ]);

    DevSettings.addMenuItem('Clear AsyncStorage', () => {
      ClearData();
      ClearSecureData();
      DevSettings.reload();
    });
  }

  const setLanguage = async () => {
    const lang = await Initlanguage();
    useSetLanguage(lang);
  };

  React.useEffect(() => {
    setLanguage();
    // if (Platform.OS == 'ios') {
    //   OTPublishersNativeSDK.startSDK(
    //     'cdn.cookielaw.org',
    //     'f2d97b13-e713-40a4-bbbb-1ed560dc8af2',
    //     'th',
    //     {},
    //     true,
    //   )
    //     .then(responseObject => {
    //       console.info('Download status is ' + responseObject.status);
    //     })
    //     .catch(error => {
    //       console.error(`OneTrust download failed with error ${error}`);
    //     });
    // } else {
    //   OTPublishersNativeSDK.startSDK(
    //     'cdn.cookielaw.org',
    //     'c6eaeac4-9acf-4ffa-a607-d9e143173e08',
    //     'th',
    //     {},
    //     true,
    //   )
    //     .then(responseObject => {
    //       console.info('Download status is ' + responseObject.status);
    //     })
    //     .catch(error => {
    //       console.error(`OneTrust download failed with error ${error}`);
    //     });
    // }
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <InteractionProvider
          timeout={10 * 60000} // idle after 15m
          onActive={() => console.log('User no longer idle')}
          onInactive={async () => {
            const userDevice = await promiseGetRecoil(userDeviceStatusState);

            const userInfo = await promiseGetRecoil(userInfoState);
            console.log({role: userInfo.role});
            if (userInfo.role != '') {
              promiseSetRecoil(userDeviceStatusState, {
                ...userDevice,
                activePasscode: false,
              });
              promiseSetRecoil(userInfoState, {
                ...userInfo,
                role: '',
              });
              navigationRef.current.navigate('Alert1', {
                children: (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TextMedium style={{textAlign: 'center'}}>
                      {
                        'ท่านไม่ได้ทำรายการในเวลาที่กำหนด\nกรุณาเข้าสู่ระบบใหม่อีกครั้ง'
                      }
                    </TextMedium>
                  </View>
                ),
                title: Translate('textConfirm2'),
                onPress: () => {
                  navigationRef.current.reset({
                    index: 0,
                    routes: [{name: 'BBLAMONERoute'}],
                  });
                },
              });
            }
          }}>
          <View style={styles.body}>
            <RecoilRoot>
              <RecoilOutside />
              <Loading>
                <NativeBaseProvider>
                  <Route />
                </NativeBaseProvider>
              </Loading>
            </RecoilRoot>
          </View>
        </InteractionProvider>
      </SafeAreaProvider>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
});

export default App;
