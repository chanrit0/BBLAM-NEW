import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';

// Stack
import ReportStack from './Report';
import MemberProfileStack from './MemberProfile';
import HomeStack from '../Stack/Home';

// Screens
import PlanInvestmentScreen from 'screens/Board/PlanInvestment';
import RiskProfileScreen from 'screens/Board/RiskProfile';

// config
import TabBarNavigator from '../config/TabBarNavigator';

export default () => {
  const TabStack = createBottomTabNavigator();

  return (
    <TabStack.Navigator {...TabBarNavigator}>
      <TabStack.Screen name="Home" component={HomeStack} />
      <TabStack.Screen name="Report" component={ReportStack} />
      <TabStack.Screen name="MemberProfile" component={MemberProfileStack} />
      <TabStack.Screen name="PlanInvestment" component={PlanInvestmentScreen} />
      <TabStack.Screen name="RiskProfile" component={RiskProfileScreen} />
    </TabStack.Navigator>
  );
};
