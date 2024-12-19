// React
import React from 'react';

// custom 
import {TabBar, TabView} from 'components/atoms'; 

// lib
import {SceneMap} from 'react-native-tab-view';

// pages
import OldYear from './components/OldYear';
import CurrentYear from './components/CurrentYear';
import {getCurrentDate} from 'utils';
import _ from 'lodash';
import dayjs from 'dayjs';

export default function Summary({data}) {
  dayjs.locale('th')
  const [routes] = React.useState([
    {
      key: 'old',
      title: String(parseInt(getCurrentDate('dayjs').format('BBBB')) - 1),
    },
    {key: 'current', title: getCurrentDate('dayjs').format('BBBB')},
  ]);

  return (
    <TabView
      routes={routes}
      defaultIndex={1}
      renderScene={SceneMap({
        old: () => <OldYear data={data[1]} />,
        current: () => <CurrentYear data={data[0]} />,
      })}
      renderTabBar={TabBar}
    />
  );
}
