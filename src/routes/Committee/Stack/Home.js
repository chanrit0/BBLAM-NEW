import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import HomeScreen from 'screens/Board/Home';
import {COLORS} from 'styles';

export default () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          cardStyle: {
            backgroundColor: COLORS.GRAY,
          },
        }}
      />
    </Stack.Navigator>
  );
};
