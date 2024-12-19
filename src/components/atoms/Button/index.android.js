// @flow
// react
import React from 'react';
import {View, StyleSheet} from 'react-native';

// component
import {TextMedium} from 'components/atoms';

// custom
import {COLORS} from 'styles';
import styles from './Style';

// libs
import {TouchableRipple} from 'react-native-paper';

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
      <TouchableRipple
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
      </TouchableRipple>
    </View>
  );
};

export default Button;
