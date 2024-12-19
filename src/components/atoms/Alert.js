import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {StyleSheet, Animated, View, Pressable} from 'react-native';
import {SPACING} from 'styles';

export default ({children, TouchableBackdrop = false, style, marginBottom}) => {
  const navigation = useNavigation();
  const opacityValue = React.useRef(new Animated.Value(0)).current;
  const offsetYValue = React.useRef(new Animated.Value(0)).current;
  const offsetYInterpolate = offsetYValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 0],
  });

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(offsetYValue, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true
      }),
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true
      }),
    ]).start();
  }, []);

  const backdropFunction = () => {
    if (TouchableBackdrop) navigation.goBack();
    if (typeof TouchableBackdrop === 'function') {
      TouchableBackdrop?.();
    }
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: marginBottom,
      }}>
      <Pressable style={styles.backdrop} onPress={backdropFunction}>
        <View style={styles.container} />
      </Pressable>
      <Animated.View
        style={[
          styles.modal,
          {
            transform: [{translateY: offsetYInterpolate}],
            opacity: opacityValue,
          },
          style,
        ]}>
        {children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    width: '100%',
    height: '100%',
  },
  modal: {
    width: '85%',
    minHeight: SPACING.ALERT_HEIGHT,
    backgroundColor: '#FFF',
    position: 'absolute',
  },
  container: {
    width: '100%',
    height: '100%',
  },
});
