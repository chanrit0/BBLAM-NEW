import {CommonActions} from '@react-navigation/native';
import {TemplateTerms} from 'components/templates';
import {Translate} from 'function';
import React from 'react';
import {BackHandler, StatusBar} from 'react-native';
import {useRecoilValue} from 'recoil';
import {userInfoState} from 'recoil-state';

export default ({navigation, route}) => {
  const userInfo = useRecoilValue(userInfoState);
  const backIconCallback = () => {
    if (route.params?.goBack) {
      navigation.goBack();
    } else {
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
    }
  };

  const handleOnPress = () => {
    navigation.replace('RiskProfileQuestion', {backIconCallback});
  };

  React.useEffect(() => {
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
      <StatusBar barStyle="light-content" />
      <TemplateTerms
        title={Translate('textRiskProfileTitle')}
        content_title={Translate('textRiskProfileTermsTitle')}
        content={Translate('textRiskProfileTermsContent')}
        onEndReachCheck={false}
        onPress={handleOnPress}
        backIconCallback={backIconCallback}
      />
    </>
  );
};
