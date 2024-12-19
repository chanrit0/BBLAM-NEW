import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {TextLight, TextMedium, TextRegular} from 'components/atoms';
import {Translate} from 'function';
import {AntDesign} from 'components/Icons';
import {ViewScale} from 'utils';
import {G_STYLES} from 'styles';

export default ({onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={require('assets/icons/ServerError.png')}
        style={G_STYLES.IconErrorImage}
      />
      <TextMedium style={styles.titleStyle}>
        {Translate('textServerError')}
        <TextLight size={12}>{Translate('textServerErrorOrder')}</TextLight>
      </TextMedium>

      {/* <View style={styles.iconContainer}>
        <AntDesign name="reload1" />
        <TextRegular style={styles.textIcon}>
          {Translate('textTabToRetry')}
        </TextRegular>
      </View> */}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textIcon: {
    marginLeft: ViewScale(5),
  },
  titleStyle: {
    textAlign: 'center',
    marginTop: ViewScale(10),
  },
  subtitleStyle: {
    textAlign: 'center',
    marginTop: ViewScale(2),
  },
});
