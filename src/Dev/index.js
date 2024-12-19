/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, FlatList} from 'react-native';
import {ViewScale} from 'utils';

import {pages} from './DevStack';
import {SPACING} from 'styles';

export default function index() {
  return (
    <FlatList
      data={pages}
      keyExtractor={(item, index) => 'devpageid-' + index}
      contentContainerStyle={{
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.CONTAINER_MARGIN_HORIZONTAL,
        paddingVertical: ViewScale(40),
      }}
      renderItem={({item}) => <Button page={item} />}
    />
  );
}

const Button = ({page}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(page)}
      style={{
        backgroundColor: 'white',
        borderWidth: 1,
        width: 100,
        height: 100,
        justifyContent: 'center',
        marginBottom: 20,
        alignSelf: 'center',
      }}>
      <Text style={{textAlign: 'center'}}>{page}</Text>
    </TouchableOpacity>
  );
};
