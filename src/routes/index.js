import * as React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

import ControlPath from './ControlPath';
import {navigationRef} from './RootNavigation';
import {ver_number, ver_up_dateversion} from '../config';

// components
import {
  Alert1,
  Alert2,
  Alert3,
  Alert4,
  AlertOTP,
  AlertPincodeFail,
  Spinner,
  ModalMore,
  Alert5,
} from 'components/molecules';
import OverlayBBLAM from 'components/Modal/Overlay';
import {TextMedium} from 'components/atoms';
// recoil
import {useRecoilValue} from 'recoil';
import {spinnerState, smallAlertState} from 'recoil-state';
import {DevSettings, Linking, View, Platform, StyleSheet} from 'react-native';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFF',
  },
};

// dev test
import DevStack from '../Dev/DevStack';
import {createStackNavigator} from '@react-navigation/stack';
import {SmallAlert} from 'components/atoms';
import {RetrieveSecureData, FontScale, ViewScale} from 'utils';
import analytics from '@react-native-firebase/analytics';
import {Force_Update} from 'services/api/Autorization';
// import OTPublishersNativeSDK from 'react-native-onetrust-cmp';

const Route = () => {
  const smallAlert = useRecoilValue(smallAlertState);
  const spinner = useRecoilValue(spinnerState);
  const [devmode, setDevMode] = React.useState(false);
  const [statusUpdate, setstatusUpdate] = React.useState(false);
  const RootStack = createStackNavigator();

  // const registerConfig= {
  //   screens: {
  //     ControlPath: {
  //       screens: {
  //         BBLAMONERoute: {
  //           screens: {
  //             Drawer: {
  //               screens: {
  //                 Main: {
  //                   initialRouteName: 'TabBar',
  //                   screens: {
  //                     TabBar: {
  //                       screens: {
  //                         Home: {
  //                           screens: {
  //                             home: 'home',
  //                           },
  //                         },
  //                       },
  //                     },
  //                     PVDStack: {
  //                       screens: {
  //                         SignIn: 'login',
  //                         DisclosureOfPersonalInformation: 'register',
  //                       },
  //                     },
  //                   },
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // }

  const linking = {
    prefixes: ['bblamone://'],
    config: {
      screens: {
        ControlPath: 'home',
      },
    },
  };

  if (__DEV__) {
    DevSettings.addMenuItem('Development Mode', () => {
      setDevMode(!devmode);
    });
    DevSettings.addMenuItem('Show Token', async () => {
      await RetrieveSecureData('token').then(({access_token}) =>
        console.log({access_token}),
      );
    });
  }
  const forFade = ({current}) => {
    return {
      cardStyle: {
        opacity: current.progress,
      },
    };
  };

  const versionBBLAM = {
    ver_type: Platform.OS === 'android' ? 1 : 2,
    ver_number: ver_number,
    ver_up_dateversion: ver_up_dateversion,
  };

  const OpenLinkApp = () => {
    if (Platform.OS == 'ios') {
      Linking.openURL(
        'https://apps.apple.com/th/app/bualuang-fund/id1292234296',
      );
    } else {
      Linking.openURL(
        'https://play.google.com/store/apps/details?id=com.bblasset.bualuangfund&hl=th&gl=US',
      );
    }
  };

  const _ForceUpdate = async () => {
    console.log('Platform', Platform.Version);
    await Force_Update(versionBBLAM)
      .then(res => {
        if (res != '') {
          if (res[0].ver_number != versionBBLAM.ver_number) {
            setstatusUpdate(true);
          } else {
            console.log('ไม่ผ่าน!!!');
          }
        } else {
          setstatusUpdate(false);
          console.log('ผ่าน!!!');
        }
      })
      .catch(error => {
        console.log('UAT Not Ford', error);
      });
  };

  React.useEffect(() => {
    _ForceUpdate();
  }, []);

  const option = () => ({
    animationEnabled: true,
    cardOverlayEnabled: false,
    cardStyle: {backgroundColor: 'rgba(26, 54, 134, 0.6)'},
    cardStyleInterpolator: forFade,
  });

  return (
    <>
      <Spinner visible={spinner} />
      <SmallAlert visible={smallAlert.visible}>{smallAlert.value}</SmallAlert>
      <NavigationContainer
        ref={navigationRef}
        theme={MyTheme}
        linking={linking}
        onStateChange={async () => {
          const Screen = navigationRef.current.getCurrentRoute().name;
          let name2 = '';
          if (Screen === 'home') {
            name2 = 'Home';
          }
          if (Screen === 'Alert1') {
            name2 = 'Alert';
          }
          if (Screen === 'Alert2') {
            name2 = 'Alert Disclosure';
          }
          if (Screen === 'Alert3') {
            name2 = 'Alert';
          }
          if (Screen === 'Alert4') {
            name2 = 'Alert';
          }
          if (Screen === 'Alert5') {
            name2 = 'Alert';
          }

          if (name2 === '') {
            name2 = Screen;
          }
          console.log('BBLAM PVD Connext Screen >>>>', name2);
          // OTPublishersNativeSDK.getConsentStatusForCategory('C0004')
          //   .then(async result => {
          //     if (result == 1) {
          //       await analytics().logScreenView({
          //         screen_name: 'BBLAM PVD Connext ' + name2,
          //         screen_class: 'BBLAM PVD Connext ' + name2,
          //       });
          //       console.log(
          //         'Consent is given (An end user interacts with the SDK and gives consent.)',
          //       );
          //     } else if (result == 0) {
          //       console.log(
          //         'Consent is not given (An end user interacts and does not give consent.)',
          //       );
          //     } else {
          //       console.log(
          //         'Consent has not been collected (The SDK is not yet initialized for the end user.)' +
          //           result,
          //       );
          //     }
          //   })
          //   .catch(() => {
          //     console.log('Error Consent Status for category C0004!');
          //   });
          await analytics().logScreenView({
            screen_name: 'BBLAM PVD Connext ' + name2,
            screen_class: 'BBLAM PVD Connext ' + name2,
          });
        }}>
        {devmode ? (
          <DevStack />
        ) : (
          <RootStack.Navigator
            screenOptions={{headerShown: false}}
            headerMode="none"
            mode="modal">
            <RootStack.Screen name="ControlPath" component={ControlPath} />
            <RootStack.Screen
              name="Alert1"
              component={Alert1}
              options={option}
            />
            <RootStack.Screen
              name="Alert2"
              component={Alert2}
              options={option}
            />
            <RootStack.Screen
              name="Alert3"
              component={Alert3}
              options={option}
            />
            <RootStack.Screen
              name="Alert4"
              component={Alert4}
              options={option}
            />
            <RootStack.Screen
              name="Alert5"
              component={Alert5}
              options={option}
            />
            <RootStack.Screen
              name="AlertOTP"
              component={AlertOTP}
              options={option}
            />
            <RootStack.Screen
              name="AlertPincodeFail"
              component={AlertPincodeFail}
              options={option}
            />
            <RootStack.Screen
              name="ModalMore"
              component={ModalMore}
              options={option}
            />
          </RootStack.Navigator>
        )}
        {statusUpdate && (
          <OverlayBBLAM
            isVisible={statusUpdate}
            callbackConfirm={OpenLinkApp}
            title="อัปเดต">
            <View style={styles.viewOverlay}>
              <View style={styles.viewTextOverlay}>
                <TextMedium style={styles.textOverlay}>
                  {
                    'กรุณาอัปเดต BBLAM ของท่าน\nเพิ่มประสิทธิภาพการใช้งาน \nขอบคุณค่ะ'
                  }
                </TextMedium>
              </View>
            </View>
          </OverlayBBLAM>
        )}
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  viewOverlay: {display: 'flex', alignItems: 'center'},
  viewTextOverlay: {
    padding: ViewScale(10),
    display: 'flex',
    alignItems: 'center',
  },
  textOverlay: {
    textAlign: 'center',
    fontSize: FontScale(18),
  },
});

export default Route;
