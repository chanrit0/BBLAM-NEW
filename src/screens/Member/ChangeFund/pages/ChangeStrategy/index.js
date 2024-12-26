/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/rules-of-hooks */

// React
import React from 'react';

// custom
import {Translate} from 'function';

// components
import {RootScroll} from 'components/common';
import {AlertSuccess} from 'components/molecules';
// lib

import FundDIYPage from '../../components/FundDIYPage';
import {languageState, userInfoState} from 'recoil-state';
import {useNavigation} from '@react-navigation/native';
import {useRecoilValue} from 'recoil';
// data
import {
  LifePath,
  ChangeFundScore,
  ChangeStrategyChangePage,
  DefaultFund,
} from 'components/organisms';
import {setSpinner} from 'utils';
import {getChangeFund, getProfile, sendBirthDay} from 'services/api/member';
import _ from 'lodash';
import {AlertFailed} from 'components/molecules';
import ServerErrorPage from 'screens/Global/ServerErrorPage';

// props -> key , goBackPager

export default () => {
  const navigation = useNavigation();
  const [apiData, setApiData] = React.useState(null);
  const [apiDataฺBirthday, setApiDatBaฺirthday] = React.useState({
    NameProfile: null,
    ProfileNewRatio: [
      {
        x: 'B-TNTV',
        y: 40,
      },
      {
        x: 'B-GLOBAL',
        y: 35,
      },
      {
        x: 'B-ASIA',
        y: 25,
      },
    ],
  });
  const userInfo = useRecoilValue(userInfoState);
  // setting data
  const [typeRebalance, setTypeRebalance] = React.useState('');
  const [isServerError, setIsServerError] = React.useState(false);
  const [tiRebalance, setTiRebalance] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  // setting tab view
  const [index, setIndex] = React.useState(0);
  const [routes, setRoutes] = React.useState([{key: 0}]);

  // const [routes, setRoutes] = React.useState([
  //   {key: 0, title: Translate('textProfileGraphNow')},
  //   {key: 1, title: Translate('textProfileGraphNew')},
  // ]);

  // callapi
  const callapi = async () => {
    await getChangeFund()
      .then(response => {
        if (response.code == '02') {
          setTiRebalance(response?.transaction);
          setApiData(response);
          setRoutes(
            (() => {
              let routes = [];
              for (let i = 0; i < response.data_list.length; i++) {
                routes.push({key: i});
              }
              return routes;
            })(),
          );
        } else {
          navigation.goBack();
          navigation.navigate('Alert1', {
            children: AlertFailed(response.message),
            title: Translate('textConfirm2'),
          });
        }
        setIsServerError(false);
        setTypeRebalance(response.type);
      })
      .catch(error => {
        setIsServerError(true);
        console.log(error);
      });

    await getProfile(userInfo.em_code)
      .then(response => {
        setIsServerError(false);
        const profile = response.detail;
        const dashboard = response.dashboard;
        const status = response.status;
        const chartinvestment = response.chartinvestment;
        const chartinvestment_new = response.chartinvestment_new;

        if (status === 'success') {
          if (_.isEmpty(chartinvestment_new)) {
            setRoutes([
              {key: 0, title: Translate('textProfileGraphNow')},
              {key: 1, title: Translate('textProfileGraphNew')},
            ]);
          }
          setIsLoading(false);

          setApiDatBaฺirthday(value => ({
            ...value,
            NameProfile: {
              birthday: profile?.em_bod,
              name: profile?.em_name,
              fund_name: dashboard?.fund_name,
              info: [
                [Translate('textMemberId'), userInfo.em_code],
                [Translate('textEmployer'), dashboard.com_name],
                [Translate('textEmployerId'), profile.com_code],
                [Translate('textInstitution'), profile.em_type],
                [Translate('textPhoneNumber'), profile.em_tel],
                [Translate('textEmail'), profile.em_email],
              ],
            },
            myReturn: {
              myreturn: dashboard.myreturn,
              total: dashboard.cont_sum_total,
              saving: dashboard.cont_cum_total,
              contribution: dashboard.cont_cont_total,
              benefitSaving: dashboard.cont_bent_total,
              benefitContribution: dashboard.cont_bent_cont_total,
            },
            investmentOverview: {
              date: dashboard.date,
              total: dashboard.cont_sum_total,
              graph: [
                {
                  x: 'ส่วนของนายจ้าง',
                  y: dashboard.employer_part,
                },
                {
                  x: 'ส่วนของสมาชิก',
                  y: dashboard.member_part,
                },
              ],
            },
            ProfilePresentRatio: chartinvestment.map(item => ({
              x: item.sub_code,
              y: parseFloat(item.ratio),
            })),
            ProfileNewRatio: !_.isEmpty(chartinvestment_new)
              ? chartinvestment_new.map(item => ({
                  x: item.sub_code,
                  y: parseFloat(item.ratio),
                }))
              : [],
          }));
        }
      })
      .catch(error => {
        setIsServerError(true);
        console.log({error, path: '/screens/Member/Profile/#callapi'});
      });
  };

  const updateBirthDay = async dataBirthday => {
    await sendBirthDay({birth: dataBirthday})
      .then(response => {
        setSpinner(true);
        callapi().finally(() => setSpinner(false));
        if (response.code == '02' || response.status == 'success') {
          navigation.navigate('Alert1', {
            children: AlertSuccess('เปลี่ยนแปลงสำเร็จ'),
            title: Translate('textConfirm2'),
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    setSpinner(true);
    callapi().finally(() => setSpinner(false));
  }, []);

  const goToPage = index => {
    setIndex(index);
  };

  const _Confirm = data => {
    navigation.navigate('SuccessPage');
  };

  const renderScene = () => {
    if (apiData?.data_list[index]?.choice_type == 'choice') {
      return (
        <DefaultFund
          data={apiData?.data_list[index]?.data}
          callbackBack={() => {
            navigation.goBack();
          }}
          callbackConfirm={_Confirm}
          typeRebalance={typeRebalance}
          tiRebalance={tiRebalance}
          choice_no={apiData?.data_list[index]?.choice_no}
        />
      );
    } else if (apiData?.data_list[index]?.choice_type == 'diy') {
      return (
        <FundDIYPage
          data={apiData?.data_list[index]?.data}
          callbackBack={() => {
            navigation.goBack();
          }}
          callbackConfirm={_Confirm}
          typeRebalance={typeRebalance}
          tiRebalance={tiRebalance}
          choice_no={apiData?.data_list[index]?.choice_no}
        />
      );
    } else {
      return (
        <LifePath
          data={apiData?.data_list[index]?.data}
          dataBirthday={apiDataฺBirthday?.NameProfile}
          updateBirthDay={updateBirthDay}
          birth={apiData?.data_list[index]?.birth}
          callbackBack={() => {
            navigation.goBack();
          }}
          callbackConfirm={_Confirm}
          choice_no={apiData?.data_list[index]?.choice_no}
        />
      );
    }
  };

  const handleOnRefreshServerError = () => {
    setSpinner(true);
    callapi().finally(() => {
      setSpinner(false);
    });
  };

  return (
    <>
      <RootScroll title={Translate('textChangeFundTitle')} flexContainer>
        {isServerError ? (
          <ServerErrorPage onPress={handleOnRefreshServerError} />
        ) : (
          <>
            {apiData !== null && (
              <>
                <ChangeFundScore
                  date={apiData?.customer_risk_profile?.date}
                  score={apiData?.customer_risk_profile?.score}
                />
                <ChangeStrategyChangePage
                  index={index}
                  data={apiData?.data_list}
                  goToPage={goToPage}
                />
                {renderScene()}
              </>
            )}
          </>
        )}
      </RootScroll>
    </>
  );
};
