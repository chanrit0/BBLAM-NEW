// React
import React from 'react';

// custom
import {setSpinner} from 'utils';

// components
import {
  InvestmentOverview,
  MyReturn,
  NameFlagHeader,
} from 'components/organisms';
import {RootScroll} from 'components/common';

// lib
import {useRecoilState, useRecoilValue} from 'recoil';
import {languageState, userInfoState} from 'recoil-state';

// services
import {
  checkChangeFund,
  checkCustomerRiskProfile,
  getDeposit,
  getHome,
} from 'services/api/member';
import {AlertRiskProfile} from 'components/molecules';
import {Translate} from 'function';
import {BackHandler, View} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import ServerErrorPage from 'screens/Global/ServerErrorPage';

export default function Home({navigation, route}) {
  useRecoilValue(languageState);
  const [apiData, setApiData] = React.useState({
    NameFlagHeader: {name: '', company: '', fund_name: ''},
    myReturn: {
      myreturn: '',
      total: '',
      saving: '',
      contribution: '',
      benefitSaving: '',
      benefitContribution: '',
      unit: '',
    },
    investmentOverview: {
      date: '',
      total: '',
      graph: [
        {
          x: 'ส่วนของนายจ้าง',
          y: '',
        },
        {
          x: 'ส่วนของสมาชิก',
          y: '',
        },
      ],
    },
  });
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [isServerError, setIsServerError] = React.useState(false);

  const callCheckCustomerRiskProfile = async () => {
    await checkCustomerRiskProfile()
      .then(response => {
        setUserInfo(v => ({...v, risk_profile_status: true}));
      })
      .catch(error => {
        setUserInfo(v => ({...v, risk_profile_status: false}));
        if (error.status == 'success') {
          navigation.navigate('Alert1', {
            children: AlertRiskProfile(
              error.message_header,
              error.message_body,
            ),
            title: Translate('textRiskProfileDo'),
            onPress: () => {
              navigation.replace('RiskProfileTerms');
            },
          });
        }
      });
  };

  const callGetHome = async () => {
    await getHome({em_code: userInfo.em_code})
      .then(response => {
        const data = response?.dashboard;
        setApiData({
          NameFlagHeader: {
            name: response?.detail?.em_name || '',
            company: data?.com_name || '',
            fund_name: data?.fund_name || '',
          },
          myReturn: {
            myreturn: data.myreturn,
            total: data.cont_sum_total,
            saving: data.cont_cum_total,
            contribution: data.cont_cont_total,
            benefitSaving: data.cont_bent_total,
            benefitContribution: data.cont_bent_cont_total,
            unit: data?.unit,
          },
          investmentOverview: {
            date: data.date,
            total: data.cont_sum_total,
            graph: [
              {
                x: 'ส่วนของนายจ้าง',
                y: parseFloat(data.employer_part),
              },
              {
                x: 'ส่วนของสมาชิก',
                y: parseFloat(data.member_part),
              },
            ],
          },
        });

        setIsServerError(false);
      })
      .catch(error => {
        setIsServerError(true);
        console.log({error, path: '/screens/Member/Home/#getHome'});
      });
  };

  const callapiDeposit = async () => {
    await getDeposit()
      .then(response => {
        setUserInfo(v => ({...v, deposit_status: true}));
      })
      .catch(error => {
        setUserInfo(v => ({...v, deposit_status: false}));
        console.log({error});
      });
  };

  const callCheckChangeFund = async () => {
    await checkChangeFund()
      .then(response => {
        if (response.code == '02') {
          setUserInfo(v => ({...v, change_fund_status: true}));
        }
      })
      .catch(error => console.log(error));
  };

  React.useEffect(() => {
    setSpinner(true);

    const api1 = new Promise((resolve, reject) =>
      callGetHome().then(resolve).catch(reject),
    );
    const api2 = new Promise((resolve, reject) =>
      callapiDeposit().then(resolve).catch(reject),
    );
    const api3 = new Promise((resolve, reject) =>
      callCheckCustomerRiskProfile().then(resolve).catch(reject),
    );
    const api4 = new Promise((resolve, reject) =>
      callCheckChangeFund().then(resolve).catch(reject),
    );

    Promise.all([api1, api2, api3, api4]).finally(() => setSpinner(false));

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (userInfo.risk_profile_status == false) {
          navigation.goBack();
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

  const handleOnRefreshServerError = () => {
    setSpinner(true);
    callGetHome().finally(() => setSpinner(false));
  };

  return (
    <RootScroll
      onRefreshCallback={callGetHome}
      flexContainer
      headerChildren={
        !isServerError && (
          <NameFlagHeader
            data={apiData?.NameFlagHeader ? apiData?.NameFlagHeader : null}
          />
        )
      }>
      {isServerError ? (
        <ServerErrorPage onPress={handleOnRefreshServerError} />
      ) : (
        <>
          <InvestmentOverview
            date={apiData?.investmentOverview?.date}
            total={apiData?.investmentOverview?.total}
            data={apiData?.investmentOverview?.graph}
          />
          <MyReturn
            myreturn={apiData?.myReturn.myreturn}
            total={apiData?.myReturn.total}
            saving={apiData?.myReturn.saving}
            contribution={apiData?.myReturn.contribution}
            benefitSaving={apiData?.myReturn.benefitSaving}
            benefitContribution={apiData?.myReturn.benefitContribution}
            unit={apiData?.myReturn.unit}
          />
        </>
      )}
    </RootScroll>
  );
}
