import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ViewScale} from 'utils';
import {COLORS} from 'styles';

const LinearColors = [COLORS.PRIMARY, COLORS.BLUE_GRADIENT_LIGHT];
const LOCATION = [0, 0.8];
const ANGLE = 320;

export default ({type, style, children}) => {
  const {top} = useSafeAreaInsets();
  return (
    <>
      {type === 'Drawer' ? (
        <LinearGradient
          colors={LinearColors}
          locations={LOCATION}
          angle={ANGLE}
          useAngle={true}
          style={styles.LinearGradientDrawerContainer}>
          <View style={styles.containerLogoDrawer}>
            <Image
              resizeMode={'contain'}
              source={require('assets/images/logoOnlyWhite.png')}
            />
          </View>
          <View style={{marginTop: top}} />
          {children}
        </LinearGradient>
      ) : (
        <LinearGradient
          colors={LinearColors}
          locations={LOCATION}
          angle={ANGLE}
          useAngle={true}
          style={[styles.LinearGradientContainer, style]}>
          {/* <View style={{marginTop: top}} /> */}
          {children}
        </LinearGradient>
      )}
    </>
  );
};

const styles = StyleSheet.create({
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
  LinearGradientDrawerContainer: {},
  containerLogoDrawer: {
    position: 'absolute',
    opacity: 0.03,
    alignSelf: 'center',
    transform: [
      {
        scale: 0.5,
      },
      {
        translateY: ViewScale(-50),
      },
    ],
  },
});
