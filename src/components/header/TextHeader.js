// เลิกใช้

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Container} from 'components/common';
import {FontScale} from 'utils';
import {FONT_TYPE} from 'styles';

export default function TextHeader({title, style}) {
  return (
    <Container style={[{flex: 0}, style]}>
      <Text style={styles.textheader}>{title}</Text>
    </Container>
  );
}

const styles = StyleSheet.create({
  textheader: {
    color: '#FFF',
    fontSize: FontScale(22),
    fontFamily: FONT_TYPE.MEDIUM,
  },
});
