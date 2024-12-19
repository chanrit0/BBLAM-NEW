import {StyleSheet} from 'react-native';
import {COLORS} from 'styles';
import {ViewScale} from 'utils';

const SIZE = ViewScale(25);
const MARGIN = ViewScale(5);

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: SIZE + MARGIN * 4,
  },
  child: {
    width: SIZE / 2,
    height: SIZE / 2,
    borderRadius: SIZE / 2,
    margin: MARGIN,
    backgroundColor: COLORS.PRIMARY,
  },
});
