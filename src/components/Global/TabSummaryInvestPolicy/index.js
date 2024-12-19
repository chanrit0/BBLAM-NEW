// React
import React from 'react';
import { useWindowDimensions } from 'react-native';

// custom
import HalfYear from './HalfYear';
import Monthly from './Monthly';

// components
import { TabBar } from 'components/atoms';

//lib 
import { TabView } from 'react-native-tab-view';

export default function Tab({ data }) {
  const layout = useWindowDimensions();
  // useState
  const [routes] = React.useState([
    { key: 'first', title: 'รายเดือน' },
    { key: 'second', title: 'ราย 6 เดือน' },
  ]);
  const [index, setIndex] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    const checkHeight = () => {
      let newHeight = 0;
      if (index === 0) {
        newHeight = (data[0].data?.length + 1) * 70;
      } else if (index === 1) {
        newHeight = (data[0].data?.length + 1) * 70;
      }
      setHeight(newHeight);
    };

    checkHeight();
  }, [index, data]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <Monthly data={data[0].data} />;
      case 'second':
        return <HalfYear data={data[1].data} />;
      default:
        return null;
    }
  };

  return (
    <TabView
      renderTabBar={props => <TabBar {...props} />}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      style={{ height: height }}
    />
  );
}
