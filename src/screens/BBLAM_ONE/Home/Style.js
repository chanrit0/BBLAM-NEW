import { StyleSheet } from 'react-native';
import { FontScale, ViewScale } from 'utils';
import { SPACING, COLORS } from 'styles';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: SPACING.HEADER_HEIGHT,
  },
  container: {
    flex: 0,
  },
  headerContainer: {
    backgroundColor: COLORS.PRIMARY,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textHeader: {
    marginLeft: ViewScale(10),
    color: '#FFF',
  },
  flex: {
    flex: 1,
  },
  unflex: {
    flex: 0,
  },
  scrollview: {
    backgroundColor: COLORS.GRAY_1,
  },
  body: {
    backgroundColor: COLORS.GRAY_1,
    borderTopLeftRadius: ViewScale(18),
    borderTopRightRadius: ViewScale(18),
    paddingTop: ViewScale(30),
    minHeight: hp(60),
  },
  wrapper_body: {
    position: 'relative',
  },
  behindbody: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1, // appear under the scrollview
    backgroundColor: COLORS.PRIMARY,
  },
  bannerContent: {
    overflow: 'hidden',
    borderRadius: 5,
  },
});
