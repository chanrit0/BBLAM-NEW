// React
import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
// custom
import {ViewScale, FontScale} from 'utils';
// components
import {Container} from 'components/common';
import {TextMedium} from 'components/atoms';
import {Translate} from 'function';
import {COLORS} from 'styles';

// lib

// constant
const FONT_SIZE = FontScale(20);
const activeColor = COLORS.WHITE;
const inactiveColor = 'rgba(255,255,255,0.25)';

export function EvaluateBtn({
  finished = null,
  unfinished = null,
  value,
  callback,
}) {
  const _onPressLeft = () => {
    callback(false);
  };

  const _onPressRight = () => {
    callback(true);
  };

  return (
    <View style={styles.rootContainer}>
      <Container style={styles.container}>
        <TouchableWithoutFeedback onPress={_onPressLeft}>
          <View
            style={[
              !value
                ? styles.btnBorderLeftActive
                : styles.btnBorderLeftInActive,
            ]}>
            <TextMedium
              style={[
                !value ? styles.btnTextLeftActive : styles.btnTextLeftInActive,
              ]}>
              {Translate('textEvaluated')} ({finished ?? '-'})
            </TextMedium>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={_onPressRight}>
          <View
            style={[
              !value
                ? styles.btnBorderRightInActive
                : styles.btnBorderRightActive,
            ]}>
            <TextMedium
              style={[
                !value
                  ? styles.bntTextRightInActive
                  : styles.bntTextRightActive,
              ]}>
              {Translate('textNotEvaluated')} ({unfinished ?? '-'})
            </TextMedium>
          </View>
        </TouchableWithoutFeedback>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    marginTop: ViewScale(20),
    marginBottom: ViewScale(10),
  },
  container: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  btnBorderLeftActive: {
    borderColor: activeColor,
    borderBottomWidth: 1,
    flex: 0.5,
  },
  btnTextLeftActive: {
    fontSize: FONT_SIZE,
    color: activeColor,
  },
  btnBorderLeftInActive: {
    borderColor: inactiveColor,
    borderBottomWidth: 1,
    flex: 0.5,
  },
  btnTextLeftInActive: {
    fontSize: FONT_SIZE,
    color: inactiveColor,
  },

  btnBorderRightActive: {
    borderColor: activeColor,
    borderBottomWidth: 1,
    flex: 0.5,
  },
  btnBorderRightInActive: {
    borderColor: inactiveColor,
    borderBottomWidth: 1,
    flex: 0.5,
  },

  bntTextRightActive: {
    fontSize: FONT_SIZE,
    color: activeColor,
    textAlign: 'right',
  },
  bntTextRightInActive: {
    fontSize: FONT_SIZE,
    color: inactiveColor,
    textAlign: 'right',
  },
});
