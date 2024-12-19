import {ActivityIndicator} from 'components/atoms';
import OneHeader from 'components/header/OneHeader';
import React from 'react';
import {View, StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import {COLORS} from 'styles';
import styles from './Style';

export default ({route}) => {
  const url = route.params?.url;
  const [loading, setLoading] = React.useState(true);
  const {top} = useSafeAreaInsets();

  const hideSpinner = () => {
    setLoading(false);
  };

  return (
    <View style={[styles.rootContainer, {marginTop: top}]}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.GRAY_1} />
      <OneHeader title={'NEWS FEED'} titlecenter />
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
        source={{uri: url}}
        showsVerticalScrollIndicator={false}
        onLoad={hideSpinner}
      />
    </View>
  );
};
