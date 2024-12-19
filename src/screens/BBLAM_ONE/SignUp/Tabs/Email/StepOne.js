import React from 'react';
import {Container} from 'components/common';
import {Button, InputElement} from 'components/atoms';
import {Translate} from 'function';
import {Keyboard, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import styles from '../Style';

// recoil
import {useRecoilValue} from 'recoil';
import {userAuthenState} from 'recoil-state';
import {register} from 'services/api';
import {AlertFailed} from 'components/molecules';

export default ({onIndexChange, handleForm, lang, navigation}) => {
  // stepone
  const passwordTextInput = React.useRef(null);
  const ConfirmPasswordTextInput = React.useRef(null);

  // global state
  const userAuthData = useRecoilValue(userAuthenState);

  // local state
  const scrollviewRef = React.useRef(null);
  const {control, handleSubmit, watch, clearErrors, setError} = handleForm;

  React.useEffect(() => {
    if (userAuthData) {
      handleForm.setValue('username', userAuthData.email);
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
            value={userAuthData?.email && userAuthData?.pullData}
            description={
              'หากอีเมลไม่ถูกต้อง กรุณาติดต่อคณะกรรมการกองทุนของท่าน'
            }
            ControllerProps={{
              control,
              rules: {
                required: Translate('textInputRequired'),
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: Translate('textInputEmailValid'),
                },
              },
              name: 'username',
            }}
            InputProps={{
              textContentType: 'emailAddress',
              label: `${Translate('textEmailUsername')}`,
              placeholder: `${Translate('textFillInput')}${Translate(
                'textEmailUsername',
              )}`,
              returnKeyType: 'next',
              keyboardType: 'email-address',
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
