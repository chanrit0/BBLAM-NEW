import {StyleSheet} from 'react-native';
import {ViewScale, FontScale} from 'utils';
import {COLORS, FONT_TYPE} from 'styles';

export default styles = StyleSheet.create({});

export const SegmentControlTabStyle = {
  tabStyle: {
    marginBottom: ViewScale(10),
    backgroundColor: 'rgba(111,133,195,0.26)',
    borderWidth: 0,
  },
  firstTabStyle: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderRightWidth: 1,
    borderColor: COLORS.PRIMARY,
  },
  lastTabStyle: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderLeftWidth: 1,
    borderColor: COLORS.PRIMARY,
  },
  activeTabStyle: {
    backgroundColor: COLORS.PRIMARY,
    borderColor: COLORS.PRIMARY,
    color: '#FFF',
  },
  tabTextStyle: {
    fontFamily: FONT_TYPE.MEDIUM,
    fontSize: FontScale(18),
    color: '#FFF',
  },
};
