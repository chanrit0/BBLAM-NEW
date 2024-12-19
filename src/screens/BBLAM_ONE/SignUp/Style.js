import {StyleSheet} from 'react-native';
import {COLORS} from 'styles';
import {ViewScale, FontScale} from 'utils';
export default StyleSheet.create({
  header: {
    color: COLORS.PRIMARY,
    textAlign: 'center',
    fontSize: FontScale(24),
    marginBottom: ViewScale(30),
  },
  TabBar: {flex: 1},
});
