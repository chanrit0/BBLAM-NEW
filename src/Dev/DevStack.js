import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import Home from './index';
import ShowIcons from './ShowIcons';
import Spinner from './Spinner';
import TestPage from './TestPage';
import GoToPage from './GoToPage';
import ShowStorage from './ShowStorage';

export const pages = ['ShowIcons', 'TestPage', 'Spinner', 'GotoPage','ShowStorage'];

export default function DevStack() {
  const Dev = createStackNavigator();

  return (
    <Dev.Navigator initialRouteName={'home'}>
      <Dev.Screen name="Home" component={Home} />
      <Dev.Screen name={'ShowIcons'} component={ShowIcons} />
      <Dev.Screen name={'TestPage'} component={TestPage} />
      <Dev.Screen name={'Spinner'} component={Spinner} />
      <Dev.Screen name={'GotoPage'} component={GoToPage} />
      <Dev.Screen name={'ShowStorage'} component={ShowStorage} />
    </Dev.Navigator>
  );
}
