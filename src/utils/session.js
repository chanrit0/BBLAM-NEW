import {TextMedium} from 'components/atoms';
import {Translate} from 'function';
import _ from 'lodash';
import React from 'react';
import {View} from 'react-native';
import {promiseGetRecoil, promiseSetRecoil} from 'recoil-outside';
import {userDeviceStatusState} from 'recoil-state';
import {navigationRef} from 'routes/RootNavigation';
import {RemoveData} from './storage';

const minutesToAdd = 1;

export const StampSession = async () => {
  let currentDate = new Date();
  let futureDate = new Date(currentDate.getTime() + minutesToAdd * 60000);

  // promiseSetRecoil(TimeoutSessionState, futureDate);
};

export const isTimeoutSession = async () => {
  let currentDate = new Date();
  const userDevice = await promiseGetRecoil(userDeviceStatusState);
  // const futureDate = await promiseGetRecoil(TimeoutSessionState);

  if (futureDate !== null) {
    let checkDate = new Date(futureDate);

    if (currentDate > checkDate) {
      promiseSetRecoil(userDeviceStatusState, {
        ...userDevice,
        activePasscode: false,
      });
      // promiseSetRecoil(TimeoutSessionState, null);
      navigationRef.current.navigate('Alert1', {
        children: (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TextMedium style={{textAlign: 'center'}}>
              {
                'ท่านไม่ได้ทำรายการในเวลาที่กำหนด\nกรุณาเข้าสู่ระบบ BBLAM ใหม่อีกครั้ง'
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
      return true;
    } else {
      return false;
    }
  }
};
