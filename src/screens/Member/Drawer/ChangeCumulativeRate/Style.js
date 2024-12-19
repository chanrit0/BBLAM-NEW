import {StyleSheet} from 'react-native';
import {ViewScale, FontScale} from 'utils';

export default styles = StyleSheet.create({
  boxGray: {
    backgroundColor: '#eef2f6',
    alignItems: 'center',
    paddingVertical: ViewScale(15),
    marginTop: ViewScale(20),
  },
  ComulativeRatePresentContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: ViewScale(10),
  },
  topContainer: {
    marginTop: ViewScale(20),
  },
  CumulativeRateNew: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  MiddleContainer: {
    marginTop: ViewScale(20),
  },
});

export const InputSmallProps = {
  inputStyle: {textAlign: 'center', fontSize: FontScale(16)},
  containerStyle: {width: ViewScale(100)},
};
