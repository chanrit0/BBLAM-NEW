/* eslint-disable react-native/no-inline-styles */
// React
import React from 'react';
import {
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';

// custom
import {Translate} from 'function';
import {ViewScale, FontScale, isTablet} from 'utils';
// components
import {Container} from 'components/common';
import {
  TextPoints,
  LineHorizontal,
  TextMedium,
  TextRegular,
} from 'components/atoms';
import {Ionicons, Entypo} from 'components/Icons';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {ListItem} from 'react-native-elements';
import {COLORS, FONT_SIZE, FONT_TYPE, SPACING} from 'styles';
// lib

export const ListItemAccordion = ({
  name = '',
  plan1 = '',
  plan2 = '',
  total = '',
  date = '',
  plan1Content = [],
  plan2Content = [],
}) => {
  // animation chenvron
  const ChevronView = Animated.createAnimatedComponent(View);
  const ChevronValue = React.useRef(new Animated.Value(0)).current;
  const ChevronAnimated = ChevronValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-180deg'],
  });
  Animated.timing(ChevronValue, {
    toValue: expanded ? 1 : 0,
    duration: 300,
    useNativeDriver: true,
  }).start();
  const [expanded, setExpanded] = React.useState(false);

  return (
    <View style={styles.rootContainer}>
      <ListItem.Accordion
        content={
          <View style={{flexDirection: 'row'}}>
            <Container style={{marginRight: 0}}>
              <View style={styles.container}>
                <View style={styles.contentContainer}>
                  <TextMedium size={FONT_SIZE.BODY_3} numberOfLines={1}>
                    {name}
                  </TextMedium>
                  <View style={styles.grayBox}>
                    <TextRegular
                      size={FONT_SIZE.BODY_4}
                      numberOfLines={2}
                      style={
                        isTablet ? styles.textGrayBoxiPad : styles.textGrayBox
                      }>
                      {isTablet ? plan1 : plan1.replace('ทางเลือก', '$&\n')}
                    </TextRegular>
                    <Ionicons
                      name="ios-arrow-forward"
                      style={{
                        marginHorizontal: ViewScale(2),
                        fontSize: FontScale(20),
                        color: COLORS.PRIMARY,
                      }}
                    />
                    <TextRegular
                      size={FONT_SIZE.BODY_4}
                      numberOfLines={2}
                      color={COLORS.PRIMARY}
                      style={
                        isTablet ? styles.textGrayBoxiPad : styles.textGrayBox
                      }>
                      {isTablet ? plan2 : plan2.replace('ทางเลือก', '$&\n')}
                    </TextRegular>
                  </View>
                </View>
                <View style={styles.ListItemRightContainer}>
                  <TextRegular size={FONT_SIZE.BODY_3}>
                    {Translate('textMoneyTotalAll')}
                  </TextRegular>
                  <TextPoints
                    pointSizeSame
                    number={parseFloat(total)}
                    suffix={` ${Translate('textBaht')}`}
                    style={{
                      color: COLORS.PRIMARY,
                      fontFamily: FONT_TYPE.MEDIUM,
                    }}
                    size={FONT_SIZE.BODY_3}
                  />
                  <TextRegular size={FONT_SIZE.BODY_4}>{`${Translate(
                    'textAtDate',
                  )} ${date}`}</TextRegular>
                </View>
              </View>
            </Container>
            <View
              style={{
                width: SPACING.CONTAINER_MARGIN_HORIZONTAL,
                alignItems: 'center',
              }}>
              <ChevronView
                style={{
                  transform: [{rotate: ChevronAnimated}],
                }}>
                <Ionicons name={'chevron-down-sharp'} size={ViewScale(20)} />
              </ChevronView>
            </View>
          </View>
        }
        noIcon
        rightIconContainerStyle={{marginTop: 200}}
        containerStyle={styles.ListDefaultContainer}
        isExpanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
        }}>
        {expanded && (
          <Container style={{flex: 0, marginBottom: ViewScale(15)}}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View>
                <View style={styles.changebox}>
                  {plan1Content.length !== 0 &&
                    plan1Content.map((item, index) => (
                      <View key={'changeboxIdList-' + index}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginVertical: ViewScale(5),
                          }}>
                          <TextRegular size={FONT_SIZE.BODY_4}>
                            {item.sub_code}
                          </TextRegular>
                          <TextPoints
                            number={item.percent}
                            size={FontScale(12)}
                            pointSizeSame
                            suffix={'%'}
                            style={{fontFamily: FONT_TYPE.MEDIUM}}
                          />
                        </View>
                        <LineHorizontal />
                      </View>
                    ))}
                </View>
              </View>

              <View
                style={{
                  transform: [
                    {
                      translateY: ViewScale(20),
                    },
                  ],
                }}>
                <Entypo name="shuffle" size={24} color={COLORS.BORDER} />
              </View>
              <View>
                <View style={styles.changebox}>
                  {plan2Content.length !== 0 &&
                    plan2Content.map((item, index) => (
                      <View key={'idPlanInvestList-' + index}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginVertical: ViewScale(5),
                          }}>
                          <TextRegular
                            size={FONT_SIZE.BODY_4}
                            color={COLORS.PRIMARY}>
                            {item.sub_code}
                          </TextRegular>
                          <TextPoints
                            number={item.percent}
                            size={FontScale(12)}
                            pointSizeSame
                            suffix={'%'}
                            style={{
                              fontFamily: FONT_TYPE.MEDIUM,
                              color: COLORS.PRIMARY,
                            }}
                          />
                        </View>
                        <LineHorizontal />
                      </View>
                    ))}
                </View>
              </View>
            </View>
          </Container>
        )}
      </ListItem.Accordion>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    borderBottomWidth: 1,
    borderColor: COLORS.BORDER,
  },
  ListDefaultContainer: {
    // borderWidth: 1,
    // paddingLeft: 0,
    paddingHorizontal: 0,
    paddingVertical: ViewScale(15),
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ListItemRightContainer: {
    alignItems: 'flex-end',
  },
  contentContainer: {
    flex: 1,
  },
  textGrayBox: {
    marginHorizontal: ViewScale(5),
  },
  textGrayBoxiPad: {
    marginHorizontal: ViewScale(10),
  },
  grayBox: {
    padding: ViewScale(5),
    marginTop: ViewScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eef2f6',
    alignSelf: 'flex-start',
  },
  changebox: {
    width: wp(35),
    marginTop: ViewScale(10),
    backgroundColor: '#eef2f6',
    padding: ViewScale(15),
  },
});
