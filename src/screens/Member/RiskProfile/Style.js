import {StyleSheet} from 'react-native';
import {ViewScale} from 'utils';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {COLORS} from 'styles';

export default StyleSheet.create({
  scoreEvalutaionContainer: {
    marginTop: ViewScale(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  arrowright: {
    marginLeft: ViewScale(10),
    width: wp(4),
    height: wp(3),
    transform: [
      {
        translateY: 1,
      },
    ],
  },
  scoreContainer: {
    marginTop: ViewScale(20),
    backgroundColor: '#f6f7fa',
    flexDirection: 'row',
    flex: 1,
    // justifyContent: 'space-between',
    paddingHorizontal: ViewScale(15),
    paddingVertical: ViewScale(25),
  },
  containerRight: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerGuideline: {
    marginTop: ViewScale(20),
    paddingBottom: ViewScale(10),
    borderBottomColor: COLORS.BORDER,
    borderBottomWidth: 0.5,
  },
  contentRisk: {
    paddingVertical: ViewScale(15),
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.BORDER,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
