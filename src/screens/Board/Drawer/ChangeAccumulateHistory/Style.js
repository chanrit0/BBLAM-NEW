import {StyleSheet} from 'react-native';
import {COLORS, FONT_SIZE, SPACING} from 'styles';
import {ViewScale} from 'utils';

export default styles = StyleSheet.create({
  title: {
    marginTop: ViewScale(20),
    fontSize: FONT_SIZE.BODY_2,
  },
  text: {
    fontSize: FONT_SIZE.BODY_3,
  },
  subTitle: {
    marginTop: ViewScale(10),
    fontSize: FONT_SIZE.BODY_2,
  },
  form: {
    marginTop: ViewScale(10),
  },
  formTitle: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: ViewScale(8),
    paddingHorizontal: ViewScale(10),
    flexDirection: 'row',
  },
  inputContainer: {
    marginTop: ViewScale(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: SPACING.INPUT_HEIGHT,
    borderColor: COLORS.BORDER,
    borderWidth: 1,
    backgroundColor: COLORS.GRAY_4,
    justifyContent: 'center',
    paddingLeft: ViewScale(8),
    flex: 1,
  },
  formInLeft: {
    flex: 0.6,
    height: SPACING.INPUT_HEIGHT,
    backgroundColor: COLORS.GRAY,
    justifyContent: 'center',
    paddingLeft: ViewScale(10),
  },
  formInLeftText: {
    fontSize: FONT_SIZE.BODY_2,
  },
  formInRight: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formInRightText: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZE.BODY_3,
  },
  formContent: {
    marginTop: ViewScale(5),
    backgroundColor: COLORS.GRAY_4,
    paddingVertical: ViewScale(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: ViewScale(10),
  },
  formContentInput: {
    backgroundColor: COLORS.GRAY_5,
    borderColor: COLORS.BORDER,
    borderWidth: 1,
    height: SPACING.INPUT_HEIGHT,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: ViewScale(10),
  },
  changeCumulativeContainerValue: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
