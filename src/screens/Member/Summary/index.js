// React
import React from 'react';

// custom
import {Translate} from 'function';
import {setSpinner} from 'utils';

// lib
import {SceneMap} from 'react-native-tab-view';

// components
import OldYear from './components/OldYear';
import CurrentYear from './components/CurrentYear';
import {RootScroll} from 'components/common';
import {ActivityIndicator, TabViewCustom} from 'components/atoms';

// services
import {getContribution} from 'services/api/member';

// lib
import _ from 'lodash';

// recoil
import {useRecoilValue} from 'recoil';
import {userInfoState} from 'recoil-state';
import ServerErrorPage from 'screens/Global/ServerErrorPage';
import {View} from 'react-native';

export default () => {
  const userInfo = useRecoilValue(userInfoState);
  const [isLoad, setLoad] = React.useState(false);
  const [routes, setRoute] = React.useState([
    {key: 'old', title: String(new Date().getFullYear() + 542)},
    {key: 'current', title: String(new Date().getFullYear() + 543)},
  ]);
  const [isServerError, setIsServerError] = React.useState(false);
  const [apiData, setApiData] = React.useState([
    {
      total: null,
      value: [],
      year: '',
    },
    {
      total: null,
      value: [],
      year: '',
    },
  ]);

  const callapi = async () => {
    await getContribution(userInfo.em_code)
      .then(response => {
        setApiData(response.data);
        if (response.data.length > 1) {
          setRoute([
            {key: 'old', title: response.data[1].year},
            {key: 'current', title: response.data[0].year},
          ]);
        }
        setLoad(true);
        setIsServerError(false);
      })
      .catch(error => {
        setIsServerError(true);
        console.log(error);
      });
  };

  const renderScene = SceneMap({
    old: () => <OldYear data={apiData[1]} isLoad={isLoad} />,
    current: () => <CurrentYear data={apiData[0]} isLoad={isLoad} />,
  });

  const handleOnRefreshServerError = () => {
    setSpinner(true);
    callapi().finally(() => setSpinner(false));
  };

  React.useEffect(() => {
    callapi();
  }, []);

  return (
    <RootScroll
      onRefreshCallback={callapi}
      title={Translate('textSummaryTitle')}
      flexContainer>
      {isLoad ? (
        <TabViewCustom
          routes={routes}
          defaultIndex={1}
          renderScene={renderScene}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      )}
      {isServerError && (
        <ServerErrorPage onPress={handleOnRefreshServerError} />
      )}
    </RootScroll>
  );
};
