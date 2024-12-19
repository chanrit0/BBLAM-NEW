import React from 'react';
import SummaryInvestPolicy from 'screens/Global/SummaryInvestPolicy';
import {useRecoilValue} from 'recoil';
import {languageState, userInfoState} from 'recoil-state';
import {setSpinner} from 'utils';
import {getNAVReport} from 'services/api/member';

export default function index() {
  useRecoilValue(languageState);
  const [apiData, setApiData] = React.useState();
  const [isServerError, setIsServerError] = React.useState(false);

  const callapi = async () => {
    await getNAVReport()
      .then(response => {
        if (response.status === 'success' || response.code == '02') {
          setApiData([
            response.data.ytd,
            response.data.threeyrs,
            response.data.fiveyrs,
          ]);
        }
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
    <> 
      <SummaryInvestPolicy
        data={apiData}
        callapi={callapi}
        isServerError={isServerError}
      />
    </>
  );
}
