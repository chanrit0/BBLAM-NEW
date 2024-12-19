import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import NewsScreen from 'screens/Member/Drawer/News';
import DetailNewsScreen from 'screens/Member/Drawer/News/Detail';

export default () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="News" component={NewsScreen} />
      <Stack.Screen name="DetailNews" component={DetailNewsScreen} />
    </Stack.Navigator>
  );
};
