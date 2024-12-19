// React
import React from 'react';
import {View, Pressable, StyleSheet, Animated, Easing} from 'react-native';

// custom
import {ViewScale} from 'utils';
import {COLORS, FONT_SIZE} from 'styles';

// global components
import {TextBold} from 'components/atoms';

// lib

export default function Box({icon, title, selected, onPress}) {
  const value = React.useRef(new Animated.Value(1)).current;

  return (
    <Pressable
      onPressIn={() => {
        Animated.timing(value, {
          toValue: 0.95,
          duration: 50,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }).start();

        onPress();
      }}
      onPressOut={() => {
        Animated.timing(value, {
          toValue: 1,
          duration: 500,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }).start();
      }}>
      <Animated.View
        style={[
          styles.userContainer,
          {
            backgroundColor: selected ? COLORS.GRAY_3 : COLORS.GRAY_2,
            transform: [{scale: value}],
          },
        ]}>
        <View style={styles.circleUser}>{icon}</View>
        <TextBold style={styles.textSquare}>{title}</TextBold>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  circleUser: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: ViewScale(50) / 2,
    width: ViewScale(50),
    height: ViewScale(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  userContainer: {
    backgroundColor: COLORS.GRAY_2,
    padding: ViewScale(20),
    marginBottom: ViewScale(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textSquare: {
    color: COLORS.PRIMARY,
    fontSize: FONT_SIZE.TITLE_2,
    marginLeft: ViewScale(15),
  },
});
