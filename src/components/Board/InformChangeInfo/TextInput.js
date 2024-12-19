/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TextInput} from 'react-native';
import {ViewScale} from 'utils';
import {BOX_HEIGHT, COLORS, FONT_SIZE, FONT_TYPE, SPACING} from 'styles';
import {TextRegular} from 'components/atoms';
import _ from 'lodash';

export default function index({
  key,
  style,
  containerStyle,
  onChangeText,
  onChange,
  value,
  error,
  ResponseErrors,
  disabled,
  placeholder,
}) {
  const _errorMessage = error => {
    if (Array.isArray(error)) {
      return error.map((item, index) => index < error.length && item + '\n');
    } else {
      return error?.message;
    }
  };

  return (
    <View style={containerStyle} key={key}>
      <TextInput
        style={[
          {
            borderColor: COLORS.BORDER,
            borderWidth: 1,
            height: SPACING.INPUT_HEIGHT,
            paddingHorizontal: ViewScale(5),
            fontFamily: FONT_TYPE.REGULAR,
            paddingLeft: ViewScale(12),
          },
          style,
          error && {borderColor: COLORS.ERROR},
          disabled && {backgroundColor: COLORS.GRAY_4},
        ]}
        editable={!disabled}
        selectTextOnFocus={!disabled}
        onChangeText={onChangeText}
        value={!disabled && value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {error && (
        <TextRegular
          size={FONT_SIZE.BODY_3}
          color={COLORS.ERROR}
          style={{textAlign: 'right'}}>
          {_errorMessage(error)}
        </TextRegular>
      )}
    </View>
  );
}
