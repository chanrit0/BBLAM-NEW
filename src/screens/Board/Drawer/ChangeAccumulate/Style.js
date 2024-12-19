import {StyleSheet} from 'react-native';

import {ViewScale} from 'utils';
import {COLORS, FONT_SIZE, FONT_TYPE, SPACING} from 'styles';
import {isIOS} from 'utils';

export default styles = StyleSheet.create({
  buttonFooterContainer: {
    marginTop: ViewScale(25),
  },
  termOfUseContainer: {
    marginTop: ViewScale(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textinputFooter: {
    height: SPACING.INPUT_HEIGHT,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    marginHorizontal: ViewScale(10),
    width: ViewScale(60),
  },
  textinput: {
    height: SPACING.INPUT_HEIGHT,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    flex: 1,
  },
  shiftCheckbox: {
    flex: 1,
    marginLeft: !isIOS ? ViewScale(10) : 0,
  },
  checkBoxFooterContainerRow: {
    marginHorizontal: 0,
    marginTop: ViewScale(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerContainer: {
    paddingTop: ViewScale(10),
    borderTopWidth: 1,
    borderColor: COLORS.BORDER,
  },
  pickerTextContainer: {
    width: ViewScale(30),
    height: SPACING.INPUT_HEIGHT,
    justifyContent: 'center',
  },
  pickerText: {
    textAlign: 'center',
  },
  pickerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  picker: {flex: 1, height: SPACING.INPUT_HEIGHT},
  pickerContainer: {
    marginTop: ViewScale(10),
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    paddingHorizontal: ViewScale(10),
    backgroundColor: COLORS.WHITE,
    fontFamily: FONT_TYPE.REGULAR,
  },
  chexBoxGroupContainer: {
    marginTop: ViewScale(15),
  },
  rootContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: ViewScale(20),
  },
  errorStyle: {
    borderColor: COLORS.ERROR,
  },
});

export const SegmentedControlTabProps = {
  activeTabStyle: {
    backgroundColor: COLORS.PRIMARY,
  },
  firstTabStyle: {
    marginRight: ViewScale(10),
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  lastTabStyle: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  tabStyle: {
    height: SPACING.INPUT_HEIGHT,
    borderColor: 'transparent',
    textColor: '#000',
    backgroundColor: '#eef2f6',
  },
  tabTextStyle: {
    color: '#000',
    fontFamily: FONT_TYPE.REGULAR,
    fontSize: FONT_SIZE.BODY_1,
  },
  tabsContainerStyle: {
    flex: 1,
  },
};
