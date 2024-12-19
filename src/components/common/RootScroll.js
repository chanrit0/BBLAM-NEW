/* eslint-disable react-native/no-inline-styles */
// React
import React from 'react';
import {
  View,
  Animated,
  Easing,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  RefreshControl,
} from 'react-native';

// custom
import {FONT_SIZE, SPACING} from 'styles';
import {isTablet, isIOS, ViewScale, FontScale} from 'utils';

// components
import {Container} from './Container';
import {Menu} from 'components/Icons/Customs';
import {Ionicons} from 'components/Icons';
import {LinearGradient, ParallaxScroll, TextMedium} from 'components/atoms';

// lib
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import _ from 'lodash';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import FastImage from 'react-native-fast-image';
import {Badge} from 'react-native-paper';
import {useRecoilValue} from 'recoil';
import {userInfoState} from 'recoil-state';

export function RootScroll({
  children,
  isBackIcon = false,
  title, // title -> scroll และ ไม่ scroll
  headerChildren, // header ตอนยังไม่ scroll
  // parallaxHeight = 500,
  scrollEnabled = true,
  headerRightChildren, // right header เมื่อยังไม่ scroll ลงมาแล้ว
  headerCenterChildren,
  backgroundColor = 'white',
  flexContainer = false, // flex 1 Container
  fixPullHeight = isTablet ? false : true, // fix height ของ ส่วนด้านบนที่ลงมา
  onRefreshCallback = null,
  ...props
}) {
  const [showHeader, setShowHeader] = React.useState(false);
  const navigation = useNavigation();
  const {top, bottom} = useSafeAreaInsets();
  const currentPos = React.useRef(new Animated.Value(ViewScale(-150))).current;
  const [headerHeight, setHeaderHeight] = React.useState(300); // header ที่ เป็น background
  const [Loaded, setLoaded] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const userInfo = useRecoilValue(userInfoState);

  const onRefresh = () => {
    if (typeof onRefreshCallback === 'function') {
      console.log('refreshing');
      setRefreshing(true);
      onRefreshCallback().finally(() => {
        setRefreshing(false);
      });
      setTimeout(() => {
        setRefreshing(false);
      }, 5000);
    }
  };

  let BottomHeight = 0;

  try {
    BottomHeight = useBottomTabBarHeight();
  } catch (error) {}

  React.useEffect(() => {
    if (showHeader) {
      Animated.timing(currentPos, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(currentPos, {
        toValue: ViewScale(-200),
        duration: 400,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }).start();
    }
    setLoaded(true);
  }, [showHeader]);

  return (
    <>
      <StatusBar
        translucent
        animated
        barStyle={'light-content'}
        backgroundColor={'transparent'}
      />
      <Animated.View // Special animatable View
        style={{
          position: 'absolute',
          top: 0,
          zIndex: 1,
          width: '100%',
          height: SPACING.HEADER_HEIGHT + top + ViewScale(20),
          transform: [
            {
              translateY: currentPos,
            },
          ], // Bind opacity to animated value
        }}>
        <LinearGradient
          style={{flex: 1, justifyContent: 'center', overflow: 'hidden'}}>
          {showHeader && (
            <View style={styles.containerLogo}>
              <FastImage
                resizeMode={FastImage.resizeMode.contain}
                style={styles.backgroundLogo}
                source={require('assets/images/logoOnlyWhite.png')}
              />
            </View>
          )}
          {/* hamburger */}
          <View
            style={{
              // height: SPACING.HEADER_HEIGHT,
              marginTop: top,
              justifyContent: 'center',
            }}>
            <Container
              style={{
                flex: 0,
                marginLeft: 0,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {isBackIcon && (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{
                    alignSelf: 'flex-start',
                    height: SPACING.HEADER_HEIGHT,
                    paddingHorizontal: SPACING.CONTAINER_MARGIN_HORIZONTAL,
                    justifyContent: 'center',
                  }}>
                  <Ionicons
                    name="arrow-back"
                    size={FontScale(35)}
                    color="#FFF"
                  />
                </TouchableOpacity>
              )}

              {!isBackIcon && (
                <TouchableOpacity
                  onPress={() => navigation.openDrawer()}
                  style={{
                    alignSelf: 'flex-start',
                    height: SPACING.HEADER_HEIGHT,
                    paddingHorizontal: SPACING.CONTAINER_MARGIN_HORIZONTAL,
                    justifyContent: 'center',
                  }}>
                  <Menu width={ViewScale(25)} height={ViewScale(25)} />
                  <View style={styles.badgeContainer}>
                    {userInfo.deposit_count_member > 0 &&
                      userInfo.role == 'committee' && (
                        <Badge>{userInfo.deposit_count_member}</Badge>
                      )}
                  </View>
                </TouchableOpacity>
              )}
              {!_.isEmpty(title) && (
                <View style={{flexDirection: 'row', flex: 1}}>
                  <TextMedium
                    size={FONT_SIZE.TITLE_2}
                    color="#FFF"
                    style={{flexWrap: 'wrap'}}>
                    {title}
                  </TextMedium>
                </View>
              )}
            </Container>
          </View>
        </LinearGradient>
      </Animated.View>
      <KeyboardAvoidingView style={{flex: 1}} behavior={isIOS ? 'padding' : ''}>
        <ParallaxScroll
          // heder แสดงเมื่อ scroll ผ่านลงไป header ตัวนี้จะโชว์ลงมา
          style={{flex: 1}}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            minHeight: Dimensions.get('window').height - BottomHeight,
          }}
          scrollStyle={{marginTop: top}}
          onScroll={({
            nativeEvent: {
              contentOffset: {y},
            },
          }) => {
            if (y > headerHeight) {
              setShowHeader(true);
            } else {
              setShowHeader(false);
            }
          }}
          // refreshControl={
          //   typeof onRefreshCallback === 'function' && (
          //     <RefreshControl
          //       enabled
          //       refreshing={refreshing}
          //       onRefresh={onRefresh}
          //     />
          //   )
          // }
          isHeaderFixed={true}
          scrollEnabled={scrollEnabled}
          showsVerticalScrollIndicator={false}
          isBackgroundScalable={true}
          useNativeDriver={true}
          parallaxHeight={ViewScale(500) + top}
          {...props}
          // header show ณ ตอนนี้
          renderBackgroundPlaceholder={() => (
            <View
              onLayout={({
                nativeEvent: {
                  layout: {height},
                },
              }) => setHeaderHeight(height)}>
              {/* hamburger */}
              <View style={styles.containerLogo}>
                <FastImage
                  resizeMode={FastImage.resizeMode.contain}
                  style={styles.backgroundLogo}
                  source={require('assets/images/logoOnlyWhite.png')}
                />
              </View>
              <Container
                style={{
                  flex: 0,
                  height: SPACING.HEADER_HEIGHT,
                  marginLeft: 0,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View>
                  {isBackIcon && (
                    <TouchableOpacity
                      onPress={() => navigation.goBack()}
                      style={{
                        alignSelf: 'flex-start',
                        flex: 1,
                        paddingHorizontal: SPACING.CONTAINER_MARGIN_HORIZONTAL,
                        justifyContent: 'center',
                      }}>
                      <Ionicons
                        name="arrow-back"
                        size={FontScale(35)}
                        color="#FFF"
                      />
                    </TouchableOpacity>
                  )}
                  {!isBackIcon && (
                    <TouchableOpacity
                      onPress={() => navigation.openDrawer()}
                      style={{
                        alignSelf: 'flex-start',
                        flex: 1,
                        paddingHorizontal: SPACING.CONTAINER_MARGIN_HORIZONTAL,
                        justifyContent: 'center',
                      }}>
                      <Menu width={ViewScale(25)} height={ViewScale(25)} />
                      <View style={styles.badgeContainer}>
                        {userInfo.deposit_count_member > 0 &&
                          userInfo.role == 'committee' && (
                            <Badge>{userInfo.deposit_count_member}</Badge>
                          )}
                      </View>
                    </TouchableOpacity>
                  )}
                </View>

                {headerRightChildren}
              </Container>
              <View
                pointerEvents={'none'}
                style={{
                  width: '100%',
                  position: 'absolute',
                  justifyContent: 'center',
                  height: SPACING.HEADER_HEIGHT,
                }}>
                {headerCenterChildren}
              </View>

              {!_.isEmpty(title) && (
                <Container style={[{flex: 0}]}>
                  <TextMedium size={FONT_SIZE.TITLE_2} color="#FFF">
                    {title}
                  </TextMedium>
                </Container>
              )}
              {headerChildren}
              <View style={{height: ViewScale(20)}} />
            </View>
          )}
          renderParallaxBackground={({height, animatedValue}) => (
            <LinearGradient style={{height: height}} />
          )}
          parallaxBackgroundScrollSpeed={1}
          parallaxForegroundScrollSpeed={1}>
          <View
            style={{
              backgroundColor: backgroundColor,
              flex: flexContainer ? 1 : 0,
            }}>
            {children}
          </View>
          <View
            style={{
              height: BottomHeight
                ? SPACING.FOOTER_HEIGHT
                : bottom + SPACING.FOOTER_HEIGHT,
            }}
          />
        </ParallaxScroll>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  hamburger: {
    justifyContent: 'flex-start',
  },
  backgroundLogo: {
    width: wp(60),
    height: wp(60),
  },
  containerLogo: {
    position: 'absolute',
    right: 0,
    top: 0,
    opacity: 0.25,
    // backgroundColor: 'red',
    transform: [
      {
        translateX: wp(23),
      },
    ],
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  badgeContainer: {
    position: 'absolute',
    right: ViewScale(15),
    bottom: ViewScale(15),
  },
});
