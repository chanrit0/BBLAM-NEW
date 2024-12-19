import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import MemberPayment from 'screens/Member/Drawer/Member_payment ';

export default () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="MemberPayment " component={MemberPayment} />
    </Stack.Navigator>
  );
};
