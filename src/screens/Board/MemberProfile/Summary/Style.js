import {StyleSheet} from 'react-native';
import {ViewScale, FontScale} from 'utils';
import {FONT_TYPE, COLORS} from 'styles';

export default styles = StyleSheet.create({
  head: {
    backgroundColor: '#f6f7fa',
    paddingVertical: ViewScale(15),
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
    fontSize: FontScale(18),
    // textAlign: 'center',
  },
  textMedium: {
    fontFamily: FONT_TYPE.MEDIUM,
  },
});
