import {StyleSheet} from 'react-native';
import {ViewScale} from 'utils';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS, DRAWER_SHIFT_ICONS, DRAWER_SIZE_ICONS} from 'styles';

export default styles = StyleSheet.create({
  containerLogo: {
    position: 'absolute',
    opacity: 0.03,
    alignSelf: 'center',
  },
  backgroundLogo: {
    width: wp(50),
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  shifticon: {marginRight: DRAWER_SHIFT_ICONS},
  logout: {
    borderTopWidth: 0.5,
    paddingTop: ViewScale(10),
    borderColor: COLORS.PRIMARY,
    backgroundColor: 'white',
  },
});
