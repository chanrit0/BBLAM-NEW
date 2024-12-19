/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {Image} from 'react-native';

import {Translate} from 'function';
import {FontScale, isIOS, ViewScale} from 'utils';
import {COLORS, SPACING} from 'styles';
import {isTablet} from 'utils';

import {AntDesign, SimpleLineIcons, Entypo} from 'components/Icons';
import {TextMedium} from 'components/atoms';

// lib
import {TouchableRipple} from 'react-native-paper';

// Recoil
import {useRecoilValue} from 'recoil';
import {languageState} from 'recoil-state';

export default {
  initialRouteName: 'Home',
  tabBarOptions: {
    safeAreaInsets: !isIOS && {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  },
  lazy: false,
  screenOptions: ({route}) => ({
    headerShown: false,
    tabBarIcon: ({focused, color}) => {
      let iconName;
      let imageName;
      let size = SPACING.TABBAR_ICONS_SIZE;

      if (route.name === 'Home') {
        iconName = 'home';
        return (
          <AntDesign
            name={iconName}
            size={size}
            color={focused ? COLORS.PRIMARY : '#8E8E8F'}
          />
        );
      } else if (route.name === 'Profile') {
        iconName = 'user';
        return (
          <SimpleLineIcons
            name={'user'}
            size={size}
            color={focused ? COLORS.PRIMARY : '#8E8E8F'}
          />
        );
      } else if (route.name === 'Remittance') {
        imageName = focused ? (
          <Image
            source={require('assets/images/Tabbar/Remittance_focused.png')}
            style={{
              width: size,
              height: size,
            }}
          />
        ) : (
          <Image
            style={{
              width: size,
              height: size,
            }}
            source={require('assets/images/Tabbar/Remittance.png')}
          />
        );
        return imageName;
      } else if (route.name === 'Summary') {
        imageName = focused ? (
          <Image
            style={{
              width: size,
              height: size,
            }}
            resizeMode={'contain'}
            source={require('assets/images/Tabbar/Summary_focused.png')}
          />
        ) : (
          <Image
            source={require('assets/images/Tabbar/Summary.png')}
            resizeMode={'contain'}
            style={{
              width: size,
              height: size,
            }}
          />
        );
        return imageName;
      } else if (route.name === 'ChangeFund') {
        iconName = 'shuffle';
        return (
          <Entypo
            name={iconName}
            size={size}
            color={focused ? COLORS.PRIMARY : '#8E8E8F'}
          />
        );
      } else if (route.name === 'RiskProfile') {
        imageName = focused ? (
          <Image
            resizeMode={'contain'}
            style={{
              width: size,
              height: size,
            }}
            source={require('assets/images/Tabbar/Evaluation_focused.png')}
          />
        ) : (
          <Image
            resizeMode={'contain'}
            style={{
              width: size,
              height: size,
            }}
            source={require('assets/images/Tabbar/Evaluation.png')}
          />
        );
        return imageName;
      }

      // You can return any component that you like here!
      // return <AntDesign name={iconName} size={size} color={color} />;
    },
    tabBarLabel: ({focused}) => {
      useRecoilValue(languageState);

      let color = COLORS.PRIMARY;
      let size = SPACING.TABBAR_FONT_SIZE;
      let marginLeft = ViewScale(12);

      switch (route.name) {
        case 'Home':
          return focused ? (
            <TextMedium
              color={color}
              size={size}
              style={{marginLeft: isTablet ? marginLeft : 0}}>
              {Translate('textTabBarMember')[0]}
            </TextMedium>
          ) : null;
        case 'Profile':
          return focused ? (
            <TextMedium
              color={color}
              size={size}
              style={{marginLeft: isTablet ? marginLeft : 0}}>
              {Translate('textTabBarMember')[1]}
            </TextMedium>
          ) : null;
        case 'Remittance':
          return focused ? (
            <TextMedium
              color={color}
              size={size}
              style={{marginLeft: isTablet ? marginLeft : 0}}>
              {Translate('textTabBarMember')[2]}
            </TextMedium>
          ) : null;
        case 'Summary':
          return focused ? (
            <TextMedium
              color={color}
              size={size}
              style={{marginLeft: isTablet ? marginLeft : 0}}>
              {Translate('textTabBarMember')[3]}
            </TextMedium>
          ) : null;
        case 'ChangeFund':
          return focused ? (
            <TextMedium
              color={color}
              size={size}
              style={{marginLeft: isTablet ? marginLeft : 0}}>
              {Translate('textTabBarMember')[4]}
            </TextMedium>
          ) : null;
        case 'RiskProfile':
          return focused ? (
            <TextMedium
              numberOfLines={2}
              color={color}
              size={FontScale(10)}
              style={{textAlign:'center',marginLeft: isTablet ? marginLeft : 0}}>
              {Translate('textTabBarMember')[5]}
            </TextMedium>
          ) : null;
        default:
          return null;
      }
    },
  }),
  tabBarOptions: {
    activeTintColor: COLORS.PRIMARY,
    inactiveTintColor: '#c3c9d9',
  },
};
