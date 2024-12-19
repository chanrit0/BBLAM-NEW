// react
import React from 'react';
import { ScrollView, View, Text } from 'react-native';

// custom
import { Translate } from 'function';
import styles from '../Style';
import { register } from 'services/api';

// components
import { Container } from 'components/common';
import { Button, InputElement, TextBold, TextRegular } from 'components/atoms';
import { FontScale, isIOS } from 'utils';
import { useRecoilState } from 'recoil';
import { userAuthenState } from 'recoil-state';
import { COLORS, FONT_SIZE, FONT_TYPE } from 'styles';
import InputPrefixName from '../../modules/InputPrefixName';
import _ from 'lodash';

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
      handleForm.setValue('phone', userAuthData.phone);
      handleForm.setValue('ref_code', userAuthData.ref_code);
      handleForm.setValue('fund_code', userAuthData.fund_code);
    }
  }, []);

  // steptwo
  const FirstNameTextInput = React.useRef(null);
  const LastNameTextInput = React.useRef(null);
  const EmailTextInput = React.useRef(null);

  const _Submit = async data => {
    clearErrors();

    let sendingData = {
      username: getValues('username'),
      password: getValues('password'),
      password_confirmation: getValues('password_confirmation'),
      prefix: data.prefix,
      name: data.name,
      surname: data.surname,
      phone: getValues('username'),
      lang: lang.toLowerCase(),
    };

    if (userAuthData) {
      sendingData['ref_code'] = data.ref_code;
      sendingData['fund_code'] = data.fund_code;
      sendingData['com_code'] = data.com_code;
    }

    if (!_.isEmpty(data?.email)) {
      sendingData['email'] = data?.email;
    }

    await register(sendingData)
      .then(response => {
        console.log({ response });
        const ref_no = response?.ref_no;
        const code = response?.code;

        if (String(code) === '03') {
          setUserAuthenData({
            ...sendingData,
            ref_no,
            phoneMock: response?.username,
          });
          navigation.navigate('CheckPage', { path: 'phonenumber' });
        }
      })
      .catch(error => {
        console.log(error);
        for (const [key, value] of Object.entries(error?.errors)) {
          setError(key, {
            type: 'server',
            message: value.map(item => item + '\n'),
          });
        }
      });
  };

  const _Error = error => {
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
              rules: {
                required: Translate('textInputRequired'),
              },
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
                EmailTextInput.current.focus();
              },
              onBlur: onBlur,
              ...errors,
            }}
            isRequired
          /> */}
          {userAuthData?.email != '' ? (
            <InputElement
              ControllerProps={{
                control,
                name: 'email',
                rules: {
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: Translate('textInputEmailValid'),
                  },
                },
              }}
              InputProps={{
                label: `${Translate('textEmail')}`,
                placeholder: `${Translate('textFillInput')}${Translate(
                  'textEmail',
                )}`,
                returnKeyType: 'done',
                keyboardType: 'email-address',
                ref: input => (EmailTextInput.current = input),
                onBlur: onBlur,
                ...errors,
              }}
            />
          ) : (
            <View>
              <TextBold
                style={{
                  fontWeight: isIOS ? null : 'normal',
                  fontFamily: FONT_TYPE.SEMI_BOLD,
                  color: COLORS.PRIMARY,
                  fontSize: FontScale(18),
                }}>
                {'อีเมล'}
                <TextBold
                  style={{
                    fontWeight: isIOS ? null : 'normal',
                    fontFamily: FONT_TYPE.SEMI_BOLD,
                    color: COLORS.RED,
                    fontSize: FontScale(18),
                  }}>
                  {'*'}
                </TextBold>
              </TextBold>
              <TextRegular
                style={{
                  fontWeight: isIOS ? null : 'normal',
                  fontFamily: FONT_TYPE.SEMI_BOLD,
                  color: COLORS.PRIMARY,
                  fontSize: FontScale(18),
                }}>
                {'  -'}
              </TextRegular>
            </View>
          )}
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
