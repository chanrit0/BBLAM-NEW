import React from 'react';
import {View, StyleSheet, ScrollView, KeyboardAvoidingView} from 'react-native';
import Header from 'components/header/MainHeader';
import {COLORS, FONT_SIZE, SPACING} from 'styles';
import {Container} from 'components/common';
import {Translate} from 'function';
import {FontScale} from 'utils';
import {isIOS} from 'utils';
import {
  Button,
  InputElement,
  KeyboardDismiss,
  TextMedium,
  TextRegular,
} from 'components/atoms';
import {useForm} from 'react-hook-form';
import {useRecoilState, useRecoilValue} from 'recoil';
import {languageState, userAuthenState} from 'recoil-state';
import {ChangeNewEmail} from 'services/api';
import {SafeAreaView} from 'react-native-safe-area-context';

export default ({navigation}) => {
  // global state
  useRecoilValue(languageState);
  const [userAuthenData, setUserAuthenData] = useRecoilState(userAuthenState);

  // local state
  const [error, setError] = React.useState('');

  const {control, handleSubmit} = useForm();

  React.useEffect(() => {
    return () => {
      setUserAuthenData(null);
    };
  }, []);

  const onPressChangeNewEmail = async data => {
    await ChangeNewEmail({email: data.email}).catch(error => {
      setError(error);
    });
  };

  const onError = error => {
    console.log({error});
  };

  return (
    <KeyboardDismiss>
      <SafeAreaView style={{flex: 1}}>
        <Header navigation={navigation} />
        <KeyboardAvoidingView
          behavior={isIOS ? 'padding' : ''}
          style={{flex: 1}}>
          <ScrollView
            style={{flex: 1}}
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            keyboardShouldPersistTaps={'handled'}>
            <Container style={{flexGrow: 0.5, justifyContent: 'flex-end'}}>
              <View style={{flexGrow: 0.5}}>
                <TextMedium style={styles.title}>
                  {Translate('textChangeNewEmail')}
                </TextMedium>
                <TextRegular style={styles.titleDesc}>
                  {Translate('textChangeNewEmailDesc')}
                </TextRegular>
              </View>
            </Container>
            <Container style={{flexGrow: 1.5}}>
              <InputElement
                ControllerProps={{
                  control,
                  name: 'email',
                  rules: {
                    required: Translate('textInputRequired'),
                    pattern: {
                      value:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'กรุณากรอกอีเมลให้ถูกต้อง',
                    },
                  },
                }}
                InputProps={{
                  label: Translate('textEmail'),
                  errorMessage: error,
                  placeholder: `${Translate('textFillInput')}${Translate(
                    'textEmail',
                  )}`,
                }}
              />
            </Container>
            <Container
              style={{
                flex: 0,
                justifyContent: 'flex-end',
                marginBottom: SPACING.FOOTER_HEIGHT,
              }}>
              <Button
                title={Translate('textNext')}
                type={'fill'}
                onPress={handleSubmit(onPressChangeNewEmail, onError)}
              />
            </Container>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </KeyboardDismiss>
  );
};

const styles = StyleSheet.create({
  title: {color: COLORS.PRIMARY, fontSize: FontScale(28)},
  titleDesc: {color: COLORS.THIRDARY, fontSize: FONT_SIZE.BODY_1},
});
