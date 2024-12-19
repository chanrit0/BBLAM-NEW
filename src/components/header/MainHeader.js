/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ViewScale} from 'utils';
import {TextMedium} from 'components/atoms';
import {FONT_SIZE, SPACING, COLORS} from 'styles';
import {IconButton} from 'react-native-paper';

const MainHeader = ({
  navigation,
  title = '',
  callbackFunction = null,
  rightHeader,
  showIcon = true,
  style,
  statusPIN = false,
  offsetY,
  animate = false,
}) => {
  return statusPIN ? (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: ViewScale(10),
      }}>
      <View style={styles.viewHeaderLeft}>
        {showIcon && (
          <IconButton
            icon="arrow-left"
            style={{
              marginLeft: 0,
              paddingLeft: 0,
            }}
            color={COLORS.PRIMARY}
            size={ViewScale(30)}
            onPress={() => {
              if (callbackFunction !== null) {
                callbackFunction();
              } else {
                navigation.goBack();
              }
            }}
          />
        )}
        <TextMedium style={[styles.textTitle]}>{title}</TextMedium>
      </View>
      <View style={styles.viewHeaderRight}>{rightHeader}</View>
    </View>
  ) : (
    <View style={[styles.viewHeaderContainer, style]}>
      <View style={styles.viewHeaderLeft}>
        {showIcon && (
          <IconButton
            icon="arrow-left"
            style={{
              marginLeft: 0,
              paddingLeft: 0,
            }}
            color={COLORS.PRIMARY}
            size={ViewScale(30)}
            onPress={() => {
              if (callbackFunction !== null) {
                callbackFunction();
              } else {
                navigation.goBack();
              }
            }}
          />
        )}
        <TextMedium style={[styles.textTitle]}>{title}</TextMedium>
      </View>
      <View style={styles.viewHeaderRight}>{rightHeader}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewHeaderContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: ViewScale(10),
    height: SPACING.HEADER_HEIGHT,
  },
  viewHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewHeaderRight: {},
  textTitle: {
    marginLeft: ViewScale(8),
    fontSize: FONT_SIZE.TITLE_2,
    color: COLORS.PRIMARY,
  },
});

export default MainHeader;
