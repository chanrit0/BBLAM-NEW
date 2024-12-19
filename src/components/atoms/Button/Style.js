import {StyleSheet} from 'react-native';
import {COLORS, SPACING, FONT_SIZE} from 'styles';

export default StyleSheet.create({
  fillButtonDisabled: {
    backgroundColor: 'rgba(26, 54, 134, 0.3)',
    borderColor: 0,
  },
  fillButton: {
    backgroundColor: COLORS.PRIMARY,
    borderWidth: 1,
    borderColor: 'transparent',
    width: '100%',
    height: SPACING.INPUT_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  BorderButton: {
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    height: SPACING.INPUT_HEIGHT,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLoginIOS: {
    fontSize: FONT_SIZE.BODY_2,
    textAlign: 'center',
    color: COLORS.WHITE,
  },
  textLoginAndroid: {
    fontSize: FONT_SIZE.BODY_2,
    textAlign: 'center',
    color: COLORS.WHITE,
  },
});
