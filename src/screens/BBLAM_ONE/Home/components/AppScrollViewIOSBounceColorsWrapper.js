import {View} from 'native-base';
import React from 'react';

export default AppScrollViewIOSBounceColorsWrapper = ({
  topBounceColor,
  bottomBounceColor,
  children,
  style,
}) => {
  return (
    <View style={[{position: 'relative'}, style]}>
      {children}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1, // appear under the scrollview
        }}>
        <View style={{flex: 1, backgroundColor: topBounceColor}} />
        <View style={{flex: 1, backgroundColor: bottomBounceColor}} />
      </View>
    </View>
  );
};
