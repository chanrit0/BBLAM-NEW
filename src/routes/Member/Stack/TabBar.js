/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/rules-of-hooks */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/core';
import React from 'react';
// Stack
import HomeStack from './Home';
import ChangeFund from './ChangeFund';

// Screen
import ProfileScreen from 'screens/Member/Profile';
import RemittanceScreen from 'screens/Member/Remittance';
import SummaryScreen from 'screens/Member/Summary';
import RiskProfileScreen from 'screens/Member/RiskProfile';

// config
import TabBarNavigator from '../config/TabBarNavigator';

// services
import {useRecoilState} from 'recoil';
import {userInfoState} from 'recoil-state';

export default () => {
  const TabBar = createBottomTabNavigator();
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  return (
    <TabBar.Navigator {...TabBarNavigator}>
      <TabBar.Screen name="Home" component={HomeStack} />
      <TabBar.Screen name="Profile" component={ProfileScreen} />
      <TabBar.Screen name="Remittance" component={RemittanceScreen} />
      <TabBar.Screen name="Summary" component={SummaryScreen} />
      {userInfo.change_fund_status && (
        <TabBar.Screen
          name="ChangeFund"
          component={ChangeFund}
          options={({route}) => ({
            tabBarVisible: ['AddFund', 'SuccessPage', 'TooltipTable'].includes(
              getFocusedRouteNameFromRoute(route),
            )
              ? false
              : true,
          })}
        />
      )}
      <TabBar.Screen name="RiskProfile" component={RiskProfileScreen} />
    </TabBar.Navigator>
  );
};
