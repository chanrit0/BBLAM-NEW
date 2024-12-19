/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {ViewScale, FontScale} from 'utils';
import {FONT_TYPE} from 'styles';
import {SearchBar} from 'react-native-elements';
import {Filter} from 'components/Icons/Customs';
import _ from 'lodash';

export default ({
  value,
  onChangeText,
  hasFilter = false,
  style,
  inputContainerStyle,
  inputStyle,
  containerStyle,
  placeholderTextColor = '#FFF',
}) => {
  const [search, onChange] = React.useState('');

  const _onChangeText = v => {
    onChange(v);
    onChangeText?.(v);
  };

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
        },
        style,
      ]}>
      <View style={{flex: 1}}>
        <SearchBar
          placeholder={'ค้นหา'}
          onChangeText={_onChangeText}
          value={search}
          placeholderTextColor={placeholderTextColor}
          inputContainerStyle={[
            {
              backgroundColor: 'rgba(111, 133, 195, 0.26)',
              borderRadius: 0,
            },
            inputContainerStyle,
          ]}
          inputStyle={[
            {
              color: '#FFF',
              fontFamily: FONT_TYPE.REGULAR,
              fontSize: FontScale(18),
            },
            inputStyle,
          ]}
          containerStyle={[
            {
              paddingHorizontal: 0,
              borderTopWidth: 0,
              borderBottomWidth: 0,
              backgroundColor: 'transparent',
            },
            containerStyle,
          ]}
        />
      </View>
      {hasFilter && (
        <TouchableOpacity
          style={{
            backgroundColor: 'rgba(111, 133, 195, 0.26)',
            marginLeft: ViewScale(10),
            // height: height,
          }}>
          <Filter />
        </TouchableOpacity>
      )}
    </View>
  );
};
