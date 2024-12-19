import {StyleSheet} from 'react-native';
import {ViewScale} from 'utils';
import {COLORS} from 'styles';

export default styles = StyleSheet.create({
  lineHorizontal: {
    borderWidth: 0.5,
    borderColor: COLORS.BORDER,
  },
  newsContainerLeft: {
    // flexDirection: 'row',
    borderWidth: 1,
  },
  newsTextContainer: {
    marginLeft: ViewScale(20),
    paddingRight: ViewScale(10),
    flex: 1,
  },
  dateRight: {},
  newsContainer: {
    height: ViewScale(100),
    marginVertical: ViewScale(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContainer: {
    marginTop: ViewScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dotsContainerStyle: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: ViewScale(10),
    transform: [
      {
        translateY: ViewScale(15),
      },
    ],
  },
  dotStyle: {
    backgroundColor: '#cad2ea',
    marginHorizontal: ViewScale(2),
    width: ViewScale(15),
    height: ViewScale(3),
    borderRadius: 25,
  },
  activeDotStyle: {
    marginHorizontal: ViewScale(2),
    backgroundColor: COLORS.PRIMARY,
    width: ViewScale(15),
    height: ViewScale(3),
    borderRadius: 25,
  },
  image: {
    width: ViewScale(120),
    height: '100%',
  },
});
