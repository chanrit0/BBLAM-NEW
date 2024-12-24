import * as React from 'react';
import {
  useWindowDimensions,
  Animated,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { TabView } from 'react-native-tab-view';
import { COLORS, FONT_SIZE, FONT_TYPE } from 'styles';

export default ({ defaultIndex = 0, routes, renderScene, heightG }) => {
  const layout = useWindowDimensions();

  // ตั้งค่าเริ่มต้นให้ index
  const [index, setIndex] = React.useState(defaultIndex);

  const position = React.useRef(new Animated.Value(defaultIndex)).current;

  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((_, i) => i);

    const translateX = position.interpolate({
      inputRange: [0, 1],
      outputRange: [0, layout.width / routes.length],
    });

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5
            ),
          });

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tabItem}
              onPress={() => {
                setIndex(i);
                Animated.spring(position, {
                  toValue: i,
                  useNativeDriver: true,
                }).start();
              }}
            >
              <Animated.Text
                style={[
                  styles.tabText,
                  index === i && styles.tabTextActive,
                  { opacity },
                ]}
              >
                {route.title}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}

        <Animated.View
          style={[
            styles.indicator,
            {
              width: layout.width / routes.length,
              transform: [{ translateX }],
            },
          ]}
        />
      </View>
    );
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={(newIndex) => {
        setIndex(newIndex);
        Animated.spring(position, {
          toValue: newIndex,
          useNativeDriver: true,
        }).start();
      }}
      initialLayout={{ width: layout.width }}
      style={{ height: heightG }}
    />
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 16,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  tabText: {
    fontSize: FONT_SIZE.BODY_1,
    fontFamily: FONT_TYPE.REGULAR,
    color: COLORS.BLACK,
  },
  tabTextActive: {
    color: COLORS.PRIMARY,
  },
  indicator: {
    height: 2,
    backgroundColor: COLORS.PRIMARY,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});
