import {StyleSheet,Platform} from 'react-native';
import {ViewScale} from 'utils';
import {FONT_TYPE, COLORS} from 'styles';
// CONSTANT
const BOX_COLOR = '#eef2f6';

export default styles = StyleSheet.create({
  boxContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: ViewScale(30),
    padding: ViewScale(15),
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: BOX_COLOR,
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
  textAnderline_less_than: {
    textAlign: 'center',
    // color: data_show?.result5_text == 'น้อยกว่า' ? 'red' : 'green',
    marginTop: ViewScale(20),
  },
  textAnderline_less_than_mony: {
    fontFamily: FONT_TYPE.MEDIUM,
    // color: data_show?.result5_text == 'น้อยกว่า' ? 'red' : 'green',
  },
  viewContaner: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: ViewScale(20),
  },
  viewContaner_Mony_retire_current: {
    width: '100%',
    flexDirection: 'column',
    marginTop: ViewScale(30),
    padding: ViewScale(15),
    backgroundColor: COLORS.GRAY_4,
  },
  viewContaner_Mony_retire_current_Detel: {
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
