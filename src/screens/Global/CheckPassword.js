/* eslint-disable react-native/no-inline-styles */
// React
import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';

// custom
import {Translate} from 'function';
import {ViewScale, setSpinner} from 'utils';
import {COLORS, SPACING, FONT_SIZE} from 'styles';
// components
import {Container} from 'components/common';
import {AlertPasscodeMismatch} from 'components/molecules';
import {
  Button,
  SafeAreaView,
  InputElement,
  TextMedium,
  TextRegular,
} from 'components/atoms';
import Header from 'components/header/MainHeader';
import {isIOS} from 'utils';

// lib
import _ from 'lodash';
import {useForm} from 'react-hook-form';
import {CheckPassword} from 'services/api/member';

export default ({navigation, route}) => {
  const goToScreen = route.params?.goToScreen;
  const setPasswordMatch = route.params?.setPasswordMatch;
  const {control, watch, handleSubmit} = useForm();

  const _onPress = async data => {
    Keyboard.dismiss();
    setSpinner(true);
    await CheckPassword(data)
      .then(response => {
        if (response.code === '02' || response.status == 'success') {
          setPasswordMatch(true);
          navigation.goBack();
        } else if (response.code === '00' || response.status == 'fail') {
          navigation.navigate('Alert1', {
            children: <AlertPasscodeMismatch />,
            title: Translate('textConfirm2'),
          });
        }
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setSpinner(false));
  };

  const _onError = error => {
    console.log({error});
  };

  return (
    <SafeAreaView>
      <StatusBar animated barStyle={'dark-content'} />
      <Header navigation={navigation} />
      <KeyboardAvoidingView behavior={isIOS ? 'padding' : ''} style={{flex: 1}}>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}>
          <View style={styles.rootContainer}>
            <Container>
              <TextMedium color={COLORS.PRIMARY} size={FONT_SIZE.TITLE_4}>
                {Translate('textPassword')} (Password)
              </TextMedium>
              <TextRegular color={COLORS.THIRDARY}>
                {'โปรดกรอกรหัสผ่านเพื่อเปลี่ยนทางเลือกการลงทุน'}
              </TextRegular>
              <View style={{marginTop: ViewScale(100)}}>
                <InputElement
                  ControllerProps={{
                    control,
                    name: 'password',
                    rules: {
                      required: Translate('textInputRequired'),
                    },
                  }}
                  InputProps={{
                    placeholder: `กรอกรหัสผ่าน (Password)`,
                  }}
                  isPassword
                />
              </View>
            </Container>
            <Container
              style={{
                flex: 0,
                marginTop: ViewScale(20),
                marginBottom: SPACING.FOOTER_HEIGHT,
              }}>
              <Button
                type={'fill'}
                title={Translate('textConfirm')}
                onPress={handleSubmit(_onPress, _onError)}
              />
            </Container>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textLabel: {
    color: COLORS.PRIMARY,
  },
  rootContainer: {
    flex: 1,
    marginTop: ViewScale(30),
  },
});
