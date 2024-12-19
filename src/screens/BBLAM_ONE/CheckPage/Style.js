import {StyleSheet, View} from 'react-native';
import {ViewScale, FontScale} from 'utils';
import {COLORS} from 'styles';

export default StyleSheet.create({
  container: {
    flex: 0,
    alignItems: 'center',
    // marginTop: ViewScale(20),
  },
  headerText: {
    color: COLORS.PRIMARY,
    fontSize: FontScale(24),
    marginTop: ViewScale(10),
  },
  ResendEmail: {
    // marginTop: ViewScale(50),
    textAlign: 'center',
  },
  viewResendEmail: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ResendEmailRemind: {
    // marginTop: ViewScale(50),
    color: COLORS.RED,
    textAlign: 'center',
  },
  viewResendEmailRemindMain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  viewResendEmailRemind: {flexDirection: 'row', justifyContent: 'center'},
  ResendEmailRemindDeteil: {
    color: COLORS.RED,
    textAlign: 'center',
  },
  ResendEmailPress: {
    textDecorationLine: 'underline',
    color: COLORS.PRIMARY,
    marginLeft: ViewScale(5),
  },
  viewTouchAgain: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  DescText: {
    marginTop: ViewScale(20),
    textAlign: 'center',
    color: COLORS.PRIMARY,
    // marginHorizontal: ViewScale(20),
  },
  InvalidIcon: {
    color: COLORS.ERROR,
    fontSize: FontScale(70),
  },
  MobileIcon: {
    fontSize: FontScale(30),
    color: COLORS.PRIMARY,
  },
  mobileText: {
    color: COLORS.PRIMARY,
    fontSize: FontScale(24),
  },
  textPhoneNumber: {
    marginTop: ViewScale(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textUnderline: {
    textDecorationLine: 'underline',
    color: COLORS.PRIMARY,
  },
  RequestOTPAgain: {
    marginTop: ViewScale(30),
    alignItems: 'center',
  },
});
