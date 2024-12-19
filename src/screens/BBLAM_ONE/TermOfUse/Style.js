import {StyleSheet} from 'react-native';
import {ViewScale} from 'utils';
import {COLORS, FONT_SIZE} from 'styles';
import {isIOS} from 'utils';

export default styles = StyleSheet.create({
  HeaderText: {
    alignSelf: 'center',
    color: COLORS.PRIMARY,
    fontSize: FONT_SIZE.TITLE_1,
  },
  content: {
    borderColor: COLORS.SECONDARY,
    borderWidth: 1,
    marginTop: ViewScale(30),
    paddingHorizontal: ViewScale(10),
  },
  text: {
    textAlign: 'justify',
    fontSize: FONT_SIZE.BODY_1,
    marginBottom: ViewScale(30),
  },
  textLink: {
    fontSize: FONT_SIZE.BODY_4,
    fontWeight: 'normal',
    color: COLORS.TEXTLINK,
  },
  textAgreement: {
    marginLeft: isIOS ? 0 : ViewScale(10),
    fontWeight: 'normal',
    color: '#313131',
  },
  agreementContainer: {
    marginTop: ViewScale(15),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: ViewScale(15),
  },
});
