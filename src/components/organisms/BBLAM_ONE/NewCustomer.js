import {Entypo} from 'components/Icons';
import {TextMedium, TextRegular} from 'components/atoms';
import {ViewScale, FontScale} from 'utils';
import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {COLORS} from 'styles';

export default () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        source={require('assets/images/NewCustomer.png')}
        style={styles.IconImage}
      />
      <View style={styles.rightContainer}>
        <TextRegular>{'ลูกค้าใหม่'}</TextRegular>
        <View style={styles.rowContainer}>
          <TextMedium style={styles.textOpenNewPort}>
            {'เปิดบัญชีกองทุนออนไลน์'}
          </TextMedium>
          <TextMedium style={styles.textPress}>{'ที่นี่'}</TextMedium>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <Entypo name="chevron-thin-right" size={FontScale(30)} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    height: ViewScale(80),
    padding: ViewScale(10),
    backgroundColor: COLORS.GRAY_2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  IconImage: {
    width: ViewScale(50),
    height: ViewScale(50),
  },
  textOpenNewPort: {
    fontSize: ViewScale(20),
  },
  rightContainer: {
    marginLeft: ViewScale(20),
  },
  rowContainer: {
    flexDirection: 'row',
  },
  textPress: {
    color: COLORS.PRIMARY,
    fontSize: ViewScale(20),
    textDecorationLine: 'underline',
    marginLeft: ViewScale(10),
  },
});
