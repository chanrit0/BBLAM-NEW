import React from 'react';
import { Container } from 'components/common';
import { Button, InputElement, TextBold, TextRegular } from 'components/atoms';
import { Translate } from 'function';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../Style';
import { Keyboard, View } from 'react-native';
import { COLORS, FONT_TYPE } from 'styles';
import { FontScale } from 'utils';

// recoil
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import {
  smallAlertState,
  spinnerState,
  userAuthenState,
  userDeviceStatusState,
} from 'recoil-state';
import InputPrefixName from '../../modules/InputPrefixName';
import { register } from 'services/api';
import { useHandleError } from 'hooks';

export default ({ navigation, handleForm, StepOneForm, lang }) => {
  // params
  const { control, handleSubmit, watch, clearErrors, setError } = handleForm;
  const { getValues } = StepOneForm;

  // global state
  const [userAuthData, setUserAuthenData] = useRecoilState(userAuthenState);

  // local state
  const [errors, setErrors] = React.useState(null);

  const password = watch('password');
  const ConfirmPassword = watch('password_confirmation');

  React.useEffect(() => {
    if (userAuthData) {
      handleForm.setValue('name', userAuthData.name);
      handleForm.setValue('surname', userAuthData.surname);
      handleForm.setValue('fullname', userAuthData.fullname);
      handleForm.setValue('email', userAuthData.email);
      handleForm.setValue('phone', userAuthData.phone == null || userAuthData.phone == undefined ? '-' : userAuthData.phone);
      handleForm.setValue('ref_code', userAuthData.ref_code);
      handleForm.setValue('fund_code', userAuthData.fund_code);
      handleForm.setValue('com_code', userAuthData.com_code);
    }
  }, []);

  // steptwo
  const FirstNameTextInput = React.useRef(null);
  const LastNameTextInput = React.useRef(null);
  const PhoneNumberTextInput = React.useRef(null);

  const _Submit = async data => {
    Keyboard.dismiss();
    clearErrors();

    const sendingData = {
      username: getValues('username'),
      password: getValues('password'),
      password_confirmation: getValues('password_confirmation'),
      prefix: data.prefix,
      name: data.name,
      surname: data.surname,
      email: getValues('username'),
      phone: data.phone,
      lang: lang.toLowerCase(),
    };

    if (userAuthData) {
      sendingData['ref_code'] = data.ref_code;
      sendingData['fund_code'] = data.fund_code;
      sendingData['com_code'] = data.com_code;
    }
    await register(sendingData)
      .then(response => {
        const ref_no = response?.ref_no;
        const code = response?.code;

        if (code === '03') {
          setUserAuthenData(v => ({
            ...v,
            ...sendingData,
            ref_no,
            emailMock: response?.username,
          }));
          navigation.navigate('CheckPage', { path: 'email' });
        }
      })
      .catch(error => {
        for (const [key, value] of Object.entries(error?.errors)) {
          setError(key, {
            type: 'server',
            message: value.map(item => item + '\n'),
          });
        }
      });
  };

  const _Error = error => {
    Keyboard.dismiss();
    console.log(error);
  };

  const onBlur = () => {
    if (password !== ConfirmPassword) {
      setErrors({
        errorStyle: {
          alignSelf: 'flex-end',
          fontFamily: FONT_TYPE.REGULAR,
          fontSize: FontScale(16),
          color: COLORS.ERROR,
        },
        errorMessage: Translate('textPasswordNotValid'),
        inputContainerStyle: {
          borderBottomColor: COLORS.ERROR,
        },
      });
      return true;
    } else {
      setErrors(null);
      return false;
    }
  };

  return (
    <>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <Container style={styles.container}>
          <InputPrefixName
            ControllerProps={{
              control,
              rules: { required: Translate('textInputRequired') },
              name: 'prefix',
            }}
          />
          <InputElement
            value={userAuthData?.name && userAuthData?.pullData}
            ControllerProps={{
              control,
              rules: { required: Translate('textInputRequired') },
              name: 'fullname',
            }}
            InputProps={{
              ref: input => (FirstNameTextInput.current = input),
              onSubmitEditing: () => {
                LastNameTextInput.current.focus();
              },
              blurOnSubmit: false,
              returnKeyType: 'next',
              label: `${Translate('textFullName')}`,
              placeholder: `${Translate('textFillInput')}${Translate(
                'textFullName',
              )}`,
            }}
            isRequired
          />
          {/* <InputElement
            value={userAuthData?.surname && userAuthData?.pullData}
            ControllerProps={{
              control,
              rules: {
                required: Translate('textInputRequired'),
              },
              name: 'surname',
            }}
            InputProps={{
              label: `${Translate('textLastName')}`,
              placeholder: `${Translate('textFillInput')}${Translate(
                'textLastName',
              )}`,
              returnKeyType: 'next',
              ref: input => (LastNameTextInput.current = input),
              onSubmitEditing: () => {
                PhoneNumberTextInput.current.focus();
              },
              onBlur: onBlur,
              ...errors,
            }}
            isRequired
          /> */}
          <InputElement
            value={userAuthData?.name && userAuthData?.pullData}
            ControllerProps={{
              control,
              rules: { required: Translate('textInputRequired') },
              name: 'phone',
            }}
            InputProps={{
              label: `${Translate('textMobilePhoneNumber')}`,
              placeholder: `${Translate('textFillInput')}${Translate(
                'textMobilePhoneNumber',
              )}`,
              keyboardType: 'number-pad',
              ref: input => (PhoneNumberTextInput.current = input),
              onBlur: onBlur,
              ...errors,
            }}
            isRequired
          />
          {/* <InputElement
            value={userAuthData?.phone}
            ControllerProps={{
              control,
              rules: {
                required: Translate('textInputRequired'),
              },
              name: 'phone',
            }}
            InputProps={{
              label: `${Translate('textMobilePhoneNumber')}`,
              placeholder: `${Translate('textFillInput')}${Translate(
                'textMobilePhoneNumber',
              )}`,
              keyboardType: 'number-pad',
              ref: input => (PhoneNumberTextInput.current = input),
              onBlur: onBlur,
              ...errors,
            }}
            isRequired
          /> */}
          {/* <View>
            <TextBold
              style={{
                fontWeight: 'bold',
                color: COLORS.PRIMARY,
                fontFamily: FONT_TYPE.REGULAR,
                fontSize: FontScale(18),
              }}>
              {Translate('textMobilePhoneNumber')}
              <TextBold
                style={{
                  fontWeight: 'bold',
                  color: COLORS.RED,
                  fontFamily: FONT_TYPE.REGULAR,
                  fontSize: FontScale(18),
                }}>
                {'*'}
              </TextBold>
            </TextBold>
            <TextRegular
              style={{
                fontWeight: 'bold',
                // color: COLORS.PRIMARY,
                fontFamily: FONT_TYPE.REGULAR,
                fontSize: FontScale(18),
              }}>
              {userAuthData?.phone == null ? '-' : userAuthData.phone}
            </TextRegular>
          </View> */}
        </Container>
        <Container style={{ flex: 0 }}>
          <Button
            title={Translate('textNext')}
            type="fill"
            onPress={handleSubmit(_Submit, _Error)}
            style={styles.button}
          />
        </Container>
      </ScrollView>
    </>
  );
};
