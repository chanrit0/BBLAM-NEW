// React
import React from 'react';
import {View, StyleSheet} from 'react-native';

// custom
import {ViewScale} from 'utils';

// components
import {Container} from 'components/common';
import {TextRegular} from 'components/atoms';

import TextInput from './TextInput';

// constant
import {BOX_HEIGHT, COLORS, FONT_SIZE, FONT_TYPE} from 'styles';

// lib
import _ from 'lodash';
import {TextArea} from 'native-base';

export default function TextInputWithTitle({
  type = 'column',
  inputType,
  title = '????',
  required = false,
  containerStyle,
  height = BOX_HEIGHT,
  titleSideComp,
  onChangeText,
  value,
  error,
  textAreaProps,
}) {
  // type -> row, column

  return (
    <View>
      <Container
        style={[
          type === 'column' ? styles.containerC : styles.containerR,
          containerStyle,
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: inputType == 'textarea' ? ViewScale(10) : 0,
          }}>
          <TextRegular size={FONT_SIZE.BODY_2}>
            {title}
            {required && (
              <TextRegular size={FONT_SIZE.BODY_2} color={COLORS.ERROR}>
                {' *'}
              </TextRegular>
            )}
          </TextRegular>
          {titleSideComp}
        </View>
        {inputType === 'textarea' ? (
          <TextArea
            h={ViewScale(100)}
            w={{
              base: '75%',
            }}
            _focus={{
              borderColor: COLORS.BORDER,
            }}
            borderColor={error ? COLORS.ERROR : COLORS.BORDER}
            borderRadius="0"
            fontSize={'sm'}
            fontWeight={'light'}
            fontFamily={FONT_TYPE.REGULAR}
            onChangeText={onChangeText}
            value={value}
            {...textAreaProps}
          />
        ) : (
          <TextInput
            onChangeText={onChangeText}
            value={value}
            containerStyle={
              type === 'column' ? styles.textinputC : styles.textinputR
            }
            error={error}
            style={styles.fontColor}
          />
        )}
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  // column
  containerC: {
    marginTop: ViewScale(10),
  },
  textinputC: {
    marginTop: ViewScale(10),
  },

  // row
  containerR: {
    marginTop: ViewScale(10),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textinputR: {
    width: '75%',
  },
  fontColor: {
    color: 'black'
  }
});
