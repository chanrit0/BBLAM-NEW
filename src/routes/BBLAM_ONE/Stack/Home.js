import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS } from 'styles';

import HomeScreen from 'screens/BBLAM_ONE/Home';
import ListNewsScreen from 'screens/BBLAM_ONE/ListNews';
import ReadNewsScreen from 'screens/BBLAM_ONE/ReadNews';

export default () => {
  const Home = createStackNavigator();

  return (
    <Home.Navigator screenOptions={{ headerShown: false }} headerMode="none">
      <Home.Screen
        name="home"
        component={HomeScreen}
        options={{
          cardStyle: { backgroundColor: COLORS.PRIMARY },
        }}
      />
      <Home.Screen name="ListNews" component={ListNewsScreen} />
      <Home.Screen name="ReadNews" component={ReadNewsScreen} />
    </Home.Navigator>
  );
};
