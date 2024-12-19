import {View} from 'native-base';
import {StyleSheet} from 'react-native';
import {COLORS} from 'styles';
import {ViewScale} from 'utils';

export default StyleSheet.create({
  container: {
    marginTop: ViewScale(10),
  },
  container1: {
    borderColor: COLORS.BORDER,
    borderWidth: 1,
    padding: ViewScale(10),
  },
  container11: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: ViewScale(5),
  },
  container2: {
    flexDirection: 'row',
    marginTop: ViewScale(15),
    backgroundColor: COLORS.GRAY_4,
    padding: ViewScale(15),
  },
  container21: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  shouldHaveMoneyTarget: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: ViewScale(20),
  },
  imageContainer: {
    marginVertical: ViewScale(20),
  },
  boxContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: ViewScale(30),
    padding: ViewScale(15),
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.GRAY_4,
  },
  imageContainer: {
    marginVertical: ViewScale(20),
  },
  viewText_Image_Enough: {
    height: ViewScale(150),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewText_Enough: {
    width: '60%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_Enough: {textAlign: 'center', marginTop: ViewScale(20)},
  viewImage_Enough: {
    width: '30%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image_Enough: {width: ViewScale(100), height: ViewScale(100)},
  viewMony_expected_adjustments: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: ViewScale(20),
  },
  viewMony_expected_adjustments_month: {
    width: '100%',
    flexDirection: 'column',
    marginTop: ViewScale(30),
    padding: ViewScale(15),
    backgroundColor: COLORS.GRAY_4,
  },
  viewMony_expected_adjustments_month2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewfree: {
    borderWidth: 0.5,
    borderColor: COLORS.BORDER,
    marginVertical: ViewScale(10),
    width: '100%',
  },
  viewRecommended_content: {
    borderWidth: 1,
    borderColor: 'rgba(26, 54, 134, 0.3)',
    padding: ViewScale(15),
  },
  textRecommended_content: {
    marginRight: ViewScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  marginTopOS: {
    marginTop: Platform.OS === 'android' ? ViewScale(4) : ViewScale(5),
  },
});
