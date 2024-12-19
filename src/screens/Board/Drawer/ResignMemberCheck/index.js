/* eslint-disable react/self-closing-comp */
// React
import React from 'react';
import {FlatList, RefreshControl, View} from 'react-native';

// styles
import {COLORS, FONT_SIZE, SPACING} from 'styles';
import {FETCH_DATA_LIMIT} from 'config';
import {Translate} from 'function';

// components
import Header from './components/Header';
import HomeHeaderOnly from 'components/header/HomeHeaderOnly';
import ListItemAccordion from './components/ListItemAccordion';
import {ActivityIndicator, KeyboardDismiss, TextMedium} from 'components/atoms';
import {EmptyData} from 'components/organisms';
import {FlatlistFooter} from 'components/molecules';

// recoil
import {useRecoilValue} from 'recoil';
import {languageState, userInfoState} from 'recoil-state';

// libs
import {setSpinner} from 'utils';
import _ from 'lodash';

// services
import {getResignMember} from 'services/api/committee';
import {Container} from 'components/common';
import {FETCH_DATA_DELAY} from 'config';
import ServerErrorPage from 'screens/Global/ServerErrorPage';

export default function ResignMemberCheck() {
  useRecoilValue(languageState);
  const userInfo = useRecoilValue(userInfoState);
  const [apiData, setApiData] = React.useState([]);
  const [headerData, setHeaderData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isServerError, setIsServerError] = React.useState(false);
  const fetchOptions = React.useRef({
    search: '',
    offset: 0,
    limit: FETCH_DATA_LIMIT,
  });

  const callapi = async () => {
    await getResignMember({
      order: 'DESC',
      com_code: userInfo.com_code,
      fund_code: userInfo.fund_code,
      ...fetchOptions.current,
    })
      .then(response => {
        if (response.code == '02' || response.status == 'success') {
          setApiData(response.data);
          setHeaderData({
            date: response?.pagination?.date_thai,
            com_name: userInfo.com_name,
            sum_all: response?.pagination?.sum_all,
            count_resign_fund: response?.pagination?.count_resign_fund,
            count_resign_job: response?.pagination?.count_resign_job,
            total_all: response?.pagination?.total_all,
          });
          setIsServerError(false);
        }
      })
      .catch(error => {
        setIsServerError(true);
        console.log(error);
      });
  };

  React.useEffect(() => {
    setSpinner(true);
    callapi().finally(() => {
      setSpinner(false);
    });
  }, []);

  const onSearch = _.debounce(search => {
    setIsSearching(true);
    fetchOptions.current.search = search;
    fetchOptions.current.offset = 0;
    callapi().finally(() => setIsSearching(false));
  }, FETCH_DATA_DELAY);

  const handleLoadMore = async () => {
    if (!isLoading && apiData.length < headerData.total_all) {
      setIsLoading(true);
      fetchOptions.current.offset += FETCH_DATA_LIMIT;
      await getResignMember({
        order: 'DESC',
        ...fetchOptions.current,
      })
        .then(response => {
          setApiData(v => [...v, ...response.data]);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => setIsLoading(false));
    }
  };

  // const itemT = [
  //   {
  //     em_name : 'น.ส.NAAMEO SNAMEO',
  //     resign_cause_name: 'ลาออกจากกองทุนโดยไม่ลาออกจากงาน',
  //     pay_amount : '401893.90',
  //     pay_method_name : 'Accountt Payee',
  //     resign_date: '01/11/2565',
  //     pay_date : '18/11/2565',
  //     tax_amount : '0',
  //     register_date: '01/11/2549',
  //   }
  // ]

  const renderItem = ({item}) => (
    <ListItemAccordion
      name={item.em_name}
      status={item.resign_cause_name}
      payment={item.pay_amount}
      payMethod={item.pay_method_name}
      resignDate={item.resign_date}
      payDate={item.pay_date}
      tax={item.tax_amount}
      registerDate={item.register_date}
    />
  );

  const keyExtractor = (item, index) => 'ResignMemberId' + index;

  const handleOnRefresh = () => {
    setRefreshing(true);
    callapi().finally(() => setRefreshing(false));
  };

  const handleOnRefreshServerError = () => {
    setSpinner(true);
    callapi().finally(() => setSpinner(false));
  };

  return (
    <>
      <KeyboardDismiss style={{flex: 0}}>
        <HomeHeaderOnly isBackIcon>
          {!isServerError && <Header data={headerData} onSearch={onSearch} />}
        </HomeHeaderOnly>
      </KeyboardDismiss>
      {isServerError ? (
        <ServerErrorPage onPress={handleOnRefreshServerError} />
      ) : (
        <>
          {isSearching ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator />
            </View>
          ) : (
            <FlatList
              data={apiData}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleOnRefresh}
                />
              }
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0}
              onEndReached={handleLoadMore}
              ListFooterComponent={isLoading && <FlatlistFooter />}
              ListEmptyComponent={
                <EmptyData title={Translate('textEmptyData')} />
              }
              renderItem={renderItem}
              keyExtractor={keyExtractor}
            />
          )}
        </>
      )}
      <View style={{marginBottom: SPACING.FOOTER_HEIGHT}} />
    </>
  );
}
