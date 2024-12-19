import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';

// custom
import {ViewScale} from 'utils';
import {COLORS, SPACING} from 'styles';

// components
import {TextMedium} from 'components/atoms';

export default ({navigation, route}) => {
  const children = route.params?.children;
  const onPress = route.params?.onPress;
  const textBtn = route.params?.textBtn;

  return (
    <TouchableWithoutFeedback
      style={{flex: 1}}
      onPress={() => navigation.goBack()}>
      <View style={[styles.rootContainer]}>
        <StatusBar backgroundColor={'rgba(26, 54, 134, 0.6)'} />
        <View style={styles.container}>{children}</View>

        {/* button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.goBack();
            onPress?.();
          }}>
          <TextMedium style={styles.buttonText}>{textBtn}</TextMedium>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    paddingVertical: ViewScale(20),
    paddingLeft: ViewScale(20),
    paddingRight: ViewScale(20),
    width: '80%',
  },
  textTitle: {
    marginTop: ViewScale(30),
  },
  textDecs: {
    color: COLORS.FOURTHDARY,
    textAlign: 'center',
    marginTop: ViewScale(10),
    marginBottom: ViewScale(40),
  },
  button: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.PRIMARY,
    height: SPACING.INPUT_HEIGHT,
  },
  buttonText: {
    color: COLORS.WHITE,
  },
});
