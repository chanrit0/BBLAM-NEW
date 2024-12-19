import React from 'react';
import {View, Animated, Easing} from 'react-native';
import styles from './Style';

export default () => {
  const spinValue = React.useRef(new Animated.Value(0)).current;

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear, // Easing is an additional import from react-native
        useNativeDriver: true, // To make use of native driver for performance
      }),
    ).start();
  }, []);

  return (
    <Animated.View style={[styles.container, {transform: [{rotate: spin}]}]}>
      <View style={styles.child} />
      <View style={styles.child} />
      <View style={styles.child} />
      <View style={styles.child} />
    </Animated.View>
  );
};
