import {StyleSheet} from 'react-native';
import {COLORS, FONT_TYPE} from 'styles';
import {ViewScale} from 'utils';

export default StyleSheet.create({
  sumContainer: {
    backgroundColor: '#eef2f6',
    padding: ViewScale(20),
    marginTop: ViewScale(20),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dayResult: {
    marginTop: ViewScale(10),
    backgroundColor: '#eef2f6',
    padding: ViewScale(15),
    borderColor: COLORS.BORDER,
    borderWidth: 1,
  },
  changeMethodContainer: {
    marginTop: ViewScale(20),
  },
});
