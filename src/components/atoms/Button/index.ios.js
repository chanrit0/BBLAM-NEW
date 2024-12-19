// @flow
// react
import React from 'react';
import {View, TouchableHighlight, StyleSheet} from 'react-native';

// component
import {TextMedium} from 'components/atoms';

// custom
import {COLORS} from 'styles';
import styles from './Style';

type Props = {
  onPress: function,
  type: 'fill' | string,
  style?: StyleSheet.Styles,
  title: string,
  ButtonStyle?: StyleSheet.Styles,
  lefticon: Element<IconProps>,
  textStyle?: StyleSheet.Styles,
  disabled: Boolean,
};

export const Button = ({
  onPress,
  type,
  style,
  title,
  ButtonStyle,
  lefticon,
  textStyle,
  disabled = false,
}: Props) => {
  return (
    <View style={style}>
      <TouchableHighlight
        underlayColor={
          type === 'fill'
            ? COLORS.ONPRESSED_FILL_HIGHLIGHT
            : COLORS.ONPRESSED_BORDER_HIGHLIGHT
        }
        onPress={onPress}
        disabled={disabled}
        style={
          type === 'fill'
            ? [
                styles.fillButton,
                ButtonStyle,
                disabled ? styles.fillButtonDisabled : null,
              ]
            : [styles.BorderButton, ButtonStyle]
        }>
        <>
          {lefticon}
          <TextMedium
            style={
              type === 'fill'
                ? [styles.textLoginIOS, textStyle]
                : [styles.textLoginIOS, textStyle, {color: COLORS.PRIMARY}]
            }>
            {title}
          </TextMedium>
        </>
      </TouchableHighlight>
    </View>
  );
};

export default Button;
