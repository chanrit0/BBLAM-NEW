import {StyleSheet} from 'react-native';
import {ViewScale, FontScale} from 'utils';
import {SPACING, COLORS} from 'styles';
export default StyleSheet.create({
  container: {
    marginTop: ViewScale(30),
  },
  button: {
    marginTop: ViewScale(20),
    marginBottom: SPACING.FOOTER_HEIGHT,
  },
  flexGrow: {
    flexGrow: 1,
  },
  StepIndicatorContainer: {
    width: ViewScale(200),
    alignSelf: 'center',
    marginVertical: ViewScale(10),
  },
});

export const StepIndicatorStyle = {
  stepIndicatorSize: ViewScale(25),
  currentStepIndicatorSize: ViewScale(30),
  stepIndicatorLabelFontSize: FontScale(11),
  currentStepIndicatorLabelFontSize: FontScale(11),
};
