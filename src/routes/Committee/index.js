import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import DrawerStack from './Stack/Drawer'; 

export default function CommitteeRoute() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Drawer" component={DrawerStack} />
    </Stack.Navigator>
  );
}
