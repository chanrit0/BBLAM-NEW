/* eslint-disable react-native/no-inline-styles */
// React
import React from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

// custom
import styles from './Style';
import {Translate} from 'function';
import {ViewScale,showSmallAlert, isIOS} from 'utils';
import {SPACING} from 'styles';

// component
import Header from 'components/header/MainHeader';
import {Container} from 'components/common';
import {
  Button,
  InputElement,
  CheckBox,
  TextRegular,
  TextBold,
} from 'components/atoms';
import {AlertCheckYourEmail} from 'components/molecules/AlertsTypes/AlertComponents';
import {AlertFailed} from 'components/molecules';

// recoil
import {useRecoilValue} from 'recoil';
import {languageState} from 'recoil-state';

// lib
import {useForm} from 'react-hook-form';
import _ from 'lodash';

// services
import {forgotPasswordApi} from 'services/api';

export default function ForgotPassword({navigation}) {
  const {control, handleSubmit, reset} = useForm();
  useRecoilValue(languageState);
  const [selectedCheckbox, setSelectedCheckbox] = React.useState(0);

  const SelectSendWith = React.useCallback(
    selected => () => {
      reset({username: ''});
      setSelectedCheckbox(selected);
    },
    [],
  );

  const callApi = async data => {
    Keyboard.dismiss();

    const sendingData = {
      username: data.username,
      type: selectedCheckbox === 0 ? 'email' : 'phone',
    };

    await forgotPasswordApi(sendingData)
      .then(response => {
        const code = response?.code;
        const ref_no = response?.ref_no;

        if (code === '04') {
          navigation.navigate('Alert1', {
            children: <AlertCheckYourEmail typeForgot={sendingData.type} />,
            // children: AlertFailed(response.message),
            title: Translate('textConfirm2'),
          });
        } else if (code === '02') {
          if (selectedCheckbox === 0) {
            navigation.navigate('Alert1', {
              children: <AlertCheckYourEmail typeForgot={sendingData.type} />,
              title: Translate('textConfirm2'),
            });
          } else {
            navigation.navigate('AlertOTP', {
              phone: response?.username,
              ref_no,
              sendingData,
            });
          }
        }
      })
      .catch(error => {
        showSmallAlert(error.message);
        console.log(error);
      });
  };
  const _onError = error => {
    console.log({error});
  };

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <Header navigation={navigation} />
        <KeyboardAvoidingView
          enabled
          behavior={isIOS ? 'padding' : ''}
          style={{flexGrow: 1}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            style={{flex: 1}}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{flexGrow: 1}}>
            <Container style={{flexGrow: 1, justifyContent: 'center'}}>
              <View style={{flexGrow: 0.6}}>
                {/* header */}
                <TextBold style={styles.headerText}>
                  {Translate('textForgotPassword')}
                </TextBold>

                {/* description */}
                <TextRegular style={styles.headerTextDesc}>
                  {Translate('textForgotPasswordDescription')}
                </TextRegular>

                <View style={styles.checkBoxRowContainer}>
                  <TouchableOpacity
                    style={styles.checkboxContainer}
                    onPress={SelectSendWith(0)}>
                    <CheckBox
                      isCustom
                      onCheck={selectedCheckbox === 0 && true}
                    />
                    <TextRegular>{'กรอกด้วยอีเมล'}</TextRegular>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.checkboxContainer}
                    onPress={SelectSendWith(1)}>
                    <CheckBox
                      isCustom
                      onCheck={selectedCheckbox === 1 && true}
                    />
                    <TextRegular>{'กรอกด้วยเบอร์โทรศัพท์'}</TextRegular>
                  </TouchableOpacity>
                </View>

                {/* input */}

                <InputElement
                  ControllerProps={{
                    control,
                    name: 'username',
                    rules: {required: Translate('textInputRequired')},
                  }}
                  InputProps={{
                    placeholder: Translate(
                      selectedCheckbox === 0
                        ? 'textInputForgotEmail'
                        : 'textInputForgotPhone',
                    ),
                    keyboardType:
                      selectedCheckbox === 0 ? 'default' : 'number-pad',
                  }}
                />
              </View>
            </Container>

            {/* footer button */}
            <Container
              style={{
                flex: 0,
                marginTop: ViewScale(30),
                marginBottom: SPACING.FOOTER_HEIGHT,
              }}>
              <Button
                title={Translate('textSendButton')}
                type="fill"
                onPress={handleSubmit(callApi, _onError)}
              />
            </Container>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}
