// react
import React from 'react';
import {Keyboard, ScrollView, View} from 'react-native';

// custom
import {Translate} from 'function';
import {FontScale} from 'utils';
import styles from '../Style';

// components
import {Container} from 'components/common';
import {Button, InputElement} from 'components/atoms';
import {useRecoilValue} from 'recoil';
import {userAuthenState} from 'recoil-state';
import {register} from 'services/api';
import {AlertFailed} from 'components/molecules';

export default ({onIndexChange, handleForm, lang, navigation}) => {
  // params
  const {control, handleSubmit, watch, clearErrors, setValue, setError} =
    handleForm;

  // global state
  const userAuthData = useRecoilValue(userAuthenState);

  // local state

  // stepone
  const passwordTextInput = React.useRef(null);
  const ConfirmPasswordTextInput = React.useRef(null);
  const scrollviewRef = React.useRef(null);

  React.useEffect(() => {
    if (userAuthData) {
      setValue('username', userAuthData.phone);
    }
  }, []);

  const password = watch('password');
  const ConfirmPassword = watch('password_confirmation');

  const _Submit = async data => {
    Keyboard.dismiss();
    clearErrors();

    const sendingData = {
      username: data.username,
      password: data.password,
      password_confirmation: data.password_confirmation,
      lang: lang.toLowerCase(),
    };

    await register(sendingData)
      .then(response => {
        onIndexChange(1);
      })
      .catch(error => {
        if (userAuthData?.pullData) {
          navigation.navigate('Alert1', {
            children: AlertFailed(error?.errors?.username[0]),
            title: Translate('textConfirm2'),
          });
        } else {
          for (const [key, value] of Object.entries(error?.errors)) {
            setError(key, {
              type: 'server',
              message: value.map(item => item + '\n'),
            });
          }
        }
      });
  };

  const _Error = error => {
    console.log({error});
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView
        ref={scrollviewRef}
        style={{flex: 1}}
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <Container style={styles.container}>
          <InputElement
            value={userAuthData?.phone && userAuthData?.pullData}
            description={
              'หากหมายเลขไม่ถูกต้อง กรุณาติดต่อคณะกรรมการกองทุนของท่าน'
            }
            ControllerProps={{
              control,
              rules: {
                required: Translate('textInputRequired'),
                pattern: {
                  value: /^[0][1-9]\d{8}$|^[1-9]\d{8}$/g,
                  message: Translate('textValidatePhonenumber'),
                },
              },
              name: 'username',
            }}
            InputProps={{
              label: `${Translate('textPhoneNumberUser')}`,
              placeholder: `${Translate('textFillInput')}${Translate(
                'textPhoneNumberUser',
              )}`,
              keyboardType: 'number-pad',

              onSubmitEditing: () => {
                passwordTextInput.current.focus();
              },
              blurOnSubmit: false,
            }}
            isRequired
          />
          <InputElement
            ControllerProps={{
              control,
              rules: {
                required: Translate('textInputRequired'),
                pattern: {
                  value:
                    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#\$%\^\&*\)\(+=._-]).{8,}$/,
                  message: 'ท่านตั้งรหัสไม่ครบตามเงื่อนไขที่กำหนด',
                },
              },
              name: 'password',
            }}
            InputProps={{
              ref: input => (passwordTextInput.current = input),
              onSubmitEditing: () => {
                ConfirmPasswordTextInput.current.focus();
              },
              blurOnSubmit: false,
              returnKeyType: 'next',
              label: `${Translate('textPassword')}`,
              placeholder: `${Translate('textFillInput')}${Translate(
                'textPassword',
              )}`,
            }}
            watch={password}
            isRequired
            isPassword
            isShowPasswordGUI
          />
          <InputElement
            ControllerProps={{
              control,
              rules: {
                required: Translate('textInputRequired'),
                validate: {
                  matchPassword: v => v === password || 'รหัสผ่านไม่ตรงกัน',
                },
              },
              name: 'password_confirmation',
            }}
            InputProps={{
              label: `${Translate('textConfirmPassword')}`,
              placeholder: `${Translate('textFillInput')}${Translate(
                'textConfirmPassword',
              )}`,
              returnKeyType: 'done',
              ref: input => (ConfirmPasswordTextInput.current = input),
            }}
            oldpassword={password}
            watch={ConfirmPassword}
            isRequired
            isPassword
            isConfirmPassword
          />
        </Container>
        <Container style={{flex: 0}}>
          <Button
            title={Translate('textNext')}
            type="fill"
            onPress={handleSubmit(_Submit, _Error)}
            style={styles.button}
          />
        </Container>
      </ScrollView>
    </View>
  );
};
