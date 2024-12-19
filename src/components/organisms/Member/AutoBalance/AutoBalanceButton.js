import {useNavigation} from '@react-navigation/core';
import {Button} from 'components/atoms';
import {Container} from 'components/common';
import {Translate} from 'function';
import {ViewScale} from 'utils';
import React from 'react';
import {View, StyleSheet} from 'react-native';

export default ({onConfirm}) => {
  const navigation = useNavigation();

  return (
    <Container>
      <View style={styles.containerFooter}>
        <Button
          title={Translate('textBack')}
          type="border"
          style={styles.ButtonLeft}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Button
          title={Translate('textNext')}
          type="fill"
          style={styles.ButtonRight}
          onPress={onConfirm}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  containerFooter: {
    marginVertical: ViewScale(30),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ButtonLeft: {
    width: '48%',
  },
  ButtonRight: {
    width: '48%',
  },
});
