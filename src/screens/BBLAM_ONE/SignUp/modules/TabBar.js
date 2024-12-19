import React from 'react';
import {View, Dimensions} from 'react-native';
import {TabBar} from 'react-native-tab-view';
import {ViewScale, FontScale} from 'utils';
import {COLORS, FONT_TYPE} from 'styles';
export default props => {
  const [width, setWidth] = React.useState(0);
  const screenWitdh = Dimensions.get('window').width;

  const row = {justifyContent: 'center', flexDirection: 'row'};

  return (
    <View
      onLayout={({nativeEvent}) => {
        setWidth(nativeEvent.layout.width);
      }}
      style={row}>
      <TabBar
        {...props}
        labelStyle={{
          fontSize: FontScale(18),
          fontFamily: FONT_TYPE.SEMI_BOLD,
        }}
        activeColor={COLORS.PRIMARY}
        inactiveColor={COLORS.GRAY_3}
        tabStyle={{
          width: 'auto',
          elevation: 0,
        }}
        indicatorStyle={{
          backgroundColor: COLORS.PRIMARY,
          bottom: ViewScale(10),
        }}
        contentContainerStyle={{
          flex: 0,
        }}
        style={{
          shadowColor: 'transparent',
          backgroundColor: 'transparent',
        }}
      />
    </View>
  );
};
