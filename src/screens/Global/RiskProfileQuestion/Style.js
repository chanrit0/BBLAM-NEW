import {StyleSheet} from 'react-native';
import {ViewScale, FontScale} from 'utils';
import {COLORS} from 'styles';

export default styles = StyleSheet.create({
  Container: {
    paddingHorizontal: ViewScale(40),
  },
  HeaderText: {
    fontWeight: 'bold',
    fontSize: FontScale(20),
    color: COLORS.PRIMARY,
  },
});
