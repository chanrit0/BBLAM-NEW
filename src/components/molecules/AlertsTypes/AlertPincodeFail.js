import {Translate} from 'function';
import {ViewScale, setSpinner} from 'utils';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Alert, Button, TextMedium} from 'components/atoms';
import {useNavigation} from '@react-navigation/core';

// services
import {logout} from 'services/api';

// recoil
import {promiseSetRecoil} from 'recoil-outside';
import {userDeviceStatusState} from 'recoil-state';

export default ({route: {params}}) => {
  const CheckPincode =
    params?.checkPincode != undefined ? params?.checkPincode : false;
  const onPress = params?.onPress ?? null;
  const TouchableBackdrop = params?.TouchableBackdrop;

  const navigation = useNavigation();

  const onPressLeft = () => {
    navigation.goBack();
  };

  const onPressRight = async () => {
    if (CheckPincode) {
      setSpinner(true);
      setTimeout(() => {
        setSpinner(false);
        navigation.goBack();
        onPress();
      }, 500);
    } else {
      navigation.goBack();
      _logOutFunc();
    }
  };

  const _logOutFunc = async () => {
    console.log('Logout ...');

    setSpinner(true);

    await logout()
      .then(() => {
        console.log('BBLAM: Token has been revoked');
        promiseSetRecoil(userDeviceStatusState, {
          isSignIn: false, // เช็คเข้าสู่ระบบ BBLAM_ONE ยัง
          isConnectPVD: false, // เชื่อมต่อข้อมูลกับ PVD แล้วหรือยัง
          activePasscode: false, // -> จับเวลาการ activePasscode
        });

        navigation.reset({
          index: 0,
          routes: [{name: 'BBLAMONERoute'}],
        });
      })
      .catch(error => {
        console.log('ERROR BBLAM>>', error);
      })
      .finally(() => setSpinner(false));
  };

  return (
    <Alert TouchableBackdrop={TouchableBackdrop}>
      <View style={styles.modal}>
        <View style={styles.content}>
          <TextMedium
            style={{textAlign: 'center', marginVertical: ViewScale(20)}}>
            {'คุณต้องการตั้งรหัสผ่านหน้าจอของคุณใหม่ \nใช่หรือไม่?'}
          </TextMedium>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: ViewScale(10),
          }}>
          <Button
            type="fill"
            title={Translate('textYes')}
            onPress={onPressRight}
            style={{width: '48%'}}
          />
          <Button
            type="border"
            title={Translate('textNo')}
            onPress={onPressLeft}
            style={{width: '48%'}}
          />
        </View>
      </View>
    </Alert>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    flex: 1,
    padding: ViewScale(20),
  },
});
