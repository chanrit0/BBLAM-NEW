import {
  Platform,
  NativeModules,
  PixelRatio,
  PermissionsAndroid,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import UUID from 'react-native-uuid';
import {RFValue} from 'react-native-responsive-fontsize';
import {promiseGetRecoil, promiseSetRecoil} from 'recoil-outside';
import {
  smallAlertState,
  spinnerState,
  userDeviceStatusState,
  userInfoState,
} from 'recoil-state';
import * as RootNavigation from '@RootNavigation';
import {AlertSessionExpired} from 'components/molecules';
import React from 'react';
import {Translate} from 'function';
import dayjs from 'dayjs';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import _ from 'lodash';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {RetrieveSecureData} from './storage';
import {HOST_URL} from 'config';
import {API_VERSION} from 'config';
import NetInfo from '@react-native-community/netinfo';
import {request, PERMISSIONS} from 'react-native-permissions';
import {RetrieveData} from './storage';

export const isTablet = DeviceInfo.isTablet();
export const getUniqueId = UUID.v4(); 

export const isIOS = Platform.OS === 'ios' ? true : false;
export const Initlanguage = async () => {
  // return 'TH';
  const query = await RetrieveData('language');
  if (query) {
    return query;
  } else {
    return 'TH';
  }
};
export const getSystemLocale = () => {
  let locale;

  if (
    NativeModules.SettingsManager &&
    NativeModules.SettingsManager.settings &&
    NativeModules.SettingsManager.settings.AppleLanguages
  ) {
    locale =
      NativeModules.SettingsManager.settings.AppleLanguages[0].split('-')[0];
    // Android
  } else if (NativeModules.I18nManager) {
    locale = NativeModules.I18nManager.localeIdentifier.split('_')[0];
  }

  if (typeof locale === 'undefined') {
    console.log("Couldn't get locale");
    return 'th';
  }

  return locale.toUpperCase();
};

export const isJson = str => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export function numberWithCommas(x) {
  if (x === undefined) {
    return x;
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const FontScale = size => {
  let newSize = RFValue(size, 896); // base iphone 11
  if (newSize > 2) {
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize));
    }
  } else {
    return newSize;
  }
};

export const ViewScale = size => {
  Platform.OS === 'android' && size > 2 ? (size += 4) : size;
  let newSize = RFValue(size, 896);
  if (newSize > 2) {
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
  } else {
    return newSize;
  }
};

export const SessionExpired = () => {
  RootNavigation.navigate('Alert1', {
    children: <AlertSessionExpired />,
    title: Translate('textConfirm2'),
    onPress: () =>
      RootNavigation.reset({
        index: 0,
        routes: [{name: 'BBLAMONERoute'}],
      }),
  });
  promiseSetRecoil(userDeviceStatusState, {
    prefix: '',
    name: '',
    surname: '',
    email: '',
    emailMock: '',
    phone: '',
    phoneMock: '',
    com_code: '',
    fund_code: '',
    em_code: '',
    com_name: '',
    role: '',
    risk_profile_status: false,
    change_fund_status: false,
    deposit_status: false,
    deposit_count_member: 0,
  });
  promiseSetRecoil(userDeviceStatusState, {
    isSignIn: false, // เช็คเข้าสู่ระบบ BBLAM_ONE ยัง
    isConnectPVD: false, // เชื่อมต่อข้อมูลกับ PVD แล้วหรือยัง
    activePasscode: false, // -> จับเวลาการ activePasscode
  });
};

export const getCurrentDate = config => {
  if (config === 'dayjs') {
    dayjs.extend(buddhistEra);
    return dayjs(new Date());
  } else {
    return new Date();
  }
};

export const showSmallAlert = error => {
  return promiseSetRecoil(smallAlertState, {visible: true, value: error});
};

export const setSpinner = state => {
  return promiseSetRecoil(spinnerState, state);
};

export const getUserInfoData = async () => {
  return await promiseGetRecoil(userInfoState);
};

export const setUserInfoData = async data => {
  const userInfo = await promiseGetRecoil(userInfoState);
  return promiseSetRecoil(userInfoState, {...userInfo, ...data});
};

export const FileManager = async data => {
  // let dirs = ReactNativeBlobUtil.fs.dirs;
  const token = await RetrieveSecureData('token');
  data?.filetype === undefined && (data.filetype = 'pdf');
  data.type === undefined && (data.type = 'download');

  const filetypes = [
    {
      type: 'xlsx',
      mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    },
    {
      type: 'docx',
      mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    },
    {
      type: 'xls',
      mime: 'application/vnd.ms-excel',
    },
    {
      type: 'doc',
      mime: 'application/msword',
    },
    {
      type: 'pdf',
      mime: 'application/pdf',
    },
  ];

  const extension = data.filetype;
  const mime = filetypes.find(item => item.type == data.filetype).mime;

  const actualDownload = () => {
    const {dirs} = ReactNativeBlobUtil.fs;
    const dirToSave = isIOS ? dirs.CacheDir : dirs.DownloadDir;
    const configfb = {
      fileCache: true,
      appendExt: extension,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: data.title,
        path: `${dirToSave}/${data.title}.${extension}`,
        mime,
      },
    };

    const androidConfigPreview = {
      fileCache: false,
      appendExt: extension,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: false,
        mediaScannable: true,
        title: data.title,
        path: `${dirToSave}/${data.title}.${extension}`,
      },
    };

    const configOptions = Platform.select({
      ios: {
        fileCache: configfb.fileCache,
        appendExt: configfb.appendExt,
        title: configfb.addAndroidDownloads.title,
        path: configfb.addAndroidDownloads.path,
      },
      android: data.type == 'preview' ? androidConfigPreview : configfb,
    });

    setSpinner(true);
    ReactNativeBlobUtil.config(configOptions)
      .fetch('GET', `${HOST_URL}${API_VERSION}${data.path}`, {
        Authorization: `Bearer ${token.access_token}`,
      })
      .then(async res => {
        if (isIOS) {
          const status = res.info().status;
          if (status == 200) {
            if (data.type == 'download') {
              ReactNativeBlobUtil.ios.previewDocument(
                configfb.addAndroidDownloads.path,
              );
            } else {
              ReactNativeBlobUtil.ios.openDocument(
                configfb.addAndroidDownloads.path,
              );
            }
          } else {
            showSmallAlert('มีบางอย่างผิดพลาดโปรดลองใหม่อีกครั้ง');
          }
        } else {
          if (data.type == 'preview') {
            ReactNativeBlobUtil.android.actionViewIntent(
              configfb.addAndroidDownloads.path,
              mime,
            );
          } else {
            await ReactNativeBlobUtil.MediaCollection.copyToMediaStore(
              {
                name: configfb.addAndroidDownloads.title, // name of the file
                parentFolder: '', // subdirectory in the Media Store, e.g. HawkIntech/Files to create a folder HawkIntech with a subfolder Files and save the image within this folder
                mimeType: mime, // MIME type of the file
              },
              'Download', // Media Collection to store the file in ("Audio" | "Image" | "Video" | "Download")
              res.path(), // Path to the file being copied in the apps own storage
            );
          }
        }
      })
      .catch(e => {
        ReactNativeBlobUtil(e.message);
        console.log('The file saved to ERROR', e.message);
      })
      .finally(() => setSpinner(false));
  };

  const permissionCheck = async () => {
    if (isIOS) {
      actualDownload();
    } else {
      try {
        const granted = await request(
          Platform.Version >= 33
            ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
            : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        );
        if (granted == PermissionsAndroid.RESULTS.GRANTED) {
          actualDownload();
        } else {
          showSmallAlert(
            'ไม่สามารถดาวน์โหลดได้เนื่องจากไม่มีสิทธิ์ในการเข้าถึงไฟล์',
          );
        }
      } catch (error) {
        console.log(error);
      }
      // try {
      //   const granted = await PermissionsAndroid.request(
      // PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      //   );
      //   console.log('granted', granted);
      //   console.log('RESULTS', RESULTS.GRANTED);
      //   if (granted == PermissionsAndroid.RESULTS.GRANTED) {
      //     actualDownload();
      //   } else {
      //     showSmallAlert(
      //       'ไม่สามารถดาวน์โหลดได้เนื่องจากไม่มีสิทธิ์ในการเข้าถึงไฟล์',
      //     );
      //   }
      // } catch (error) {
      //   console.log(error);
      // }
    }
  };

  permissionCheck();
};

export const addCommas = value => {
  const regex = /\d{1,3}(?=(\d{3})+(?!\d))/g;
  value = String(value);
  value.replace(regex, '$&,');
  console.log(value);
  return value;
};

export const filterInputNumberPoint = (value, oldvalue) => {
  const regex = /^[0-9]+(\.?[0-9]{1,2})$/;
  value = String(value);

  if (value === '') {
    return oldvalue === undefined ? value : oldvalue;
  }
  if (oldvalue === undefined) {
    return parseFloat(value)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      .toString();
  }
  if (/^[0-9]{1,3}$/.test(value)) {
    // return parseFloat(value).toFixed(2).toString();
    return parseFloat(value)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      .toString();
  }
  // return regex.test(value) ? parseFloat(value).toFixed(2).toString() : oldvalue;
  return regex.test(value)
    ? parseFloat(value)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        .toString()
    : oldvalue;
};

export const filterInputOnlyNumber = value => {
  const regex = /[^0-9]+\.?/g;
  value = String(value);
  value = value.replace(regex, '');
  return value;
};

export const checkInternetConnection = async () => {
  const status = await NetInfo.fetch();

  if (status.isConnected) {
    return true;
  } else {
    return false;
  }
};
