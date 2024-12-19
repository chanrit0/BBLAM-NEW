import React from 'react';
import {View, StyleSheet} from 'react-native';

import {ViewScale} from 'utils';

import {SimpleLineIcons} from 'components/Icons';

const CIRCLE_SIZE = ViewScale(35);

export default ({color = '#FFF'}) => {
  return (
    <View style={[styles.circle, {borderColor: color}]}>
      <SimpleLineIcons
        name="user"
        color={color}
        size={CIRCLE_SIZE / 2}
        style={{marginLeft: ViewScale(1)}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 1,
    borderColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
