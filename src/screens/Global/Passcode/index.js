// // React
// import React from 'react';
// import {Platform, StatusBar} from 'react-native';

// // custom
// import {showSmallAlert, ViewScale} from 'utils';
// import {COLORS, FONT_TYPE} from 'styles';
// import {Translate} from 'function';

// // components
// import Header from 'components/header/MainHeader';
// import {SafeAreaView} from 'components/atoms';

// // lib
// import PINCode, {hasUserSetPinCode} from '@haskkor/react-native-pincode';
// import ReactNativeBiometrics from 'react-native-biometrics';

// // recoil
// import {useRecoilState, useSetRecoilState, useResetRecoilState} from 'recoil';
// import {userDeviceStatusState, statusPin} from 'recoil-state';

// // services
// import {checkPasscode} from 'services/api';

// export default ({navigation, route}) => {
//   const MAX_PASSCODE = 6;
//   const DEVICE_TYP =
//     Platform.OS === 'ios'
//       ? 'iphone'
//       : Platform.OS === 'android'
//       ? 'android'
//       : 'huawei';

//   const method = route.params?.method; // ประเภทของการใช้ -> set: ตั้ง password ใหม่ , change : เปลี่ยนรหัสผ่าน , confirm_set : ยืนยันการตั้งรหัสผ่าน , confirm_change : ยืนยันการเปลี่ยนรหัสผ่าน , use : กรอกรหัสเพื่อใช้งาน
//   const goToPath = route.params?.goToPath; // path หลังจาก ยืนยันรหัสผ่านเสร็จสิ้น
//   const OldPasscode = route.params?.passcode; // password เก่าไว้สำหรับการ confirm password
//   const _setSignIn = route.params?._setSignIn; // save state signin เมื่อยืนยันรหัสผ่านเสร็จสิ้น

//   //global state
//   const ResetData = useResetRecoilState(userDeviceStatusState);
//   const setUserStatus = useSetRecoilState(userDeviceStatusState);

//   const hasPin = route.params?.hasPin; //ค่าสำหรับ pincode
//   const StatusSetting = route.params?.StatusSetting; //ค่าสำหรับเช็คว่ามาจากหน้า setting ไหม
//   const CheckPincode = route.params?.CheckPincode; // สถานะการเปลี่ยน pin code จากหน้า setting

//   // global state
//   const [StatusPin, setStatusPin] = useRecoilState(statusPin);

//   const [PINCodeStatus, setPINCodeStatus] = React.useState(
//     hasPin ? 'enter' : 'choose',
//   );

//   const finishProcess = async pinCode => {
//     console.log('33333', pinCode);

//     // if (hasPin) {
//     //   console.log('qqqq');
//     //   if (_setSignIn) {
//     //     _setSignIn();
//     //   }
//     //   navigation.navigate(goToPath);
//     //   checkPin(true);
//     //   setUserStatus(value => ({
//     //     ...value,
//     //     activePasscode: true,
//     //   }));
//     // } else {
//     //   console.log('2222');

//     //   navigation.navigate(goToPath);
//     //   // if (_setSignIn) {
//     //   //   _setSignIn();
//     //   // }
//     //   // _SetPincode(pinCode);
//     // }
//   };

//   const finishProcessFail = Countfail => {
//     if (Countfail > 3) {
//       checkPin(false);
//       navigation.navigate('AlertPincodeFail', {
//         TouchableBackdrop: true,
//       });
//     } else {
//       let txtError = `รหัสผ่านหน้าจอผิดครั้งที่ ${Countfail}`;
//       showSmallAlert(txtError);
//       checkPin(false);
//     }
//   };

//   const _SetPincode = async () => {
//     try {
//       const hasPin2 = await hasUserSetPinCode();
//       if (CheckPincode) {
//         navigation.reset({
//           index: 0,
//           routes: [{name: 'BBLAMONERoute'}],
//         });
//       } else {
//         checkPin(true);
//         navigation.navigate(goToPath);
//         setUserStatus(value => ({
//           ...value,
//           activePasscode: true,
//         }));
//       }
//       setStatusPin(hasPin2);
//       await ReactNativeBiometrics.createKeys()
//         .then(resultObject => {
//           const {publicKey} = resultObject;
//           if (publicKey != '') {
//             console.log('Creat Key Success');
//           } else {
//             console.log('Not Key!');
//           }
//         })
//         .catch(error => {
//           console.log('Error Not Key : ', error);
//         });
//     } catch (error) {
//       console.log('ERROR _Pinlogin', error);
//     }
//   };

//   const TouchID_StepOne = async () => {
//     await ReactNativeBiometrics.biometricKeysExist().then(
//       async resultObject => {
//         const {keysExist} = resultObject;
//         if (keysExist) {
//           await ReactNativeBiometrics.isSensorAvailable()
//             .then(res => {
//               if (res.biometryType == 'FaceID') {
//                 if (res.available) {
//                   TouchID_StepTow(res.biometryType);
//                 } else {
//                   // showSmallAlert(`FaceID : Disable`);
//                 }
//               } else if (res.biometryType == 'TouchID') {
//                 if (res.available) {
//                   TouchID_StepTow(res.biometryType);
//                 } else {
//                   // showSmallAlert(`TouchID : Disable`);
//                 }
//               } else if (res.biometryType == 'Biometrics') {
//                 if (res.available) {
//                   TouchID_StepTow(res.biometryType);
//                 } else {
//                   // showSmallAlert(`Finger Scan Or Face Scan : Disable`);
//                 }
//               } else {
//                 console.log('Scanner : Disable');
//                 // showSmallAlert('Scanner : Disable');
//               }
//             })
//             .catch(error => {
//               // showSmallAlert('Scanner : Disable');
//               console.log('Scanner', error);
//             });
//         } else {
//           console.log('Keys do not exist or were deleted');
//         }
//       },
//     );
//   };

//   const TouchID_StepTow = async biometryType => {
//     if (biometryType == 'FaceID') {
//       await ReactNativeBiometrics.simplePrompt({
//         promptMessage: 'Sign in with Face ID',
//         cancelButtonText: 'Close',
//       })
//         .then(res => {
//           if (res.success == true) {
//             // if (_setSignIn) {
//             //   _setSignIn();
//             // }
//             navigation.replace(goToPath);
//             // showSmallAlert('FaceID : Success');
//             setUserStatus(value => ({
//               ...value,
//               activePasscode: true,
//             }));
//           } else {
//             console.log('FaceID IOS : Fail');
//             // showSmallAlert('FaceID : Fail');
//           }
//         })
//         .catch(error => {
//           // showSmallAlert('FaceID IOS Fail!!!',error);
//           console.log('FaceID IOS Fail!!!');
//         });
//     } else if (biometryType == 'TouchID') {
//       await ReactNativeBiometrics.simplePrompt({
//         promptMessage: 'Sign in with Touch ID',
//         cancelButtonText: 'Close',
//       })
//         .then(res => {
//           if (res.success == true) {
//             // try {
//             //   _setSignIn();
//             // } catch (error) {}
//             navigation.replace(goToPath);
//             // showSmallAlert('TouchID IOS : Success');
//             setUserStatus(value => ({
//               ...value,
//               activePasscode: true,
//             }));
//           } else {
//             console.log('TouchID IOS : Fail');
//             // showSmallAlert('TouchID : Fail');
//           }
//         })
//         .catch(error => {
//           // showSmallAlert('TouchID IOS Fail!!!',error);
//           console.log('TouchID IOS Fail!!!');
//         });
//     } else if (biometryType == 'Biometrics') {
//       await ReactNativeBiometrics.simplePrompt({
//         promptMessage: 'Sign in with Touch ID',
//         cancelButtonText: 'Close',
//       })
//         .then(res => {
//           // if (_setSignIn) {
//           //   _setSignIn();
//           // }
//           if (res.success == true) {
//             navigation.replace(goToPath);
//             // showSmallAlert('TouchID Android : Success');
//             setUserStatus(value => ({
//               ...value,
//               activePasscode: true,
//             }));
//           } else {
//             console.log('Finger Scan Or Face Scan : Fail');
//             // showSmallAlert('Finger Scan Or Face Scan : Fail');
//           }
//         })
//         .catch(error => {
//           // showSmallAlert('Finger Scan Or Face Scan Fail!!!',error);
//           console.log('Finger Scan Or Face Scan Fail!!! ');
//         });
//     } else {
//       console.log('Finger Scan Or Face Scan Fail!!!');
//     }
//   };

//   const checkPin = async value => {
//     let deviceType = DEVICE_TYP == 'iphone' ? 2 : 3;
//     await checkPasscode({status: value, device: deviceType}).then(res =>
//       console.log('Send Pin', res.status),
//     );
//   };

//   React.useEffect(() => {
//     if (!StatusSetting) {
//       if (hasPin) {
//         TouchID_StepOne();
//       } else {
//         console.log('Error TouchID!!!');
//       }
//     } else {
//       console.log('Route setting');
//     }
//   });

//   return (
//     <>
//       <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.WHITE} />
//       <SafeAreaView>
//         {CheckPincode == undefined && (
//           <Header
//             navigation={navigation}
//             statusPIN={true}
//             callbackFunction={() => {
//               navigation.popToTop();
//             }}
//           />
//         )}

//         <PINCode
//           disableLockScreen={true}
//           status={PINCodeStatus}
//           touchIDDisabled={true}
//           titleEnter={Translate('textPleaseInputPasscode')}
//           titleChoose={'ตั้งรหัสผ่านหน้าจอ'}
//           subtitleChoose={'(Create Passcode)'}
//           titleConfirm={'ยืนยันรหัสผ่านหน้าจอ'}
//           subtitleConfirm={'(Confirm Screen Passcode)'}
//           titleAttemptFailed={'รหัสผ่านหน้าจอผิด'}
//           subtitleError={'กรุณาลองใหม่อีกครั้ง'}
//           stylePinCodeTextTitle={{
//             fontSize: ViewScale(18),
//             fontFamily: FONT_TYPE.MEDIUM,
//             fontWeight: DEVICE_TYP == 'android' ? 'normal' : 'normal',
//             textAlign: 'center',
//           }}
//           stylePinCodeTextSubtitle={{
//             fontSize: ViewScale(16),
//             fontFamily: FONT_TYPE.MEDIUM,
//             fontWeight: DEVICE_TYP == 'android' ? 'normal' : 'normal',
//             textAlign: 'center',
//           }}
//           stylePinCodeColorTitle={'#1a3686'}
//           stylePinCodeDeleteButtonText={{display: 'none'}}
//           stylePinCodeHiddenPasswordSizeEmpty={15}
//           stylePinCodeHiddenPasswordSizeFull={20}
//           stylePinCodeButtonNumber={'#1a3686'}
//           stylePinCodeButtonCircle={{
//             backgroundColor: '#ffffff',
//             borderRadius: ViewScale(50),
//             borderColor: '#1a3686',
//             borderWidth: ViewScale(1),
//           }}
//           stylePinCodeColumnDeleteButton={{marginTop: ViewScale(15)}}
//           stylePinCodeDeleteButtonColorHideUnderlay={'#1a3686'}
//           stylePinCodeDeleteButtonColorShowUnderlay={'#1a3686'}
//           stylePinCodeColorTitleError={'#1a3686'}
//           stylePinCodeColorSubtitleError={'#1a3686'}
//           stylePinCodeCircle={{
//             borderRadius: ViewScale(50),
//             borderWidth: ViewScale(1),
//             borderColor: '#1a3686',
//           }}
//           stylePinCodeChooseContainer={{fontSize: ViewScale(12)}}
//           colorPasswordEmpty={'#fff'}
//           colorPasswordError={'#1a3686'}
//           colorPassword={'#1a3686'}
//           numbersButtonOverlayColor={'#1a3686'}
//           passwordLength={6}
//           onFail={Countfail => {
//             finishProcessFail(Countfail);
//           }}
//           finishProcess={pinCode => {
//             finishProcess(pinCode);
//           }}
//         />
//       </SafeAreaView>
//     </>
//   );
// };

// React
import React from 'react';
import {View, FlatList, StatusBar} from 'react-native';

// custom
import stylePasscode from './Style';
import {Translate} from 'function';
import {RetrieveSecureData, StoreSecureData, ViewScale} from 'utils';
import {COLORS, isTablet} from 'styles';

// components
import {Ionicons} from 'components/Icons';
import {PadLock, TouchId} from 'components/Icons/Customs';
import {Container} from 'components/common';
import Circle from 'components/Global/Passcode/Circle';
import Dots from 'components/Global/Passcode/Dots';
import {TextRegular, TextBold, SafeAreaView} from 'components/atoms';
import Header from 'components/header/MainHeader';

// lib
import ReactNativeBiometrics from 'react-native-biometrics';

// recoil
import {useRecoilState, useResetRecoilState, useSetRecoilState} from 'recoil';
import {DeviceStatusState, userDeviceStatusState} from 'recoil-state';

import {
  AlertPasscodeMismatch,
  AlertPleaseLoginAgain,
} from 'components/molecules';

const ICON_SIZE = isTablet ? ViewScale(30) : ViewScale(60);

// method -> set , change , confirm_set , confirm_change , use

export default function Passcode({navigation, route}) {
  const MAX_PASSCODE = 6;

  const method = route.params?.method; // ประเภทของการใช้ -> set: ตั้ง password ใหม่ , change : เปลี่ยนรหัสผ่าน , confirm_set : ยืนยันการตั้งรหัสผ่าน , confirm_change : ยืนยันการเปลี่ยนรหัสผ่าน , use : กรอกรหัสเพื่อใช้งาน
  const goToPath = route.params?.goToPath; // path หลังจาก ยืนยันรหัสผ่านเสร็จสิ้น
  const OldPasscode = route.params?.passcode; // password เก่าไว้สำหรับการ confirm password
  const _setSignIn = route.params?._setSignIn; // save state signin เมื่อยืนยันรหัสผ่านเสร็จสิ้น
  const CheckPincode = route.params?.CheckPincode; // สถานะการเปลี่ยน pin code จากหน้า setting

  // global state
  const ResetData = useResetRecoilState(userDeviceStatusState);
  const setUserStatus = useSetRecoilState(userDeviceStatusState);

  // local state
  const [passcode, setPasscode] = React.useState([]);
  const [passcodeCount, setPasscodeCount] = React.useState(1);
  /**
   * function Zone
   */

  const authenticateBiometrics = async () => {
    await ReactNativeBiometrics.biometricKeysExist().then(
      async resultObject => {
        const {keysExist} = resultObject;
        if (keysExist) {
          await ReactNativeBiometrics.isSensorAvailable()
            .then(res => {
              if (res.biometryType == 'FaceID') {
                if (res.available) {
                  TouchID_StepTow(res.biometryType);
                }
              } else if (res.biometryType == 'TouchID') {
                if (res.available) {
                  TouchID_StepTow(res.biometryType);
                }
              } else if (res.biometryType == 'Biometrics') {
                if (res.available) {
                  TouchID_StepTow(res.biometryType);
                }
              } else {
                console.log('Scanner : Disable');
              }
            })
            .catch(error => {
              console.log('Scanner', error);
            });
        } else {
          console.log('Keys do not exist or were deleted');
        }
      },
    );
  };

  const TouchID_StepTow = async biometryType => {
    if (biometryType == 'FaceID') {
      await ReactNativeBiometrics.simplePrompt({
        promptMessage: 'Sign in with Face ID',
        cancelButtonText: 'Close',
      })
        .then(res => {
          if (res.success == true) {
            // if (_setSignIn) {
            //   _setSignIn();
            // }
            navigation.replace(goToPath);
            setUserStatus(value => ({
              ...value,
              activePasscode: true,
            }));
          } else {
            console.log('FaceID IOS : Fail');
          }
        })
        .catch(error => {
          console.log('FaceID IOS Fail!!!');
        });
    } else if (biometryType == 'TouchID') {
      await ReactNativeBiometrics.simplePrompt({
        promptMessage: 'Sign in with Touch ID',
        cancelButtonText: 'Close',
      })
        .then(res => {
          if (res.success == true) {
            // try {
            //   _setSignIn();
            // } catch (error) {}
            navigation.replace(goToPath);
            setUserStatus(value => ({
              ...value,
              activePasscode: true,
            }));
          } else {
            console.log('TouchID IOS : Fail');
          }
        })
        .catch(error => {
          console.log('TouchID IOS Fail!!!');
        });
    } else if (biometryType == 'Biometrics') {
      await ReactNativeBiometrics.simplePrompt({
        promptMessage: 'Sign in with Touch ID',
        cancelButtonText: 'Close',
      })
        .then(res => {
          // if (_setSignIn) {
          //   _setSignIn();
          // }
          if (res.success == true) {
            navigation.replace(goToPath);
            setUserStatus(value => ({
              ...value,
              activePasscode: true,
            }));
          } else {
            console.log('Finger Scan Or Face Scan : Fail');
          }
        })
        .catch(error => {
          console.log('Finger Scan Or Face Scan Fail!!! ');
        });
    } else {
      console.log('Finger Scan Or Face Scan Fail!!!');
    }
  };

  const setPasscodeFunction = () => {
    return navigation.replace('Passcode', {
      method: 'confirm_set',
      passcode,
      goToPath,
      _setSignIn,
      CheckPincode,
    });
  };

  const checkOnlinePasscode = async passcode => {
    const pass_code = await RetrieveSecureData('passcode');
    if (pass_code == passcode) {
      setUserStatus(value => ({
        ...value,
        activePasscode: true,
      }));
      navigation.replace(goToPath);
    } else {
      if (passcodeCount > 3) {
        navigation.navigate('Alert1', {
          children: <AlertPleaseLoginAgain />,
          title: Translate('textConfirm2'),
          onPress: () => {
            ResetData();
            setPasscode([]);
            navigation.reset({
              index: 0,
              routes: [{name: 'BBLAMONERoute'}],
            });
          },
        });
      } else {
        setPasscodeCount(passcodeCount + 1);
        setPasscode([]);
        navigation.navigate('Alert1', {
          children: <AlertPasscodeMismatch />,
          title: Translate('textConfirm2'),
        });
      }
    }
  };

  const registerOnlinePasscode = async passcode => {
    await StoreSecureData({
      key: 'passcode',
      value: passcode,
    });

    if (CheckPincode) {
      navigation.reset({
        index: 0,
        routes: [{name: 'BBLAMONERoute'}],
      });
    } else {
      navigation.replace(goToPath);
    }
  };

  const setConfirmPasscodeFunction = passcode_join => {
    const oldpasscode_join = OldPasscode.join('');

    if (oldpasscode_join === passcode_join) {
      _setSignIn?.();
      registerOnlinePasscode(passcode_join);
    } else {
      navigation.navigate('Alert1', {
        children: <AlertPasscodeMismatch />,
        title: Translate('textConfirm2'),
        onPress: () => {
          setPasscode([]);
        },
      });
    }
  };

  const inputdata = item => {
    if (passcode.length < MAX_PASSCODE) {
      setPasscode(() => [...passcode, item]);
    }
  };

  const touchidpress = React.useCallback(() => {
    authenticateBiometrics();
  }, []);

  const deleteButton = () => {
    setPasscode(passcode.filter((item, index) => index != passcode.length - 1));
  };

  const headerText = React.useMemo(() => {
    switch (method) {
      case 'set':
        return Translate('textCreatePasscode');
      case 'confirm_set':
        return Translate('textCreatePasscodeConfirm');
      case 'change':
        return Translate('textCurrentPasscode');
      case 'confirm_change':
        return Translate('textNewPasscode');
      case 'use':
        return Translate('textPleaseInputPasscode');
      default:
        break;
    }
  }, [method]);

  React.useEffect(() => {
    if (method === 'use') {
      authenticateBiometrics();
    }
    if (passcode.length !== MAX_PASSCODE) return;

    const passcode_join = passcode.join('');
    switch (method) {
      case 'set':
        setPasscodeFunction();
        break;
      case 'confirm_set':
        setConfirmPasscodeFunction(passcode_join);
        break;
      case 'use':
        checkOnlinePasscode(passcode_join);
        break;
      case 'change':
        checkOnlinePasscode(passcode_join);
      default:
        break;
    }
  }, [passcode]);

  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.WHITE} />
      <SafeAreaView>
        <Header
          navigation={navigation}
          statusPIN={true}
          callbackFunction={() => {
            navigation.popToTop();
          }}
        />
        <PinCode
          method={method}
          touchidpress={touchidpress}
          deleteButton={deleteButton}
          hasBiometrics={method === 'use'}
          headerText={headerText}
          passcode={passcode}
          inputdata={inputdata}
        />
      </SafeAreaView>
    </>
  );
}

const PinCode = ({
  touchidpress,
  deleteButton,
  hasBiometrics,
  headerText,
  passcode,
  inputdata,
  method,
}) => (
  <Container>
    <View style={stylePasscode.numberContainer}>
      <FlatList
        ListHeaderComponent={() => (
          <>
            {/* header */}

            <View style={stylePasscode.headerContainer}>
              <PadLock
                width={ViewScale(ICON_SIZE)}
                height={ViewScale(ICON_SIZE)}
              />
              <TextBold style={stylePasscode.headertext}>{headerText}</TextBold>
            </View>

            {/* dots */}

            {/* <Dots /> */}
            <Dots data={passcode} />
            <View style={{marginBottom: ViewScale(50)}} />
          </>
        )}
        numColumns={3}
        scrollEnabled={false}
        keyExtractor={(item, index) => 'idTouchid-' + index}
        data={[
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          <CircleTouchId callback={touchidpress} />,
          0,
          <CircleDelete callback={deleteButton} />,
        ]}
        renderItem={({item, index}) => {
          if (Number.isInteger(item)) {
            return (
              <Circle
                style={stylePasscode.button}
                callback={e => inputdata(item)}>
                <TextRegular style={stylePasscode.textCircle}>
                  {item}
                </TextRegular>
              </Circle>
            );
          } else {
            // if (hasBiometrics && method === 'use' && index === 9) {
            if (false) {
              return item;
            } else if (index === 11) {
              return item;
            } else {
              return <Circle />;
            }
          }
        }}
      />
    </View>
  </Container>
);

const CircleTouchId = ({callback}) => {
  return (
    <View style={[stylePasscode.touchidContainer, {backgroundColor: 'white'}]}>
      <Circle callback={callback}>
        {/* <Ionicons
          name="finger-print-outline"
          size={ViewScale(60)}
          style={stylePasscode.fingerprinticon}
          color={COLORS.PRIMARY}
        /> */}
        <TouchId
          width={ViewScale(71)}
          height={ViewScale(71)}
          style={{
            transform: [
              {
                translateY: 3,
              },
            ],
          }}
        />
      </Circle>
      <TextRegular style={stylePasscode.touchidtext}>
        {'Touch ID /\nFace ID'}
      </TextRegular>
    </View>
  );
};

const CircleDelete = ({callback}) => {
  return (
    <View>
      <Circle callback={callback}>
        <Ionicons
          name="arrow-back-outline"
          size={ViewScale(35)}
          color={COLORS.PRIMARY}
        />
      </Circle>
    </View>
  );
};
