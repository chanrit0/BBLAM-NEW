import { Platform, StyleSheet } from 'react-native';
import { COLORS, FONT_TYPE } from 'styles';
import { ViewScale, FontScale } from 'utils';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  texttitle: {
    color: COLORS.PRIMARY,
    fontFamily: FONT_TYPE.MEDIUM,
  },
  texttitleContainer: {
    marginTop: ViewScale(25),
    marginBottom: ViewScale(10),
  },
  HeaderText: {
    alignSelf: 'center',
    color: COLORS.PRIMARY,
    fontWeight: 'bold',
    fontSize: FontScale(20),
  },
  content: {
    borderColor: COLORS.BORDER,
    borderWidth: 1,
    flex: Platform.OS == 'ios' ? 0 : 1,
    marginTop: ViewScale(10),
    height: hp(46),
    paddingHorizontal: ViewScale(10),
  },
  text: {
    textAlign: 'justify',
    marginBottom: ViewScale(30),
  },
  textLink: {
    fontSize: FontScale(12),
    fontWeight: 'normal',
    color: COLORS.TEXTLINK,
  },
  textAgreement: {
    marginLeft: ViewScale(10),
    color: '#313131',
  },
});
