import {View, StyleSheet} from 'react-native';
import React from 'react';
import {TextMedium} from 'components/atoms';
import {COLORS} from 'styles';
import {ViewScale} from 'utils';
import {Translate} from 'function';

export default ({title = Translate('textEmptyData'), flex = false, style}) => {
  return (
    <View
      style={[styles.container, flex && {flex: 1, paddingVertical: 0}, style]}>
      <TextMedium color={COLORS.THIRDARY}>{title}</TextMedium>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: ViewScale(50),
  },
});
