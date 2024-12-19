import {useNavigation} from '@react-navigation/core';
import {Container, RootScroll} from 'components/common';
import {
  Button,
  LineHorizontal,
  TextMedium,
  TextRegular,
  Tooltip,
  TextPoints,
} from 'components/atoms';
import {Translate} from 'function';
import React from 'react';
import {Image, Platform, View} from 'react-native';
import {COLORS, FONT_SIZE, FONT_TYPE} from 'styles';
import styles from './Style';
import _ from 'lodash';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Entypo} from 'components/Icons';
import {FontScale, numberWithCommas, ViewScale} from 'utils';
import {widthPercentageToDP} from 'react-native-responsive-screen';

export default ({route}) => {
  const navigation = useNavigation();
  const data_resend = route.params?.data_resend;
  const data_show = route.params?.data_show;

  const handleOnPress = () => {
    navigation.popToTop();
  };

  // console.log(data_show);

  return (
    <RootScroll
      title={Translate('textTryNewPlan')}
      isBackIcon
      flexContainer
      fixTab={false}>
      <Container style={styles.container}>
        {/* <TextMedium color={COLORS.PRIMARY} style={{textAlign: 'center'}}>
          {Translate('textTryNewPlanResultTitle')}
        </TextMedium> */}
        {/* <ProgressGradient
          retireAge={data_show?.age_toexit}
          predictAge={data_show?.age_forcast_onlynum}
          currentAge={data_show?.result4_onlynum}
          isTryMoneyGreater={data_show?.result5_text != 'น้อยกว่า'}
        /> */}
        <View style={styles.viewText_Image_Enough}>
          <View
            style={{
              width: data_show?.result5_text == 'น้อยกว่า' ? '80%' : '10%',
              height: '90%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {data_show?.result5_text == 'น้อยกว่า' ? (
              <TextMedium style={styles.text_Enough}>
                <TextMedium
                  color={
                    data_show?.result5_text == 'น้อยกว่า' ? 'red' : 'green'
                  }>
                  "
                </TextMedium>
                {' คาดว่าเงินทดลองปรับแผนการลงทุนใหม่\nมีความเป็นไปได้ที่จะ '}
                <TextMedium
                  color={
                    data_show?.result5_text == 'น้อยกว่า' ? 'red' : 'green'
                  }>
                  {data_show?.result5_text == 'น้อยกว่า'
                    ? 'ไม่เพียงพอ '
                    : 'เพียงพอ'}
                </TextMedium>
                {'\nสำหรับการเกษียณ '}
                <TextMedium
                  color={
                    data_show?.result5_text == 'น้อยกว่า' ? 'red' : 'green'
                  }>
                  "
                </TextMedium>
              </TextMedium>
            ) : (
              <Image
                style={styles.image_Enough}
                source={require('assets/images/happy.png')}
              />
            )}
          </View>
          <View
            style={{
              width: data_show?.result5_text == 'น้อยกว่า' ? '10%' : '80%',
              height: '90%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {data_show?.result5_text == 'น้อยกว่า' ? (
              <Image
                style={styles.image_Enough}
                source={require('assets/images/scared.png')}
              />
            ) : (
              <TextMedium style={styles.text_Enough}>
                <TextMedium
                  color={
                    data_show?.result5_text == 'น้อยกว่า' ? 'red' : 'green'
                  }>
                  "
                </TextMedium>
                {' คาดว่าเงินทดลองปรับแผนการลงทุนใหม่\nมีความเป็นไปได้ที่จะ '}
                <TextMedium
                  color={
                    data_show?.result5_text == 'น้อยกว่า' ? 'red' : 'green'
                  }>
                  {data_show?.result5_text == 'น้อยกว่า'
                    ? 'ไม่เพียงพอ '
                    : 'เพียงพอ'}
                </TextMedium>
                {'\nสำหรับการเกษียณ '}
                <TextMedium
                  color={
                    data_show?.result5_text == 'น้อยกว่า' ? 'red' : 'green'
                  }>
                  "
                </TextMedium>
              </TextMedium>
            )}
          </View>
        </View>

        <View style={{marginTop: ViewScale(30)}}>
          <TextMedium style={{textAlign: 'center'}}>
            {'ยอดเงินที่จะได้รับจากทดลองปรับแผนการลงทุนใหม่\n'}
            <TextMedium
              style={{textDecorationLine: 'underline'}}
              // color={COLORS.PRIMARY}
              color={data_show?.result5_text == 'น้อยกว่า' ? 'red' : 'green'}>
              {data_show?.result5_text}
            </TextMedium>
            {' ยอดเงินที่คุณควรมี ณ วันเกษียณ'}
          </TextMedium>

          <TextMedium
            size={FONT_SIZE.TITLE_4}
            style={{
              textAlign: 'center',
              color: data_show?.result5_text == 'น้อยกว่า' ? 'red' : 'green',
              marginTop: ViewScale(20),
            }}>
            {/* {data_show?.result5_text == 'น้อยกว่า' ? 'ขาดอยู่' : 'คือ'}{' '} */}
            <TextPoints
              size={FONT_SIZE.TITLE_4}
              number={data_show?.result7}
              style={{
                fontFamily: FONT_TYPE.MEDIUM,
                color: data_show?.result5_text == 'น้อยกว่า' ? 'red' : 'green',
              }}
            />
            {` ${Translate('textBaht')}`}
          </TextMedium>
        </View>

        {/* <View style={styles.container1}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Entypo
              name="triangle-up"
              size={FONT_SIZE.TITLE_2}
              color={colors[1]}
            />
            <TextRegular size={FONT_SIZE.BODY_3}>
              คาดว่าใช้เงินได้จนถึงอายุ {data_show?.result4_onlynum} ปี{' '}
              <TextMedium size={FONT_SIZE.BODY_3}>
                จากแผนลงทุนปัจจุบัน
              </TextMedium>
            </TextRegular>
          </View>
          <View style={styles.container11}>
            <Entypo
              name="triangle-up"
              size={FONT_SIZE.TITLE_2}
              color={colors[3]}
            />
            <TextMedium size={FONT_SIZE.BODY_3}>
              ยอดเงินจากการทดลองปรับแผน {numberWithCommas(data_show?.result8)}{' '}
              บาท
            </TextMedium>
          </View>
        </View> */}

        <View style={styles.container2}>
          {/* <View style={styles.container21}>
            <TextRegular
              size={FONT_SIZE.BODY_3}
              style={{width: ViewScale(300)}}>
              ผลตอบแทนตามสัดส่วนจากนโยบานการลงทุนปัจจุบัน
              ที่คาดว่าจะได้รับในอนาคต
            </TextRegular>
            <TextMedium size={FONT_SIZE.BODY_3}>
              {data_show?.return_byfund}% / ปี
            </TextMedium>
          </View> */}
          {/* <View style={styles.container21}> */}
          <View style={{width: '70%'}}>
            <TextRegular
              size={FONT_SIZE.BODY_3}
              color={COLORS.PRIMARY}
              style={{textDecorationLine: 'underline'}}>
              {Translate('textHypothesis')}{' '}
            </TextRegular>
            <TextRegular size={FONT_SIZE.BODY_3} color={COLORS.PRIMARY}>
              {'อัตราผลตอบแทนจากการทดลองปรับแผนการลงทุนใหม่'}
            </TextRegular>
          </View>
          <View
            style={{
              width: '20%',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TextMedium size={FONT_SIZE.BODY_3} color={COLORS.PRIMARY}>
              {data_show?.result6}
              <TextRegular size={FONT_SIZE.BODY_3} color={COLORS.PRIMARY}>
                {'% / ปี'}
              </TextRegular>
              <View></View>
            </TextMedium>
          </View>

          {/* </View> */}
        </View>

        <View style={{marginTop: ViewScale(30)}}>
          <TextMedium
            color={COLORS.PRIMARY}
            style={{textAlign: 'center', marginTop: ViewScale(20)}}>
            {Translate('textRetirePlanResultDesc')}
          </TextMedium>
          <TextRegular
            color={COLORS.PRIMARY}
            size={FONT_SIZE.BODY_3}
            style={{textAlign: 'center'}}>
            {Translate('textGoldRetirement2')}
          </TextRegular>
        </View>

        <View style={styles.shouldHaveMoneyTarget}>
          <View style={styles.imageContainer}>
            <Image
              source={require('assets/images/moneyBag.png')}
              resizeMode={'contain'}
            />
          </View>

          <TextMedium size={FONT_SIZE.TITLE_3}>
            {numberWithCommas(data_show?.result1)} {Translate('textBaht')}
          </TextMedium>
        </View>

        {/* boxGrayContainer */}
        <View style={styles.boxContainer}>
          <View>
            <TextMedium size={FONT_SIZE.BODY_2}>
              {Translate('textSpend_A_Month')}
            </TextMedium>
            <TextMedium size={FONT_SIZE.TITLE_1} color={COLORS.PRIMARY_1}>
              {numberWithCommas(Math.abs(data_show?.exp_afterexit))}{' '}
              {Translate('textBaht')}
            </TextMedium>
          </View>
          <Entypo
            name="arrow-bold-right"
            color={'#2053bf'}
            style={{fontSize: FontScale(50)}}
          />
          <View>
            <TextMedium size={FONT_SIZE.BODY_2}>
              {Translate('textUntilTheAge')}
            </TextMedium>
            <TextMedium size={FONT_SIZE.TITLE_1} color={COLORS.PRIMARY_1}>
              {data_show?.age_forcast}
            </TextMedium>
          </View>
        </View>

        <LineHorizontal style={{marginVertical: ViewScale(20)}} />

        <View>
          <TextMedium
            color={COLORS.PRIMARY}
            style={{textAlign: 'center', marginTop: ViewScale(20)}}>
            {'จำนวนเงินลงทุนที่คาดว่าจะได้รับ\nจากการทดลองปรับแผน'}
          </TextMedium>
        </View>

        <View style={styles.viewMony_expected_adjustments}>
          <View style={styles.imageContainer}>
            <Image
              source={require('assets/images/moneyBag.png')}
              resizeMode={'contain'}
              style={{width: widthPercentageToDP(40)}}
            />
          </View>
          <TextMedium size={FONT_SIZE.TITLE_4}>
            {numberWithCommas(data_show?.result2)} {Translate('textBaht')}
          </TextMedium>
        </View>

        <View style={styles.viewMony_expected_adjustments_month}>
          <View style={styles.viewMony_expected_adjustments_month2}>
            <View>
              <TextMedium size={FONT_SIZE.BODY_2}>
                {Translate('textSpend_A_Month')}
              </TextMedium>
              <TextMedium size={FONT_SIZE.TITLE_1} color={COLORS.PRIMARY_1}>
                {numberWithCommas(data_show?.result3)} บาท
              </TextMedium>
            </View>
            <Entypo
              name="arrow-bold-right"
              color={'#2053bf'}
              style={{fontSize: FontScale(50)}}
            />
            <View>
              <TextMedium size={FONT_SIZE.BODY_2}>
                {Translate('textUntilTheAge')}
              </TextMedium>
              <TextMedium size={FONT_SIZE.TITLE_1} color={COLORS.PRIMARY}>
                {data_show?.age_forcast}
              </TextMedium>
            </View>
          </View>
          <View style={styles.viewfree} />
          <TextRegular
            color={COLORS.PRIMARY}
            style={{textAlign: 'center'}}
            size={FONT_SIZE.BODY_3}>
            {`หากต้องการใช้เงินเดือนละ ${
              data_resend?.exp_afterexit
                .toFixed(2)
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
              // data_show?.exp_afterexit.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
            } บาท \nจะสามารถใช้ได้ไปถึงอายุ ${data_show?.result4} ${
              data_show?.result5_text == 'น้อยกว่า' ? 'เท่านั้น' : ''
            }`}
          </TextRegular>
        </View>

        {/* <View style={{alignItems: 'center'}}>
          <TextMedium
            size={FONT_SIZE.BODY_2}
            style={{textAlign: 'center', marginVertical: ViewScale(20)}}>
            ยอดเงินทดลองปรับแผนการลงทุนใหม่{'\n'}
            <TextMedium
              size={FONT_SIZE.BODY_2}
              color={COLORS.PRIMARY}
              style={{textDecorationLine: 'underline'}}>
              {data_show?.result7_text}
            </TextMedium>{' '}
            ยอดเงินที่ท่านควรมี ณ วันเกษียณ
          </TextMedium>

          <TextMedium size={FONT_SIZE.BODY_2}>
            {data_show?.result7_text == 'น้อยกว่า' ? 'ขาดอยู่' : 'คือ'}{' '}
            <TextMedium size={FONT_SIZE.BODY_2} color={COLORS.PRIMARY}>
              {numberWithCommas(data_show?.result7)}
            </TextMedium>{' '}
            บาท
          </TextMedium>

          <TextMedium
            style={{marginVertical: ViewScale(20), textAlign: 'center'}}
            size={FONT_SIZE.BODY_2}>
            ยอดเงินที่จะได้รับจากแผนการลงทุนปัจจุบันของท่าน{'\n'}
            <TextMedium
              color={COLORS.PRIMARY}
              size={FONT_SIZE.BODY_2}
              style={{textDecorationLine: 'underline'}}>
              {data_show?.result5_text}
            </TextMedium>{' '}
            ยอดเงินที่ท่านควรมี ณ วันเกษียณ
          </TextMedium>

          <TextMedium
            style={{marginBottom: ViewScale(20)}}
            size={FONT_SIZE.BODY_2}>
            {data_show?.result5_text == 'น้อยกว่า' ? 'ขาดอยู่' : 'คือ'}{' '}
            <TextMedium color={COLORS.PRIMARY} size={FONT_SIZE.BODY_2}>
              {numberWithCommas(data_show?.result5)}
            </TextMedium>{' '}
            บาท
          </TextMedium>
        </View> */}

        <View style={{marginTop: ViewScale(30)}}>
          <TextMedium
            size={FONT_SIZE.TITLE_2}
            color={data_show?.result5_text == 'น้อยกว่า' ? 'red' : 'green'}
            style={{marginBottom: ViewScale(10)}}>
            {data_show?.result5_text == 'น้อยกว่า'
              ? Translate('textTargetTitleNotBanlu')
              : Translate('textTargetTitleBanlu')}
            <TextMedium style={{marginBottom: ViewScale(10)}}>
              {data_show?.result5_text == 'น้อยกว่า'
                ? ''
                : '\nหากต้องการเพิ่มพูนความมั่งคั่งก็ยังสามารถทำได้'}
            </TextMedium>
          </TextMedium>
        </View>

        <View style={styles.viewRecommended_content}>
          {data_show?.result5_text == 'น้อยกว่า'
            ? Translate('textRetirePlaneResultGuideline').map((item, index) => {
                // if (data_show?.result5_text != 'น้อยกว่า' && index > 2) {
                //   return null;
                // } else {
                return (
                  <View
                    style={{flexDirection: 'row'}}
                    key={'guidelineId-' + index}>
                    <View>
                      <TextRegular style={styles.textRecommended_content}>
                        {item.title}
                      </TextRegular>
                    </View>
                    <View style={styles.marginTopOS}>
                      {index === 0 && (
                        <Tooltip
                          tooltip={
                            <View
                              style={
                                [0, 1, 2].includes(index) && {
                                  width: wp(80),
                                }
                              }>
                              <TextRegular style={{color: COLORS.WHITE}}>
                                {item.tip}
                              </TextRegular>
                            </View>
                          }
                          iconStyle={{size: FontScale(16)}}
                        />
                      )}
                      {index === 2 && (
                        <Tooltip
                          tooltip={
                            <View
                              style={
                                [0, 1, 2].includes(index) && {
                                  width: wp(80),
                                }
                              }>
                              <TextRegular style={{color: COLORS.WHITE}}>
                                {item.tip}
                              </TextRegular>
                            </View>
                          }
                          iconStyle={{size: FontScale(16)}}
                        />
                      )}
                      {/* <Tooltip
                        tooltip={
                          <View
                            style={
                              [0, 1, 2].includes(index) && {
                                width: wp(80),
                              }
                            }>
                            <TextRegular style={{color: COLORS.WHITE}}>
                              {item.tip}
                            </TextRegular>
                          </View>
                        }
                        iconStyle={{size: FontScale(16)}}
                      /> */}
                    </View>
                  </View>
                );
                // }
              })
            : Translate('textRetirePlaneResultGuidelineNotBunlu').map(
                (item, index) => {
                  // if (data_show?.result5_text != 'น้อยกว่า' && index > 2) {
                  //   return null;
                  // } else {
                  return (
                    <View
                      style={{flexDirection: 'row'}}
                      key={'guidelineId-' + index}>
                      <View>
                        <TextRegular style={styles.textRecommended_content}>
                          {item.title}{' '}
                        </TextRegular>
                      </View>
                      <View style={styles.marginTopOS}>
                        {index === 0 && (
                          <Tooltip
                            tooltip={
                              <View
                                style={
                                  [0, 1, 2].includes(index) && {
                                    width: wp(80),
                                  }
                                }>
                                <TextRegular style={{color: COLORS.WHITE}}>
                                  {item.tip}
                                </TextRegular>
                              </View>
                            }
                            iconStyle={{size: FontScale(16)}}
                          />
                        )}
                        {index === 2 && (
                          <Tooltip
                            tooltip={
                              <View
                                style={
                                  [0, 1, 2].includes(index) && {
                                    width: wp(80),
                                  }
                                }>
                                <TextRegular style={{color: COLORS.WHITE}}>
                                  {item.tip}
                                </TextRegular>
                              </View>
                            }
                            iconStyle={{size: FontScale(16)}}
                          />
                        )}
                        {/* <Tooltip
                          tooltip={
                            <View>
                              <TextRegular style={{color: COLORS.WHITE}}>
                                {item.tip}
                              </TextRegular>
                            </View>
                          }
                          iconStyle={{size: FontScale(16)}}
                        /> */}
                      </View>
                    </View>
                  );
                  // }
                },
              )}
        </View>

        <View style={{marginTop: ViewScale(30)}}>
          <Button
            type={'fill'}
            title={Translate('textTryNewPlanButton2')}
            onPress={handleOnPress}
          />
        </View>
      </Container>
    </RootScroll>
  );
};
