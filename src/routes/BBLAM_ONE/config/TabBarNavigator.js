/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image} from 'react-native';
import {TextMedium, TextRegular} from 'components/atoms';
import {HomeIcon, LogoPVD, BFT, GridIcon} from 'components/Icons/Customs';
import {AntDesign} from 'components/Icons';
import {Translate} from 'function';
import {FontScale, ViewScale} from 'utils';
import {COLORS, SPACING, isTablet} from 'styles';
import {isIOS} from 'utils';

// recoil
import {useRecoilValue} from 'recoil';
import {languageState} from 'recoil-state';

export default {
  tabBarOptions: {
    activeTintColor: COLORS.PRIMARY,
    inactiveTintColor: '#c3c9d9',
    safeAreaInsets: !isIOS && {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  },
  screenOptions: ({route, focused}) => ({
    headerShown: false,
    tabBarIcon: ({focused, color}) => {
      let size = SPACING.TABBAR_ICONS_SIZE;
      if (route.name === 'Home') {
        return (
          <HomeIcon
            color={focused ? COLORS.PRIMARY : '#8E8E8F'}
            width={size}
            height={size}
          />
        );
      } else if (route.name === 'NAV') {
        // return <AntDesign name={'staro'} color={color} size={size} />;
        return (
          <Image
            resizeMode={'contain'}
            style={{width: size, height: size, opacity: focused ? 1 : 0.2}}
            source={require('assets/icons/NAV_active.png')}
          />
        );
      } else if (route.name === 'BFFUND') {
        return (
          <Image
            resizeMode={'contain'}
            style={{
              transform: [{translateY: 3}],
              width: size + 40,
              height: size + 30,
              opacity: focused ? 1 : 0.2,
            }}
            source={require('assets/icons/bf_fund.png')}
          />
        );
      } else if (route.name === 'PVDPortal') {
        return (
          <Image
            resizeMode={'contain'}
            style={{
              transform: [{translateY: 3}],
              width: size + 40,
              height: size + 30,
              opacity: focused ? 1 : 0.2,
            }}
            source={require('assets/icons/PVD_Connext.png')}
          />
        );
      } else if (route.name === 'More') {
        return (
          <Image
            resizeMode={'contain'}
            style={{transform: [{translateY: 2}], opacity: focused ? 1 : 0.2}}
            source={require('assets/icons/Grid.png')}
          />
        );
      }
    },
    tabBarLabel: ({focused, color, position}) => {
      useRecoilValue(languageState);
      let size = SPACING.TABBAR_FONT_SIZE;

      let style = {
        marginLeft: position === 'beside-icon' ? ViewScale(10) : 0,
        marginTop: position === 'beside-icon' ? ViewScale(3) : 0,
      };

      switch (route.name) {
        // case 'Home':
        //   return focused ? (
        //     <TextMedium color={color} size={size} style={style}>
        //       {/* {Translate('textTabBarBBLAMONE')[0]} */}
        //     </TextMedium>
        //   ) : (
        //     <TextRegular color={color} size={size} style={style}>
        //       {/* {Translate('textTabBarBBLAMONE')[0]} */}
        //     </TextRegular>
        //   );
        // case 'NAV':
        //   return focused ? (
        //     <TextMedium color={color} size={size} style={style}>
        //       {/* {Translate('textTabBarBBLAMONE')[1]} */}
        //     </TextMedium>
        //   ) : (
        //     <TextRegular color={color} size={size} style={style}>
        //       {/* {Translate('textTabBarBBLAMONE')[1]} */}
        //     </TextRegular>
        //   );
        // case 'BFFUND':
        //   return focused ? (
        //     <TextMedium  numberOfLines={1} color={color} size={size} tyle={{
        //       textAlign: 'center',
        //       ...style,
        //     }}>
        //       {/* {Translate('textTabBarBBLAMONE')[2]} */}
        //     </TextMedium>
        //   ) : (
        //     <TextRegular  numberOfLines={1} color={color} size={size} tyle={{
        //       textAlign: 'center',
        //       ...style,
        //     }}>
        //       {/* {Translate('textTabBarBBLAMONE')[2]} */}
        //     </TextRegular>
        //   );
        // case 'PVDPortal':
        //   return focused ? (
        //     <TextMedium
        //       numberOfLines={1}
        //       color={color}
        //       size={size}
        //       style={{
        //         width: ViewScale(120),
        //         textAlign: 'center',
        //         ...style,
        //       }}>
        //       {/* {Translate('textTabBarBBLAMONE')[3]} */}
        //     </TextMedium>
        //   ) : (
        //     <TextRegular
        //       numberOfLines={1}
        //       color={color}
        //       size={size}
        //       style={{
        //         width: ViewScale(110),
        //         textAlign: 'center',
        //         ...style,
        //       }}>
        //       {/* {Translate('textTabBarBBLAMONE')[3]} */}
        //     </TextRegular>
        //   );
        // case 'More':
        //   return focused ? (
        //     <TextMedium
        //       numberOfLines={1}
        //       color={color}
        //       size={size}
        //       style={style}>
        //       {/* {Translate('textTabBarBBLAMONE')[4]} */}
        //     </TextMedium>
        //   ) : (
        //     <TextRegular color={color} size={size} style={style}>
        //       {/* {Translate('textTabBarBBLAMONE')[4]} */}
        //     </TextRegular>
        //   );
        default:
          return null;
      }
    },
  }),
};
