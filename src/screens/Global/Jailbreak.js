import {View, StyleSheet, BackHandler, SafeAreaView, Image} from 'react-native';
import React from 'react';
import {COLORS, FONT_SIZE, SPACING} from 'styles';
import {isIOS, ViewScale} from 'utils';
import RNExitApp from 'react-native-exit-app';
import {Translate} from 'function';
import {Button, TextMedium} from 'components/atoms';
import {PHONENUMBER_BBLAM} from 'config';

export default () => {
  const handleOnPress = () => {
    if (isIOS) {
      RNExitApp.exitApp();
    } else {
      BackHandler.exitApp();
    }
  };

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
            style={{color: COLORS.PRIMARY, textAlign: 'center'}}>
            {Translate('textJailbreak') + PHONENUMBER_BBLAM}
          </TextMedium>
          <Button
            title={Translate('textConfirm2')}
            type="fill"
            onPress={handleOnPress}
          />
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
