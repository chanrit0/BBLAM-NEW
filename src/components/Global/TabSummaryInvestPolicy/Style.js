import {StyleSheet} from 'react-native';
import {ViewScale, FontScale} from 'utils';
import {COLORS, FONT_TYPE} from 'styles';

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
    fontSize: FontScale(24),
    // textAlign: 'center',
  },
});
