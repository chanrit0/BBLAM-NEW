import {AlertSessionExpired} from 'components/molecules';
import {Translate} from 'function';
import React from 'react';
import {promiseSetRecoil} from 'recoil-outside';
import {smallAlertState, userDeviceStatusState} from 'recoil-state';
import * as RootNavigation from '@RootNavigation';

// deprecate
export default ({error, ResetData, navigation, setSmallAlert}) => {
  const status = error?.response?.status;
  if (status === 401) {
    ResetData();
    navigation.navigate('Alert1', {
      children: <AlertSessionExpired />,
      title: Translate('textConfirm2'),
      onPress: () =>
        navigation.reset({
          index: 0,
          routes: [{name: 'BBLAMONERoute'}],
        }),
    });
  } else if (status === 404) {
    setSmallAlert({visible: true, value: Translate('textSomethingWentWrong')});
    return false;
  } else if (status >= 500) {
    console.log({handleError: error});
    setSmallAlert({visible: true, value: Translate('textSomethingWentWrong')});
  } else {
    console.log({handleError: error});
    return false;
  }

  return null;
};

export const useHandleError1 = async ({error}) => {
  const HTTP_ERROR_CODE = [400, 428, 422];
  const status = error?.response?.status;

  return new Promise((resolve, reject) => {
    if (HTTP_ERROR_CODE.includes(HTTP_ERROR_CODE)) {
      console.log({handleError: error});
    } else {
      if (status === 401) {
        promiseSetRecoil(userDeviceStatusState, {
          isSignIn: false, // เช็คเข้าสู่ระบบ BBLAM_ONE ยัง
          isConnectPVD: false, // เชื่อมต่อข้อมูลกับ PVD แล้วหรือยัง
          activePasscode: false, // -> จับเวลาการ activePasscode
        });
        RootNavigation.navigate('Alert1', {
          children: <AlertSessionExpired />,
          title: Translate('textConfirm2'),
          onPress: () =>
            RootNavigation.reset({
              index: 0,
              routes: [{name: 'BBLAMONERoute'}],
            }),
        });
        reject();
      } else if (status === 404) {
        promiseSetRecoil(smallAlertState, {
          visible: true,
          value: Translate('textSomethingWentWrong'),
        });
        reject();
      } else if (status >= 500) {
        console.log({handleError: error});
        promiseSetRecoil(smallAlertState, {
          visible: true,
          value: Translate('textSomethingWentWrong'),
        });
        reject();
      } else {
        resolve(error?.response?.data);
        console.log(error?.response?.data);
      }
    }
  });
};
