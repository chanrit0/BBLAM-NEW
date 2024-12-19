import React from 'react';
import {
  View,
  StatusBar,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';

// custom
import styles from './Style';

// global components
import OneHeader from 'components/header/OneHeader';

// local components
import CategoriesButton from './components/CategoriesButton';
import ContentBoxNews from './components/ContentBoxNews';
import {Feather} from 'components/Icons';
import {COLORS, SPACING} from 'styles';
import {isIOS, setSpinner, ViewScale} from 'utils';
import {SafeAreaView} from 'react-native';
import {SearchBar} from 'components/atoms';
import {Container} from 'components/common';

// libs
import AndroidKeyboardAdjust from 'rn-android-keyboard-adjust';
import {getCategoriesNews, getNews} from 'services/api/bblamone';
import dayjs from 'dayjs';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default ({route, navigation}) => {
  const category_name = route.params?.category_name;
  dayjs.locale('th');

  const scrollCategoryRef = React.useRef(null);
  const searchRef = React.useRef(0);
  const [category, setCategory] = React.useState([]);
  const [news, setNews] = React.useState([]);
  const [selectedIndexCategory, setSelectedIndexCategory] = React.useState(0);
  const searchOptions = React.useRef({limit: 0, last: false});
  const [search, setSearch] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const {top} = useSafeAreaInsets();

  const goToReadnews = url => () => {
    return navigation.navigate('ReadNews', {url});
  };

  const onSearch = value => {
    if (searchRef.current) {
      clearTimeout(search.current);
    }
    searchRef.current = setTimeout(() => {
      setSearch(value);
      callgetNews(selectedIndexCategory, value);
    }, 250);
  };

  const onChangeSelectedIndex = index => () => {
    setSelectedIndexCategory(index);
    callgetNews(index);
    searchOptions.current.limit = 0;
    scrollCategoryRef?.current?.scrollToIndex({
      index: index,
      viewOffset: SPACING.CONTAINER_MARGIN_HORIZONTAL,
    });
    searchOptions.current.last = false;
  };

  const renderCategoriesItem = ({item, index}) => {
    if (index === 0) {
      return (
        <CategoriesButton
          title={'Lasted'}
          image={require('assets/images/BBLAMONE/All_focus.png')}
          color={COLORS.PRIMARY}
          style={{marginRight: ViewScale(30)}}
          focus={selectedIndexCategory === index}
          onPress={onChangeSelectedIndex(index)}
        />
      );
    } else {
      return (
        <CategoriesButton
          title={item.category}
          image={{
            uri: item.url_icon,
          }}
          color={item.color_code}
          style={{marginRight: ViewScale(30)}}
          focus={selectedIndexCategory === index}
          onPress={onChangeSelectedIndex(index)}
        />
      );
    }
  };

  const renderContentBoxItem = ({item}) => {
    return (
      <ContentBoxNews
        image={
          <FastImage
            style={{width: ViewScale(200), height: ViewScale(200)}}
            source={{
              uri: item.image,
            }}
          />
        }
        icon={
          <FastImage
            style={{width: ViewScale(200), height: ViewScale(200)}}
            source={{
              uri: item.url_icon,
            }}
          />
        }
        color={item.color_code}
        title={item.category}
        content={item.title}
        date={dayjs(item.public_date).format('DD/MM/YYYY')}
        onPress={goToReadnews(item.url)}
      />
    );
  };

  const renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!loading) return null;
    return <ActivityIndicator />;
  };

  const handleLoadMore = () => {
    if (!loading && searchOptions.current.limit === false) {
      searchOptions.current.limit = searchOptions.current.limit + 20; // increase page by 1
      callgetNews(selectedIndexCategory); // method for API call
    }
  };

  const callgetNews = async (index, searchValue = null) => {
    setLoading(true);
    let search_category = '';

    if (category[index]?.category === undefined) {
      if (category_name !== 'lasted') {
        search_category = category_name;
      }
    } else {
      if (category[index]?.category === 'lasted') {
        search_category = '';
      } else {
        search_category = category[index]?.category;
      }
    }

    const paramsNews = {
      order: 'desc',
      offset: 0,
      limit: searchOptions.current.limit,
      search: searchValue !== null ? searchValue : search,
      category: search_category,
    };

    await getNews(paramsNews)
      .then(response => {
        if (response.code == '02' || response.status == 'success') {
          if (response.pagination.limit > response.pagination.total_all) {
            searchOptions.current.last = true;
          }

          if (news.length === 0) {
            setNews(response.data);
          } else {
            setNews(response.data);
          }
        }
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  };

  const callapi = () => {
    const api1 = getCategoriesNews()
      .then(response => {
        if (response.code == '02' || response.status == 'success') {
          const search_index =
            response.data.findIndex(
              (item, index) => item.category === category_name,
            ) + 1;
          setCategory([{category: 'lasted'}, ...response.data]);
          setSelectedIndexCategory(search_index);
        }
      })
      .then(callgetNews)
      .catch(error => {
        console.log(error);
      });

    return Promise.all([api1, callgetNews]);
  };

  React.useEffect(() => {
    setSpinner(true);
    callapi().finally(() => {
      setSpinner(false);
    });

    if (!isIOS) {
      AndroidKeyboardAdjust.setAdjustPan();
    }

    return () => {
      if (!isIOS) {
        AndroidKeyboardAdjust.setAdjustResize();
      }
    };
  }, []);

  React.useEffect(() => {
    if (selectedIndexCategory !== 0) {
      scrollCategoryRef?.current?.scrollToIndex({
        index: selectedIndexCategory,
        viewOffset: SPACING.CONTAINER_MARGIN_HORIZONTAL,
      });
    }
  }, [selectedIndexCategory]);

  return (
    <View style={[styles.rootContainer, {marginTop: top}]}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.GRAY_1} />
      <OneHeader title={'NEWS FEED'} titlecenter />
      <View style={{paddingHorizontal:20}}>
        <SearchBar
          inputContainerStyle={{backgroundColor: '#e8e8eb'}}
          inputStyle={{color: 'black'}}
          placeholderTextColor={COLORS.GRAY_3}
          onChangeText={onSearch}
        />
      </View>
      <View style={styles.cateogories_container}>
        <FlatList
          horizontal
          ref={scrollCategoryRef}
          data={category}
          extraData={'ListNewsId-' + selectedIndexCategory}
          contentContainerStyle={{
            paddingLeft: SPACING.CONTAINER_MARGIN_HORIZONTAL,
          }}
          onScrollToIndexFailed={info => {
            const wait = new Promise(resolve => setTimeout(resolve, 500));
            wait.then(() => {
              scrollCategoryRef?.current?.scrollToIndex({
                index: info.index,
                viewOffset: SPACING.CONTAINER_MARGIN_HORIZONTAL,
              });
            });
          }}
          showsHorizontalScrollIndicator={false}
          renderItem={renderCategoriesItem}
          keyExtractor={(item, index) => 'ListNewsId-' + index}
        />
      </View>
      <FlatList
        data={news}
        renderItem={renderContentBoxItem}
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: ViewScale(20),
          paddingHorizontal: SPACING.CONTAINER_MARGIN_HORIZONTAL,
        }}
        onEndReachedThreshold={0.4}
        onEndReached={handleLoadMore}
        ListFooterComponent={renderFooter}
        keyExtractor={(item, index) => 'ListNewsId-' + index}
      />
    </View>
  );
};
