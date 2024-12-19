import {StyleSheet} from 'react-native';
import {ViewScale, FontScale} from 'utils';
import {COLORS} from 'styles';

export default StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: ViewScale(80),
  },
  container: {
    marginTop: ViewScale(20),
  },
  DescriptionContainer: {
    overflow: 'hidden',
    marginTop: ViewScale(5),
    marginBottom: ViewScale(20),
    paddingHorizontal: ViewScale(30),
    borderColor: COLORS.SECONDARY,
    borderWidth: 1,
    padding: ViewScale(15),
  },
  textDescriptTitle: {
    marginLeft: ViewScale(3),
    fontSize: FontScale(18),
    color: COLORS.PRIMARY,
  },
  textDescriptContent: {
    fontSize: FontScale(16),
    color: COLORS.THIRDARY,
  },
  viewTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bullet: {
    color: COLORS.PRIMARY,
    fontSize: FontScale(24),
  },
  column2: {marginTop: ViewScale(10)},
  footer: {
    marginTop: ViewScale(40),
    flex: 0,
  },
  buttonText: {
    color: '#FFF',
    fontSize: FontScale(16),
    textAlign: 'center',
  },
});
