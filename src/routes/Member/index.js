import React from 'react';

import {widthPercentageToDP} from 'react-native-responsive-screen';
import {createDrawerNavigator} from '@react-navigation/drawer';

import DrawerStackScreen from './Stack/Drawer';
import DrawerScreen from 'screens/Member/Drawer';
import {createStackNavigator} from '@react-navigation/stack';
import RiskProfileTerms from 'screens/Member/RiskProfileTerms';
import RiskProfileQuestion from 'screens/Global/RiskProfileQuestion';

export default () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Drawer" component={DrawerStack} />
      <Stack.Screen name="RiskProfileTerms" component={RiskProfileTerms} />
      <Stack.Screen
        name="RiskProfileQuestion"
        component={RiskProfileQuestion}
      />
    </Stack.Navigator>
  );
};

const DrawerStack = () => {
  const DrawerStackMember = createDrawerNavigator();

  return (
    <DrawerStackMember.Navigator
      screenOptions={{headerShown: false}}
      drawerStyle={{
        width: widthPercentageToDP(90),
      }}
      drawerContent={props => <DrawerScreen {...props} />}>
      <DrawerStackMember.Screen name="Drawer" component={DrawerStackScreen} />
    </DrawerStackMember.Navigator>
  );
};
