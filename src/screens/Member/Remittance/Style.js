import {StyleSheet} from 'react-native';
import {ViewScale, FontScale} from 'utils';
import {COLORS, FONT_SIZE} from 'styles';

export default styles = StyleSheet.create({
  textheader: {
    color: '#FFF',
    fontSize: FontScale(28),
  },
  texttitle: {
    color: COLORS.PRIMARY,
    fontSize: FONT_SIZE.TITLE_1,
  },
  texttitleContainer: {
    marginTop: ViewScale(20),
    marginBottom: ViewScale(10),
  },
});
