import {StyleSheet} from 'react-native';
import {COLORS, FONT_SIZE, FONT_TYPE} from 'styles';
import {ViewScale} from 'utils';

export default StyleSheet.create({
  title: {
    textAlign: 'center',
    marginBottom: ViewScale(10),
  },
  container: {
    marginTop: ViewScale(20),
  },
  cellHeader: {
    backgroundColor: COLORS.GRAY_4,
  },
  textTableTitle: {
    color: COLORS.BLACK_1,
    fontFamily: FONT_TYPE.MEDIUM,
    fontSize: FONT_SIZE.BODY_3,
    textAlign: 'center',
  },
  textTableTitleRight: {
    color: COLORS.WHITE,
    fontFamily: FONT_TYPE.MEDIUM,
    textAlign: 'center',
  },
  tableContainerRight: {
    backgroundColor: COLORS.PRIMARY,
  },
  tableContainerRightTitle: {
    color: COLORS.WHITE,
    fontFamily: FONT_TYPE.MEDIUM,
    textAlign: 'center',
  },
});
