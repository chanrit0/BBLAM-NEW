import {StyleSheet} from 'react-native';
import {ViewScale} from 'utils';

export default styles = StyleSheet.create({
  grayBox: {
    padding: ViewScale(5),
    marginTop: ViewScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eef2f6',
    alignSelf: 'flex-start',
  },
  changebox: {
    marginTop: ViewScale(10),
    backgroundColor: '#eef2f6',
    padding: ViewScale(10),
    paddingVertical: ViewScale(15)
  },
});
