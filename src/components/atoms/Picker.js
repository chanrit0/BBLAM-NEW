/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Platform} from 'react-native';
import RNPickerSelect from '../libs/react-native-picker-select';
import {COLORS, FONT_SIZE, FONT_TYPE, SPACING} from 'styles';
import {ViewScale} from 'utils';
import {MaterialCommunityIcons} from 'components/Icons';

/**
 *
 * items format
 *
 * [{label: 'Football', value: 'football'}]
 *
 */

export default ({
  containerStyle,
  pickerStyle,
  placeholderStyle,
  placeholder = '',
  iconStyle,
  items = [],
  value,
  onValueChange,
  error,
  inputContainer,
  onOpen,
  onClose,
  numberOfLines = 1,
  hidePlaceHolder = false,
  disabled,
  statusIcon,
}) => {
  const styles = {
    inputIOSContainer: {
      alignItems: "center",
      borderWidth: 1,
      borderColor: error ? COLORS.ERROR : COLORS.BORDER,
      ...inputContainer,
    },
    inputIOS: {
      width: '80%',
      fontFamily: FONT_TYPE.REGULAR,
      padding: ViewScale(10),
      fontSize: FONT_SIZE.BODY_3,
      height: SPACING.INPUT_HEIGHT,
      textAlign: 'center',
      ...pickerStyle,
    },
    inputAndroidContainer: {
      borderWidth: 1,
      borderColor: error ? COLORS.ERROR : COLORS.BORDER,
      ...inputContainer,
    },
    inputAndroid: {
      fontFamily: FONT_TYPE.REGULAR,
      // padding: ViewScale(10),
      fontSize: FONT_SIZE.BODY_3,
      height: SPACING.INPUT_HEIGHT,
      textAlign: 'center',
      color: '#000',
      width: '95%',
      ...pickerStyle,
    },
    placeholder: {
      fontSize: FONT_SIZE.BODY_2,
      fontFamily: FONT_TYPE.REGULAR,
      ...placeholderStyle,
    },
    iconContainer: {
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      with: '100%',
    },
  };

  if (Platform.OS === 'ios') {
    return (
      <View style={[{flex: 0}, containerStyle]}>
        {statusIcon == true ? (
          <RNPickerSelect
            disabled={disabled}
            onOpen={onOpen}
            onClose={onClose}
            pickerProps={{numberOfLines: numberOfLines}}
            onValueChange={onValueChange}
            value={value}
            placeholder={hidePlaceHolder ? {} : {label: placeholder}}
            style={styles}
            Icon={() => {
              return <></>;
            }}
            items={items}
          />
        ) : (
          <RNPickerSelect
            disabled={disabled}
            onOpen={onOpen}
            onClose={onClose}
            pickerProps={{numberOfLines: numberOfLines}}
            onValueChange={onValueChange}
            value={value}
            placeholder={hidePlaceHolder ? {} : {label: placeholder}}
            style={styles}
            Icon={() => {
              return (
                <MaterialCommunityIcons
                  name="chevron-down"
                  size={FONT_SIZE.TITLE_2}
                  color={iconStyle?.color}
                />
              );
            }}
            items={items}
          />
        )}
      </View>
    );
  } else {
    return (
      <View style={[{flex: 0}, containerStyle]}>
        {statusIcon == true ? (
          <RNPickerSelect
            disabled={disabled}
            onOpen={onOpen}
            useNativeAndroidPickerStyle={false}
            fixAndroidTouchableBug={true}
            textInputProps={{selection: {start: 0}}}
            pickerProps={{numberOfLines: numberOfLines}}
            onValueChange={onValueChange}
            value={value}
            placeholder={hidePlaceHolder ? {} : {label: placeholder}}
            style={styles}
            Icon={() => {
              return <></>;
            }}
            items={items}
          />
        ) : (
          <RNPickerSelect
            disabled={disabled}
            onOpen={onOpen}
            useNativeAndroidPickerStyle={false}
            fixAndroidTouchableBug={true}
            textInputProps={{selection: {start: 0}}}
            pickerProps={{numberOfLines: numberOfLines}}
            onValueChange={onValueChange}
            value={value}
            placeholder={hidePlaceHolder ? {} : {label: placeholder}}
            style={styles}
            Icon={() => {
              return (
                <MaterialCommunityIcons
                  name="chevron-down"
                  size={FONT_SIZE.TITLE_2}
                  color={iconStyle?.color}
                />
              );
            }}
            items={items}
          />
        )}
        <Text
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            bottom: 0,
            left: 0,
          }}>
          {' '}
        </Text>
      </View>
    );
  }
};
