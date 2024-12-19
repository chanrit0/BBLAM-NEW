import {StyleSheet} from 'react-native';
import {ViewScale, FontScale} from 'utils';
import {COLORS} from 'styles';

export default stylePasscode = StyleSheet.create({
  Container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCircle: {
    color: COLORS.PRIMARY,
    fontSize: FontScale(25),
  },
  button: {
    borderColor: COLORS.PRIMARY,
    borderWidth: 1,
  },
  touchidContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchidImage: {
    resizeMode: 'contain',
  },
  headerContainer: {
    alignItems: 'center',
  },
  headertext: {
    textAlign: 'center',
    color: COLORS.PRIMARY,
    fontSize: FontScale(20),
    marginTop: ViewScale(10),
  },
  touchidtext: {
    textAlign: 'center',
    color: COLORS.PRIMARY,
    fontSize: FontScale(18),
  },
  warningHeaderText: {
    fontSize: FontScale(18),
  },
  warningTextContainer: {
    display: 'flex',
    alignItems: 'center',
    marginVertical: ViewScale(10),
  },
  warningText: {
    fontSize: FontScale(16),
    color: '#4c637b',
  },
});
