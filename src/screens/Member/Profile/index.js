// React
import React from 'react';

// custom
import { Translate } from 'function';
import { setSpinner } from 'utils';

// components
import { RootScroll } from 'components/common';
import { ActivityIndicator } from 'components/atoms';
import { InvestmentOverview, MyReturn, NameProfile, ProfileRatio } from 'components/organisms';
import { AlertSuccess } from 'components/molecules';

// lib
import { useRecoilValue } from 'recoil';
import { languageState, userInfoState } from 'recoil-state';
import _ from 'lodash';

// services
import { getProfile, sendBirthDay } from 'services/api/member';
import ServerErrorPage from 'screens/Global/ServerErrorPage';
import { View } from 'react-native';

export default function Profile({ navigation }) {
  useRecoilValue(languageState);
  const userInfo = useRecoilValue(userInfoState);
  const [apiData, setApiData] = React.useState({
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
        y: 10,
      },
      {
        x: 'B-ASIA',
        y: 5,
      },
      {
        x: 'B-ASIA',
        y: 5,
      },
      {
        x: 'B-ASIA',
        y: 5,
      },
    ],
  });
  const [routes, setRoutes] = React.useState([
    { key: 0, title: Translate('textProfileGraphNow') },
    { key: 1, title: Translate('textProfileGraphNew') },
  ]);
  const [isServerError, setIsServerError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [heightG, setHeightG] = React.useState(320);

  const callapi = async () => {
    await getProfile(userInfo.em_code)
      .then(response => {
        setIsServerError(false);
        const profile = response?.detail;
        const dashboard = response?.dashboard;
        const status = response?.status;
        const chartinvestment = response?.chartinvestment;
        const chartinvestment_new = response?.chartinvestment_new;

        if (status === 'success') {
          if (_.isEmpty(chartinvestment_new)) {
            setRoutes([
              { key: 0, title: Translate('textProfileGraphNow') },
              { key: 1, title: Translate('textProfileGraphNew') },
            ]);
          }

          setApiData(value => ({
            ...value,
            NameProfile: {
              birthday: profile?.em_bod,
              name: profile?.em_name,
              fund_name: dashboard?.fund_name,
              info: [
                [Translate('textMemberId'), userInfo?.em_code],
                [Translate('textEmployer'), dashboard?.com_name],
                [Translate('textEmployerId'), profile?.com_code],
                [Translate('textInstitution'), profile?.em_type],
                [Translate('textPhoneNumber'), profile?.em_tel],
                [Translate('textEmail'), profile?.em_email],
              ],
            },
            myReturn: {
              myreturn: dashboard?.myreturn,
              total: dashboard?.cont_sum_total,
              saving: dashboard?.cont_cum_total,
              contribution: dashboard?.cont_cont_total,
              benefitSaving: dashboard?.cont_bent_total,
              benefitContribution: dashboard?.cont_bent_cont_total,
            },
            investmentOverview: {
              date: dashboard?.date,
              total: dashboard?.cont_sum_total,
              graph: [
                {
                  x: 'ส่วนของนายจ้าง',
                  y: dashboard?.employer_part,
                },
                {
                  x: 'ส่วนของสมาชิก',
                  y: dashboard?.member_part,
                },
              ],
            },
            ProfilePresentRatio: chartinvestment?.map(item => ({
              x: item?.sub_code,
              y: parseFloat(item?.ratio),
            })),
            ProfileNewRatio: !_.isEmpty(chartinvestment_new)
              ? chartinvestment_new?.map(item => ({
                x: item?.sub_code,
                y: parseFloat(item?.ratio),
              }))
              : [],
          }));

          setIsLoading(false);
        }
      })
      .catch(error => {
        setIsServerError(true);
        console.log({ error, path: '/screens/Member/Profile/#callapi' });
      });
  };

  const updateBirthDay = async date => {
    await sendBirthDay({ birth: date })
      .then(response => {
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

  const handleOnRefreshServerError = () => {
    setSpinner(true);
    callapi().finally(() => setSpinner(false));
  };

  React.useEffect(() => {
    callapi();
  }, []);

  React.useEffect(() => {
    const checkHeight = () => {
      let newHeight = 320;

      if (apiData?.ProfilePresentRatio != null || apiData?.ProfileNewRatio != null) {
        if (apiData?.ProfilePresentRatio?.length > apiData?.ProfileNewRatio?.length) {
          newHeight = 320 + (apiData?.ProfilePresentRatio?.length * 25);
        } else {
          newHeight = 320 + (apiData?.ProfileNewRatio?.length * 25);
        }
      }
      setHeightG(newHeight);
    };

    checkHeight();
  }, [apiData]);

  return (
    <RootScroll
      onRefreshCallback={callapi}
      headerChildren={
        !isServerError &&
        apiData?.NameProfile && (
          <NameProfile
            data={apiData?.NameProfile}
            updateBirthDay={updateBirthDay}
          />
        )
      }
      flexContainer
    >
      <>
        {isServerError ? (
          <ServerErrorPage onPress={handleOnRefreshServerError} />
        ) : (
          <>
            {!isLoading ? (
              <>
                <InvestmentOverview
                  date={apiData?.investmentOverview?.date}
                  total={apiData?.investmentOverview?.total}
                  data={apiData?.investmentOverview?.graph}
                />
                <MyReturn
                  myreturn={apiData?.myReturn?.myreturn}
                  total={apiData?.myReturn?.total}
                  saving={apiData?.myReturn?.saving}
                  contribution={apiData?.myReturn?.contribution}
                  benefitSaving={apiData?.myReturn?.benefitSaving}
                  benefitContribution={apiData?.myReturn?.benefitContribution}
                />
                <ProfileRatio routes={routes} data={apiData} heightG={heightG} />
              </>
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator />
              </View>
            )}
          </>
        )}
      </>
    </RootScroll>
  );
}
