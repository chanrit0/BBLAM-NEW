/* eslint-disable react/self-closing-comp */

// React
import React from 'react';
import {View, FlatList, RefreshControl} from 'react-native';

// custom
import {setSpinner} from 'utils';
import {COLORS, FONT_SIZE, SPACING} from 'styles';

// components
import {Container} from 'components/common';
import {
  SearchBar,
  TextRegular,
  TextMedium,
  ActivityIndicator,
} from 'components/atoms';
import styles from './Style';
import List from './components/List';
import {Translate} from 'function';
import HomeHeaderOnly from 'components/header/HomeHeaderOnly';
import {EmptyData} from 'components/organisms';
import {FlatlistFooter} from 'components/molecules';

// data
import {getDetailMemberList} from 'services/api/committee';
import {useRecoilValue} from 'recoil';
import {userInfoState} from 'recoil-state';
import {FETCH_DATA_LIMIT, FETCH_DATA_DELAY} from 'config';
import _ from 'lodash';
import ServerErrorPage from 'screens/Global/ServerErrorPage';
import {useIsMounted} from 'hooks';

export default ({navigation}) => {
  const userInfo = useRecoilValue(userInfoState);
  const [apiData, setApiData] = React.useState([]);
  const [countMember, setCountMember] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [refreshing, setIsRefreshing] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);
  const [isServerError, setIsServerError] = React.useState(false);
  const fetchOptions = React.useRef({
    limit: FETCH_DATA_LIMIT,
    offset: 0,
    search: '',
  });

  const callapiFirstLoad = async () => {
    await getDetailMemberList({
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
        console.log(error);
      });
  };

  const callapi = async () => {
    setIsLoading(true);
    await getDetailMemberList({
      com_code: userInfo.com_code,
      fund_code: userInfo.fund_code,
      ...fetchOptions.current,
    })
      .then(response => {
        if (response.status == 'success' || response.code == '02') {
          setApiData(response.data);
        }
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };

  React.useEffect(() => {
    setSpinner(true);
    callapiFirstLoad().finally(() => {
      setSpinner(false);
    });
  }, [userInfo.com_code, userInfo.fund_code]);

  const _PressDetail = em_code => () => {
    return navigation.navigate('MemberProfileDetail', {em_code});
  };

  const onSearch = _.debounce(text => {
    fetchOptions.current.search = text;
    fetchOptions.current.offset = 0;
    setIsSearching(true);
    callapi().finally(() => setIsSearching(false));
  }, FETCH_DATA_DELAY);

  const handleOnEndReached = async () => {
    if (apiData.length < countMember) {
      setIsLoading(true);
      fetchOptions.current.offset += FETCH_DATA_LIMIT;
      await getDetailMemberList({
        com_code: userInfo.com_code,
        fund_code: userInfo.fund_code,
        ...fetchOptions.current,
      })
        .then(response => {
          if (response.status == 'success' || response.code == '02') {
            setApiData(value => [...value, ...response.data]);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => setIsLoading(false));
    }
  };

  const renderItem = ({item, index}) => {
    return <List data={item} onPress={_PressDetail(item.em_code)} />;
  };

  const keyExtractor = (item, index) => 'ListMemberId' + index;

  const handleOnRefresh = () => {
    fetchOptions.current.offset = 0;
    setIsRefreshing(true);
    callapi().finally(() => setIsRefreshing(false));
  };

  const handleOnRefreshServerError = () => {
    setSpinner(true);
    callapiFirstLoad().finally(() => setSpinner(false));
  };

  return (
    <>
      <RenderHomeHeader
        userInfo={userInfo}
        countMember={countMember}
        onSearch={onSearch}
      />
      {isSearching ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          {isServerError ? (
            <ServerErrorPage onPress={handleOnRefreshServerError} />
          ) : (
            <FlatList
              data={apiData}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              onEndReached={!isLoading && handleOnEndReached}
              onEndReachedThreshold={0}
              contentContainerStyle={{paddingBottom: SPACING.FOOTER_HEIGHT}}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleOnRefresh}
                />
              }
              ListFooterComponent={isLoading && <FlatlistFooter />}
              ListEmptyComponent={
                <EmptyData title={Translate('textNotFoundData')} />
              }
            />
          )}
        </>
      )}
    </>
  );
};

const RenderHomeHeader = React.memo(({userInfo, countMember, onSearch}) => {
  return (
    <HomeHeaderOnly isBackIcon>
      <Container style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TextMedium size={FONT_SIZE.TITLE_3} color={COLORS.WHITE}>
            {'ข้อมูลรายสมาชิก'}
          </TextMedium>
          <TextRegular size={FONT_SIZE.BODY_2} color={COLORS.WHITE}>
            {`จำนวนสมาชิก ${countMember ?? '-'} ราย`}
          </TextRegular>
        </View>
        <View style={styles.comNameContainer}>
          <View style={styles.comNameInLeftContainer}>
            <TextRegular size={FONT_SIZE.BODY_2} color={COLORS.WHITE}>
              {userInfo?.com_name}
            </TextRegular>
          </View>
        </View>
        <SearchBar onChangeText={onSearch} />
      </Container>
    </HomeHeaderOnly>
  );
});
