import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Main from './Main';
import AccountSettings from 'screens/BBLAM_ONE/AccountSettings';
import ChangeEmailScreen from 'screens/Global/ChangeEmail';
import ChangePasswordScreen from 'screens/Global/ChangePassword';
import PasscodeScreen from 'screens/Global/Passcode';
import CheckPageScreen from 'screens/BBLAM_ONE/CheckPage';
import DeleteAccount from 'screens/Global/DeleteAccount';

export default () => {
  const DrawerStackOne = createStackNavigator();

  return (
    <DrawerStackOne.Navigator screenOptions={{ headerShown: false }} headerMode="none">
      <DrawerStackOne.Screen name="Main" component={Main} />
      <DrawerStackOne.Screen
        name="AccountSettings"
        component={AccountSettings}
      />
      <DrawerStackOne.Screen name="ChangeEmail" component={ChangeEmailScreen} />
      <DrawerStackOne.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
      />
      <DrawerStackOne.Screen name="Passcode" component={PasscodeScreen} />
      <DrawerStackOne.Screen name="CheckPage" component={CheckPageScreen} />
      <DrawerStackOne.Screen name="DeleteAccount" component={DeleteAccount} />
    </DrawerStackOne.Navigator>
  );
};
