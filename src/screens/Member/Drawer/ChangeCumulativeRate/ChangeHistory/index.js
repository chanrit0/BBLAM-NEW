/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/self-closing-comp */
import React from 'react';
import {useWindowDimensions} from 'react-native';
import {RootScroll} from 'components/common';
import {TabBar} from 'components/atoms';

import Pending from './Pending';
import Complete from './Complete';

import {TabView} from 'react-native-tab-view';
import {getDepositHistory} from 'services/api/member';
import {setSpinner} from 'utils';

export default ({route}) => {
  const data = route.params?.data;

  const routeTab = [
    {key: 'first', title: 'รอดำเนินการ'},
    {key: 'second', title: 'ดำเนินการแล้ว'},
  ];

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState(routeTab);
  const [apiData, setApiData] = React.useState(null);

  const renderScene = ({route, jumpTo}) => {
    switch (route.key) {
      case 'first':
        return <Pending data={apiData?.wait_approve} callapi={callapi} />;
      case 'second':
        return <Complete data={apiData?.approved} />;
    }
  };

  const callapi = async () => {
    await getDepositHistory()
      .then(response => {
        setApiData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    setSpinner(true);
    callapi().finally(() => setSpinner(false));
  }, []);

  return (
    <RootScroll
      title={'ประวัติการเปลี่ยนอัตราเงินสะสม'}
      onRefreshCallback={callapi}
      isBackIcon
      flexContainer
      fixTab={false}>
      {apiData !== null && (
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          renderTabBar={TabBar}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
        />
      )}
    </RootScroll>
  );
};
