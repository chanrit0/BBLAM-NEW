import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import PortalScreen from 'screens/BBLAM_ONE/Portal';
import SignInScreen from 'screens/BBLAM_ONE/SignIn';
import SignUpScreen from 'screens/BBLAM_ONE/SignUp';
import CheckPageScreen from 'screens/BBLAM_ONE/CheckPage';
import TermOfUseScreen from 'screens/BBLAM_ONE/TermOfUse';
import FotgotPasswordScreen from 'screens/BBLAM_ONE/Recovery/ForgotPassword';
import ForgotUsernameScreen from 'screens/BBLAM_ONE/Recovery/ForgotUsername';
import PVDConnectScreen from 'screens/BBLAM_ONE/PVDConnect';
import PasscodeScreen from 'screens/Global/Passcode';
import ChangePassword from 'screens/Global/ChangePassword';
import ChangeFundScreen from 'screens/Member/ChangeFund';

// recoil
import { useRecoilValue } from 'recoil';
import { termOfUseState } from 'recoil-state';

export default () => {
  const Stack = createStackNavigator();
  const termOfUse = useRecoilValue(termOfUseState);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} headerMode="none">
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={FotgotPasswordScreen} />
      <Stack.Screen name="ForgotUsername" component={ForgotUsernameScreen} />
      <Stack.Screen name="CheckPage" component={CheckPageScreen} />
      <Stack.Screen
        name="DisclosureOfPersonalInformation"
        component={TermOfUseScreen}
      />
      <Stack.Screen name="Passcode" component={PasscodeScreen} />
      <Stack.Screen name="PVDConnect" component={PVDConnectScreen} />
      <Stack.Screen name="Portal" component={PortalScreen} />
      <Stack.Screen name="ChangeFund" component={ChangeFundScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
    </Stack.Navigator>
  );
};
