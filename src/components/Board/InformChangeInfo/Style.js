import {StyleSheet} from 'react-native';

import {ViewScale} from 'utils';
import {COLORS, FONT_TYPE, SPACING} from 'styles';
import {CONTAINER_MARGIN_HORIZONTAL} from 'styles/spacing';

export default styles = StyleSheet.create({
  styleData: {
    marginBottom: ViewScale(10),
  },
  footerButtonContainer: {
    marginTop: ViewScale(50),
    width: '100%',
  },
  section2Container: {
    marginTop: ViewScale(20),
    borderColor: COLORS.BORDER,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  section1PickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: ViewScale(20),
  },
  section1PickerLeftRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  section1PickerText: {
    marginHorizontal: ViewScale(20),
  },
  ChangeNameRootContainer: {
    marginTop: ViewScale(20),
  },
  inputBottomBorder: {
    flex: 1,
    height: ViewScale(30),
    fontSize: ViewScale(15),
    fontFamily: FONT_TYPE.REGULAR,
    borderColor: COLORS.BORDER,
    borderBottomWidth: 1,
    marginLeft: ViewScale(10),
  },
  footerButtonContainer: {
    marginTop: ViewScale(50),
    width: '100%',
  },
  newNameContainer: {
    marginTop: ViewScale(15),
  },
  textInputContainer: {
    marginTop: ViewScale(10),
  },
  form: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.BORDER,
    paddingBottom: ViewScale(20),
    marginTop: ViewScale(15),
  },
  ChangeNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  CheckBoxContianer: {
    marginLeft: ViewScale(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  rootContainer: {
    marginTop: ViewScale(10),
    flex: 1,
  },
  section2Container: {
    marginTop: ViewScale(20),
    paddingVertical: ViewScale(20),
    borderColor: COLORS.BORDER,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  closecircle: {
    position: 'absolute',
    right: 0,
    padding: ViewScale(15),
    zIndex: 1,
  },
  NewIdCardCommitteeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: ViewScale(10),
  },
  NewIdCardCommitteeCheckBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputdisabled: {
    borderColor: COLORS.BORDER,
    borderWidth: 1,
    backgroundColor: COLORS.GRAY_4,
    height: SPACING.INPUT_HEIGHT,
    width: '100%',
    paddingHorizontal: ViewScale(5),
    paddingLeft: ViewScale(12),
  },
  _4CheckBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
