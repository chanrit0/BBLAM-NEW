import React from 'react';
import {useWindowDimensions} from 'react-native';

import {TabBar} from './TabBar';
import {TabView as RNTabView} from 'react-native-tab-view';

export default ({routes, renderScene, defaultIndex = 0, ...props}) => {
  // useState
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(defaultIndex);

  return (
    <RNTabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      renderTabBar={TabBar}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      {...props}
    />
  );
};
