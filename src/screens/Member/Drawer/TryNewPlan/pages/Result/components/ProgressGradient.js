// React
import React from 'react';
import {View, StyleSheet, Animated, Easing} from 'react-native';

// custom
import {Translate} from 'function';
import {ViewScale, FontScale} from 'utils';

// components
import {TextRegular, TextMedium} from 'components/atoms';
import {Entypo} from 'components/Icons';

// lib
import {COLORS, FONT_SIZE} from 'styles';

export const colors = ['#789ac4', '#2384a0', '#18385e', '#ff8c39'];

export default ({
  retireAge = 60,
  currentAge = 77,
  predictAge = 95,
  maxGraph = 100,
  isTryMoneyGreater = false,
}) => {
  let allInfo = [
    {
      key: 'retireAge',
      value: retireAge,
      zIndex: 4,
    },
    {
      key: 'currentAge',
      value: currentAge,
      zIndex: 3,
    },
    {
      key: 'predictAge',
      value: predictAge,
      zIndex: 2,
    },
  ];

  const CalculateZIndex = () => {
    let ZIndex = 4;
    allInfo
      .sort((a, b) => {
        return a.value - b.value;
      })
      .map(item => {
        item.zIndex = ZIndex--;
      });
  };
  const CalculateZIndex4 = () => {
    let predictAgeZIndex =
      allInfo[allInfo.findIndex(item => item.key == 'predictAge')].zIndex;

    if (predictAgeZIndex === 2) {
      if (isTryMoneyGreater) {
        return 1;
      } else {
        allInfo[2].zIndex = 1;
        return 2;
      }
    } else if (predictAgeZIndex === 3) {
      if (isTryMoneyGreater) {
        allInfo[2].zIndex = 1;
        return 2;
      } else {
        allInfo[1].zIndex = 2;
        allInfo[2].zIndex = 1;
        return 3;
      }
    } else {
      if (isTryMoneyGreater) {
        allInfo[1].zIndex = 2;
        allInfo[2].zIndex = 1;
        return 3;
      } else {
        allInfo[0].zIndex = 3;
        allInfo[1].zIndex = 2;
        allInfo[2].zIndex = 1;
        return 4;
      }
    }
  };

  CalculateZIndex();

  const CalculateLengthGraph = (value, index, key) => {
    if (index == 0) {
      return 25;
    }

    if (value >= maxGraph) {
      return maxGraph;
    } else {
      return value - 25;
    }
  };

  const CalculatePosition = progressKey => {
    return CalculateLengthGraph(
      allInfo[allInfo.findIndex(item => item.key == progressKey)].value,
      allInfo.findIndex(item => item.key == progressKey),
      progressKey,
    );
  };

  const CalculateCurrentAge = () => {
    if (currentAge > predictAge) {
      return 100;
    } else {
      return 50;
    }
  };

  const CalculatePosition4Fix = () => {
    if (predictAge > currentAge) {
      if (isTryMoneyGreater) {
        return 87.5;
      } else {
        return 62.5;
      }
    } else {
      if (isTryMoneyGreater) {
        return 87.5;
      } else {
        return 50;
      }
    }
  };

  const CalculatePosition4 = () => {
    let predictAgeZIndex =
      allInfo[allInfo.findIndex(item => item.key == 'predictAge')].zIndex;

    if (predictAgeZIndex == 4) {
      if (isTryMoneyGreater) {
        return (
          (CalculatePosition(allInfo[1].key) -
            CalculatePosition('predictAge')) /
            2 +
          CalculatePosition('predictAge')
        );
      } else {
        return 25 / 2;
      }
    } else if (predictAgeZIndex == 3) {
      if (isTryMoneyGreater) {
        return (
          (CalculatePosition(allInfo[2].key) -
            CalculatePosition('predictAge')) /
            2 +
          CalculatePosition('predictAge')
        );
      } else {
        return (CalculatePosition('predictAge') - 25) / 2 + 25;
      }
    } else {
      if (isTryMoneyGreater) {
        if (allInfo[2].value >= 85) {
          return maxGraph;
        } else {
          return (
            (maxGraph - CalculatePosition('predictAge')) / 2 +
            CalculatePosition('predictAge')
          );
        }
      } else {
        return (
          (CalculatePosition('predictAge') -
            CalculatePosition(allInfo[1].key)) /
            2 +
          CalculatePosition(allInfo[1].key)
        );
      }
    }
  };

  const CalculateLine = () => {
    if (predictAge > retireAge) {
      return maxGraph - CalculatePosition('predictAge');
    }
  };

  const ProgressView1 = Animated.createAnimatedComponent(View);
  const ProgressView2 = Animated.createAnimatedComponent(View);
  const ProgressView3 = Animated.createAnimatedComponent(View);
  const ProgressView4 = Animated.createAnimatedComponent(View);
  const UpTextView = Animated.createAnimatedComponent(View);

  const ProgressViewText1 = Animated.createAnimatedComponent(View);
  const ProgressViewText2 = Animated.createAnimatedComponent(View);
  const ProgressViewText3 = Animated.createAnimatedComponent(View);
  const ProgressViewText4 = Animated.createAnimatedComponent(View);

  const ProgressValue1 = React.useRef(new Animated.Value(0)).current;
  const ProgressValue2 = React.useRef(new Animated.Value(0)).current;
  const ProgressValue3 = React.useRef(new Animated.Value(0)).current;
  const ProgressValue4 = React.useRef(new Animated.Value(0)).current;
  const UpTextValue = React.useRef(new Animated.Value(0)).current;

  const ProgressValueText1 = React.useRef(new Animated.Value(0)).current;
  const ProgressValueText2 = React.useRef(new Animated.Value(0)).current;
  const ProgressValueText3 = React.useRef(new Animated.Value(0)).current;
  const ProgressValueText4 = React.useRef(new Animated.Value(0)).current;

  const ProgressAnimated1 = ProgressValue1.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', `25%`],
  });
  const ProgressAnimated2 = ProgressValue2.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', `${CalculateCurrentAge()}%`],
  });
  const ProgressAnimated3 = ProgressValue3.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', `75%`],
  });
  const ProgressAnimated4 = ProgressValue4.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', `${CalculatePosition4Fix()}%`],
  });

  const toValue = 100;
  const toValueText = 1;
  const duration = [1500, 1500, 1500, 1500];
  const durationText = 500;
  const delay = 500;

  Animated.parallel([
    Animated.sequence([
      Animated.timing(ProgressValue1, {
        toValue,
        duration: duration[0],
        delay: delay,
        useNativeDriver: true
      }),
      Animated.timing(ProgressValueText1, {
        toValue: toValueText,
        duration: duration[0] - durationText,
        delay: delay,
        useNativeDriver: true
      }),
    ]),
    Animated.sequence([
      Animated.timing(ProgressValue2, {
        toValue,
        duration: duration[1],
        delay: delay,
        useNativeDriver: true
      }),
      Animated.timing(ProgressValueText2, {
        toValue: toValueText,
        duration: duration[1] - durationText,
        delay: delay,
        useNativeDriver: true
      }),
    ]),
    Animated.sequence([
      Animated.timing(ProgressValue3, {
        toValue,
        duration: duration[2],
        delay: delay,
        useNativeDriver: true
      }),
      Animated.timing(ProgressValueText3, {
        toValue: toValueText,
        duration: duration[2] - durationText,
        delay: delay,
        useNativeDriver: true
      }),
    ]),
    Animated.sequence([
      Animated.timing(ProgressValue4, {
        toValue,
        duration: duration[3],
        delay: delay,
        useNativeDriver: true
      }),
      Animated.timing(ProgressValueText4, {
        toValue: toValueText,
        duration: duration[3] - durationText,
        delay: delay,
        useNativeDriver: true
      }),
    ]),
    Animated.timing(UpTextValue, {
      toValue: 1,
      duration: 1000,
      delay: delay + 1500,
      useNativeDriver: true
    }),
  ]).start();

  return (
    <View style={styles.progressGradient}>
      <View style={styles.textheaderContainer}>
        <TextMedium size={FONT_SIZE.BODY_2} style={{width: '25%'}}>
          {Translate('textTryNewPlanResultAgeNow')}
        </TextMedium>

        <UpTextView style={[styles.circleContainer, {opacity: UpTextValue}]}>
          <View style={styles.textUpCircleContainer}>
            <TextRegular size={FONT_SIZE.BODY_2}>
              {'ระยะเวลาใช้เงิน'}{' '}
              <TextMedium size={FONT_SIZE.BODY_2}>
                {predictAge - retireAge}
              </TextMedium>{' '}
              {Translate('textYear')}
            </TextRegular>
          </View>
          <View style={styles.circle} />
          <View style={styles.line} />
          <View style={styles.circle} />
        </UpTextView>
      </View>
      <View style={styles.progressContainer}>
        <ProgressView1
          style={[
            {
              backgroundColor: colors[0],
              width: ProgressAnimated1,
              zIndex:
                allInfo[allInfo.findIndex(item => item.key == 'retireAge')]
                  .zIndex,
            },
            styles.linearGradient,
          ]}>
          {/* <View style={[styles.circle, styles.circleAddons]} /> */}
          {/* <View
            style={[styles.line, styles.lineAddons, {width: CalculateLine()}]}
          /> */}

          <ProgressViewText1
            style={[styles.stickChevron, {opacity: ProgressValueText1}]}>
            <View style={styles.chevronContianer}>
              <Entypo
                name="triangle-up"
                size={FontScale(22)}
                color={colors[0]}
              />
              <TextRegular style={styles.chevrontext}>
                <TextMedium size={FONT_SIZE.BODY_3}>{retireAge}</TextMedium>{' '}
                {Translate('textYear')}
                {'\n'}
                <TextRegular size={FONT_SIZE.BODY_3}>เกษียนอายุ</TextRegular>
              </TextRegular>
            </View>
          </ProgressViewText1>
        </ProgressView1>
        <ProgressView2
          style={[
            {
              backgroundColor: colors[1],
              width: ProgressAnimated2,
              zIndex:
                allInfo[allInfo.findIndex(item => item.key == 'currentAge')]
                  .zIndex,
            },
            styles.linearGradient,
          ]}>
          <ProgressViewText2
            style={[styles.stickChevron, {opacity: ProgressValueText1}]}>
            <View style={styles.chevronContianer}>
              <Entypo
                name="triangle-up"
                size={FontScale(22)}
                color={colors[1]}
              />
              <TextRegular style={styles.chevrontext}>
                <TextMedium size={FONT_SIZE.BODY_3}>{currentAge}</TextMedium>{' '}
                {Translate('textYear')}
              </TextRegular>
            </View>
          </ProgressViewText2>
        </ProgressView2>
        <ProgressView3
          style={[
            {
              backgroundColor: colors[2],
              width: ProgressAnimated3,
              zIndex:
                allInfo[allInfo.findIndex(item => item.key == 'predictAge')]
                  .zIndex,
            },
            styles.linearGradient,
          ]}>
          {/* <View style={[styles.circle, styles.circleAddons]} /> */}

          <ProgressViewText3
            style={[styles.stickChevron, {opacity: ProgressValueText1}]}>
            <View style={styles.chevronContianer}>
              <Entypo
                name="triangle-up"
                size={FontScale(22)}
                color={colors[2]}
              />
              <TextRegular style={styles.chevrontext}>
                <TextMedium size={FONT_SIZE.BODY_3}>{predictAge}</TextMedium>{' '}
                {Translate('textYear')}
                {'\n'}
                <TextRegular size={FONT_SIZE.BODY_3}>คาดการณ์อายุ</TextRegular>
              </TextRegular>
            </View>
          </ProgressViewText3>
        </ProgressView3>
        <ProgressView4
          style={[
            {
              backgroundColor: colors[3],
              zIndex: CalculateZIndex4(),
              width: ProgressAnimated4,
            },
            styles.linearGradient,
          ]}>
          <ProgressViewText4
            style={[styles.stickChevron, {opacity: ProgressValueText1}]}>
            <View style={styles.chevronContianer}>
              <Entypo
                name="triangle-up"
                size={FontScale(22)}
                color={colors[3]}
              />
            </View>
          </ProgressViewText4>
        </ProgressView4>
        <View style={[styles.linearGray]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textUpCircleContainer: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    transform: [
      {
        translateY: ViewScale(-15),
      },
    ],
  },
  circleContainer: {
    width: '50%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  line: {
    borderTopWidth: 0.5,
    flex: 1,
  },
  lineAddons: {
    position: 'absolute',
    // right: ViewScale(-10) / 2,
    // top: ViewScale(-25),
  },
  circle: {
    backgroundColor: COLORS.BLACK_1,
    width: ViewScale(10),
    height: ViewScale(10),
    borderRadius: 25,
    zIndex: 99,
  },
  circleAddons: {
    position: 'absolute',
    right: ViewScale(-10) / 2,
    top: ViewScale(-25),
  },
  maxAge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    color: COLORS.PRIMARY,
    fontSize: FontScale(18),
    transform: [
      {
        translateY: ViewScale(45),
      },
    ],
  },
  stickChevron: {
    position: 'relative',
    width: '100%',
    right: 0,
    height: ViewScale(20),
  },
  chevrontext: {
    textAlign: 'center',
    transform: [{translateY: ViewScale(-5)}],
  },
  chevronContianer: {
    position: 'absolute',
    right: 0,
    top: 0,
    alignItems: 'center',
    width: ViewScale(90),
    transform: [
      {
        translateY: ViewScale(20),
      },
      {
        translateX: ViewScale(45),
      },
    ],
  },
  progressContainer: {marginTop: ViewScale(10), marginBottom: ViewScale(30)},
  progressGradient: {
    marginVertical: ViewScale(20),
    paddingTop: ViewScale(20),
    height: ViewScale(155),
  },
  textheaderContainer: {
    flexDirection: 'row',
  },
  progress: {
    height: ViewScale(20),
    width: '100%',
    backgroundColor: 'red',
  },
  linearGradient: {
    height: ViewScale(20),
    position: 'absolute',
  },
  linearGray: {
    width: '100%',
    zIndex: 0,
    position: 'absolute',
    right: 0,
    backgroundColor: '#f1f2f6',
    height: ViewScale(20),
  },
});
