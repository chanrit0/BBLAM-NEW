/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/rules-of-hooks */
// React
import React from 'react';
import {FlatList, View} from 'react-native';

// custom
import {Translate} from 'function';

// components
import Header from 'components/header/HomeHeaderOnly';
import {Container} from 'components/common';
import {ActivityIndicator, KeyboardDismiss, SearchBar} from 'components/atoms';

import NewsList from './components/NewsList';

// lib
import {useSafeAreaInsets} from 'react-native-safe-area-context';
// data
import {getNews} from 'services/api/member';
import _ from 'lodash';
import {setSpinner} from 'utils';
import {FETCH_DATA_DELAY, FETCH_DATA_LIMIT} from 'config';
import {EmptyData} from 'components/organisms';
import {FlatlistFooter} from 'components/molecules';
import NewsLoader from './Loader/NewsLoader';
import ServerErrorPage from 'screens/Global/ServerErrorPage';

export default function index({navigation}) {
  const [apiData, setApiData] = React.useState([]);
  const {bottom} = useSafeAreaInsets();
  const [isSearching, setIsSearching] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const total_all = React.useRef(0);
  const [isServerError, setIsServerError] = React.useState(false);
  const fetchOptions = React.useRef({
    search: '',
    limit: FETCH_DATA_LIMIT,
    order: 'DESC',
    offset: 0,
  });

  const callapi = async () => {
    await getNews(fetchOptions.current)
      .then(response => {
        setApiData(response.data);
        total_all.current = response.pagination.total_all;
        setIsServerError(false);
      })
      .catch(error => {
        setIsServerError(true);
        console.log(error);
      });
  };

  const handleOnRefreshServerError = () => {
    setSpinner(true);
    callapi().finally(() => {
      setSpinner(false);
    });
  };

  React.useEffect(() => {
    setIsSearching(true);
    callapi().finally(() => setIsSearching(false));
  }, []);

  const handleOnSearch = _.debounce(search => {
    fetchOptions.current.offset = 0;
    fetchOptions.current.search = search;
    setLoading(true);
    setIsSearching(true);
    callapi().finally(() => {
      setLoading(false);
      setIsSearching(false);
    });
  }, FETCH_DATA_DELAY);

  const handleLoadMore = async () => {
    if (apiData.length < total_all.current) {
      setLoading(true);
      await getNews(fetchOptions.current)
        .then(response => {
          setApiData(v => [...v, ...response.data]);
        })
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    }
  };

  const renderItem = ({item}) => (
    <NewsList
      title={item.title}
      image={item.image}
      date={item.date}
      onPress={() => navigation.navigate('DetailNews', {item})}
    />
  );

  const keyExtractor = (item, index) => 'idNews-' + index;

  return (
    <>
      <KeyboardDismiss>
        <Header onlyicon={true} isBackIcon={true} title={Translate('textNews')}>
          <Container style={{flex: 0}}>
            <SearchBar onChangeText={handleOnSearch} />
          </Container>
        </Header>

        {!isSearching ? (
          <>
            {isServerError ? (
              <ServerErrorPage onPress={handleOnRefreshServerError} />
            ) : (
              <FlatList
                data={apiData}
                showsVerticalScrollIndicator={false}
                windowSize={10}
                onEndReachedThreshold={0}
                onEndReached={!loading && handleLoadMore}
                maxToRenderPerBatch={8}
                ListEmptyComponent={
                  <EmptyData title={Translate('textNotFoundData')} />
                }
                ListFooterComponent={loading && <FlatlistFooter />}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
              />
            )}
          </>
        ) : (
          <>
            {Array(10)
              .fill(0)
              .map((item, index) => (
                <View key={'NewsLoaderId' + index}>
                  <NewsLoader />
                </View>
              ))}
          </>
        )}
        <View style={{marginBottom: bottom}} />
      </KeyboardDismiss>
    </>
  );
}
