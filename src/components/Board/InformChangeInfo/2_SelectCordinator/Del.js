/* eslint-disable react-native/no-inline-styles */
// React
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

// custom
import {FontScale, ViewScale} from 'utils';
import styles from '../Style';

// components
import {Button, AddButton} from 'components/atoms';
import TextInputWithTitle from '../TextInputWithTitle';

// lib
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from 'styles';
import {Controller} from 'react-hook-form';
import {AntDesign} from 'components/Icons';

export default ({fields, control, addData, removeData}) => {
  return (
    <>
      {fields.map((field, index) => (
        <View key={field.id}>
          <View
            style={{
              alignItems: 'flex-end',
              marginTop: ViewScale(10),
            }}>
            <TouchableOpacity
              onPress={removeData(index)}
              style={{
                padding: ViewScale(15),
              }}>
              <AntDesign name="closecircle" size={FontScale(15)} />
            </TouchableOpacity>
          </View>
          <Controller
            control={control}
            name={`data.${index}.name`}
            rules={{required: true}}
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <TextInputWithTitle
                required
                title={'ชื่อ - นามสกุล'}
                type={'row'}
                onChangeText={onChange}
                value={value}
                error={error}
              />
            )}
          />
          <Controller
            control={control}
            name={`data.${index}.email`}
            rules={{required: true}}
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <TextInputWithTitle
                required
                title={'Email'}
                type={'row'}
                onChangeText={onChange}
                value={value}
                error={error}
              />
            )}
          />
        </View>
      ))}
      {/* add btn */}
      <AddButton onPress={addData} />

      <View
        style={{
          marginTop: ViewScale(20),
          borderBottomColor: COLORS.BORDER,
          borderBottomWidth: 0.5,
        }}
      />
    </>
  );
};
