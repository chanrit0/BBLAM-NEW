import {TextMedium} from 'components/atoms';
import {isIOS, ViewScale} from 'utils';
import React from 'react';
import {Text, View, StyleSheet, Animated} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FONT_SIZE} from 'styles';

export default ({visible, children, style, textStyle}) => {
  const posY = React.useRef(new Animated.Value(0)).current;
  const opacity = React.useRef(new Animated.Value(0)).current;
  const scale = React.useRef(new Animated.Value(1)).current;
  const [display, setDisplay] = React.useState('none');
  const {top} = useSafeAreaInsets();

  React.useEffect(() => {
    if (visible) {
      setDisplay('flex');
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.9,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setDisplay('none');
      });
    }
  }, [visible]);

  return (
    <Animated.View
      pointerEvents={isIOS ? 'auto' : 'none'}
      style={[
        styles.container,
        {
          marginTop: top + ViewScale(20),
          display: display,
        },
        {
          opacity: opacity,
          transform: [
            {
              scale: scale,
            },
          ],
        },
      ]}>
      <View style={{flexDirection: 'row'}}>
        <TextMedium size={FONT_SIZE.BODY_2} style={[styles.text, textStyle]}>
          {children}
        </TextMedium>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 0,
    position: 'absolute',
    alignSelf: 'center',
    width: '90%',
    minHeight: ViewScale(60),
    paddingVertical: ViewScale(10),
    backgroundColor: 'black',
    borderRadius: 5,
    paddingHorizontal: ViewScale(20),
    justifyContent: 'center',
    zIndex: 10,
  },
  text: {
    flex: 1,
    flexWrap: 'wrap',
    color: '#FFF',
  },
});
