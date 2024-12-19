// React
import React from 'react';
import { View, StyleSheet } from 'react-native';

// custom
import { Translate } from 'function';
import { ViewScale, FontScale } from 'utils';
import { COLORS, FONT_SIZE, FONT_TYPE, SPACING } from 'styles';

// components
import { Tooltip, TextPoints, TextRegular, TextMedium } from 'components/atoms';
import { MyReturnGrid4 } from 'components/molecules';

// lib
import { ListItem } from 'react-native-elements';
import _ from 'lodash';
import { useRecoilValue } from 'recoil';
import { languageState } from 'recoil-state';

// svg
import InfoCircle from 'assets/icons/InfoCircle.svg';

// props -> name, date, begin, present, avg, saving, contribution, benefitSaving, benefitContribution, total, rateRL, rateRR

export default ({
  name = '',
  date = 'd/m/y',
  begin = 0,
  present = 0,
  avg = 0,
  number_of_unit = 0,

  saving = 0,
  contribution = 0,
  benefitSaving = 0,
  benefitContribution = 0,

  total = 0,
  rateRL = 0,
  rateRR = 0,

  tooltipBM,
  tooltip3Yrs,

  tooltipBM5Yrs,
  tooltip5Yrs,
  begin_date,
  present_date,

  total_member_unit,
  total_company_unit
}) => {
  const [expanded, setExpanded] = React.useState(false);
  useRecoilValue(languageState);

  const handleOnPress = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.Container}>
      <ListItem.Accordion
        content={
          <>
            <View style={styles.headerContainer}>
              <TextMedium size={FONT_SIZE.BODY_2}>{name}</TextMedium>
              <TextRegular>
                <TextRegular style={styles.HeaderRightText_date}>
                  {Translate('textRemiitanceDateRightHeader')}
                </TextRegular>
                <TextRegular style={styles.HeaderRightText_data}>
                  {date}
                </TextRegular>
              </TextRegular>
            </View>
          </>
        }
        containerStyle={styles.ListItemContainerStyle}
        isExpanded={expanded}
        onPress={handleOnPress}>
        {expanded && (
          <View style={styles.BodyContainer}>
            <View style={styles.InsideBody}>
              <View style={styles.InsideBoxContainer}>
                <View style={styles.InsideBoxContainerLeft}>
                  <TextRegular style={styles.InsideBoxContainerTextTitle}>
                    {Translate('textRemittanceNetWorthUnit')}
                  </TextRegular>
                  <View style={styles.InsideBoxContainerLeft_Container}>
                    <View style={{ marginRight: ViewScale(5) }}>
                      <TextRegular
                        style={styles.InsideBoxContainerLeft_TextTitle}>
                        {Translate('textRemittanceBeginPeriod')}
                      </TextRegular>
                      <TextRegular
                        style={styles.InsideBoxContainerLeft_TextValue}>
                        <TextMedium
                          size={FONT_SIZE.BODY_3}
                          color={COLORS.PRIMARY}>
                          {parseFloat(begin.replace(/,/g, '')) === 0
                            ? '-'
                            : begin}
                        </TextMedium>
                      </TextRegular>
                      <TextRegular
                        style={styles.InsideBoxContainerLeft_TextTitle}>
                        {`${begin_date}`}
                      </TextRegular>
                    </View>
                    <View
                      style={{
                        borderColor: COLORS.BORDER_2,
                        borderWidth: 1,
                      }}
                    />
                    <View style={{ marginLeft: ViewScale(5) }}>
                      <TextRegular
                        style={styles.InsideBoxContainerLeft_TextTitle}>
                        {Translate('textRemittanceCurrentPeriod')}
                      </TextRegular>
                      <TextRegular
                        style={styles.InsideBoxContainerLeft_TextValue}>
                        <TextMedium
                          size={FONT_SIZE.BODY_3}
                          color={COLORS.PRIMARY}>
                          {parseFloat(present.replace(/,/g, '')) === 0
                            ? '-'
                            : present}
                        </TextMedium>
                      </TextRegular>
                      <TextRegular
                        style={styles.InsideBoxContainerLeft_TextTitle}>
                        {`${present_date}`}
                      </TextRegular>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    borderColor: COLORS.BORDER_2,
                    borderWidth: 1,
                  }}
                />
                <View style={styles.InsideBoxContainerRight}>
                  {/* <TextRegular style={styles.InsideBoxContainerTextTitle}>
                    {Translate('textRemiitanceNumberOfUnits')}
                  </TextRegular>
                  <TextRegular
                    style={[styles.InsideBoxContainerLeft_TextValue]}>
                    <TextMedium size={FONT_SIZE.BODY_3} color={COLORS.PRIMARY}>
                      {number_of_unit}
                    </TextMedium>
                  </TextRegular> */}
                  <TextRegular
                    style={[
                      styles.InsideBoxContainerTextTitle,
                      { marginTop: ViewScale(5) },
                    ]}>
                    {Translate('textRemiitanceCostAvgPerUnit')}
                  </TextRegular>
                  <TextRegular style={styles.InsideBoxContainerLeft_TextValue}>
                    <TextMedium size={FONT_SIZE.BODY_3} color={COLORS.PRIMARY}>
                      {avg}
                    </TextMedium>
                  </TextRegular>
                </View>
              </View>
              <View style={styles.InsideBoxNumberNew}>
                <View style={styles.InsideBoxContainerRight}>
                  <TextRegular style={styles.InsideBoxContainerTextTitle}>
                    {Translate('textRemiitanceNumberOfMembers')}
                  </TextRegular>
                  <TextRegular
                    style={[styles.InsideBoxContainerLeft_TextValue]}>
                    <TextMedium size={FONT_SIZE.BODY_3} color={COLORS.PRIMARY}>
                      {total_member_unit}
                    </TextMedium>
                  </TextRegular>
                </View>
                <View
                  style={{
                    borderColor: COLORS.BORDER_2,
                    borderWidth: 1,
                  }}
                />
                <View style={styles.InsideBoxContainerRight}>
                  <TextRegular
                    style={[
                      styles.InsideBoxContainerTextTitle,
                      { marginTop: ViewScale(5) },
                    ]}>
                    {Translate('textRemiitanceNumberOfEmployers')}
                  </TextRegular>
                  <TextRegular style={styles.InsideBoxContainerLeft_TextValue}>
                    <TextMedium size={FONT_SIZE.BODY_3} color={COLORS.PRIMARY}>
                      {total_company_unit}
                    </TextMedium>
                  </TextRegular>
                </View>
              </View>
              <View style={styles.YTDContainer}>
                <View style={styles.YTDContainerLeft}>
                  <View>
                    <TextRegular style={styles.YTDText}>
                      {Translate('textRemittanceReturnRateYTD')}
                    </TextRegular>
                  </View>
                  <View style={{ marginLeft: ViewScale(5) }}>
                    <Tooltip
                      // icon={<InfoCircle color={COLORS.THIRDARY} />}
                      iconStyle={{
                        size: FONT_SIZE.BODY_2,
                      }}
                      containerStyle={{
                        // marginLeft: ViewScale(34),
                        alignItems: 'center',
                      }}
                      tooltip={
                        <View>
                          <View>
                            <TextRegular
                              size={FONT_SIZE.BODYADD_5}
                              style={{ color: COLORS.WHITE }}>
                              {`${Translate('textRemittanceToolTip')} ${!_.isEmpty(tooltip3Yrs) ? tooltip3Yrs : '- '
                                }% | BM ${!_.isEmpty(tooltipBM) ? tooltipBM : '- '
                                }%`}
                            </TextRegular>
                          </View>
                          <View style={{ marginTop: 5 }}>
                            <TextRegular
                              size={FONT_SIZE.BODYADD_5}
                              style={{ color: COLORS.WHITE }}>
                              {`${Translate('textRemittanceToolTip_5Year')} ${!_.isEmpty(tooltip5Yrs) ? tooltip5Yrs : '- '
                                }% | BM ${!_.isEmpty(tooltipBM5Yrs) ? tooltipBM5Yrs : '- '
                                }%`}
                            </TextRegular>
                          </View>
                        </View>
                      }
                    />
                  </View>
                </View>
                <View style={styles.YTDContainerRight}>
                  <TextMedium style={[styles.YTDText, { color: COLORS.PRIMARY }]}>
                    {rateRL}% | BM {rateRR}%
                  </TextMedium>
                </View>
              </View>
              <MyReturnGrid4
                saving={saving}
                contribution={contribution}
                benefitSaving={benefitSaving}
                benefitContribution={benefitContribution}
              />
            </View>
            <View style={styles.totalContainer}>
              <TextRegular style={styles.totaltext}>
                {Translate('textRemittacneTotal')}
              </TextRegular>
              <TextPoints
                number={total}
                style={{ fontFamily: FONT_TYPE.MEDIUM }}
              />
              <TextRegular style={styles.totaltext}>
                {' '}
                {Translate('textBaht')}
              </TextRegular>
            </View>
          </View>
        )}
      </ListItem.Accordion>
    </View>
  );
};

const styles = StyleSheet.create({
  ListItemContainerStyle: {
    minHeight: SPACING.INPUT_HEIGHT,
  },
  iconInfo: {
    marginLeft: ViewScale(5),
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  totaltext: {
    fontFamily: FONT_TYPE.REGULAR,
    fontSize: FONT_SIZE.BODY_1,
  },
  totalContainer: {
    backgroundColor: COLORS.GRAY_4,
    padding: ViewScale(10),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  YTDContainerLeft: {
    marginHorizontal: ViewScale(20),
    width: '40%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  YTDContainerRight: {
    width: '40%',
  },
  YTDText: {
    fontSize: FontScale(13),
  },
  YTDContainer: {
    width: '100%',
    marginTop: ViewScale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  InsideBoxContainerLeft_TextValue: {
    color: COLORS.PRIMARY,
    fontSize: FONT_SIZE.BODY_4,
  },
  InsideBoxContainerLeft_TextTitle: {
    fontFamily: FONT_TYPE.REGULAR,
    fontSize: FONT_SIZE.BODY_3,
  },
  InsideBoxContainerLeft_Container: {
    marginTop: ViewScale(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  InsideBoxContainerRight: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: ViewScale(5),
  },
  InsideBoxContainerLeft: {
    padding: ViewScale(10),
  },
  InsideBoxContainerTextTitle: {
    fontSize: FONT_SIZE.BODY_4,
  },
  HeaderRightText_data: {
    fontSize: FONT_SIZE.BODY_3,
  },
  HeaderRightText_date: {
    fontSize: FONT_SIZE.BODY_3,
  },
  HeaderRightTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: FONT_SIZE.TITLE_1,
    fontFamily: FONT_TYPE.REGULAR,
  },
  IconsChevron: {
    marginLeft: ViewScale(10),
  },
  Container: {
    borderWidth: 1,
    borderColor: COLORS.BORDER_2,
    marginTop: ViewScale(10),
  },
  HeaderContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: ViewScale(20),
  },
  HeaderContainerRight: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  InsideBody: {
    marginTop: ViewScale(20),
  },
  BodyContainer: {
    borderTopWidth: 1,
    borderTopStartRadius: ViewScale(20),
    borderTopEndRadius: ViewScale(20),
    borderTopColor: COLORS.GRAY_4,
  },
  InsideBoxContainer: {
    marginHorizontal: ViewScale(20),
    borderColor: COLORS.BORDER_2,
    borderWidth: 1,
    justifyContent: 'space-evenly',
    backgroundColor: COLORS.GRAY_4,
    flexDirection: 'row',
    height: ViewScale(120),
  },
  InsideBoxNumberNew: {
    marginHorizontal: ViewScale(20),
    borderColor: COLORS.BORDER_2,
    borderWidth: 1,
    justifyContent: 'space-evenly',
    backgroundColor: COLORS.GRAY_4,
    flexDirection: 'row',
    height: ViewScale(80),
  },
});
