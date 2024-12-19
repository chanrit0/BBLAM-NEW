// React
import React from 'react';
import {View, FlatList, StatusBar, BackHandler} from 'react-native';

// custom
import {Translate} from 'function';
import {getUserInfoData, ViewScale} from 'utils';
import styles from './Style';

// components
import QuestionView from 'components/Global/Self-Evaluation/QuestionView';
import Header from 'components/header/MainHeader';
import {Button, SafeAreaView, TextMedium} from 'components/atoms';

// lib
import _ from 'lodash';
import {useRecoilState, useSetRecoilState} from 'recoil';

// data
import {spinnerState, userInfoState} from 'recoil-state';
import {COLORS, FONT_SIZE} from 'styles';
import {
  checkChangeFund,
  getRiskQuestion,
  sendRiskProfile,
} from 'services/api/member';
import {AlertFailed, AlertSuccess} from 'components/molecules';
import {CommonActions} from '@react-navigation/native';

export default ({navigation, route}) => {
  const [answer, setAnswer] = React.useState([]);
  const setSpinner = useSetRecoilState(spinnerState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [question, setQuestion] = React.useState([]);
  const backIconCallback = route.params?.backIconCallback;

  const _onSelected = (answerIndex, questionIndex) => {
    if (_.isEmpty(answer)) {
      setAnswer([{question: questionIndex + 1, answer: answerIndex + 1}]);
    } else {
      setAnswer(oldArray => {
        const tempArray = oldArray.filter(
          item => item.question !== questionIndex + 1,
        );
        return [
          ...tempArray,
          {question: questionIndex + 1, answer: answerIndex + 1},
        ];
      });
    }
  };

  const callCheckChangeFund = async () => {
    await checkChangeFund()
      .then(response => {
        if (response.code == '02') {
          setUserInfo(v => ({...v, change_fund_status: true}));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const _onSubmit = async () => {
    if (answer.length !== question.length) {
      return navigation.navigate('Alert1', {
        children: (
          <View style={{paddingVertical: ViewScale(40)}}>
            <TextMedium>กรุณากรอกข้อมูลให้ครบ</TextMedium>
          </View>
        ),
        title: Translate('textConfirm2'),
      });
    } else {
      const userInfo = await getUserInfoData();
      setSpinner(true);
      await sendRiskProfile({
        fund_code: userInfo.fund_code,
        com_code: userInfo.com_code,
        em_code: userInfo.em_code,
        answer,
      })
        .then(async response => {
          if (response.status === 'success') {
            setUserInfo(v => ({...v, risk_profile_status: true}));
            await callCheckChangeFund();
            navigation.navigate('Alert1', {
              children: AlertSuccess(Translate('textSuccess')),
              title: Translate('textConfirm2'),
              onPress: () => {
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [
                      {
                        name: 'MemberRoute',
                        state: {
                          routes: [
                            {
                              name: 'Drawer',
                              state: {
                                routes: [
                                  {
                                    name: 'Drawer',
                                    state: {
                                      routes: [
                                        {
                                          name: 'Home',
                                          state: {
                                            routes: [
                                              {
                                                name: 'RiskProfile',
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  }),
                );
              },
            });
          }
        })
        .catch(error => {
          navigation.navigate('Alert1', {
            children: AlertFailed(error.message_header, error.message_body),
            title: Translate('textConfirm2'),
          });
        });
    }
  };

  const callQuestion = async () => {
    await getRiskQuestion()
      .then(response => {
        setQuestion(response);
      })
      .catch(error => {
        console.log({
          error,
          path: '/screen/Global/Self-Evaluation/#callQuestion',
        });
      })
      .finally(() => setSpinner(false));
  };

  React.useEffect(() => {
    setSpinner(true);
    callQuestion();

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (userInfo.risk_profile_status == false) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: 'BBLAMONERoute',
                  state: {
                    routes: [
                      {
                        name: 'Drawer',
                        state: {
                          routes: [
                            {
                              name: 'Main',
                              state: {
                                routes: [
                                  {
                                    name: 'TabBar',
                                  },
                                  {
                                    name: 'PVDStack',
                                    state: {
                                      routes: [
                                        {
                                          name: 'Portal',
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            }),
          );
          return true;
        }
        return false;
      },
    );

    return () => backHandler.remove();
  }, []);
  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <SafeAreaView noBottom />
      <Header
        navigation={navigation}
        animate
        callbackFunction={backIconCallback}
      />

      {question.length > 0 && (
        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View style={{marginTop: ViewScale(30)}}>
              <TextMedium size={FONT_SIZE.TITLE_3} color={COLORS.PRIMARY}>
                {Translate('textRiskAssessment')}
              </TextMedium>
            </View>
          )}
          data={question}
          style={styles.Container}
          keyExtractor={(item, index) => 'questionIndexRiskProfile-' + index}
          renderItem={({item, index}) => {
            return (
              <QuestionView
                data={item}
                index={index}
                onSelected={(value, index) => _onSelected(value, index)}
              />
            );
          }}
          ListFooterComponent={() => (
            <View
              style={{marginTop: ViewScale(40), marginBottom: ViewScale(50)}}>
              <Button
                title={Translate('textSubmitRiskAssessment')}
                type="fill"
                onPress={_onSubmit}
              />
            </View>
          )}
        />
      )}
    </>
  );
};
