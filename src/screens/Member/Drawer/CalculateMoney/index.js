/* eslint-disable react-hooks/rules-of-hooks */

// React
import React from 'react';
import {Text, View, Image} from 'react-native';

// custom
import {Translate} from 'function';
import {isTablet, ViewScale} from 'utils';
import {TextRegular, TextMedium, TextLight, TextBold} from 'components/atoms';
import {CheckGradient} from 'components/Icons/Customs';
import {Container, RootScroll} from 'components/common';
import styles from './Style';
import {FontAwesome, MaterialIcons} from 'components/Icons';

// lib
import {COLORS, FONT_SIZE} from 'styles';

export default function CalculateMoney() {
  return (
    <RootScroll
      isBackIcon
      fixTab={false}
      fixPullHeight={false}
      title={Translate('textCalculateMoney').replace(
        /กองทุนสำรองเลี้ยงชีพ/,
        g1 => {
          if (!isTablet) {
            return '\n' + g1;
          } else {
            return g1;
          }
        },
      )}>
      <View style={{backgroundColor: 'white'}}>
        <Container>
          {/* สิทธิ์ประโยชน์ทางภาษี */}
          <View style={styles.conditionOneContainer}>
            <TextMedium color={COLORS.BLACK_1}>
              {Translate('textTaxBenefits')}
            </TextMedium>
            <View
              style={[
                styles.taxBenefitsCheckContainer,
                {marginTop: ViewScale(10)},
              ]}>
              <CheckGradient style={styles.checkIconTaxBenefits} />
              <TextRegular color={COLORS.PRIMARY}>
                {Translate('textCalculateConMoney1')}
              </TextRegular>
            </View>
            <View style={styles.taxBenefitsCheckContainer}>
              <CheckGradient style={styles.checkIconTaxBenefits} />
              <TextRegular color={COLORS.PRIMARY}>
                {Translate('textCalculateConMoney2')}
              </TextRegular>
            </View>
          </View>
          {/* หรือ */}
          <View style={styles.orLineContainer}>
            <View style={styles.orLine} />
            <TextRegular style={styles.orText}>
              {Translate('textOr')}
            </TextRegular>
            <View style={styles.orLine} />
          </View>

          {/* ยกเว้นภาษี ทั้งจำนวน */}
          <View style={styles.conditionTwoContainer}>
            <View style={styles.CaseContainer}>
              <TextMedium color={COLORS.BLACK_1}>
                {Translate('textCalculateConMoney3')}
              </TextMedium>
              <TextMedium color={COLORS.BLACK_1}>
                {Translate('textCalculateConMoney4')}
              </TextMedium>
            </View>
            <FontAwesome
              name="arrow-down"
              size={FONT_SIZE.TITLE_2}
              style={styles.iconDown}
            />
            <View style={styles.exceptTaxContainer}>
              <TextMedium color={COLORS.PRIMARY}>
                {Translate('textCalculateConMoney5')}
              </TextMedium>
            </View>
          </View>
        </Container>
        <View style={styles.borderUnderConditionTwo} />

        {/* สิทธิประโยชน์ทางภาษี (เมื่อออกจากงาน) */}
        <Container>
          <View style={styles.taxBenefitResign}>
            <TextMedium
              color={COLORS.BLACK_1}
              size={FONT_SIZE.TITLE_2}
              style={{marginVertical: ViewScale(10), textAlign: 'center'}}>
              {'ตัวอย่าง'}
            </TextMedium>
            <TextMedium color={COLORS.BLACK_1}>
              {Translate('textCalculateConMoney6')}
            </TextMedium>

            {/* กล่องสีฟ้า */}
            <View style={styles.blueBoxContainer}>
              <View style={styles.blueBoxContianerIn}>
                <TextMedium style={styles.blueBoxheaderText}>
                  {Translate('textEmployee')}
                </TextMedium>
                <View style={styles.blueBoxRowContainer}>
                  <View>
                    <TextLight color={COLORS.WHITE}>
                      {Translate('textSaving')}
                    </TextLight>
                    <TextBold color={COLORS.WHITE}>{'500,000'}</TextBold>
                  </View>
                  <View style={styles.verticalLine} />
                  <View>
                    <TextLight color={COLORS.WHITE}>
                      {Translate('textBenefit')}
                    </TextLight>
                    <View style={styles.blueBoxIconContainer}>
                      <TextBold color={COLORS.WHITE}>{'50,000'}</TextBold>
                      <Image
                        source={require('assets/icons/check.png')}
                        style={[
                          styles.blueBoxCheckIcon,
                          {
                            width: ViewScale(15),
                            height: ViewScale(15),
                          },
                        ]}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.verticalLine} />
              <View style={styles.blueBoxContianerIn}>
                <TextMedium style={styles.blueBoxheaderText}>
                  {Translate('textEmployer1')}
                </TextMedium>
                <View style={styles.blueBoxRowContainer}>
                  <View>
                    <TextLight color={COLORS.WHITE}>
                      {Translate('textContribution')}
                    </TextLight>
                    <View style={styles.blueBoxIconContainer}>
                      <TextBold color={COLORS.WHITE}>{'500,000'}</TextBold>
                      <Image
                        source={require('assets/icons/check.png')}
                        style={[
                          styles.blueBoxCheckIcon,
                          {
                            width: ViewScale(15),
                            height: ViewScale(15),
                          },
                        ]}
                      />
                    </View>
                  </View>
                  <View style={styles.verticalLine} />
                  <View>
                    <TextLight color={COLORS.WHITE}>
                      {Translate('textBenefit')}
                    </TextLight>
                    <View style={styles.blueBoxIconContainer}>
                      <TextBold color={COLORS.WHITE}>{'50,000'}</TextBold>
                      <Image
                        source={require('assets/icons/check.png')}
                        style={[
                          styles.blueBoxCheckIcon,
                          {
                            width: ViewScale(15),
                            height: ViewScale(15),
                          },
                        ]}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* อายุงาน น้อยกว่า 5 ปี หรือ ลาออกจากกองทุนโดยไม่ออกจากงาน */}
            <View style={styles.yearExperienceContainer}>
              <TextMedium color={COLORS.PRIMARY}>
                {'\u2022'} {Translate('textCalculateConMoney7')}
              </TextMedium>
              <View style={styles.boxYearExperienceContainer}>
                <View style={styles.boxYearExperienceRowContainer}>
                  <TextRegular>
                    {Translate('textMoneyRecieveFromFund')}
                  </TextRegular>
                  <TextMedium color={COLORS.BLACK_1}>{'600,000¹'}</TextMedium>
                </View>
                <View style={styles.boxYearExperienceRowContainer}>
                  <TextRegular>
                    <TextRegular
                      color={COLORS.PRIMARY}
                      style={styles.textunderline}>
                      {Translate('textDebit')}
                    </TextRegular>
                    <TextRegular> {Translate('textExpense')}</TextRegular>
                  </TextRegular>
                  <TextMedium>{'0'}</TextMedium>
                </View>
                <View style={styles.boxYearExperienceRowContainer}>
                  <TextRegular>
                    {Translate('textCalculateConMoney8')}
                  </TextRegular>
                  <TextMedium
                    style={styles.textunderline}
                    color={COLORS.PRIMARY}>
                    {'600,000'}
                  </TextMedium>
                </View>
                <View style={styles.boxGrayInYearExperienceContainer}>
                  <TextLight color={COLORS.PRIMARY}>
                    {Translate('textRemark')}
                  </TextLight>
                  <TextLight size={FONT_SIZE.BODY_2}>
                    {Translate('textCalculateConMoney9')}
                  </TextLight>
                </View>
              </View>
            </View>
          </View>

          {/* อายุงาน ตั้งแต่ 5 ปีขึ้นไป */}
          <View style={styles.yearExperienceContainer}>
            <TextMedium color={COLORS.PRIMARY}>
              {'\u2022'} {Translate('textCalculateConMoney10')}
            </TextMedium>
            <View style={styles.boxYearExperienceContainer}>
              <View style={styles.boxYearExperienceRowContainer}>
                <TextRegular>
                  {Translate('textMoneyRecieveFromFund')}
                </TextRegular>
                <TextMedium color={COLORS.BLACK_1}>{'600,000'}</TextMedium>
              </View>
              <View style={styles.boxYearExperienceRowContainer}>
                <TextRegular>
                  <TextRegular
                    color={COLORS.PRIMARY}
                    style={styles.textunderline}>
                    {Translate('textDebit')}
                  </TextRegular>
                  <TextRegular>
                    {' '}
                    {Translate('textCalculateConMoney11')}
                  </TextRegular>
                </TextRegular>
                <TextMedium color={COLORS.BLACK_1} style={styles.textunderline}>
                  {'70,000¹'}
                </TextMedium>
              </View>
              <View style={styles.boxYearExperienceRowContainer}>
                <View />
                <TextMedium color={COLORS.PRIMARY}>{'530,000'}</TextMedium>
              </View>
              <View style={styles.boxYearExperienceRowContainer}>
                <TextRegular>
                  <TextRegular
                    color={COLORS.PRIMARY}
                    style={styles.textunderline}>
                    {Translate('textDebit')}
                  </TextRegular>
                  <TextRegular>
                    {' '}
                    {Translate('textExpense')}
                    {' 50%'}
                  </TextRegular>
                </TextRegular>
                <TextMedium style={styles.textunderline} color={COLORS.BLACK_1}>
                  {'265,000²'}
                </TextMedium>
              </View>
              <View style={styles.boxYearExperienceRowContainer}>
                <TextRegular>{Translate('textCalculateConMoney8')}</TextRegular>
                <TextMedium style={styles.textunderline} color={COLORS.PRIMARY}>
                  {'265,000³'}
                </TextMedium>
              </View>
              <View style={styles.boxGrayInYearExperienceContainer}>
                <TextLight color={COLORS.PRIMARY}>
                  {Translate('textRemark')}
                </TextLight>
                <TextLight size={FONT_SIZE.BODY_2}>
                  {Translate('textCalculateConMoney12')}
                </TextLight>
                <TextLight size={FONT_SIZE.BODY_2}>
                  {Translate('textCalculateConMoney13')}
                </TextLight>
                <TextLight size={FONT_SIZE.BODY_2}>
                  {Translate('textCalculateConMoney14')}
                </TextLight>
              </View>
            </View>

            {/* ออกจากงานตามข้อกำหนด */}
            <View style={styles.yearExperienceContainer}>
              <TextMedium color={COLORS.PRIMARY}>
                {'\u2022'} {Translate('textCalculateConMoney15')}
              </TextMedium>
              <View style={styles.boxYearExperienceContainer}>
                <View style={styles.boxYearExperienceRowContainer}>
                  <TextRegular>
                    {Translate('textMoneyRecieveFromFund')}
                  </TextRegular>
                  <TextMedium color={COLORS.BLACK_1}>{'600,000'}</TextMedium>
                </View>
                {/* <View style={styles.boxYearExperienceRowContainer}>
                  <TextRegular>
                    <TextRegular
                      color={COLORS.PRIMARY}
                      style={styles.textunderline}>
                      {Translate('textDebit')}
                    </TextRegular>
                    <TextRegular> {Translate('textExpense')}</TextRegular>
                  </TextRegular>
                  <TextMedium color={COLORS.BLACK_1}>{'600,000¹'}</TextMedium>
                </View> */}

                <View style={styles.boxYearExperienceRowContainer}>
                  <TextRegular>
                    {Translate('textCalculateConMoney8')}
                  </TextRegular>
                  <TextMedium
                    style={styles.textunderline}
                    color={COLORS.PRIMARY}>
                    {'0¹'}
                  </TextMedium>
                </View>

                <View style={styles.boxGrayInYearExperienceContainer}>
                  <TextLight color={COLORS.PRIMARY}>
                    {Translate('textRemark')}
                  </TextLight>
                  <TextLight size={FONT_SIZE.BODY_2}>
                    {Translate('textCalculateConMoney16')}
                  </TextLight>
                  <View style={{flexDirection: 'row'}}>
                    <TextLight size={FONT_SIZE.BODY_2} style={styles.shiftdash}>
                      {Translate('textCalculateConMoney17')}
                    </TextLight>
                    <TextLight size={FONT_SIZE.BODY_2} style={styles.shiftdash_textAND}>
                      {Translate('textCalculateConMoney17_1')}
                    </TextLight>
                  </View>
                  <TextLight size={FONT_SIZE.BODY_2} style={styles.shiftdash}>
                    {Translate('textCalculateConMoney17_2')}
                  </TextLight>
                  <TextLight size={FONT_SIZE.BODY_2} style={styles.shiftdash}>
                    {Translate('textCalculateConMoney18')}
                  </TextLight>
                  <TextLight size={FONT_SIZE.BODY_2} style={styles.shiftdash}>
                    {Translate('textCalculateConMoney19')}
                  </TextLight>
                </View>
              </View>
            </View>

            {/* หมายเหตุ: บริษัทจัดการฯ ทำหน้าที่ หักภาษี ณ ที่จ่าย */}

            <TextRegular style={styles.remark}>
              {Translate('textCalculateConMoney20')}
            </TextRegular>
          </View>
        </Container>
      </View>
    </RootScroll>
  );
}
