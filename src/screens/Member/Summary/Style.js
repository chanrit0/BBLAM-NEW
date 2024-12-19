import {StyleSheet} from 'react-native';
import {ViewScale} from 'utils';
import {FONT_TYPE, COLORS, FONT_SIZE} from 'styles';

export default styles = StyleSheet.create({
  head: {
    backgroundColor: '#f6f7fa',
    paddingVertical: ViewScale(10),
    paddingLeft: ViewScale(50),
  },
  row: {
    borderBottomWidth: 1,
    borderColor: COLORS.BORDER,
    paddingVertical: ViewScale(10),
    paddingLeft: ViewScale(50),
  },
  rowFooter: {
    backgroundColor: '#f6f7fa',
    borderBottomWidth: 1,
    borderColor: COLORS.BORDER,
    paddingLeft: ViewScale(50),
    paddingVertical: ViewScale(10),
  },
  text: {
    fontFamily: FONT_TYPE.REGULAR,
    fontSize: FONT_SIZE.BODY_1,
  },
  textMedium: {
    fontFamily: FONT_TYPE.MEDIUM,
  },
});
