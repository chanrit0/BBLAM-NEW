/* eslint-disable react-native/no-inline-styles */

// React
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// custom
import { COLORS, FONT_SIZE, FONT_TYPE, SPACING } from 'styles';
import { Translate } from 'function';
import { ViewScale } from 'utils';

// components
import { FontAwesome } from 'components/Icons';
import { TextPoints, TextMedium } from 'components/atoms';

// lib

export default ({
  saving = 0,
  contribution = 0,
  benefitSaving = 0,
  benefitContribution = 0,
  unit = Translate('textBaht'),
}) => {
  typeof saving === 'string' && (saving = saving.replace(/,/g, ''));
  typeof contribution === 'string' && (contribution = contribution.replace(/,/g, ''));
  typeof benefitSaving === 'string' && (benefitSaving = benefitSaving.replace(/,/g, ''));
  typeof benefitContribution === 'string' && (benefitContribution = benefitContribution.replace(/,/g, ''));


  return (
    <View style={styles.container}>
      <View style={styles.column2}>
        <View style={styles.columnUp}>
          <View style={styles.row}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextPoints
                number={saving}
                suffix={` ${unit}`}
                style={{ color: COLORS.PRIMARY, fontFamily: FONT_TYPE.MEDIUM }}
              />
            </View>
            <Text style={styles.textgrid1}>{Translate('textSaving')}</Text>
          </View>
        </View>
        <View style={styles.columnDown}>
          <View style={styles.row}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome
                name={
                  parseFloat(benefitSaving) < 0 ? 'minus-circle' : 'plus-circle'
                }
                color={
                  parseFloat(benefitSaving) < 0 ? COLORS.ERROR : COLORS.SUCCESS
                }
                style={{ marginRight: ViewScale(5) }}
                size={ViewScale(20)}
              />
              <TextPoints
                // number={Math.abs(parseFloat(benefitSaving))}
                number={benefitSaving}
                suffix={` ${unit}`}
                style={{ color: '#5b6990', fontFamily: FONT_TYPE.MEDIUM }}
              />
            </View>

            <View style={styles.texticoncontainer}>
              <Text style={styles.texticon}>
                {Translate('textBenefitSaving')}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: COLORS.SECONDARY,
          height: ViewScale(120),
          alignSelf: 'center',
          opacity: 0.4,
        }}
      />
      <View style={styles.column2}>
        <View style={styles.columnUp}>
          <View style={styles.row}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextPoints
                number={contribution}
                suffix={` ${unit}`}
                style={{ color: COLORS.PRIMARY, fontFamily: FONT_TYPE.MEDIUM }}
              />
            </View>
            <Text style={styles.textgrid1}>
              {Translate('textContribution')}
            </Text>
          </View>
        </View>
        <View style={styles.columnDown}>
          <View style={styles.row}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome
                name={
                  parseFloat(benefitContribution) < 0
                    ? 'minus-circle'
                    : 'plus-circle'
                }
                color={
                  parseFloat(benefitContribution) < 0
                    ? COLORS.ERROR
                    : COLORS.SUCCESS
                }
                style={{ marginRight: ViewScale(5) }}
                size={ViewScale(20)}
              />
              <TextPoints
                // number={Math.abs(parseFloat(benefitContribution))}
                number={benefitContribution}
                suffix={` ${unit}`}
                style={{ color: '#5b6990', fontFamily: FONT_TYPE.MEDIUM }}
              />
            </View>
            <View style={styles.texticoncontainer}>
              <Text style={styles.texticon}>
                {Translate('textBenefitContribution')}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textgrid1: {
    fontFamily: FONT_TYPE.REGULAR,
    fontSize: FONT_SIZE.BODY_2,
  },
  texticon: {
    marginLeft: ViewScale(10),
    fontSize: FONT_SIZE.BODY_3,
    fontFamily: FONT_TYPE.REGULAR,
  },
  texticoncontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    display: 'flex',
    alignItems: 'flex-end',
    paddingRight: ViewScale(10),
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  column2: {
    display: 'flex',
    flex: 1,
  },
  columnDown: {
    marginVertical: ViewScale(30),
  },
  columnUp: {
    marginTop: ViewScale(20),
  },
});
