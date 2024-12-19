import {StyleSheet} from 'react-native';
import {COLORS, SPACING} from 'styles';
import {ViewScale} from 'utils';

export default styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: COLORS.GRAY_1,
  },
  cateogories_container: {
    backgroundColor: COLORS.GRAY_1,
    paddingVertical: ViewScale(10),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER,
  },
  flatlist_categories_container: {
    flexDirection: 'row',
  },
});
