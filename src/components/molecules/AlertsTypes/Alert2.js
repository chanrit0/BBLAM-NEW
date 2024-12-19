import {Translate} from 'function';
import {ViewScale} from 'utils';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Alert, Button, TextMedium} from 'components/atoms';
import {useNavigation} from '@react-navigation/core';

export default ({route: {params}}) => {
  const onPressR = params?.onPressR ?? null;
  const onPressL = params?.onPressL ?? null;
  const TouchableBackdrop = params?.TouchableBackdrop;
  const navigation = useNavigation();

  // ไปที่หน้าจอ BBLAMONERoute โดยการ Reset Navigator
  const onPressLeft = () => {
    navigation.goBack();
    onPressL();
  };

  // กลับไปหน้าก่อนหน้า
  const onPressRight = () => {
    navigation.goBack();
    onPressR?.();
  };

  return (
    <Alert TouchableBackdrop={TouchableBackdrop}>
      <View style={styles.modal}>
        <View style={styles.content}>
          <TextMedium
            style={{textAlign: 'center', marginVertical: ViewScale(20)}}>
            {Translate('textIsPVDMember')}
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
            onPress={onPressRight} // กลับไปหน้าก่อน
            style={{width: '48%'}}
          />
          <Button
            type="border"
            title={Translate('textNo')}
            onPress={onPressLeft} // ไปที่หน้าจอ BBLAMONERoute
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
