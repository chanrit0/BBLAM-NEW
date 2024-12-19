/* eslint-disable no-undef */

import React from 'react';
import {StyleSheet} from 'react-native';
import {ViewScale} from 'utils';
import {color} from 'react-native-elements/dist/helpers';
import {COLORS, FONT_SIZE} from 'styles';

export default styles = StyleSheet.create({
  conditionOneContainer: {
    flexDirection: 'column',
    marginTop: ViewScale(20),
  },
  conditionTwoContainer: {
    flexDirection: 'column',
  },
  taxBenefitsCheckContainer: {
    marginTop: ViewScale(10),
    alignItems: 'center',
    flexDirection: 'row',
  },
  checkIconTaxBenefits: {
    marginLeft: ViewScale(15),
    marginRight: ViewScale(8),
  },
  orLineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: ViewScale(10),
  },
  orLine: {
    borderTopWidth: 0.5,
    borderColor: COLORS.BORDER,
    width: '40%',
  },
  orText: {
    marginHorizontal: ViewScale(20),
  },
  CaseContainer: {
    marginTop: ViewScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  exceptTaxContainer: {
    borderColor: COLORS.PRIMARY,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: ViewScale(5),
  },
  iconDown: {
    marginVertical: ViewScale(20),
    alignSelf: 'center',
  },
  borderUnderConditionTwo: {
    marginTop: ViewScale(30),
    borderColor: COLORS.BORDER,
    borderWidth: 0.5,
  },
  taxBenefitResign: {
    marginTop: ViewScale(10),
  },
  blueBoxContainer: {
    marginTop: ViewScale(10),
    backgroundColor: COLORS.PRIMARY,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  verticalLine: {
    borderWidth: 0.5,
    opacity: 0.5,
    borderColor: '#FFF',
  },
  blueBoxheaderText: {
    alignSelf: 'center',
    marginTop: ViewScale(8),
    color: '#FFF',
    fontSize: FONT_SIZE.TITLE_1,
  },
  blueBoxContianerIn: {
    flexDirection: 'column',
    flex: 1,
  },
  blueBoxRowContainer: {
    marginVertical: ViewScale(10),
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  blueBoxIconContainer: {
    alignSelf: 'flex-start',
  },
  blueBoxCheckIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    transform: [
      {
        translateY: 2,
      },
      {
        translateX: 6,
      },
      {
        scale: 1.2
      }
    ],
  },
  yearExperienceContainer: {
    marginTop: ViewScale(20),
  },
  boxYearExperienceContainer: {
    paddingVertical: ViewScale(10),
    paddingHorizontal: ViewScale(20),
    borderWidth: 1,
    borderColor: 'rgba(26,54,134,0.3)',
    marginTop: ViewScale(10),
  },
  boxYearExperienceRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: ViewScale(5),
  },
  textunderline: {textDecorationLine: 'underline'},
  boxGrayInYearExperienceContainer: {
    backgroundColor: COLORS.GRAY_4,
    paddingVertical: ViewScale(10),
    paddingHorizontal: ViewScale(20),
  },
  shiftdash: {
    marginLeft: ViewScale(10),
  },
  shiftdash_textAND: {
    textDecorationLine: 'underline',
    marginLeft: ViewScale(10),
  },
  remark: {
    alignSelf: 'center',
    marginVertical: ViewScale(20),
    fontSize: FONT_SIZE.BODY_2,
  },
});
