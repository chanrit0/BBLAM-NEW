import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import React from 'react';
import {ViewScale} from 'utils';
import {COLORS} from 'styles';

export default () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={COLORS.PRIMARY} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: ViewScale(20),
  },
});
