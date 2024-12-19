import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {ViewScale, FontScale} from 'utils';
import {LinearGradient, TextMedium} from 'components/atoms';
import {useNavigation} from '@react-navigation/native';
import _ from 'lodash';
import {Ionicons} from 'components/Icons';
import {COLORS, FONT_SIZE, SPACING} from 'styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default ({constants, children, isBackIcon, title}) => {
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();

  const BackIcon = React.useCallback(
    () => (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          alignSelf: 'flex-start',
          height: SPACING.HEADER_HEIGHT,
          paddingHorizontal: SPACING.CONTAINER_MARGIN_HORIZONTAL,
          justifyContent: 'center',
        }}>
        <Ionicons name="arrow-back" size={FontScale(35)} color="#FFF" />
      </TouchableOpacity>
    ),
    [],
  );

  const Title = React.useCallback(
    () => <TextMedium style={styles.textHeader}>{title}</TextMedium>,
    [],
  );

  return (
    <LinearGradient style={styles.container}>
      <View style={{marginTop: top}} />
      <View style={styles.containerLogo}>
        <Image
          resizeMode={'contain'}
          style={styles.backgroundLogo}
          source={require('assets/images/logoOnlyWhite.png')}
        />
      </View>
      <View style={styles.rowTitle}>
        {BackIcon()}
        {Title()}
      </View>
      {children}
      <View style={{height: ViewScale(20)}} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 9999,
    position: 'absolute',
    height: ViewScale(210),
  },
  rowTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textHeader: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZE.TITLE_2,
  },
  containerLogo: {
    position: 'absolute',
    right: 0,
    top: 0,
    opacity: 0.03,
    transform: [
      {
        translateX: ViewScale(150),
      },
    ],
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: COLORS.WHITE,
    backgroundColor: 'transparent',
  },
});
