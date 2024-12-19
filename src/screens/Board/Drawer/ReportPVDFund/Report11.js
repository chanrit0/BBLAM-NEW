import React from 'react';
import {useForm} from 'react-hook-form';
import {View, Text} from 'react-native';
import {useRecoilValue} from 'recoil';
import {userInfoState} from 'recoil-state';
import {getPVDReport11, getPVDReport11Data} from 'services/api/committee';
import {setSpinner} from 'utils';
import ReportScreen from './Report';

export default ({route}) => {
  const title = route.params?.title;
  const [headerData, setHeaderData] = React.useState([]);
  const [apiData, setApiData] = React.useState([]);
  const [isServerError, setIsServerError] = React.useState(false);
  const userInfo = useRecoilValue(userInfoState);

  const callapi = async () => {
    await getPVDReport11({
      fund_code: userInfo.fund_code,
      com_code: userInfo.com_code,
    })
      .then(response => {
        if (response.status == 'success') {
          setHeaderData(response.data);
          setIsServerError(false);
        }
      })
      .catch(error => {
        setIsServerError(true);
        console.log(error);
      });
  };

  const calldataapi = async data => {
    await getPVDReport11Data({
      ...data,
      fund_code: userInfo.fund_code,
      com_code: userInfo.com_code,
    })
      .then(response => {
        setApiData(response.data);
        setIsServerError(false);
      })
      .catch(error => {
        setIsServerError(true);
        console.log(error);
      });
  };

  React.useEffect(() => {
    setSpinner(true);
    callapi().finally(() => setSpinner(false));
  }, []);

  return (
    <ReportScreen
      title={title}
      dataYear={headerData}
      data={apiData}
      calldataapi={calldataapi}
      isServerError={isServerError}
    />
  );
};
