import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import ReportPVDScreen from 'screens/Board/Drawer/ReportPVDFund/Report';
import ReportScreen from 'screens/Board/Report';
import ReportDetailScreen from 'screens/Global/SummaryInvestPolicy/Detail';

export default () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Report" component={ReportScreen} />
      <Stack.Screen name="ReportDetail" component={ReportDetailScreen} />
      <Stack.Screen name="ReportPVD" component={ReportPVDScreen} />
    </Stack.Navigator>
  );
};
