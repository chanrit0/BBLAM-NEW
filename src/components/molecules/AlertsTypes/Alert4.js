import {Translate} from 'function';
import {ViewScale} from 'utils';
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {TextMedium, TextRegular, Alert, Button} from 'components/atoms';
import {useNavigation} from '@react-navigation/core';
import {COLORS, FONT_SIZE, SPACING} from 'styles';

export default ({route: {params}}) => {
  const onPress = params?.onPress ?? null;
  const TouchableBackdrop = params?.TouchableBackdrop;
  const children = params?.children;

  const navigation = useNavigation();

  const onPressAgree = () => {
    navigation.goBack();
  };

  const onPressDisagree = () => {
    navigation.navigate('MainChangeFund');
  };

  return (
    <Alert TouchableBackdrop={TouchableBackdrop}>
      <View style={styles.modal}>
        <View style={styles.content}>
          <TextRegular
            size={FONT_SIZE.BODY_2}
            style={{textAlign: 'center', marginVertical: ViewScale(20)}}>
            {children}
          </TextRegular>
        </View>
        <View
          style={{
            marginTop: ViewScale(10),
          }}>
          <Button
            type="fill"
            title={Translate('textAgree')}
            onPress={onPressAgree}
            // style={{width: '48%'}}
          />
          <TouchableOpacity
            onPress={onPressDisagree}
            style={{
              marginTop: ViewScale(10),
              height: SPACING.INPUT_HEIGHT,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextMedium color={COLORS.SECONDARY}>
              {Translate('textDisagree')}
            </TextMedium>
          </TouchableOpacity>
        </View>
      </View>
    </Alert>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    flex: 1,
    padding: ViewScale(20),
  },
});
