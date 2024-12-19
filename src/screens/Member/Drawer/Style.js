import {StyleSheet} from 'react-native';
import {ViewScale} from 'utils';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

// constant
import {DRAWER_SHIFT_ICONS} from 'styles';

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
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
});
