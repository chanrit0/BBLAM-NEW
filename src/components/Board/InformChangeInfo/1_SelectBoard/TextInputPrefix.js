/* eslint-disable react-native/no-inline-styles */
// React
import React from 'react';
import {View, TouchableOpacity} from 'react-native';

// custom
import {FontScale, ViewScale} from 'utils';

// components
import {Container} from 'components/common';

import RadioPrefix from '../RadioPrefix';
import TextInput from '../TextInput';
import {AntDesign} from 'components/Icons';
import {Controller} from 'react-hook-form';

export default function TextInputPrefix({onPress, control = null, index}) {
  return (
    <>
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 0,
          right: ViewScale(10),
          padding: ViewScale(15),
          zIndex: 99,
          transform: [
            {
              translateY: ViewScale(-10),
            },
          ],
        }}
        onPress={onPress}>
        <AntDesign name="closecircle" size={FontScale(18)} />
      </TouchableOpacity>
      <Container style={{flex: 0}}>
        <View style={{marginTop: ViewScale(10)}}>
          <Controller
            control={control}
            name={`data.${index}.prefix`}
            rules={{required: true}}
            render={({field: {onChange}, fieldState: {error}}) => (
              <RadioPrefix onPress={onChange} error={error} etcActive />
            )}
          />
          <Controller
            control={control}
            name={`data.${index}.name`}
            rules={{required: true}}
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <TextInput
                style={{marginTop: ViewScale(10),color: 'black'}}
                onChangeText={onChange}
                value={value}
                error={error}
              />
            )}
          />
        </View>
      </Container>
    </>
  );
}
