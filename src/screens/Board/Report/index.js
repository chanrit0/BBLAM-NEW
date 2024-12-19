import React from 'react';
import SummaryInvestPolicy from 'screens/Global/SummaryInvestPolicy';
import {useRecoilValue} from 'recoil';
import {languageState, switchingState, userInfoState} from 'recoil-state';
import {getNAVReport} from 'services/api/committee';

export default function Report() {
  useRecoilValue(languageState);
  const [apiData, setApiData] = React.useState([]);
  const userInfo = useRecoilValue(userInfoState);
  const [isServerError, setIsServerError] = React.useState(false);
  const switching = useRecoilValue(switchingState);

  const callapi = async () => {
    await getNAVReport({
      fund_code: userInfo.fund_code,
      com_code: userInfo.com_code,
      all_fund: switching.isFundAll,
    })
      .then(response => {
        if (response.status === 'success' || response.code == '02') {
          setApiData([
            response.data.ytd,
            response.data.threeyrs,
            response.data.fiveyrs,
          ]);
          setIsServerError(false);
        }
      })
      .catch(error => {
        setIsServerError(true);
        console.log({error, path: '/Board/Report/#getNAVReport'});
      });
  };

  React.useEffect(() => {
    callapi();
  }, [userInfo.com_code, userInfo.fund_code, switching.isFundAll]);

  return (
    <>
      <SummaryInvestPolicy
        data={apiData}
        callapi={callapi}
        isServerError={isServerError}
      />
    </>
  );
}
