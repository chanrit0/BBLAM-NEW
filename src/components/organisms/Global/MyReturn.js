// React
import React from 'react';
import { View, StyleSheet } from 'react-native';

// custom
import { Translate } from 'function';
import { ViewScale } from 'utils';
import { COLORS, FONT_TYPE } from 'styles';

// components
import { Container } from 'components/common';
import { TextPoints, Tooltip, TextRegular, TextMedium } from 'components/atoms';
import { FontAwesome } from 'components/Icons';
import { MyReturnTotalAmount } from 'components/molecules';

// lib
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default ({
  myreturn = 0,
  total,
  saving,
  contribution,
  benefitSaving,
  benefitContribution,
  unit = Translate('textBaht'),
}) => {
  typeof myreturn == 'string' && (myreturn = myreturn.replace(/,/g, ''));

  return (
    <>
      <View style={styles.headerContainer}>
        <Container>
          {/* header */}
          <View style={styles.headertextContainer}>
            <View style={styles.headertextContainerLeft}>
              <Tooltip
                tooltip={
                  <View style={{ width: wp(80) }}>
                    <TextRegular style={{ color: '#FFF' }}>
                      {Translate('textMyReturnToolTip')}
                    </TextRegular>
                  </View>
                }
              />
              <TextMedium style={styles.headertextRight}>
                {'My Return'}
              </TextMedium>
            </View>
            <View style={styles.headertextContainerRight}>
              {parseFloat(myreturn) > 0 ? (
                <FontAwesome
                  name="plus-circle"
                  color={COLORS.SUCCESS}
                  size={ViewScale(20)}
                />
              ) : (
                <FontAwesome
                  name="minus-circle"
                  color={COLORS.ERROR}
                  size={ViewScale(20)}
                />
              )}
              {myreturn != '' && (
                <TextPoints
                  number={Math.abs(parseFloat(myreturn))}
                  pointSizeSame
                  suffix={'%'}
                  containerStyle={{
                    marginLeft: ViewScale(10),
                  }}
                  style={{
                    fontFamily: FONT_TYPE.MEDIUM,
                  }}
                />
              )}
            </View>
          </View>
          {/* header */}
        </Container>
      </View>
      <MyReturnTotalAmount
        total={total}
        saving={saving}
        contribution={contribution}
        benefitSaving={benefitSaving}
        benefitContribution={benefitContribution}
        unit={unit}
      />
    </>
  );
};

const styles = StyleSheet.create({
  headertextContainerLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headertextContainerRight: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: ViewScale(20),
  },
  headertextRight: {
    marginLeft: ViewScale(10),
  },
  headertextContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    backgroundColor: COLORS.GRAY,
    paddingVertical: ViewScale(15),
    borderColor: COLORS.SECONDARY,
    flex: 1,
  },
  ChartContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'gray'
  },
});
