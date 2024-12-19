// React
import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

// custom
import {ViewScale} from 'utils';
import {COLORS} from 'styles';

// lib

export default function Dots({data}) {
  return (
    <View style={styles.container}>
      <Dotscomponent num={data.length} />
    </View>
  );
}

const scale = {
  dots: ViewScale(18),
  dots_margin: ViewScale(10),
};

const Dotscomponent = ({num}) => {
  const fill_password = num;
  const password = 6;
  let components = [];

  for (let i = 0; i < fill_password; i++) {
    components.push(<View key={'fillDots' + i} style={styles.dots_fill} />);
  }

  for (let i = 0; i < password - fill_password; i++) {
    components.push(<View key={'BorderDots' + i} style={styles.dots_border} />);
  }

  return <>{components}</>;
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: ViewScale(40),

    // shadowColor: COLORS.PRIMARY,
    // shadowOffset: {
    //   width: 0,
    //   height: 0,
    // },
    // shadowOpacity: 0.32,
    // shadowRadius: 5.46,
    // elevation: 9,
  },
  dots_fill: {
    width: scale.dots,
    height: scale.dots,
    borderRadius: scale.dots / 2,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    backgroundColor: COLORS.PRIMARY,
    marginHorizontal: scale.dots_margin,
  },
  dots_border: {
    width: scale.dots,
    height: scale.dots,
    borderRadius: scale.dots / 2,
    borderWidth: 1,
    borderColor: COLORS.GRAY_3,
    backgroundColor: 'transparent',
    marginHorizontal: scale.dots_margin,
  },
});
