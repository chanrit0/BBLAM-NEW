import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import ChangeCumulativeRateScreen from 'screens/Member/Drawer/ChangeCumulativeRate';
import ChangeCumulativeRateHistoryScreen from 'screens/Member/Drawer/ChangeCumulativeRate/ChangeHistory';

export default () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="ChangeCumulativeRate"
        component={ChangeCumulativeRateScreen}
      />
      <Stack.Screen
        name="ChangeCumulativeRateHistory"
        component={ChangeCumulativeRateHistoryScreen}
      />
    </Stack.Navigator>
  );
};
