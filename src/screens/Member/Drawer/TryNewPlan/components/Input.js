import {placeholder} from 'i18n-js';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Input} from 'react-native-elements';
import {COLORS, FONT_SIZE, FONT_TYPE, SPACING} from 'styles';
import {ViewScale} from 'utils';

export default ({
  placeholder,
  errorMessage,
  label,
  value,
  onChangeText,
  errorStyle,
  slider = false,
  disabled,
  onEndEditing,
  onFocus,
  keyboardType,
  ...props
}) => {

  return (
    <Input
      placeholder={placeholder}
      errorStyle={[
        styles.errorStyle,
        slider && !errorMessage && styles.displayNone,
      ]}
      onFocus={onFocus}
      onEndEditing={onEndEditing}
      errorMessage={errorMessage}
      disabled={disabled}
      disabledInputStyle={{color: COLORS.BLACK, opacity: 1}}
      label={label}
      value={value}
      inputStyle={styles.inputStyle}
      onChangeText={onChangeText}
      inputContainerStyle={[
        styles.inputContainerStyle,
        {borderColor: errorMessage ? COLORS.ERROR : COLORS.BORDER},
      ]}
      containerStyle={styles.containerStyle}
      keyboardType={keyboardType}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  displayNone: {display: 'none'},
  inputStyle: {
    fontFamily: FONT_TYPE.REGULAR,
  },
  inputContainerStyle: {
    marginTop: ViewScale(10),
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    paddingHorizontal: ViewScale(15),
    flexDirection: 'row',
    height: SPACING.INPUT_HEIGHT,
  },
  containerStyle: {
    paddingHorizontal: 0,
  },
  errorStyle: {
    fontSize: FONT_SIZE.BODY_3,
    borderColor: COLORS.ERROR,
    color: COLORS.ERROR,
    fontFamily: FONT_TYPE.REGULAR,
    textAlign: 'right',
  },
});
