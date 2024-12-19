import React from 'react';

// custom
import { COLORS } from 'styles';
import { Image } from 'react-native';
import { TextMedium } from 'components/atoms';
import { Translate } from 'function';
import { ViewScale } from 'utils';
import { ReportPVD } from 'components/Icons/Customs';
import { Entypo, AntDesign } from 'components/Icons';
import { isTablet, SPACING } from 'styles';
import { useRecoilValue } from 'recoil';
import { languageState } from 'recoil-state';

export default {
  initialRouteName: 'Home',
  lazy: false,
  screenOptions: ({ route }) => ({
    headerShown: false,
    tabBarIcon: ({ focused, color }) => {
      let iconName;
      let imageName;
      let size = SPACING.TABBAR_ICONS_SIZE;

      if (route.name === 'Home') {
        iconName = focused ? 'home' : 'home';
        return (
          <AntDesign
            name={iconName}
            size={size}
            color={focused ? COLORS.PRIMARY : '#8E8E8F'}
          />
        );
      } else if (route.name === 'Report') {
        return (
          <ReportPVD
            width={size}
            height={size}
            color={color}
          />
        );
      } else if (route.name === 'MemberProfile') {
        imageName = focused ? (
          <Image
            resizeMode={'contain'}
            style={{
              width: size,
              height: size,
            }}
            source={require('assets/images/Tabbar/DuoUsers_focused.png')}
          />
        ) : (
          <Image
            resizeMode={'contain'}
            style={{
              width: size,
              height: size,
            }}
            source={require('assets/images/Tabbar/DuoUsers.png')}
          />
        );
        return imageName;
      } else if (route.name === 'PlanInvestment') {
        return (
          <Entypo
            name={'shuffle'}
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
    },
    tabBarLabel: ({ focused }) => {
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
              style={{ marginLeft: isTablet ? marginLeft : 0 }}>
              {Translate('textTabBarBoard')[0]}
            </TextMedium>
          ) : null;
        case 'Report':
          return focused ? (
            <TextMedium
              color={color}
              size={size}
              style={{ marginLeft: isTablet ? marginLeft : 0 }}>
              {Translate('textTabBarBoard')[1]}
            </TextMedium>
          ) : null;
        case 'MemberProfile':
          return focused ? (
            <TextMedium
              color={color}
              size={size}
              style={{ marginLeft: isTablet ? marginLeft : 0 }}>
              {Translate('textTabBarBoard')[2]}
            </TextMedium>
          ) : null;
        case 'PlanInvestment':
          return focused ? (
            <TextMedium
              color={color}
              size={size}
              style={{ marginLeft: isTablet ? marginLeft : 0 }}>
              {Translate('textTabBarBoard')[3]}
            </TextMedium>
          ) : null;
        case 'RiskProfile':
          return focused ? (
            <TextMedium
              numberOfLines={2}
              color={color}
              size={size}
              style={{ textAlign: 'center', marginLeft: isTablet ? marginLeft : 0 }}>
              {Translate('textTabBarBoard')[4]}
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
