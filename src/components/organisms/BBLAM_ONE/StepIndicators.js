import {ViewScale} from 'utils';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {COLORS} from 'styles';

export default ({currentStep = 0, stepCount = 2}) => {
  const RenderIndicator = React.useCallback(() => {
    let indicators = [];
    for (let i = 0; i < stepCount; i++) {
      indicators.push(
        <View
          key={'IndicatorBBLAMId-' + i}
          style={[
            styles.circle,
            currentStep >= i && {backgroundColor: COLORS.SUCCESS},
          ]}
        />,
      );
    }
    return indicators;
  }, [currentStep]);

  return <View style={styles.container}>{RenderIndicator()}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: ViewScale(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  circle: {
    backgroundColor: COLORS.GRAY_3,
    borderRadius: 25,
    width: ViewScale(13),
    height: ViewScale(13),
  },
});
