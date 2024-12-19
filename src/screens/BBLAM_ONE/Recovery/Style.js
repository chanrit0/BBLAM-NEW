import {StyleSheet} from 'react-native';
import {ViewScale, FontScale} from 'utils';
import {FONT_TYPE, COLORS, SPACING} from 'styles';

const value = {
  paddingButton: ViewScale(15), // Overlay Button
};

export default styles = StyleSheet.create({
  headerText: {
    fontSize: FontScale(28),
    // marginTop: ViewScale(100),
    color: COLORS.PRIMARY,
  },
  headerTextDesc: {
    fontSize: FontScale(18),
    marginTop: ViewScale(10),
    color: COLORS.FOURTHDARY,
  },
  buttonPassword: {
    marginTop: ViewScale(400),
  },
  buttonUsername: {
    marginTop: ViewScale(300),
  },
  inputStyle: {
    height: SPACING.INPUT_HEIGHT,
  },
  input: {
    fontFamily: FONT_TYPE.REGULAR,
    fontSize: FontScale(18),
    marginTop: ViewScale(20),
  },

  textForgotPassword: {
    fontSize: FontScale(18),
    textDecorationLine: 'underline',
    color: COLORS.PRIMARY,
  },
  forgotUsernameButton: {
    alignSelf: 'flex-end',
    marginRight: ViewScale(10),
    marginTop: ViewScale(5),
  },
  inputContainer: {
    marginTop: ViewScale(40),
  },
  fillButton: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: ViewScale(10),
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: value.paddingButton,
    paddingBottom: value.paddingButton,
  },
  textButtonCancel: {
    color: COLORS.PRIMARY,
  },
  textButtonConfirm: {
    color: 'white',
  },
  borderButton: {
    borderWidth: 1,
    color: COLORS.PRIMARY,
    borderColor: COLORS.PRIMARY,
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: value.paddingButton,
    paddingBottom: value.paddingButton,
  },
  OverlayIcon: {
    marginTop: ViewScale(20),
  },
  OverlayContainerEmail: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  hideEmail: {
    color: COLORS.PRIMARY,
    marginTop: ViewScale(5),
  },
  OverlayHeaderText: {
    fontSize: FontScale(18),
  },
  OverlayEmailDescription: {
    marginTop: ViewScale(10),
    display: 'flex',
    alignItems: 'center',
  },
  OverlayEmailDescriptionText: {
    color: COLORS.secondaryColor,
    fontSize: FontScale(18),
  },
  OverlayEmailDescriptionContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  checkBoxRowContainer: {
    marginTop: ViewScale(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  checkboxContainer: {
    marginRight: ViewScale(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
