import {StyleSheet} from 'react-native';
import {ViewScale, FontScale} from 'utils';
import {FONT_SIZE, FONT_TYPE} from 'styles';

export default styles = StyleSheet.create({
  Name: {
    color: '#FFF',
    fontSize: FontScale(30),
    fontFamily: FONT_TYPE.MEDIUM,
  },
  UnderName: {
    color: '#FFF',
    fontFamily: FONT_TYPE.MEDIUM,
    fontSize: FONT_SIZE.TITLE_1,
  },
  UnderNameContainer: {
    marginTop: ViewScale(10),
    backgroundColor: 'rgba(255,255,255, 0.1)',
    alignSelf: 'flex-start',
    paddingHorizontal: ViewScale(10),
  },
  headerline: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255, 0.3)',
    marginTop: ViewScale(15),
  },
  dataProfileLeft: {
    display: 'flex',
    flexDirection: 'column',
  },
  dataProfileMid: {
    display: 'flex',
    flexDirection: 'column',
  },
  dataProfileRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  dataProfileText: {
    color: '#FFF',
    marginTop: ViewScale(8),
    fontSize: FONT_SIZE.TITLE_3,
    fontFamily: FONT_TYPE.MEDIUM,
  },
  dataProfileContainerLeft: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  dataProfileContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: ViewScale(20),
  },
});
