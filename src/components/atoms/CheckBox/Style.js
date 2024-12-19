import {StyleSheet} from 'react-native';
import {isIOS, ViewScale} from 'utils';

export default StyleSheet.create({
  CircleOutline: {
    borderWidth: 1,
    borderRadius: ViewScale(20) / 2,
    marginRight: ViewScale(10),
    width: ViewScale(20),
    height: ViewScale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  CircleInline: {
    width: ViewScale(12),
    height: ViewScale(12),
    borderRadius: ViewScale(12) / 2,
  },
  SquareCheckBox: {
    marginRight: isIOS ? ViewScale(10) : ViewScale(20),
    width: ViewScale(18),
    height: ViewScale(18),
  },
});
