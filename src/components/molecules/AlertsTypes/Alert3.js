import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Alert, Button} from 'components/atoms';
import {useNavigation} from '@react-navigation/core';

export default ({route: {params}, style}) => {
  const navigation = useNavigation();
  const children = params?.children ?? null;
  const onPressLeft = params?.onPressLeft ?? null;
  const onPressRight = params?.onPressRight ?? null;
  const titleLeft = params?.titleLeft ?? null;
  const titleRight = params?.titleRight ?? null;
  const iconLeft = params?.iconLeft ?? null;
  const iconRight = params?.onPressLeft ?? null;
  const TouchableBackdrop = params?.TouchableBackdrop;

  const _onPressLeft = () => {
    navigation.goBack();
    onPressLeft?.();

  };

  const _onPressRight = () => {
    navigation.goBack();
    onPressRight?.();
  };

  return (
    <Alert TouchableBackdrop={TouchableBackdrop}>
      <View style={[styles.content, style]}>{children}</View>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title={titleLeft}
            lefticon={iconLeft}
            type={'fill'}
            onPress={_onPressLeft}
          />
        </View>
        <View style={styles.button}>
          {iconRight}
          <Button title={titleRight} type={'fill'} onPress={_onPressRight} />
        </View>
      </View>
    </Alert>
  );
};

const styles = StyleSheet.create({
  content: {justifyContent: 'center', alignItems: 'center', flex: 1},
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '49.5%',
  },
});
