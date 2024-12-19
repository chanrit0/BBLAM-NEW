import {ViewScale} from 'utils';
import {StyleSheet} from 'react-native';
import {COLORS, FONT_SIZE, SPACING} from 'styles';

export default StyleSheet.create({
  container: {flex: 1},
  containerLogout: {flex: 1, justifyContent: 'flex-end'},
  buttonLogout: {
    alignSelf: 'center',
    marginBottom: SPACING.FOOTER_HEIGHT,
  },
  viewList: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {marginRight: ViewScale(5)},
  title: {
    color: COLORS.PRIMARY,
    fontSize: FONT_SIZE.TITLE_2,
  },
  titleContainer: {
    marginBottom: ViewScale(30),
    flex: 0,
  },
  passwordUnderline: {
    textDecorationLine: 'underline',
  },
  logout: {
    color: COLORS.ERROR,
  },
  paddingDelete25: {
    padding: ViewScale(25),
  },
});
