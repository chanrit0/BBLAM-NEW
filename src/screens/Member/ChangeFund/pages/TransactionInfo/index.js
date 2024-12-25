import React from 'react';
import { useWindowDimensions } from 'react-native';
import { Translate } from 'function';
import { RootScroll } from 'components/common';
import { TabViewCustom } from 'components/atoms';

import Pending from './Pending';
import Complete from './Complete';
import Cancel from './Cancel';

export default function TransactionInfo() {
  const [routes] = React.useState([
    { key: 'first', title: Translate('textPendingTransaction') },
    { key: 'second', title: Translate('textCompleteTransaction') },
    { key: 'third', title: Translate('textCancelTransaction') },
  ]);
  const callCancelApi = React.useRef(null);
  const isMounted = React.useRef(true);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <Pending callback={callCancelApi} isMounted={isMounted} />;
      case 'second':
        return <Complete isMounted={isMounted} />;
      case 'third':
        return <Cancel callback={callCancelApi} isMounted={isMounted} />;
      default:
        return null;
    }
  };

  React.useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  });

  return (
    <RootScroll
      title={Translate('textTransactionInfoTitle')}
      isBackIcon={true}
      flexContainer={true}>
      <TabViewCustom
        routes={routes}
        renderScene={renderScene}
      />
    </RootScroll>
  );
}
