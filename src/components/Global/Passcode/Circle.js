// React
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

// custom
import {ViewScale} from 'utils';

export default function Circle({children, style, callback}) {
  return (
    <TouchableOpacity onPress={callback}>
      <View style={[styles.circle, style]}>
        <Text style={styles.text}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
}

const SIZE = 90;

const styles = StyleSheet.create({
  circle: {
    width: ViewScale(SIZE),
    height: ViewScale(SIZE),
    borderRadius: ViewScale(SIZE) / 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: ViewScale(10),
  },
});
