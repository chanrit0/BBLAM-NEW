import {ViewScale} from 'utils';
import React from 'react';
import {View, Image, Platform, StyleSheet} from 'react-native';
import {COLORS, FONT_SIZE} from 'styles';
import {Alert, Button, TextMedium} from 'components/atoms';
import {useNavigation} from '@react-navigation/core';
import ReactNativeBlobUtil from 'react-native-blob-util';

export const isIOS = Platform.OS === 'ios' ? true : false;
export default ({route: {params}}) => {
  const onPress = params?.onPress ?? null;
  const TouchableBackdrop = params?.TouchableBackdrop;

  const navigation = useNavigation();

  const mime = 'application/pdf';
  const {dirs} = ReactNativeBlobUtil.fs;
  const dirToSave = isIOS ? dirs.CacheDir : dirs.DownloadDir;
  const extension = 'pdf';
  const onPressLeft = () => {
    const title = 'การเข้าใช้งานระบบ_สมาชิกกองทุน';
    const configfb = {
      fileCache: true,
      appendExt: 'pdf',
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: title,
        path: `${dirToSave}/${title}.${extension}`,
        mime,
      },
    };

    const androidConfigPreview = {
      fileCache: false,
      appendExt: 'pdf',
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: false,
        mediaScannable: true,
        title: title,
        path: `${dirToSave}/${title}.${extension}`,
      },
    };
    const configOptions = Platform.select({
      ios: {
        fileCache: configfb.fileCache,
        appendExt: configfb.appendExt,
        title: configfb.addAndroidDownloads.title,
        path: configfb.addAndroidDownloads.path,
      },
      android: androidConfigPreview,
    });
    navigation.goBack();
    ReactNativeBlobUtil.config(configOptions)
      .fetch(
        'GET',
        'https://pvdconnextuat.bblam.co.th/%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%80%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B9%83%E0%B8%8A%E0%B9%89%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B8%A3%E0%B8%B0%E0%B8%9A%E0%B8%9A_%E0%B8%AA%E0%B8%A1%E0%B8%B2%E0%B8%8A%E0%B8%B4%E0%B8%81%E0%B8%81%E0%B8%AD%E0%B8%87%E0%B8%97%E0%B8%B8%E0%B8%99.pdf',
      )
      .then(res => {
        if (isIOS) {
          const status = res.info().status;
          if (status == 200) {
            ReactNativeBlobUtil.ios.openDocument(
              configfb.addAndroidDownloads.path,
            );
          } else {
            showSmallAlert('มีบางอย่างผิดพลาดโปรดลองใหม่อีกครั้ง');
          }
        } else {
          ReactNativeBlobUtil.android.actionViewIntent(
            configfb.addAndroidDownloads.path,
            mime,
          );
        }
      })
      .catch((errorMessage, statusCode) => {
        console.log(errorMessage);
      });
  };

  const onPressRight = () => {
    const title = 'การเข้าใช้งานระบบ PVD CONNEXT-สำหรับกรรมการกองทุน';
    const configfb = {
      fileCache: true,
      appendExt: 'pdf',
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: title,
        path: `${dirToSave}/${title}.${extension}`,
        mime,
      },
    };

    const androidConfigPreview = {
      fileCache: false,
      appendExt: 'pdf',
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: false,
        mediaScannable: true,
        title: title,
        path: `${dirToSave}/${title}.${extension}`,
      },
    };
    const configOptions = Platform.select({
      ios: {
        fileCache: configfb.fileCache,
        appendExt: configfb.appendExt,
        title: configfb.addAndroidDownloads.title,
        path: configfb.addAndroidDownloads.path,
      },
      android: androidConfigPreview,
    });
    navigation.goBack();
    ReactNativeBlobUtil.config(configOptions)
      .fetch(
        'GET',
        'https://pvdconnextuat.bblam.co.th/%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%80%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B9%83%E0%B8%8A%E0%B9%89%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B8%A3%E0%B8%B0%E0%B8%9A%E0%B8%9A%20PVD%20CONNEXT-%E0%B8%AA%E0%B8%B3%E0%B8%AB%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%81%E0%B8%A3%E0%B8%A3%E0%B8%A1%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%81%E0%B8%AD%E0%B8%87%E0%B8%97%E0%B8%B8%E0%B8%99.pdf',
      )
      .then(res => {
        if (isIOS) {
          const status = res.info().status;
          if (status == 200) {
            ReactNativeBlobUtil.ios.openDocument(
              configfb.addAndroidDownloads.path,
            );
          } else {
            showSmallAlert('มีบางอย่างผิดพลาดโปรดลองใหม่อีกครั้ง');
          }
        } else {
          ReactNativeBlobUtil.android.actionViewIntent(
            configfb.addAndroidDownloads.path,
            mime,
          );
        }
      })
      .catch((errorMessage, statusCode) => {
        console.log(errorMessage);
      });
  };

  return (
    <Alert TouchableBackdrop={TouchableBackdrop}>
      <View style={styles.modal}>
        <View style={styles.content}>
          <TextMedium size={FONT_SIZE.BODY_2} color={COLORS.BLACK}>
            <Image
              resizeMode={'contain'}
              style={{
                width: 14,
                height: 14,
              }}
              source={require('assets/icons/Icon_Manual.png')}
            />
            {' คู่มือการเข้าใช้งานระบบ   '}
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
            title={'กรรมการกองทุน'}
            onPress={onPressRight}
            style={{width: '48%'}}
          />
          <Button
            type="fill"
            title={'สมาชิกกองทุน'}
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
