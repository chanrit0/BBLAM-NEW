import React from 'react';
import {StyleSheet} from 'react-native';
import {SPACING, COLORS, FONT_TYPE} from 'styles';
import {TextInput} from 'react-native-paper';

export default ({style, onChange, value, ...props}) => {
  return (
    <TextInput
      onChangeText={onChange}
      value={value}
      mode="outlined"
      theme={{
        colors: {primary: COLORS.GRAY_3, underlineColor: 'transparent'},
      }}
      underlineColor={'BLUE'}
      outlineColor={COLORS.GRAY_3}
      selectionColor={COLORS.PRIMARY}
      style={[styles.input, style]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    backgroundColor: COLORS.WHITE,
    height: SPACING.INPUT_HEIGHT,
  },
});
