import {View, StyleSheet} from 'react-native';
import React from 'react';
import {Container} from 'components/common';
import {ViewScale} from 'utils';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'components/atoms';
import {Translate} from 'function';

export default ({
  callback,
  btnLeftTitle = Translate('textBack'),
  btnRightTitle = Translate('textNext'),
}) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <View style={styles.containerFooter}>
        <Button
          title={btnLeftTitle}
          type="border"
          style={styles.ButtonLeft}
          onPress={handleGoBack}
        />
        <Button
          title={btnRightTitle}
          type="fill"
          style={styles.ButtonRight}
          onPress={callback}
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
