/* eslint-disable react-native/no-inline-styles */

// React
import React from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  RefreshControl,
  Image,
  Linking,
} from 'react-native';

// custom
import styles from './Style';
import {Translate} from 'function';
import {ViewScale} from 'utils';
import {COLORS} from 'styles';

// global components
import {Container} from 'components/common';
import {SafeAreaView, Avatar, TextBold} from 'components/atoms';
import {MaterialIcons} from 'components/Icons';

// local components
import Banner from './components/Banner';
import CategoriesButton from './components/CategoriesButton';
import ContentBoxNews from './components/ContentBoxNews';
import AlertLogin from './components/AlertLogin';
import AppScrollViewIOSBounceColorsWrapper from './components/AppScrollViewIOSBounceColorsWrapper';
import NewsLoader from './Loader/NewsLoader';
import ContentBoxNewsLoader from './Loader/ContentBoxNewsLoader';

// lib
import FastImage from 'react-native-fast-image';
// import OTPublishersNativeSDK from 'react-native-onetrust-cmp';

// recoil
import {useRecoilValue} from 'recoil';
import {languageState, userDeviceStatusState} from 'recoil-state';
import {getBanners, getCategoriesNews, getNews} from 'services/api/bblamone';
import dayjs from 'dayjs';
import {AlertNotAvaliable} from 'components/molecules';

export default function index({navigation}) {
  useRecoilValue(languageState);
  dayjs.locale('th');
  const {isSignIn} = useRecoilValue(userDeviceStatusState);
  const [apiData, setApiData] = React.useState({
    category: [],
    news: [],
    banners: [],
  });
  const [refreshing, setRefreshing] = React.useState(false);
  const firstRender = React.useRef(true);

  const goToListNews = category_name => () => {
    return navigation.navigate('ListNews', {category_name});
  };

  const goToReadnews = url => () => {
    return navigation.navigate('ReadNews', {url});
  };

  const shuffle = array => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  const callapi = () => {
    if (!firstRender.current) {
      setRefreshing(true);
    }
    const api1 = new Promise((resolve, reject) => {
      getCategoriesNews()
        .then(response => {
          if (response.code == '02' || response.status == '02') {
            resolve(shuffle(response.data));
          }
        })
        .catch(error => {
          console.log(error);
        });
    });

    const api2 = new Promise((resolve, reject) => {
      getNews({
        order: 'desc',
        offset: 0,
        limit: 5,
      })
        .then(response => {
          if (response.code == '02' || response.status == 'success') {
            resolve(response.data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    });

    const api3 = new Promise((resolve, reject) => {
      getBanners()
        .then(response => resolve(response?.data))
        .catch(error => console.log(error));
    });

    return Promise.all([api1, api2, api3]).finally(() => setRefreshing(false));
  };

  const onRefresh = () => {
    callapi().then(data =>
      setApiData({category: data[0], news: data[1], banners: data[2]}),
    );
  };

  const handleOnPressNotification = () => {
    navigation.navigate('Alert1', {
      children: <AlertNotAvaliable />,
      title: Translate('textConfirm2'),
    });
  };

  const showPreferenceCenter = () => {
    // OTPublishersNativeSDK.showPreferenceCenterUI();
  };

  React.useEffect(() => {
    let isMounted = true;
    callapi()
      .then(data => {
        if (isMounted)
          setApiData({
            category: data[0],
            news: data[1],
            banners: data[2],
          });
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        firstRender.current = false;
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={COLORS.PRIMARY}
        translucent
        animated
      />
      <SafeAreaView noBottom>
        <AppScrollViewIOSBounceColorsWrapper
          style={{flex: 1}}
          bottomBounceColor={COLORS.GRAY_1}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {/* header */}
            <View style={[styles.headerContainer]}>
              <Container style={styles.container}>
                <View style={styles.header}>
                  <TouchableOpacity
                    onPress={() => {
                      isSignIn
                        ? navigation.openDrawer()
                        : navigation.navigate('Alert1', {
                            title: `${Translate('textLogIn')} / ${Translate(
                              'textRegister',
                            )}`,
                            onPress: () => {
                              navigation.navigate('PVDStack');
                            },
                            children: <AlertLogin />,
                            TouchableBackdrop: true,
                          });
                    }}>
                    <View style={styles.headerLeft}>
                      <Avatar />
                      <TextBold style={styles.textHeader}>
                        {Translate('textWelcome')}
                      </TextBold>
                    </View>
                  </TouchableOpacity>
                  <View style={{flexDirection: 'row'}}>
                    {/* <TouchableOpacity onPress={showPreferenceCenter}>
                      <Image
                        resizeMode={'contain'}
                        style={{
                          transform: [{translateY: 3}],
                          width: 20,
                          height: 20,
                        }}
                        source={require('assets/icons/technology-privacy-consent-profile-list-approve.png')}
                      />
                    </TouchableOpacity> */}
                    <View style={{width: ViewScale(10)}} />
                    <TouchableOpacity onPress={handleOnPressNotification}>
                      <MaterialIcons
                        name="notifications-none"
                        color={COLORS.WHITE}
                        size={ViewScale(30)}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* banner */}
                {apiData.banners.length > 0 ? (
                  <Banner>
                    {apiData.banners.map(item => (
                      <TouchableOpacity
                        onPress={() => {
                          if (item?.link != undefined) {
                            Linking.canOpenURL(item?.link);
                          }
                        }}
                        key={item}
                        style={styles.bannerContent}>
                        <FastImage
                          style={{height: '100%'}}
                          resizeMode={FastImage.resizeMode.cover}
                          source={{
                            uri: item.url,
                            priority: FastImage.priority.high,
                          }}
                        />
                      </TouchableOpacity>
                    ))}
                  </Banner>
                ) : (
                  <View style={{height: ViewScale(180)}} />
                )}
              </Container>
            </View>

            {/* body */}
            <View style={styles.wrapper_body}>
              <View style={styles.behindbody} />
              <View style={styles.body}>
                <View>
                  <Container>
                    <View style={{marginBottom: ViewScale(20)}}>
                      {apiData.category.length > 0 ? (
                        <View
                          style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                          }}>
                          <View key={'CategoryIdButtonLasted' + index}>
                            <CategoriesButton
                              title={'Lasted'}
                              focus={true}
                              image={require('assets/images/BBLAMONE/All_focus.png')}
                              color={COLORS.PRIMARY}
                              onPress={goToListNews('lasted')}
                            />
                          </View>
                          {apiData.category?.map((item, index) => {
                            if (index < 6) {
                              return (
                                <View key={'CategoryIdButton' + index}>
                                  <CategoriesButton
                                    title={item.category}
                                    focus={false}
                                    image={{
                                      uri: item.url_icon + '?' + new Date(),
                                    }}
                                    color={item.color_code}
                                    onPress={goToListNews(item.category)}
                                  />
                                </View>
                              );
                            } else if (index === 6) {
                              return (
                                <View key={'CategoryIdButtonMore' + index}>
                                  <CategoriesButton
                                    title={'MORE'}
                                    focus={true}
                                    image={require('assets/images/BBLAMONE/More_focus.png')}
                                    color={COLORS.PRIMARY}
                                    onPress={goToListNews('lasted')}
                                  />
                                </View>
                              );
                            }
                          })}
                        </View>
                      ) : (
                        <NewsLoader />
                      )}
                    </View>

                    {apiData.news.length > 0 ? (
                      apiData.news?.map((item, index) => (
                        <View key={'NewsIdBblamone-' + index}>
                          <ContentBoxNews
                            image={
                              <FastImage
                                style={{
                                  width: ViewScale(210),
                                  height: ViewScale(200),
                                }}
                                source={{
                                  uri: item.image,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                              />
                            }
                            icon={
                              <FastImage
                                source={{
                                  uri: item.url_icon,
                                }}
                                resizeMode={FastImage.resizeMode.contain}
                              />
                            }
                            title={item.category}
                            content={item.title}
                            color={item.color_code}
                            date={dayjs(item.public_date).format('DD/MM/YYYY')}
                            onPress={goToReadnews(item.url)}
                          />
                        </View>
                      ))
                    ) : (
                      <ContentBoxNewsLoader />
                    )}
                  </Container>
                </View>
              </View>
            </View>
          </ScrollView>
        </AppScrollViewIOSBounceColorsWrapper>
      </SafeAreaView>
    </>
  );
}
