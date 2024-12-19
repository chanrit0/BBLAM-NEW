/* eslint-disable react-native/no-inline-styles */
// React
import React from 'react';
import {View, TouchableOpacity} from 'react-native';

// custom
import {ViewScale, FontScale} from 'utils';

// components
import {Container} from '../common/Container';
import {Ionicons} from 'components/Icons';
import {TextMedium} from 'components/atoms';
import {COLORS} from 'styles';

export default ({onPress, noContainer = false}) => {
  const Render = () => {
    const Button = ({onPress}) => (
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-end',
          marginTop: ViewScale(5),
        }}>
        <Ionicons
          name="add-circle"
          size={FontScale(20)}
          color={COLORS.PRIMARY}
        />
        <TextMedium
          style={{
            marginLeft: ViewScale(5),
          }}
          color={COLORS.PRIMARY}>
          {'เพิ่ม'}
        </TextMedium>
      </TouchableOpacity>
    );

    if (!noContainer) {
      return (
        <Container style={{flex: 0, marginVertical: ViewScale(10)}}>
          <Button onPress={onPress} />
        </Container>
      );
    } else {
      return (
        <View style={{marginVertical: ViewScale(10)}}>
          <Button onPress={onPress} />
        </View>
      );
    }
  };

  return <Render />;
};
