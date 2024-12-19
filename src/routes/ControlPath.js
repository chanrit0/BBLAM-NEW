import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import BBLAMONERoute from './BBLAM_ONE';
import MemberRoute from './Member';
import CommitteeRoute from './Committee';
import NoInternetConnection from 'screens/Global/NoInternetConnection';

export default () => {
  const ControlPathStack = createStackNavigator();

  return (
    <ControlPathStack.Navigator screenOptions={{ headerShown: false }} headerMode="none">
      <ControlPathStack.Screen name="BBLAMONERoute" component={BBLAMONERoute} />
      <ControlPathStack.Screen name="MemberRoute" component={MemberRoute} />
      <ControlPathStack.Screen
        name="CommitteeRoute"
        component={CommitteeRoute}
      />
      <ControlPathStack.Screen
        name="NoNetwork"
        component={NoInternetConnection}
      />
    </ControlPathStack.Navigator>
  );
};
