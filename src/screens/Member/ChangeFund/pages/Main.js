import React from 'react';
import { RootScroll } from 'components/common';
import { Translate } from 'function';
import { useRecoilValue } from 'recoil';
import { languageState, userInfoState } from 'recoil-state';
import {
  ChangeHistoryChangeFund,
  CountChangeInvestment,
  MainButtonChangeFund,
  MainTitleChangeFund,
  UserInvestMentPolicy,
} from 'components/organisms';
import { setSpinner } from 'utils';
import { getAutoBalance, getTransactionCount } from 'services/api/member';
import _ from 'lodash';
import { View } from 'react-native';
import ServerErrorPage from 'screens/Global/ServerErrorPage';

export default function Main() {
  useRecoilValue(languageState);
  const [isLoad, setLoad] = React.useState(true);
  const [apiData, setApiData] = React.useState({
    choice_rule: 0,
    count_change: 0,
    data: [],
    user_investment: null,
    investment_status: false,
    investment_auto_status: false,
    investment_inactive: false,
  });
  const [isServerError, setIsServerError] = React.useState(false);
  const [datePermis, setDatePermis] = React.useState({ status: true, text: '' });

  const callapi = () => {
    const api1 = new Promise((resolve, reject) => {
      getAutoBalance()
        .then(response => {
          const investment_data =
            response?.investment_data.length > 0
              ? response?.investment_data[0]
              : null;
          setApiData(v => ({
            ...v,
            data: response?.investment_change_data,
            user_investment: investment_data,
            date_open: response?.date_open,
            date_open_status: response?.date_open_status,
            investment_auto_status: response?.investment_auto_status,
            investment_status: response?.investment_status,
            investment_inactive: response?.investment_inactive,
            autorebalance_check: response?.autorebalance_check
          }));
          resolve();
          setDatePermis({ status: response?.date_permission, text: response?.date_permission_text })
        })
        .catch(error => {
          reject();
          console.log({ error, path: '#getAutoBalance' });
        });
    });

    const api2 = new Promise((resolve, reject) => {
      getTransactionCount()
        .then(response => {
          setApiData(v => ({
            ...v,
            choice_rule: response.data.max_sw,
            count_change: response.data.sw,
          }));
          resolve();
        })
        .catch(error => {
          reject();
          console.log({ error, path: '#getTransactionCount' });
        });
    });

    return api1.then(api2);
  };

  const handleOnRefreshServerError = () => {
    setSpinner(true);
    callapi()
      .then(() => {
        setIsServerError(false);
      })
      .catch(() => {
        setIsServerError(true);
      })
      .finally(() => {
        setLoad(false);
        setSpinner(false);
      });
  };

  React.useEffect(() => {
    setSpinner(true);
    callapi()
      .then(() => {
        setIsServerError(false);
      })
      .catch(() => {
        setIsServerError(true);
      })
      .finally(() => {
        setLoad(false);
        setSpinner(false);
      });
  }, []);

  return (
    <RootScroll
      flexContainer
      title={Translate('textChangeFundTitle')}
      onRefreshCallback={callapi}>
      {isLoad ? (
        <View />
      ) : (
        <>
          {isServerError ? (
            <ServerErrorPage onPress={handleOnRefreshServerError} />
          ) : (
            <>
              <CountChangeInvestment data={apiData} />
              <ChangeHistoryChangeFund data={apiData} />
              <MainTitleChangeFund data={apiData} />
              <UserInvestMentPolicy data={apiData?.user_investment} />
              <MainButtonChangeFund
                investment_status={apiData.investment_status}
                investment_auto_status={apiData.investment_auto_status}
                investment_inactive={apiData.investment_inactive}
                autorebalance_check={apiData.autorebalance_check}
                date_permission={datePermis.status}
                date_permission_text={datePermis.text}
              />
            </>
          )}
        </>
      )}
    </RootScroll>
  );
}
