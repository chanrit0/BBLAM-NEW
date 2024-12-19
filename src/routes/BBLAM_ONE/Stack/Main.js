import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import TermOfUseScreen from 'screens/BBLAM_ONE/TermOfUse';
import TabBar from './TabBar';
import PVDStack from './PVD';

// recoil
import { useRecoilValue } from 'recoil';
import { termOfUseState } from 'recoil-state';

export default function Main() {
  const Stack = createStackNavigator();
  const State = useRecoilValue(termOfUseState);

  if (!State) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} headerMode="none">
      {!State?.TermOfUse && (
        <Stack.Screen name="TermOfUse" component={TermOfUseScreen} />
      )}
      <Stack.Screen name="TabBar" component={TabBar} />
      <Stack.Screen name="PVDStack" component={PVDStack} />
    </Stack.Navigator>
  );
}
