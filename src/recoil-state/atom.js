import {atom} from 'recoil';
import {getSystemLocale, StoreData, RetrieveData, Initlanguage} from 'utils';

/**
 * Autorization
 */

export const userInfoState = atom({
  key: 'userInfo',
  default: {
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
  },
});

export const switchingState = atom({
  // select all fund
  key: 'switching',
  default: {
    isCompanyAll: false,
    isFundAll: false,
  },
});

export const userAuthenState = atom({
  key: 'userAuthen',
  default: null,
});

export const userDeviceStatusState = atom({
  // มีลบอัพเดทเมื่อ logout
  key: 'user_status',
  default: {
    // แก้สองที่ /service/base , /service/Autorization
    isSignIn: false, // เช็คเข้าสู่ระบบ BBLAM_ONE ยัง
    isConnectPVD: false, // เชื่อมต่อข้อมูลกับ PVD แล้วหรือยัง
    isSignInPVD: false, // ยัง login PVD อยู่หรือไม่
    activePasscode: false, // -> จับเวลาการ activePasscode
  },
  effects_UNSTABLE: [
    async ({onSet, setSelf}) => {
      const query = await RetrieveData('user_status');
      const COUNTDOWN_ACTIVE_PASSCODE = 300000; // => 5 นาที

      if (query) {
        setSelf({...query});
      }

      onSet(value => {
        let {activePasscode, ...deviceValue} = value;

        if (activePasscode) {
          setTimeout(() => {
            setSelf({...deviceValue, activePasscode: false});
            console.log({activePasscode: false});
          }, COUNTDOWN_ACTIVE_PASSCODE);
        }
        StoreData({key: 'user_status', value: JSON.stringify(deviceValue)});
      });
    },
  ],
});

/**
 * fundamental Device
 */
export const DeviceStatusState = atom({
  // => อยู่กับเครื่องตลอด
  key: 'DeviceStatus',
  default: {
    hasBiometrics: false,
    isJailbreak: false,
    isConnected: true,
  },
  effects_UNSTABLE: [
    async ({onSet, setSelf}) => {
      const query = await RetrieveData('device_status');

      if (query) {
        setSelf({...query});
      }

      onSet(value => {
        StoreData({key: 'device_status', value: JSON.stringify(value)});
      });
    },
  ],
});

export const languageState = atom({
  key: 'language',
  default: Initlanguage(),
});

export const termOfUseState = atom({
  key: 'termOfUse',
  default: null,
  effects_UNSTABLE: [
    async ({onSet, setSelf}) => {
      const terms = {
        TermOfUse: false, // เงื่อนไขการใช้งาน BBLAM_ONE
        ChangFundTermsOfService: false, // คำรับรองและยืนยันต่อบริษัทจัดการ / ข้อตกลงการใช้บริการ
      };

      const query = await RetrieveData('termOfUse');
      if (!query) {
        setSelf(terms);
      } else {
        setSelf(query);
      }

      onSet(value => {
        StoreData({key: 'termOfUse', value: JSON.stringify(value)});
      });
    },
  ],
});

export const spinnerState = atom({
  key: 'spinner',
  default: false,
});

export const statusPin = atom({
  key: 'statusPin',
  default: false,
  effects_UNSTABLE: [
    async ({onSet, setSelf}) => {
      const query = await RetrieveData('statusPin');
      if (query) {
        setSelf(query);
      }

      onSet(value => {
        StoreData({key: 'statusPin', value: JSON.stringify(value)});
      });
    },
  ],
});

let smallAlertTimeout = null;

export const smallAlertState = atom({
  key: 'smallAlert',
  default: {
    visible: false,
    value: '',
  },
  effects_UNSTABLE: [
    async ({onSet, setSelf}) => {
      onSet(() => {
        if (smallAlertTimeout != null) {
          clearTimeout(smallAlertTimeout);
        }
        smallAlertTimeout = setTimeout(() => {
          setSelf({
            visible: false,
            value: '',
          });
        }, 3000);
      });
    },
  ],
});
