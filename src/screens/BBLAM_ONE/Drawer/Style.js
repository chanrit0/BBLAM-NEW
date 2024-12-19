import {StyleSheet} from 'react-native';
import {COLORS} from 'styles';
import {ViewScale} from 'utils';

export default styles = StyleSheet.create({
  ButtonDrawerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: ViewScale(15),
  },
  ButtonDrawerText_Space: {
    marginLeft: ViewScale(10),
  },
  drawerButton: {
    color: COLORS.PRIMARY,
  },
  logout: {
    color: COLORS.ERROR,
  },
  nameContainer: {
    paddingTop: ViewScale(20),
    flex: 0,
  },
  name: {
    color: COLORS.PRIMARY,
    marginTop: ViewScale(10),
  },
  container: {
    flex: 1,
  },
});
