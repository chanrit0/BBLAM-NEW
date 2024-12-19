import React from 'react';
import {View, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default ({children, noBottom, noTop}) => {
  const {top, bottom} = useSafeAreaInsets();

  return (
    <>
      {!noTop && <View style={{height: top}} />}
      {children}
      {!noBottom && <View style={{height: bottom}} />}
    </>
  );
};
