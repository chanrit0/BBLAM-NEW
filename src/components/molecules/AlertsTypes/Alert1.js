import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Alert, Button} from 'components/atoms';
import {useNavigation} from '@react-navigation/core';

export default ({route: {params}}) => {
  const children = params?.children ?? null;
  const onPress = params?.onPress ?? null;
  const title = params?.title ?? null;
  const style = params?.style ?? null;
  const nocenter = params?.nocenter ?? false;
  const icon = params?.icon ?? null;
  const TouchableBackdrop = params?.TouchableBackdrop;

  const navigation = useNavigation();

  const onPressButton = () => {
    navigation.goBack();
    onPress?.();
  };

  return (
    <Alert TouchableBackdrop={TouchableBackdrop}>
      <View style={[styles.content, !nocenter && styles.contentCenter, style]}>
        {children}
      </View>
      <Button
        title={title}
        lefticon={icon}
        type="fill"
        onPress={onPressButton}
      />
    </Alert>
  );
};

const styles = StyleSheet.create({
  contentCenter: {justifyContent: 'center', alignItems: 'center'},
  content: {flex: 1},
  buttonText: {
    color: '#FFF',
  },
});
