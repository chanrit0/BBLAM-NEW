/* eslint-disable react-native/no-inline-styles */
// React
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

// custom
import {FontScale, ViewScale} from 'utils';

// components
import TextInputWithTitle from '../TextInputWithTitle';

// lib
import {COLORS} from 'styles';
import {Controller} from 'react-hook-form';
import {AddButton} from 'components/atoms';
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
          <View>
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
              name={`data.${index}.position`}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <TextInputWithTitle
                  title={'ตำแหน่ง'}
                  type={'row'}
                  onChangeText={onChange}
                  value={value}
                  error={error}
                />
              )}
            />
            <Controller
              control={control}
              name={`data.${index}.address_company`}
              rules={{required: true}}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <TextInputWithTitle
                  required
                  title={'ที่อยู่ (บริษัท)'}
                  type={'textarea'}
                  height={ViewScale(100)}
                  onChangeText={onChange}
                  value={value}
                  error={error}
                />
              )}
            />
            <Controller
              control={control}
              name={`data.${index}.phone`}
              rules={{required: true}}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <TextInputWithTitle
                  title={'โทรศัพท์'}
                  type={'row'}
                  required
                  onChangeText={onChange}
                  value={value}
                  error={error}
                />
              )}
            />

            <Controller
              control={control}
              name={`data.${index}.fax`}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <TextInputWithTitle
                  title={'โทรสาร'}
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
        </View>
      ))}
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
