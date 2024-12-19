/* eslint-disable react-hooks/rules-of-hooks */
// React
import React from 'react';

// custom
import {View, RefreshControl, FlatList} from 'react-native';

// components
import {
  ListEvaluate,
  EvaluateBtn,
  ListMember,
} from 'components/Board/RiskProfile';

// lib
import {Translate} from 'function';
import {useRecoilValue} from 'recoil';
import {languageState, userInfoState} from 'recoil-state';
import {getEvaluatedInfo, getNotEvaluatedInfo} from 'services/api/committee';
import _ from 'lodash';
import HomeHeaderOnly from 'components/header/HomeHeaderOnly';
import {ActivityIndicator, KeyboardDismiss, SearchBar} from 'components/atoms';
import {Container} from 'components/common';
import {FETCH_DATA_LIMIT} from 'config';
import {FETCH_DATA_DELAY} from 'config';
import {EmptyData} from 'components/organisms';
import {FlatlistFooter} from 'components/molecules';
import ServerErrorPage from 'screens/Global/ServerErrorPage';
import {useIsMounted} from 'hooks';
import {useFocusEffect} from '@react-navigation/native';

export default function RiskProfile() {
  const [toggle, setToggle] = React.useState(false); // false -> ประเมินแล้ว , true -> ยังไม่ประเมิน
  const [index, setIndex] = React.useState(0);
  const userInfo = useRecoilValue(userInfoState);
  const [countMember, setCountMember] = React.useState({
    evaluated: null,
    notEvaluated: null,
  });

  const [refreshing, setRefresing] = React.useState(false);
  const [apiDataEvaluated, setApiDataEvaluated] = React.useState([]);
  const [apiDataNotEvaluated, setApiDataNotEvaluated] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);
  const [isServerError, setIsServerError] = React.useState({
    tab1: false,
    tab2: false,
  });
  const offset = React.useRef({evaluted: 0, notEvaluated: 0});
  const fetchOptions = React.useRef({
    search: '',
    limit: FETCH_DATA_LIMIT,
    offset: 0,
  });

  useRecoilValue(languageState);

  const callapiFirstLoad = () => {
    const params = {
      com_code: userInfo.com_code,
      fund_code: userInfo.fund_code,
      ...fetchOptions.current,
    };

    const api1 = new Promise((resolve, reject) => {
      getEvaluatedInfo(params)
        .then(response => {
          if (response.status == 'success') {
            setApiDataEvaluated(response.data);
            setCountMember(v => ({
              ...v,
              evaluated: response.pagination.total_all,
            }));
            setIsServerError(v => ({...v, tab1: false}));
            resolve();
          }
        })
        .catch(error => {
          setIsServerError(v => ({...v, tab1: true}));
          reject(error);
        });
    });

    const api2 = new Promise((resolve, reject) => {
      getNotEvaluatedInfo(params)
        .then(response => {
          if (response.status == 'success') {
            setApiDataNotEvaluated(response.data);
            setCountMember(v => ({
              ...v,
              notEvaluated: response.pagination.total_all,
            }));
            setIsServerError(v => ({...v, tab2: false}));
            resolve();
          }
        })
        .catch(error => {
          setIsServerError(v => ({...v, tab2: true}));
          reject(error);
        });
    });

    return new Promise.all([api1, api2]);
  };

  const callapi = async type => {
    const params = {
      com_code: userInfo.com_code,
      fund_code: userInfo.fund_code,
      ...fetchOptions.current,
    };

    const api1 = new Promise((resolve, reject) => {
      getEvaluatedInfo(params)
        .then(response => {
          if (response.status == 'success') {
            console.log(JSON.stringify(response, undefined, 2));
            setApiDataEvaluated(response.data);
            setIsServerError(v => ({...v, tab1: false}));
            resolve();
          }
        })
        .catch(error => {
          setIsServerError(v => ({...v, tab1: true}));
          reject(error);
        });
    });

    const api2 = new Promise((resolve, reject) => {
      getNotEvaluatedInfo(params)
        .then(response => {
          if (response.status == 'success') {
            setApiDataNotEvaluated(response.data);
            setIsServerError(v => ({...v, tab2: false}));
            resolve();
          }
        })
        .catch(error => {
          setIsServerError(v => ({...v, tab2: true}));
          reject(error);
        });
    });

    return new Promise.all([api1, api2]);
  };

  const handleSearch = _.debounce(search => {
    fetchOptions.current.offset = 0;
    offset.current.evaluted = 0;
    offset.current.notEvaluated = 0;
    fetchOptions.current.search = search;
    setIsSearching(true);
    setLoading(true);
    callapiFirstLoad().finally(() => {
      setIsSearching(false);
      setLoading(false);
    });
  }, FETCH_DATA_DELAY);

  const ToggleSet = toggle => {
    fetchOptions.current.offset = toggle
      ? offset.current.notEvaluated
      : offset.current.evaluted;
    setToggle(toggle);
    setIndex(toggle ? 1 : 0);
  };

  const handleLoadMore = async () => {
    if (!isLoading) {
      if (index == 0) {
        if (apiDataEvaluated.length < countMember.evaluated && !isLoading) {
          setLoading(true);

          const params = {
            com_code: userInfo.com_code,
            fund_code: userInfo.fund_code,
            ...fetchOptions.current,
            offset: fetchOptions.current.offset + FETCH_DATA_LIMIT,
          };
          await getEvaluatedInfo(params)
            .then(response => {
              if (response.status == 'success') {
                fetchOptions.current.offset += FETCH_DATA_LIMIT;
                offset.current.evaluted += FETCH_DATA_LIMIT;
                setApiDataEvaluated(v => [...v, ...response.data]);
              }
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
        }
      } else {
        if (
          apiDataNotEvaluated.length < countMember.notEvaluated &&
          !isLoading
        ) {
          setLoading(true);

          const params = {
            com_code: userInfo.com_code,
            fund_code: userInfo.fund_code,
            ...fetchOptions.current,
            offset: fetchOptions.current.offset + FETCH_DATA_LIMIT,
          };
          await getNotEvaluatedInfo(params)
            .then(response => {
              if (response.status == 'success') {
                fetchOptions.current.offset += FETCH_DATA_LIMIT;
                offset.current.notEvaluated += FETCH_DATA_LIMIT;
                setApiDataNotEvaluated(v => [...v, ...response.data]);
              }
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
        }
      }
    }
  };

  const handleOnRefresh = () => {
    setRefresing(true);
    fetchOptions.current.offset = 0;
    offset.current.evaluted = 0;
    offset.current.notEvaluated = 0;
    callapiFirstLoad().finally(() => {
      setRefresing(false);
    });
  };

  const handleOnRefreshServerError = () => {
    fetchOptions.current.offset = 0;
    offset.current.evaluted = 0;
    offset.current.notEvaluated = 0;
    callapiFirstLoad();
  };

  React.useEffect(() => {
    fetchOptions.current.offset = 0;
    offset.current.evaluted = 0;
    offset.current.notEvaluated = 0;

    callapiFirstLoad();
  }, [userInfo.com_code, userInfo.fund_code]);

  const renderItem = ({item}) => {
    if (index == 0) {
      return (
        <ListEvaluate
          name={item.em_name}
          date={item.risk_update_date}
          score={item.score}
        />
      );
    } else {
      return <ListMember name={item.em_name} />;
    }
  };

  const keyExtractor = (item, index) => 'EvaluatedId-' + index;

  return (
    <>
      <KeyboardDismiss style={{flex: 0}}>
        <HomeHeaderOnly title={Translate('textBoardEvaulateTitle')}>
          <Container style={{flex: 0}}>
            <SearchBar onChangeText={handleSearch} />
          </Container>
          <EvaluateBtn
            value={toggle}
            callback={ToggleSet}
            finished={countMember.evaluated}
            unfinished={countMember.notEvaluated}
          />
        </HomeHeaderOnly>
      </KeyboardDismiss>
      {isSearching ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          {(isServerError.tab1 === true && index === 0) ||
          (isServerError.tab2 === true && index === 1) ? (
            <ServerErrorPage onPress={handleOnRefreshServerError} />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={index == 0 ? apiDataEvaluated : apiDataNotEvaluated}
              style={{flex: 1}}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleOnRefresh}
                />
              }
              onEndReachedThreshold={0}
              onEndReached={!isLoading && handleLoadMore}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              ListFooterComponent={isLoading && <FlatlistFooter />}
              ListEmptyComponent={<EmptyData />}
            />
          )}
        </>
      )}
    </>
  );
}
