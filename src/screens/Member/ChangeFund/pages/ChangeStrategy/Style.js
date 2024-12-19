import {ViewScale} from 'utils';
import {StyleSheet} from 'react-native';
import {COLORS} from 'styles';

export default styles = StyleSheet.create({
  lineVertical: {borderColor: COLORS.BORDER, borderLeftWidth: 1},
  container: {
    borderBottomWidth: 1,
    borderColor: COLORS.BORDER,
    paddingBottom: ViewScale(10),
  },
  Incontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: ViewScale(10),
  },
  containerRight: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
