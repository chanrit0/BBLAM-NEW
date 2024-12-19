//react
import React from 'react';
import {
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  StatusBar,
  Linking,
  Keyboard,
} from 'react-native';

// custom
import {Translate} from 'function';
import {ViewScale, FontScale, showSmallAlert, setSpinner} from 'utils';
import styles from './Style';
import {globalStyle, SPACING} from 'styles';
import {isIOS} from 'utils';

// components
import Header from 'components/header/MainHeader';
import {Container} from 'components/common';
import {Button, SafeAreaView, InputElement} from 'components/atoms';
import {FontAwesome} from 'components/Icons';
import {
  AlertAlreadyUseRefCode,
  AlertNotFoundDataRefCodeCommitteeNotLogin,
  AlertNotFoundDataRefCodeFundMember,
  AlertNotFoundDataRefCodeMember,
  AlertNotFoundDataRefCodeMemberNotLogin,
  AlertNotFoundDataRefCodeMemberOnlyPhone,
} from 'components/molecules';
import {Description} from './components/Description';
import {SmallDesc} from './components/SmallDesc';

// recoil
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {userAuthenState, userDeviceStatusState} from 'recoil-state';

// services
import {activeRefCode, getDataFromRefCode} from 'services/api';

// libs
import {useForm} from 'react-hook-form';

// config
import {PHONENUMBER_BBLAM} from 'config';

export default function PVDConnect({navigation}) {
  const {control, handleSubmit, getValues} = useForm();
  const setUserAuthenData = useSetRecoilState(userAuthenState);
  const userStatus = useRecoilValue(userDeviceStatusState);

  const onError = data => {
    if (data.com_code.message != '') {
      console.log('log ตัวไหน', data.com_code.message);
    } else {
      console.log(data);
    }
  };

  const _Next = async data => {
    Keyboard.dismiss();

    const isCommittee = data?.ref_code.length === 6 && true;

    if (userStatus.isSignIn) {
      await activeRefCode(data)
        .then(response => {
          const code = response?.code;
          const ref_no = response?.ref_no;
          if (String(code) === '00' || String(code) === '04') {
            // not found
            navigation.navigate('Alert3', {
              children: isCommittee ? (
                <AlertNotFoundDataRefCodeFundMember />
              ) : (
                <AlertNotFoundDataRefCodeMember />
              ),
              iconLeft: isCommittee && (
                <FontAwesome
                  name={'mobile-phone'}
                  size={FontScale(30)}
                  color={'#FFF'}
                  style={{marginRight: ViewScale(10)}}
                />
              ),
              titleLeft: isCommittee
                ? Translate('textContact')
                : Translate('textConfirm2'),
              titleRight: 'เปลี่ยนอีเมล \nBBLAM ทันที',
              onPressLeft: async () => {
                return (
                  isCommittee &&
                  (await Linking.openURL(`tel:${PHONENUMBER_BBLAM}`))
                );
              },
              onPressRight: () => {
                navigation.navigate('ChangeEmail');
              },
              TouchableBackdrop: true,
            });
          } else if (String(code) === '02') {
            let type = response?.type;
            console.log({response});
            if (type === 'email') {
              type = 'email';
              setUserAuthenData({
                ...data,
                emailMock: response.username,
                ref_no,
              });
            } else if (type === 'phone') {
              type = 'phonenumber';
              setUserAuthenData({
                ...data,
                phoneMock: response.username,
                ref_no,
              });
            }
            navigation.navigate('CheckPage', {
              path: type,
            });
          } else if (String(code) === '05') {
            navigation.navigate('Alert1', {
              children: <AlertAlreadyUseRefCode />,
              title: Translate('textConfirm2'),
              TouchableBackdrop: true,
            });
          } else if (String(code) === '06') {
            navigation.navigate('Alert1', {
              children: <AlertNotFoundDataRefCodeMemberOnlyPhone />,
              title: Translate('textConfirm2'),
              TouchableBackdrop: true,
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      await getDataFromRefCode(data)
        .then(response => {
          console.log({response});

          if (response.status == '00') {
            const testMes = response.message;
            // not found
            navigation.navigate('Alert1', {
              children: isCommittee ? (
                <AlertNotFoundDataRefCodeCommitteeNotLogin
                  testMessage={testMes}
                />
              ) : (
                <AlertNotFoundDataRefCodeMemberNotLogin testMessage={testMes} />
              ),
              icon: isCommittee && (
                <FontAwesome
                  name={'mobile-phone'}
                  size={FontScale(30)}
                  color={'#FFF'}
                  style={{marginRight: ViewScale(10)}}
                />
              ),
              title: isCommittee
                ? Translate('textContact')
                : Translate('textConfirm2'),
              onPress: async () => {
                isCommittee &&
                  (await Linking.openURL(`tel:${PHONENUMBER_BBLAM}`));
              },
              TouchableBackdrop: true,
            });
          } else if (response.status == '02') {
            // founded
            const convertData = {
              id: response?.data?.ucm_list_id,
              email: response?.data?.ucm_list_email,
              name: response?.data?.ucm_list_firstname,
              surname: response?.data?.ucm_list_lastname,
              fullname: response?.data?.ucm_list_fullname,
              phone: response?.data?.ucm_list_phone,
              ref_code: getValues('ref_code'),
              fund_code: getValues('fund_code'),
              com_code: getValues('com_code'),
              pullData: true,
              isCommittee: isCommittee,
            };
            setUserAuthenData(convertData);
            navigation.navigate('SignUp');
          } else if (response.status == '05') {
            navigation.navigate('Alert1', {
              children: <AlertAlreadyUseRefCode />,
              title: Translate('textConfirm2'),
              TouchableBackdrop: true,
            });
          }else{console.log('ไม่เข้าเงื่อนไขใดๆ');}
        })
        .catch(error => {
          console.log({error});
        });
    }
  };

  React.useEffect(() => {
    setSpinner(false);
  }, []);

  return (
    <>
      <SafeAreaView>
        <StatusBar
          barStyle={'dark-content'}
          animated
          backgroundColor={'white'}
        />
        <Header
          navigation={navigation}
          title={Translate('textTitlePVDConnect')}
          callbackFunction={async () => {
            navigation.goBack();
          }}
        />

        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={isIOS ? 'padding' : ''}>
          <ScrollView
            keyboardShouldPersistTaps={'handled'}
            showsVerticalScrollIndicator={false}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../../assets/images/logo.png')}
                style={globalStyle.logo}
                resizeMode={'contain'}
              />
            </View>

            <Container style={styles.container}>
              <InputElement
                ControllerProps={{
                  control,
                  name: 'ref_code',
                  rules: {
                    required: Translate('textInputRequired'),
                    pattern: {
                      value: /^(.{6}||.{8})$/,
                      message: 'กรุณากรอกรูปแบบรหัสอ้างอิง 6 หรือ 8 หลัก',
                    },
                  },
                }}
                InputProps={{
                  autoCapitalize: 'characters',
                  label: Translate('textRefCode'),
                  placeholder: Translate('textRefCode'),
                }}
              />
              <Description />
              <InputElement
                ControllerProps={{
                  control,
                  name: 'com_code',
                  rules: {
                    required: Translate('textInputRequired'),
                    pattern: {
                      value: /^(.{5})$/,
                      message: 'กรุณากรอกรูปแบบรหัสนายจ้างจำนวน 5 หลัก',
                    },
                  },
                }}
                InputProps={{
                  autoCapitalize: 'characters',
                  label: Translate('textComCode'),
                  placeholder: Translate('textComCode'),
                }}
              />
              <InputElement
                ControllerProps={{
                  control,
                  name: 'fund_code',
                  rules: {
                    required: Translate('textInputRequired'),
                    pattern: {
                      value: /^(.{8})$/,
                      message: 'กรุณากรอกรูปแบบรหัสกองทุนจำนวน 8 หลัก',
                    },
                  },
                }}
                InputProps={{
                  autoCapitalize: 'characters',
                  label: Translate('textFundCode'),
                  placeholder: Translate('textFundCode'),
                }}
              />
              <SmallDesc />
            </Container>
            <Container style={styles.footer}>
              <Button
                title={Translate('textNext')}
                type="fill"
                onPress={handleSubmit(_Next, onError)}
              />
            </Container>
            <View style={{height: SPACING.FOOTER_HEIGHT}} />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}
