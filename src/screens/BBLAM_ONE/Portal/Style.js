import {StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {COLORS, SPACING} from 'styles';
import {ViewScale, FontScale} from 'utils';
export default styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  unflex: {
    flex: 0,
  },
  logoContainer: {alignItems: 'center'},
  title: {
    color: COLORS.PRIMARY,
    fontSize: FontScale(22),
    marginBottom: ViewScale(15),
  },
  body: {
    flexGrow: 1,
    marginTop: ViewScale(50),
  },
  footerContainer: {
    marginBottom: SPACING.FOOTER_HEIGHT,
  },
});
