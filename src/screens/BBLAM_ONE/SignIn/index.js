// // React
// import React from 'react';
// import {
//   View,
//   TouchableOpacity,
//   ScrollView,
//   StatusBar,
//   KeyboardAvoidingView,
//   Keyboard,
//   Platform,
//   Image,
// } from 'react-native';

// // custom
// import styles from './Style';
// import {Translate} from 'function';
// import {COLORS, FONT_SIZE} from 'styles';

// // components
// import {Container} from 'components/common';
// import {
//   Button,
//   Switch,
//   InputElement,
//   TextBold,
//   TextRegular,
//   TextMedium,
// } from 'components/atoms';
// import {AntDesign} from 'components/Icons';

// // recoil
// import {useRecoilState} from 'recoil';
// import {languageState, userDeviceStatusState} from 'recoil-state';

// // lib
// import {useForm} from 'react-hook-form';
// import {hasUserSetPinCode} from '@haskkor/react-native-pincode';

// // hooks
// import useSetLanguage from 'hooks/useSetLanguage';
// import {getUniqueId, isIOS, showSmallAlert, StoreSecureData} from 'utils';
// import {login} from 'services/api/Autorization';
// import {getUserInfo} from 'services/api/Autorization';
// import {SafeAreaView} from 'react-native-safe-area-context';

// export default function SignIn({navigation}) {
//   const {control, handleSubmit} = useForm();

//   // global state
//   const [appLanguage, setAppLang] = useRecoilState(languageState);
//   const [userDeviceStatus, setUserDeviceStatus] = useRecoilState(
//     userDeviceStatusState,
//   );

//   const [isScroll, setIsScroll] = React.useState(false);
//   const scrollview = React.useRef(null);
//   const [switchLang, setSwitchLang] = React.useState(
//     appLanguage === 'TH' ? true : false,
//   );

//   const ToggleSwitch = React.useCallback(() => {
//     const lang = switchLang ? 'EN' : 'TH';
//     useSetLanguage(lang);
//     setAppLang(lang);
//     setSwitchLang(!switchLang);
//   });

//   const _Register = () => {
//     navigation.navigate('DisclosureOfPersonalInformation');
//   };

//   React.useEffect(() => {
//     const keyboardWillShow = Keyboard.addListener('keyboardDidShow', () => {
//       // scrollview.current.scrollToEnd();
//       setIsScroll(true);
//     });

//     const keyboardWillHide = Keyboard.addListener('keyboardDidHide', () => {
//       setIsScroll(false);
//     });

//     return () => {
//       keyboardWillShow.remove();
//       keyboardWillHide.remove();
//     };
//   });

//   const _Submit = async data => {
//     Keyboard.dismiss();

//     const sendingData = {
//       username: data.username,
//       password: data.password,
//       device: getUniqueId,
//       lang: appLanguage.toLowerCase(),
//       type: Platform.OS === 'ios' ? 2 : 3,
//     };

//     await login(sendingData)
//       .then(async response => {
//         const access_token = response?.access_token;
//         const refresh_token = response?.refresh_token;
//         const status_pvd = response?.status_pvd;
//         const isSetPasscode = response?.device;
//         const {activePasscode} = userDeviceStatus;

//         const checkRoles = roles => {
//           for (const [key, value] of Object.entries(roles)) {
//             if (value === true) {
//               return true;
//             }
//           }
//           return false;
//         };

//         const isConnectPVD = checkRoles(status_pvd);

//         const _setSignIn = async () => {
//           // store token
//           await StoreSecureData({
//             key: 'token',
//             value: JSON.stringify({access_token, refresh_token}),
//           });
//           // recoil
//           setUserDeviceStatus(value => ({
//             ...value,
//             isSignIn: true,
//             isConnectPVD: isConnectPVD,
//           }));
//           await getUserInfo();
//         };
//         const hasPin = await hasUserSetPinCode();
//         if (isConnectPVD) {
//           if (activePasscode) {
//             navigation.replace('Portal');
//           } else {
//             navigation.replace('Passcode', {
//               method: 'use',
//               goToPath: 'Portal',
//               hasPin: hasPin,
//               type: 1,
//               _setSignIn: () => {
//                 _setSignIn();
//               },
//             });
//           }
//           // if (isSetPasscode) {
//           //   console.log('isSetPasscode____1');
//           //   if (activePasscode) {
//           //     console.log('activePasscode____1');
//           //     navigation.replace('Portal');
//           //   } else {
//           //     console.log('activePasscode____2');
//           //     _setSignIn();
//           //     navigation.replace('Passcode', {
//           //       method: 'use',
//           //       goToPath: 'Portal',
//           //       hasPin: hasPin,
//           //       type: hasPin ? 4 : 2,
//           //     });
//           //   }
//           // } else {
//           //   console.log('isSetPasscode____2');
//           //   navigation.replace('Passcode', {
//           //     method: 'set',
//           //     _setSignIn,
//           //     goToPath: 'Portal',
//           //     hasPin: hasPin,
//           //     type: 1,
//           //   });
//           // }
//         } else {
//           console.log('Login Not Fond!');
//           //   if (isSetPasscode) {
//           //     _setSignIn();
//           //     navigation.replace('Passcode', {
//           //       method: 'use',
//           //       goToPath: 'PVDConnect',
//           //       hasPin: hasPin,
//           //       type: hasPin ? 4 : 2,
//           //     });
//           //     //   if (activePasscode) {
//           navigation.replace('PVDConnect');
//           //     //   } else {
//           //     //     _setSignIn();
//           //     //     navigation.replace('Passcode', {
//           //     //       method: 'use',
//           //     //       goToPath: 'PVDConnect',
//           //     //       hasPin: hasPin,
//           //     //       type: hasPin ? 4 : 2,
//           //     //     });
//           //     //   }
//           //     // } else {
//           //     //   navigation.replace('Passcode', {
//           //     //     method: 'set',
//           //     //     _setSignIn,
//           //     //     goToPath: 'PVDConnect',
//           //     //     hasPin: hasPin,
//           //     //     type: 1,
//           //     //   });
//           //   }
//         }
//       })
//       .catch(error => {
//         console.log(error);
//         showSmallAlert(error.message);
//       });
//   };

//   const _Error = error => {
//     console.log(error);
//   };

//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <StatusBar barStyle={'dark-content'} backgroundColor={'#FFF'} animated />
//       <TouchableOpacity
//         style={{alignItems: 'flex-end', paddingTop: 10}}
//         onPress={() => {
//           navigation.navigate('Alert5', {
//             TouchableBackdrop: true,
//           });
//         }}>
//         <TextMedium size={FONT_SIZE.BODY_2} color={COLORS.BLACK}>
//           <Image
//             resizeMode={'contain'}
//             style={{
//               width: 14,
//               height: 14,
//             }}
//             source={require('assets/icons/Icon_Manual.png')}
//           />
//           {' คู่มือการเข้าใช้งานระบบ   '}
//         </TextMedium>
//       </TouchableOpacity>
//       {/* <Notification visible={visibleNoti}>{errors}</Notification> */}
//       <KeyboardAvoidingView style={{flex: 1}} behavior={isIOS ? 'padding' : ''}>
//         <ScrollView
//           scrollEnabled={isScroll}
//           ref={scrollview}
//           showsVerticalScrollIndicator={false}
//           style={{flex: 1}}
//           contentContainerStyle={{flexGrow: 1}}
//           keyboardShouldPersistTaps="handled">
//           {/* Switch Languages */}
//           <View style={styles.switchContainer} pointerEvents={'none'}>
//             <Switch value={switchLang} onChange={ToggleSwitch} />
//           </View>

//           <Container>
//             {/* header */}
//             <View style={styles.header}>
//               <TextBold style={styles.textHeader}>
//                 {Translate('textLogIn')}
//                 {' BBLAM'}
//               </TextBold>
//               <TextRegular style={styles.textDesc}>
//                 {Translate('textLoginDesc')}
//               </TextRegular>
//             </View>
//             {/* input */}
//             <View style={styles.input}>
//               <InputElement
//                 ControllerProps={{
//                   control,
//                   name: 'username',
//                   rules: {
//                     required: Translate('textInputRequired'),
//                   },
//                 }}
//                 InputProps={{
//                   label: Translate('textEmailBBLAMONE'),
//                   placeholder: Translate('textEmailBBLAMONE'),
//                   autoCorrect: false,
//                 }}
//               />
//               <InputElement
//                 ControllerProps={{
//                   control,
//                   name: 'password',
//                   rules: {required: Translate('textInputRequired')},
//                 }}
//                 InputProps={{
//                   label: Translate('textPassword'),
//                   placeholder: Translate('textPassword'),
//                 }}
//                 isPassword
//               />

//               <View style={styles.loginAndPassBtnContainer}>
//                 <TouchableOpacity
//                   style={styles.forgotPassContainer}
//                   onPress={() => {
//                     navigation.navigate('ForgotPassword');
//                   }}>
//                   <TextBold style={styles.textForgotPassword}>
//                     {Translate('textForgotPassword')}
//                   </TextBold>
//                 </TouchableOpacity>

//                 <View style={styles.loginBtnContainer}>
//                   <Button
//                     type="fill"
//                     title={Translate('textLogIn')}
//                     onPress={handleSubmit(_Submit, _Error)}
//                     // onPress={_Submit}
//                     style={styles.loginBtn}
//                   />
//                 </View>
//               </View>
//             </View>
//           </Container>

//           {/* bottom */}
//           <View style={styles.bottom}>
//             <Container style={{flex: 0}}>
//               <View style={styles.flexrow}>
//                 <TextMedium style={styles.textbottom}>
//                   {Translate('textLoginBottomDesc')}
//                 </TextMedium>
//                 <TouchableOpacity onPress={_Register}>
//                   <TextMedium style={styles.textbottomunderline}>
//                     {Translate('textRegister')}
//                   </TextMedium>
//                 </TouchableOpacity>
//               </View>
//               <TouchableOpacity
//                 style={styles.skipButton}
//                 onPress={() => {
//                   // navigation.navigate('CheckPage',{path: 'email'})
//                   navigation.pop();
//                 }}>
//                 <TextMedium style={styles.skipText}>
//                   {'Skip '}
//                   <AntDesign name="arrowright" />
//                 </TextMedium>
//               </TouchableOpacity>
//             </Container>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// React
import React from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';

// custom
import styles from './Style';
import {Translate} from 'function';
import {RetrieveSecureData} from 'utils';

// components
import {Container} from 'components/common';
import {
  Button,
  Switch,
  InputElement,
  TextBold,
  TextRegular,
  TextMedium,
} from 'components/atoms';
import {AntDesign} from 'components/Icons';

// recoil
import {useRecoilState} from 'recoil';
import {languageState, userDeviceStatusState} from 'recoil-state';

// lib
import {useForm} from 'react-hook-form';

// hooks
import useSetLanguage from 'hooks/useSetLanguage';
import {getUniqueId, isIOS, showSmallAlert, StoreSecureData} from 'utils';
import {login} from 'services/api/Autorization';
import {getUserInfo} from 'services/api/Autorization';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function SignIn({navigation}) {
  const {control, handleSubmit} = useForm();

  // global state
  const [appLanguage, setAppLang] = useRecoilState(languageState);
  const [userDeviceStatus, setUserDeviceStatus] = useRecoilState(
    userDeviceStatusState,
  );

  const [isScroll, setIsScroll] = React.useState(false);
  const scrollview = React.useRef(null);
  const [switchLang, setSwitchLang] = React.useState(
    appLanguage === 'TH' ? true : false,
  );

  const ToggleSwitch = React.useCallback(() => {
    const lang = switchLang ? 'EN' : 'TH';
    useSetLanguage(lang);
    setAppLang(lang);
    setSwitchLang(!switchLang);
  });

  const _Register = () => {
    navigation.navigate('DisclosureOfPersonalInformation');
  };

  React.useEffect(() => {
    const keyboardWillShow = Keyboard.addListener('keyboardDidShow', () => {
      // scrollview.current.scrollToEnd();
      setIsScroll(true);
    });

    const keyboardWillHide = Keyboard.addListener('keyboardDidHide', () => {
      setIsScroll(false);
    });

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  });

  const _Submit = async data => {
    Keyboard.dismiss();

    const sendingData = {
      username: data.username,
      password: data.password,
      device: getUniqueId,
      lang: appLanguage.toLowerCase(),
    };

    await login(sendingData)
      .then(async response => {
        const access_token = response?.access_token;
        const refresh_token = response?.refresh_token;
        const status_pvd = response?.status_pvd;
        const isSetPasscode = response?.device;
        const {activePasscode} = userDeviceStatus;

        const checkRoles = roles => {
          for (const [key, value] of Object.entries(roles)) {
            if (value === true) {
              return true;
            }
          }
          return false;
        };

        const isConnectPVD = checkRoles(status_pvd);

        const _setSignIn = async () => {
          // store token
          await StoreSecureData({
            key: 'token',
            value: JSON.stringify({access_token, refresh_token}),
          });
          // recoil
          await setUserDeviceStatus(value => ({
            ...value,
            isSignIn: true,
            isConnectPVD: isConnectPVD,
          }));
          await getUserInfo();
        };
        const pass_code = await RetrieveSecureData('passcode');

        if (isConnectPVD) {
          if (isSetPasscode && pass_code != null) {
            if (activePasscode) {
              navigation.replace('Portal');
            } else {
              _setSignIn();
              navigation.replace('Passcode', {
                method: 'use',
                goToPath: 'Portal',
              });
            }
          } else {
            navigation.replace('Passcode', {
              method: 'set',
              _setSignIn,
              goToPath: 'Portal',
            });
          }
        } else {
          if (isSetPasscode && pass_code != null) {
            if (activePasscode) {
              navigation.replace('PVDConnect');
            } else {
              _setSignIn();
              navigation.replace('Passcode', {
                method: 'use',
                goToPath: 'PVDConnect',
              });
            }
          } else {
            navigation.replace('Passcode', {
              method: 'set',
              _setSignIn,
              goToPath: 'PVDConnect',
            });
          }
        }
      })
      .catch(error => {
        console.log(error);
        showSmallAlert(error.message);
      });
  };

  const _Error = error => {
    console.log(error);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#FFF'} animated />
      {/* <Notification visible={visibleNoti}>{errors}</Notification> */}
      <KeyboardAvoidingView style={{flex: 1}} behavior={isIOS ? 'padding' : ''}>
        <ScrollView
          scrollEnabled={isScroll}
          ref={scrollview}
          showsVerticalScrollIndicator={false}
          style={{flex: 1}}
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled">
          {/* Switch Languages */}
          <View style={styles.switchContainer} pointerEvents={'none'}>
            <Switch value={switchLang} onChange={ToggleSwitch} />
          </View>

          <Container>
            {/* header */}
            <View style={styles.header}>
              <TextBold style={styles.textHeader}>
                {Translate('textLogIn')}
                {' BBLAM ONE'}
              </TextBold>
              <TextRegular style={styles.textDesc}>
                {Translate('textLoginDesc')}
              </TextRegular>
            </View>
            {/* input */}
            <View style={styles.input}>
              <InputElement
                ControllerProps={{
                  control,
                  name: 'username',
                  rules: {
                    required: Translate('textInputRequired'),
                  },
                }}
                InputProps={{
                  label: Translate('textEmailBBLAMONE'),
                  placeholder: Translate('textEmailBBLAMONE'),
                  autoCorrect: false,
                }}
              />
              <InputElement
                ControllerProps={{
                  control,
                  name: 'password',
                  rules: {required: Translate('textInputRequired')},
                }}
                InputProps={{
                  label: Translate('textPassword'),
                  placeholder: Translate('textPassword'),
                }}
                isPassword
              />

              <View style={styles.loginAndPassBtnContainer}>
                <TouchableOpacity
                  style={styles.forgotPassContainer}
                  onPress={() => {
                    navigation.navigate('ForgotPassword');
                  }}>
                  <TextBold style={styles.textForgotPassword}>
                    {Translate('textForgotPassword')}
                  </TextBold>
                </TouchableOpacity>

                <View style={styles.loginBtnContainer}>
                  <Button
                    type="fill"
                    title={Translate('textLogIn')}
                    onPress={handleSubmit(_Submit, _Error)}
                    // onPress={_Submit}
                    style={styles.loginBtn}
                  />
                </View>
              </View>
            </View>
          </Container>

          {/* bottom */}
          <View style={styles.bottom}>
            <Container style={{flex: 0}}>
              <View style={styles.flexrow}>
                <TextMedium style={styles.textbottom}>
                  {Translate('textLoginBottomDesc')}
                </TextMedium>
                <TouchableOpacity onPress={_Register}>
                  <TextMedium style={styles.textbottomunderline}>
                    {Translate('textRegister')}
                  </TextMedium>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.skipButton}
                onPress={() => {
                  navigation.pop();
                }}>
                <TextMedium style={styles.skipText}>
                  {'Skip '}
                  <AntDesign name="arrowright" />
                </TextMedium>
              </TouchableOpacity>
            </Container>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
