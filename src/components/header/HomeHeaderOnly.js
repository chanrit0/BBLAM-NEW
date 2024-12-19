import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {ViewScale, FontScale} from 'utils';
import {Menu} from 'components/Icons/Customs';
import {Container} from 'components/common';
import {LinearGradient, TextMedium} from 'components/atoms';
import {useNavigation} from '@react-navigation/native';
import _ from 'lodash';
import {Ionicons} from 'components/Icons';
import {COLORS, FONT_SIZE, SPACING} from 'styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import {Badge} from 'react-native-paper';
import {useRecoilValue} from 'recoil';
import {userInfoState} from 'recoil-state';
import {StatusBar} from 'native-base';

export default function HomeHeaderOnly({
  children,
  isBackIcon,
  noIcon,
  title,
  style,
  backIconCallback,
  badge,
}) {
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();
  const userInfo = useRecoilValue(userInfoState);

  const renderIcon = () => {
    if (noIcon) {
      return <View style={{paddingVertical: ViewScale(15)}} />;
    }

    if (isBackIcon) {
      return (
        <TouchableOpacity
          onPress={() => {
            if (typeof backIconCallback === 'function') {
              backIconCallback?.();
            } else {
              navigation.goBack();
            }
          }}
          style={{
            alignSelf: 'flex-start',
            height: SPACING.HEADER_HEIGHT,
            paddingHorizontal: SPACING.CONTAINER_MARGIN_HORIZONTAL,
            justifyContent: 'center',
          }}>
          <Ionicons name="arrow-back" size={FontScale(35)} color="#FFF" />
        </TouchableOpacity>
      );
    } else {
      return (
        <View
          style={{
            paddingVertical: ViewScale(25),
            height: SPACING.HEADER_HEIGHT,
            justifyContent: 'center',
          }}>
          <Container style={{flex: 0}}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <View style={styles.hamburger}>
                <Menu width={ViewScale(25)} height={ViewScale(25)} />
                {userInfo.role == 'committee' &&
                  userInfo.deposit_count_member > 0 && (
                    <View style={styles.badgeContainer}>
                      <Badge>{userInfo.deposit_count_member}</Badge>
                    </View>
                  )}
              </View>
            </TouchableOpacity>
          </Container>
        </View>
      );
    }
  };

  return (
    <View style={[styles.container, style]}>
      <StatusBar
        translucent
        animated
        barStyle={'light-content'}
        backgroundColor={'transparent'}
      />
      <LinearGradient>
        <View style={{marginTop: top}} />
        <View style={styles.containerLogo}>
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            style={styles.backgroundLogo}
            source={require('assets/images/logoOnlyWhite.png')}
          />
        </View>
        {renderIcon()}
        {title && (
          <View style={{marginBottom: ViewScale(10)}}>
            <Container style={{flex: 0}}>
              <TextMedium style={styles.textHeader}>{title}</TextMedium>
            </Container>
          </View>
        )}
        {children}
        <View style={{height: ViewScale(20)}} />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  textHeader: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZE.TITLE_1,
  },
  hamburger: {
    justifyContent: 'flex-start',
  },
  containerLogo: {
    position: 'absolute',
    right: 0,
    top: ViewScale(30),
    opacity: 0.25,
    // backgroundColor: 'red',
    transform: [
      {
        translateX: wp(23),
      },
    ],
  },
  backgroundLogo: {
    width: wp(60),
    height: wp(60),
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: COLORS.WHITE,
    backgroundColor: 'transparent',
  },
  badgeContainer: {
    position: 'absolute',
    left: ViewScale(15),
    bottom: ViewScale(-7),
  },
});
