// React
import React from 'react';
import {View, StyleSheet} from 'react-native';
// custom
import {ViewScale} from 'utils';
// components
import {Container} from 'components/common';
import {LineHorizontal, TextRegular} from 'components/atoms';
import {FONT_SIZE} from 'styles';

export function ListMember({name = '-'}) {
  return (
    <>
      <View style={styles.container}>
        <Container>
          <TextRegular size={FONT_SIZE.BODY_2}>{name}</TextRegular>
        </Container>
      </View>
      <LineHorizontal />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: ViewScale(30),
  },
});
