import {StyleSheet} from 'react-native';
import {ViewScale, FontScale} from 'utils';
import {COLORS} from '/styles';

export default StyleSheet.create({
  switchContainer: {
    opacity: 0, // hide
    alignSelf: 'flex-end',
    marginTop: ViewScale(15),
    marginRight: ViewScale(10),
  },
  textHeader: {
    color: COLORS.PRIMARY,
    fontSize: FontScale(28),
  },
  textDesc: {
    color: COLORS.THIRDARY,
    fontSize: FontScale(18),
  },
  header: {
    marginTop: ViewScale(100),
    justifyContent: 'center',
  },
  input: {
    marginTop: ViewScale(60),
  },
  twobutton: {
    flexGrow: 1,
  },
  loginAndPassBtnContainer: {
    marginTop: ViewScale(15),
    paddingHorizontal: ViewScale(10),
    flexDirection: 'row',
    width: '100%',
  },
  loginBtnContainer: {
    width: '50%',
  },
  textForgotPassword: {
    color: COLORS.PRIMARY,
    textDecorationLine: 'underline',
  },
  forgotPassContainer: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtn: {
    backgroundColor: COLORS.PRIMARY,
  },
  footerContainer: {
    bottom: 0,
  },
  textbottom: {
    marginTop: ViewScale(20),
    fontSize: FontScale(18),
    color: COLORS.BLACK_1,
    textAlign: 'center',
  },
  textbottomunderline: {
    marginLeft: ViewScale(5),
    fontSize: FontScale(16),
    color: COLORS.PRIMARY,
    textDecorationLine: 'underline',
  },
  skipButton: {alignSelf: 'center', marginTop: ViewScale(10)},
  skipText: {
    color: COLORS.BLACK_1,
    fontSize: FontScale(18),
  },
  bottom: {
    marginVertical: ViewScale(20),
  },
  flexrow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
