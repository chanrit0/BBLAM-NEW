/* eslint-disable react/self-closing-comp */
// React
import React from 'react';
import {SafeAreaView, View} from 'react-native';

// custom
import {Translate} from 'function';
import {setSpinner, ViewScale} from 'utils';

// components
import {Container} from 'components/common';
import {
  SearchBar,
  TabView,
  TabBar,
  TextMedium,
  TextRegular,
  ActivityIndicator,
} from 'components/atoms';

// lib
import {Badge} from 'react-native-paper';

// pages
import AccumulateMember from './TabPages/AccumulateMember';
import WatingConfirm from './TabPages/WatingConfirm';
import {useRecoilValue} from 'recoil';
import {languageState, userInfoState} from 'recoil-state';
import {
  getApprove,
  getWaitingConfirm,
  getWatingApprove,
} from 'services/api/committee';
import HomeHeaderOnly from 'components/header/HomeHeaderOnly';
import {COLORS, FONT_SIZE, SPACING} from 'styles';
import _ from 'lodash';
import {FETCH_DATA_DELAY, FETCH_DATA_LIMIT} from 'config';

export default function ChangeAccumulateInfo() {
  useRecoilValue(languageState);
  const [routes] = React.useState([
    {key: 'first', title: Translate('textPendingApproval')},
    {key: 'second', title: Translate('textMemberCumulativeRate')},
  ]);
  const [apiData, setApiData] = React.useState({
    tab1: [],
    tab2: [],
    com_name: '',
  });
  const [search, setSearch] = React.useState(false);
  const userInfo = useRecoilValue(userInfoState);

  const fetchOptions = React.useRef({
    search: '',
    limit: FETCH_DATA_LIMIT,
    offset: 0,
  });

  const callapitab1 = async () => {
    await getWatingApprove({
      fund_code: userInfo.fund_code,
      com_code: userInfo.com_code,
      ...fetchOptions.current,
    })
      .then(response => {
        if (response.status == 'success') {
          setApiData(v => ({
            ...v,
            tab1: response.data,
            com_name: response.com_name,
          }));
        }
      })
      .catch(error => console.log(error));
  };

  const callapitab2 = async () => {
    await getApprove({
      fund_code: userInfo.fund_code,
      com_code: userInfo.com_code,
      ...fetchOptions.current,
    })
      .then(response => {
        if (response.status == 'success') {
          setApiData(v => ({
            ...v,
            tab2: response.data,
          }));
        }
      })
      .catch(error => console.log(error));
  };

  const renderScene = ({route, jumpTo}) => {
    if (search)
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      );

    switch (route.key) {
      case 'first':
        return <WatingConfirm data={apiData.tab1} callapi={callapitab1} />;
      case 'second':
        return <AccumulateMember data={apiData.tab2} callapi={callapitab2} />;
    }
  };

  const handleSearch = _.debounce(search => {
    setSearch(true);
    fetchOptions.current.search = search;

    const tab1 = new Promise((resolve, reject) =>
      callapitab1().then(resolve).catch(reject),
    );
    const tab2 = new Promise((resolve, reject) =>
      callapitab2().then(resolve).catch(reject),
    );

    Promise.all([tab1, tab2]).finally(() => setSearch(false));
  }, FETCH_DATA_DELAY);

  React.useEffect(() => {
    setSpinner(true);
    callapitab1()
      .then(callapitab2)
      .finally(() => setSpinner(false));
  }, []);

  return (
    <>
      <HomeHeaderOnly
        isBackIcon
        title={Translate('textInfomationChangeSavingRate')}>
        <Container style={{flex: 0}}>
          <TextRegular color={COLORS.WHITE}>{apiData?.com_name}</TextRegular>
          <SearchBar onChangeText={handleSearch} />
        </Container>
      </HomeHeaderOnly>
      <TabView
        routes={routes}
        renderScene={renderScene}
        renderTabBar={props => (
          <TabBar
            {...props}
            renderLabel={({route, focused, color}) => (
              <>
                <TextMedium
                  size={FONT_SIZE.BODY_2}
                  style={{
                    color: focused ? color : '#949393',
                  }}>
                  {route.title}
                </TextMedium>
                {route.key === 'first' && apiData.tab1.length > 0 && (
                  <Badge
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 0,
                      transform: [{translateX: ViewScale(20)}],
                    }}
                    size={ViewScale(18)}>
                    {apiData.tab1.length}
                  </Badge>
                )}
              </>
            )}
          />
        )}
      />
      <SafeAreaView />
    </>
  );
}
