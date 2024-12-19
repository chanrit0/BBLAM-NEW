/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */

// React
import React from 'react';
import {FlatList, Keyboard, RefreshControl, View} from 'react-native';

// components
import {Container} from 'components/common';
import {
  ActivityIndicator,
  KeyboardDismiss,
  SearchBar,
  TextRegular,
} from 'components/atoms';
import {ListItemAccordion} from './components/ListItemAccordion';
import {Translate} from 'function';

// RECOIL
import {useRecoilValue} from 'recoil';
import {languageState, userInfoState} from 'recoil-state';
import {isIOS, setSpinner, ViewScale} from 'utils';
import {getPlanInvestment} from 'services/api/committee';
import _ from 'lodash';

// lib
import AndroidKeyboardAdjust from 'rn-android-keyboard-adjust';
import HomeHeaderOnly from 'components/header/HomeHeaderOnly';
import {COLORS, FONT_SIZE, SPACING} from 'styles';
import {EmptyData} from 'components/organisms';
import {FETCH_DATA_LIMIT} from 'config';
import {FETCH_DATA_DELAY} from 'config';
import {FlatlistFooter} from 'components/molecules';
import ServerErrorPage from 'screens/Global/ServerErrorPage';

export default function PlanInvestment() {
  useRecoilValue(languageState);
  const userInfo = useRecoilValue(userInfoState);
  const [apiData, setApiData] = React.useState([]);
  const [count_member, setCountMember] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isServerError, setIsServerError] = React.useState(false);
  const fetchOptions = React.useRef({
    search: '',
    limit: FETCH_DATA_LIMIT,
    offset: 0,
  });

  const callapiFirstLoad = async () => {
    await getPlanInvestment({
      com_code: userInfo.com_code,
      fund_code: userInfo.fund_code,
      ...fetchOptions.current,
    })
      .then(response => {
        if (response.status == 'success' || response.code == '02') {
          setApiData(response.data);
          setCountMember(response.pagination.total_all);
        }
        setIsServerError(false);
      })
      .catch(error => {
        setIsServerError(true);
        console.log({error});
      });
  };

  const callapi = async type => {
    await getPlanInvestment({
      com_code: userInfo.com_code,
      fund_code: userInfo.fund_code,
      ...fetchOptions.current,
    })
      .then(response => {
        if (response.status == 'success' || response.code == '02') {
          setApiData(response.data);
        }
        setIsServerError(false);
      })
      .catch(error => {
        setIsServerError(true);
        console.log({error});
      });
  };

  const onSearch = _.debounce(search => {
    fetchOptions.current.search = search;
    fetchOptions.current.offset = 0;
    setIsSearching(true);
    callapi().finally(() => setIsSearching(false));
  }, FETCH_DATA_DELAY);

  const handleOnRefresh = () => {
    setRefreshing(true);
    fetchOptions.current.offset = 0;
    callapi('refresh').finally(() => {
      setRefreshing(false);
    });
  };

  const handleLoadMore = async () => {
    if (!isLoading && apiData.length < count_member) {
      fetchOptions.current.offset += FETCH_DATA_LIMIT;
      setIsLoading(true);
      await getPlanInvestment({
        com_code: userInfo.com_code,
        fund_code: userInfo.fund_code,
        ...fetchOptions.current,
      })
        .then(response => {
          if (response.status == 'success' || response.code == '02') {
            setApiData(v => [...v, ...response.data]);
          }
        })
        .catch(error => console.log({error}))
        .finally(() => setIsLoading(false));
    }
  };

  const keyExtractor = (item, index) => 'PlanInvestmentId' + index;
  const renderItem = ({item, index}) => (
    <ListItemAccordion
      name={item.em_name}
      plan1={item.name_invest_old}
      plan2={item.name_invest_new}
      total={item.cont_sum_total}
      plan1Content={item.invest_old}
      plan2Content={item.invest_new}
      date={item.choice_date}
    />
  );

  const handleOnRefreshServerError = () => {
    setSpinner(true);
    callapiFirstLoad().finally(() => setSpinner(false));
  };

  React.useEffect(() => {
    callapiFirstLoad();

    fetchOptions.current.offset = 0;
    if (!isIOS) {
      AndroidKeyboardAdjust.setAdjustPan();
    }

    return () => {
      if (!isIOS) {
        AndroidKeyboardAdjust.setAdjustResize();
      }
    };
  }, [userInfo.com_code, userInfo.fund_code]);

  return (
    <>
      <HomeHeaderOnly title={Translate('textSummaryMemberInvestment')}>
        <Header
          count_member={count_member}
          com_name={userInfo.com_name}
          onSearch={onSearch}
        />
      </HomeHeaderOnly>
      {isSearching ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          {!isServerError ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={apiData}
              keyExtractor={keyExtractor}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleOnRefresh}
                />
              }
              contentContainerStyle={{paddingBottom: SPACING.FOOTER_HEIGHT}}
              ListEmptyComponent={<EmptyData />}
              ListFooterComponent={isLoading && <FlatlistFooter />}
              onEndReachedThreshold={0}
              onEndReached={!isLoading && handleLoadMore}
              renderItem={renderItem}
            />
          ) : (
            <ServerErrorPage onPress={handleOnRefreshServerError} />
          )}
        </>
      )}
    </>
  );
}

function Header({onSearch, count_member, com_name}) {
  return (
    <KeyboardDismiss style={{flex: 0}}>
      <Container style={{flex: 0}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TextRegular
            color={COLORS.WHITE}
            size={FONT_SIZE.BODY_2}
            style={{flex: 1, paddingRight: ViewScale(20)}}>
            {com_name}
          </TextRegular>
          <TextRegular
            color={COLORS.WHITE}
            size={FONT_SIZE.BODY_2}>{`${Translate('textMembership')} ${
            count_member ?? '-'
          } ${Translate('textPerIndividal')}`}</TextRegular>
        </View>
        <SearchBar onChangeText={onSearch} />
      </Container>
    </KeyboardDismiss>
  );
}
