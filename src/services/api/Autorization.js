import bblam from './base';
import React from 'react';
import {userAuthenState} from 'recoil-state';
import {promiseSetRecoil, promiseGetRecoil} from 'recoil-outside';
import * as RootNavigation from '@RootNavigation';
import {AlertVerifyEmailSuccess, AlertVerifyFailed} from 'components/molecules';
import {Translate} from 'function';
import {Keyboard} from 'react-native';
import {setSpinner, setUserInfoData} from 'utils';

/**
 * Receive data from outside when not logged in
 */

export const getDataFromRefCode = data => {
  // done revoke
  return new Promise(async (resolve, reject) => {
    setSpinner(true);
    try {
      await bblam
        .post('/refcode', JSON.stringify(data))
        .then(response => resolve(response.data))
        .catch(error =>
          console.log({
            error,
            path: '/services/api/Autorization/#getDataFromRefCode',
          }),
        );
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/Autorization/#getDataFromRefCode',
      });
    }
    setSpinner(false);
  });
};

export const activeRefCode = data => {
  return new Promise(async (resolve, reject) => {
    setSpinner(true);

    try {
      await bblam
        .post('/active/refcode', JSON.stringify(data))
        .then(response => resolve(response.data))
        .catch(error => console.log(error));
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/Autorization/#activeRefCode',
      });
    }
    setSpinner(false);
  });
};

export const validateRefCode = data => {
  return new Promise(async (resolve, reject) => {
    setSpinner(true);

    try {
      await bblam
        .post('/validate/refcode', JSON.stringify(data))
        .then(response => resolve(response.data))
        .catch(error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/Autorization/#validateRefCode',
      });
    }
    setSpinner(false);
  });
};

export const checkPrivilegeUser = data => {
  // done revoke
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .post('/checkroleuser', JSON.stringify(data))
        .then(response => resolve(response.data))
        .catch(error => {
          console.log({
            error,
            path: '/services/api/Autorization/#checkPrivilegeUser',
          });
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/Autorization/#checkPrivilegeUser',
      });
    }
  });
};

export const login = data => {
  return new Promise(async (resolve, reject) => {
    setSpinner(true);
    try {
      await bblam
        .post('/login/bblamone', JSON.stringify(data))
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    } catch (error) {
      console.log({
        tryecatch: error,
        path: '/services/api/Autorization/#login',
      });
    }
    setSpinner(false);
  });
};

export const logout = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get('/logout')
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    } catch (error) {
      console.log({
        tryecatch: error,
        path: '/services/api/Autorization/#logout',
      });
    }
  });
};

export const register = data => {
  // done revoke
  return new Promise(async (resolve, reject) => {
    setSpinner(true);

    try {
      await bblam
        .post('/register', JSON.stringify(data))
        .then(response => resolve(response.data))
        .catch(error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        tryecatch: error,
        path: '/services/api/Autorization/#register',
      });
    }
    setSpinner(false);
  });
};

export const resendEmail = data => {
  // done revoke
  return new Promise(async (resolve, reject) => {
    setSpinner(true);

    try {
      await bblam
        .post('/resend/email', JSON.stringify(data))
        .then(response => resolve(response.data))
        .catch(error => {
          console.log({
            error,
            path: '/services/api/Autorization/#resendEmail',
          });
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/Autorization/#resendEmail',
      });
    }
    setSpinner(false);
  });
};

export const resendPhone = data => {
  // done revoke
  return new Promise(async (resolve, reject) => {
    setSpinner(true);

    try {
      await bblam
        .post('/resend/phone', JSON.stringify(data))
        .then(response => resolve(response.data))
        .catch(error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/Autorization/#resendPhone',
      });
    }
    setSpinner(false);
  });
};

// export const registerPasscode = data => {
//   // done revoke
//   return new Promise(async (resolve, reject) => {
//     setSpinner(true);

//     try {
//       await bblam
//         .post('/update/pincode', JSON.stringify(data))
//         .then(response => resolve(response.data))
//         .catch(error => {
//           reject(error);
//         });
//     } catch (error) {
//       console.log({
//         trycatch: error,
//         path: '/services/api/Autorization/#registerPasscode',
//       });
//     }
//     setSpinner(false);
//   });
// };

export const checkPasscode = data => {
  // done revoke
  return new Promise(async (resolve, reject) => {
    setSpinner(true);

    try {
      await bblam
        .post('/login/pin', JSON.stringify(data))
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/Autorization/#checkPasscode',
      });
    }
    setSpinner(false);
  });
};

export const resendChangeNewEmail = async () => {
  const userAuthenData = await promiseGetRecoil(userAuthenState);
  setSpinner(true);

  try {
    await bblam
      .post('/change/newemail', JSON.stringify({email: userAuthenData?.email}))
      .then(res => {
        const response = res?.data;
        console.log({response});
      })
      .catch(error => {
        console.log({
          error,
          path: '/services/api/Autorization/#resendChangeNewEmail',
        });
      });
  } catch (error) {
    console.log({
      trycatch: error,
      path: '/services/api/Autorization/#resendChangeNewEmail',
    });
  }
  setSpinner(false);
};

export const ChangeNewEmail = data => {
  setSpinner(true);
  Keyboard.dismiss();
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .post('/change/newemail', JSON.stringify({email: data?.email}))
        .then(res => {
          const response = res?.data;
          const code = response.code;
          console.log({response});
          if (code === '02') {
            promiseSetRecoil(userAuthenState, {email: data.email});
            RootNavigation.navigate('CheckPage', {
              path: 'email',
              method: 'ChangeEmail',
            });
          }
        })
        .catch(error => {
          reject(error.errors.email[0]);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/Autorization/#ChangeNewEmail',
      });
    }
    setSpinner(false);
  });
};

export const resendValidateRefCode = data => {
  // done revoke
  return new Promise(async (resolve, reject) => {
    setSpinner(false);
    try {
      await bblam
        .post('/resend/refcode', JSON.stringify(data))
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/Autorization/#resendValidateRefCode',
      });
    }
    setSpinner(false);
  });
};

export const getUserInfo = async () => {
  try {
    await bblam
      .get('/user')
      .then(response => {
        setUserInfoData({
          email: response.data.email,
          phone: response.data.phone,
          prefix: response.data.prefix,
          name: response.data.name,
          surname: response.data.surname,
          fullname: response.data.name_full,
        });
      })
      .catch(error => {
        console.log({
          error,
          path: '/services/api/Autorization/#getUserInfo',
        });
      });
  } catch (error) {
    console.log({
      trycatch: error,
      path: '/services/api/Autorization/#getUserInfo',
    });
  }
};

export const ValidateOTPForgotPassword = data => {
  // done revoke
  return new Promise(async (resolve, reject) => {
    setSpinner(true);

    try {
      await bblam
        .post('/validate/otp', JSON.stringify(data))
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/Autorization/#ValidateOTPForgotPassword',
      });
    }
    setSpinner(false);
  });
};

export const forgotPasswordApi = data => {
  // done revoke
  return new Promise(async (resolve, reject) => {
    setSpinner(true);

    try {
      await bblam
        .post('/forgot/password', JSON.stringify(data))
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/Autorization/#forgotPasswordApi',
      });
    }
    setSpinner(false);
  });
};

export const ResetPassword = data => {
  return new Promise(async (resolve, reject) => {
    setSpinner(true);

    try {
      await bblam
        .post('/reset/password', JSON.stringify(data))
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/Autorization/#ResetPassword',
      });
    }
    setSpinner(false);
  });
};

export const ChangePasswordApi = data => {
  return new Promise(async (resolve, reject) => {
    setSpinner(true);

    try {
      await bblam
        .post('/change/newpassword', JSON.stringify(data))
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/Autorization/#ChangePasswordApi',
      });
    }
    setSpinner(false);
  });
};

export const ChangeEmailConfirm = async () => {
  Keyboard.dismiss();
  setSpinner(true);

  try {
    await bblam
      .get('/recheck/newemail')
      .then(async res => {
        const response = res.data;
        console.log({response});
        if (response?.code === '02') {
          RootNavigation.navigate('Alert1', {
            children: <AlertVerifyEmailSuccess />,
            title: Translate('textConfirm2'),
            onPress: async () => {
              RootNavigation.reset({
                index: 0,
                routes: [{name: 'BBLAMONERoute'}],
              });
              await getUserInfo();
            },
          });
        } else if (response?.code === '05') {
          RootNavigation.navigate('Alert1', {
            children: <AlertVerifyFailed />,
            title: Translate('textConfirm2'),
          });
        }
      })
      .catch(error => {
        console.log({
          trycatch: error,
          path: '/services/api/Autorization/#ChangeEmailConfirm',
        });
      });
  } catch (error) {
    console.log({
      trycatch: error,
      path: '/services/api/Autorization/#ChangeEmailConfirm',
    });
  }
  setSpinner(false);
};

export const DeleteAccount = data => {
  return new Promise(async (resolve, reject) => {
    setSpinner(true);

    try {
      await bblam
        .post('/account/cancel', JSON.stringify(data))
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/Autorization/#DeleteAccount',
      });
    }
    setSpinner(false);
  });
};

export const Force_Update = data => {
  return new Promise(async (resolve, reject) => {
    setSpinner(true);

    try {
      await bblam
        .post(
          `/ver/version?ver_number=${data.ver_number}&ver_up_dateversion=${data.ver_up_dateversion}&ver_type=${data.ver_type}`,
        )
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/Autorization/#DeleteAccount',
      });
    }
    setSpinner(false);
  });
};
