import {StyleSheet} from 'react-native';
import {ViewScale} from 'utils';
import {COLORS} from 'styles';

export default styles = StyleSheet.create({
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: ViewScale(5),
  },
  containerRight: {
    alignItems: 'center',
  },
  lineHorizontal: {
    borderWidth: 0.5,
    borderColor: COLORS.BORDER,
  },
  lineVertical: {
    borderWidth: 0.5,
    borderColor: COLORS.BORDER,
  },
  containerFooter: {
    marginVertical: ViewScale(30),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ButtonLeft: {
    width: '48%',
  },
  ButtonRight: {
    width: '48%',
  },
  column2: {
    marginTop: ViewScale(10),
  },
  grayBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.GRAY,
    paddingHorizontal: ViewScale(10),
    paddingVertical: ViewScale(15),
    marginTop: ViewScale(30),
  },
  sectionContainer: {
    borderColor: COLORS.BORDER,
    borderBottomWidth: 1,
    marginTop: ViewScale(20),
    paddingBottom: ViewScale(10),
  },
});
