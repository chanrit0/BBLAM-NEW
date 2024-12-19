import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import {COLORS, FONT_SIZE, SPACING} from 'styles';
import {ViewScale} from 'utils';
import {TextMedium} from 'components/atoms';
import {Translate} from 'function';

export default () => {
  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.image}
          resizeMode={'contain'}
        />
        <View
          style={{
            flexGrow: 1,
            justifyContent: 'space-between',
            marginBottom: SPACING.FOOTER_HEIGHT,
          }}>
          <TextMedium
            size={FONT_SIZE.TITLE_1}
            color={COLORS.WHITE}
            style={{textAlign: 'center'}}>
            {Translate('textNoInternet')}
          </TextMedium>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safearea: {flex: 1},
  container: {
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: ViewScale(20),
    flex: 1,
  },
  image: {
    width: ViewScale(300),
    height: ViewScale(100),
    flexGrow: 1,
  },
});
