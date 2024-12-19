/* eslint-disable react-native/no-inline-styles */
// React
import React from 'react';
import {View, StyleSheet} from 'react-native';

// custom
import {Translate} from 'function';
import {ViewScale, FontScale} from 'utils';
import styles from './Style';

// components
import {RootScroll, Container} from 'components/common';
import {TextRegular, TextMedium} from 'components/atoms';
import {ProgressGradient} from 'components/Member/TryNewPlan/ProgressGradient';
import {COLORS, FONT_SIZE} from 'styles';

export default function Result() {
  return (
    <RootScroll
      isBackIcon
      title={Translate('textTryNewPlan')}
      flexContainer
      fixTab={false}>
      <Container>
        <TextRegular
          color={COLORS.PRIMARY}
          size={FONT_SIZE.BODY_2}
          style={{textAlign: 'center', marginTop: ViewScale(20)}}>
          {Translate('textTryNewPlanResult1')}
        </TextRegular>

        {/* progress gradient */}
        <ProgressGradient ageNow={45} maxAge={60} />

        {/* grayBox */}
        <View style={styles.grayBoxContainer}>
          <View style={{alignItems: 'flex-start'}}>
            <TextRegular size={FONT_SIZE.BODY_4}>
              {Translate('textTryNewPlanResult2')}
            </TextRegular>
            <TextRegular size={FONT_SIZE.BODY_4} style={styles.column2}>
              {Translate(
                'textCurrentProvidentFundInformation_EarnedFundReturn',
              )}
            </TextRegular>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <TextMedium size={FONT_SIZE.BODY_3} color={COLORS.PRIMARY}>
              {'15,000'}
              <TextRegular size={FONT_SIZE.BODY_3} color={COLORS.PRIMARY}>
                {' '}
                {Translate('textBaht')}
              </TextRegular>
            </TextMedium>
            <TextMedium
              size={FONT_SIZE.BODY_3}
              color={COLORS.PRIMARY}
              style={styles.column2}>
              {'7%'}
              <TextRegular size={FONT_SIZE.BODY_3} color={COLORS.PRIMARY}>
                {' / '}
                {Translate('textYear')}
              </TextRegular>
            </TextMedium>
          </View>
        </View>

        {/* Section1 */}
        <View style={styles.sectionContainer}>
          <TextRegular size={FONT_SIZE.BODY_2}>
            {Translate('textTryNewPlanResult3')}
          </TextRegular>
          <TextMedium size={FONT_SIZE.BODY_2}>
            {Translate('textTryNewPlanResult4')}
          </TextMedium>
          <TextRegular size={FONT_SIZE.BODY_2} color={COLORS.PRIMARY}>
            {Translate('textIs')}{' '}
            <TextMedium size={FONT_SIZE.BODY_2} color={COLORS.PRIMARY}>
              {'11,000,000'}
            </TextMedium>{' '}
            {Translate('textBaht')}
          </TextRegular>
        </View>

        {/* Section2 */}
        <View style={styles.sectionContainer}>
          <TextRegular size={FONT_SIZE.BODY_2}>
            {Translate('textTrialBalance')}
            <TextMedium size={FONT_SIZE.BODY_2}>
              {' '}
              {'ปรับแผนการลงทุนใหม่น้อยกว่า'}
            </TextMedium>
          </TextRegular>
          <TextRegular size={FONT_SIZE.BODY_2}>
            {Translate('textTryNewPlanResult5')}
          </TextRegular>
          <TextRegular color={COLORS.PRIMARY}>
            {Translate('textStillWantMoney')}{' '}
            <TextMedium size={FONT_SIZE.BODY_2} color={COLORS.PRIMARY}>
              {'1,800,000'}
            </TextMedium>{' '}
            {Translate('textBaht')}
          </TextRegular>
        </View>

        {/* Section3 */}
        <View style={styles.sectionContainer}>
          <TextRegular size={FONT_SIZE.BODY_2}>
            {Translate('textTryNewPlanResult6')}
            <TextMedium size={FONT_SIZE.BODY_2}>
              {Translate('textTryNewPlanResult7')}
            </TextMedium>
          </TextRegular>
          <TextRegular size={FONT_SIZE.BODY_2}>
            {Translate('textTryNewPlanResult5')}
          </TextRegular>
          <TextRegular size={FONT_SIZE.BODY_2} color={COLORS.PRIMARY}>
            {Translate('textStillWantMoney')}{' '}
            <TextMedium size={FONT_SIZE.BODY_2} color={COLORS.PRIMARY}>
              {'2,000,000'}
            </TextMedium>{' '}
            {Translate('textBaht')}
          </TextRegular>
        </View>
      </Container>
    </RootScroll>
  );
}
