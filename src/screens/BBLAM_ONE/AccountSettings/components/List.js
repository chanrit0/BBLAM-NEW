import React from 'react';
import {LineHorizontal, TextMedium} from 'components/atoms';
import {TouchableHighlight} from 'components/base';
import {Container} from 'components/common';
import {StyleSheet, View} from 'react-native';
import {ViewScale} from 'utils';
import {COLORS} from 'styles';

export default ({title, content, onPress, styleContentRight}) => (
  <>
    <TouchableHighlight onPress={onPress}>
      <Container style={styles.container}>
        <View style={styles.list}>
          <TextMedium style={styles.listTitle}>{title}</TextMedium>
          <TextMedium style={[styles.listContent, styleContentRight]}>
            {content}
          </TextMedium>
        </View>
      </Container>
    </TouchableHighlight>
    <LineHorizontal />
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 0,
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: ViewScale(20),
  },
  listTitle: {
    color: COLORS.PRIMARY,
  },
  listContent: {
    color: COLORS.THIRDARY,
  },
});
