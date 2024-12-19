/* eslint-disable react/self-closing-comp */
// React
import React from 'react';
import {View, Image, ScrollView} from 'react-native';

// custom
import {ViewScale} from 'utils';
import styles from './Style';

// components
import {Container, RootScroll} from 'components/common';
import {WebView} from 'react-native-webview';
import {Translate} from 'function';
import {ActivityIndicator} from 'components/atoms';

// lib

export default function index({route}) {
  const item = route.params.item;
  const [loading, setLoading] = React.useState(true);

  return (
    <RootScroll
      flexContainer
      isBackIcon
      scrollEnabled={false}
      title={Translate('textNews')}>
      {loading && (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 99,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator />
        </View>
      )}
      <WebView
        source={{uri: item.url}}
        onLoadEnd={syntheticEvent => {
          // update component to be aware of loading status
          const {nativeEvent} = syntheticEvent;
          setLoading(nativeEvent.loading);
        }}
      />
    </RootScroll>
  );
}
