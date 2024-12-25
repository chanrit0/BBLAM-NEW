import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TabBar } from 'react-native-tab-view';
import { COLORS, FONT_TYPE} from 'styles';
import { ViewScale, FontScale } from 'utils';

export default props => {
  const { navigationState } = props;
  const [width, setWidth] = React.useState(0);

  const row = { justifyContent: 'center', flexDirection: 'row' };

  return (
    <View
      onLayout={({ nativeEvent }) => {
        setWidth(nativeEvent.layout.width);
      }}
      style={row}>
      <TabBar
        {...props}
        renderTabBarItem={({ route, onPress, onLongPress }) => {
          const isFocused = navigationState.index === navigationState.routes.findIndex(r => r.key === route.key);

          return (
            <View style={styles.tabContainer}>
              <Text
                onPress={onPress}
                onLongPress={onLongPress}
                style={[
                  styles.tabLabel,
                  {
                    color: isFocused ? COLORS.PRIMARY : COLORS.GRAY_3,
                    fontSize: FontScale(18),
                    fontFamily: FONT_TYPE.SEMI_BOLD,
                  },
                ]}
              >
                {route.title}
              </Text>
              {isFocused && <View style={styles.indicator} />}
            </View>
          );
        }}
        tabStyle={{
          width: 'auto',
          elevation: 0,
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

const styles = StyleSheet.create({
  tabContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  tabLabel: {
    fontSize: 18,
  },
  indicator: {
    width: '100%',
    height: 3,
    backgroundColor: COLORS.PRIMARY,
    marginTop: 4,
  },
});
