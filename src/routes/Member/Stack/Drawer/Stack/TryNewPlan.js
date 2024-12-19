import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import TryNewPlanScreen from 'screens/Member/Drawer/TryNewPlan';
import TryNewPlanPage2 from 'screens/Member/Drawer/TryNewPlan/pages/2';
import TryNewPlanPage3 from 'screens/Member/Drawer/TryNewPlan/pages/3';
import TryNewPlanPage4 from 'screens/Member/Drawer/TryNewPlan/pages/4';
import TryNewPlanPageResult from 'screens/Member/Drawer/TryNewPlan/pages/Result';

export default () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="TryNewPlan" component={TryNewPlanScreen} />
      <Stack.Screen name="TryNewPlanPage2" component={TryNewPlanPage2} />
      <Stack.Screen name="TryNewPlanPage3" component={TryNewPlanPage3} />
      <Stack.Screen name="TryNewPlanPage4" component={TryNewPlanPage4} />
      <Stack.Screen
        name="TryNewPlanPageResult"
        component={TryNewPlanPageResult}
      />
    </Stack.Navigator>
  );
};
