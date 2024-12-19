/* eslint-disable react-native/no-inline-styles */
// React
import React from 'react';
import {View, Image} from 'react-native';

// custom
import {Translate} from 'function';
import {ViewScale, FontScale, addCommas} from 'utils';
import styles from './Style';

// components
import {Container, RootScroll} from 'components/common';
import {TextPoints, Tooltip} from 'components/atoms';
import {Button} from 'components/atoms';
import {TextRegular, TextLight, TextMedium} from 'components/atoms';
import {Entypo} from 'components/Icons';

// lib
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {COLORS, FONT_SIZE, FONT_TYPE} from 'styles';

// CONSTANT

export default ({navigation, route}) => {
  const data_resend = route.params?.data_resend;
  const data_show = route?.params?.data_show;

  const handleOnPress = () => {
    navigation.navigate('TryNewPlanPage3', {data_resend,data_show});
  };

  return (
    <RootScroll
      title={Translate('textRetirePlanTitle')}
      isBackIcon
      fixTab={false}>
      <Container>
        <View style={styles.viewText_Image_Enough}>
          <View
            style={{
              width: data_show?.result5_text == 'น้อยกว่า' ? '60%' : '30%',
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
                {' แผนการลงทุนปัจจุบัน\nมีความเป็นไปได้ที่จะ '}
                <TextMedium
                  color={
                    data_show?.result5_text == 'น้อยกว่า' ? 'red' : 'green'
                  }>
                  {data_show?.result5_text == 'น้อยกว่า'
                    ? 'ไม่เพียงพอ'
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
              width: data_show?.result5_text == 'น้อยกว่า' ? '30%' : '60%',
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
                {' แผนการลงทุนปัจจุบัน\nมีความเป็นไปได้ที่จะ '}
                <TextMedium
                  color={
                    data_show?.result5_text == 'น้อยกว่า' ? 'red' : 'green'
                  }>
                  {data_show?.result5_text == 'น้อยกว่า'
                    ? 'ไม่เพียงพอ'
                    : 'เพียงพอ'}
                </TextMedium>
                {'สำหรับการเกษียณ '}
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
            {'ยอดเงินที่จะได้รับจากแผนการลงทุนปัจจุบันของคุณ\n'}
            <TextMedium
              style={{textDecorationLine: 'underline'}}
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
              number={data_show?.result5}
              style={{
                fontFamily: FONT_TYPE.MEDIUM,
                color: data_show?.result5_text == 'น้อยกว่า' ? 'red' : 'green',
              }}
            />
            {` ${Translate('textBaht')}`}
          </TextMedium>
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

          <TextPoints
            number={data_show?.result1}
            size={FONT_SIZE.TITLE_3}
            style={{fontFamily: FONT_TYPE.MEDIUM}}
            suffix={` ${Translate('textBaht')}`}
          />
        </View>

        {/* boxGrayContainer */}
        <View style={styles.boxContainer}>
          <View>
            <TextMedium size={FONT_SIZE.BODY_2}>
              {Translate('textSpend_A_Month')}
            </TextMedium>
            <TextPoints
              number={Math.abs(data_show?.exp_afterexit)}
              size={FONT_SIZE.TITLE_1}
              style={{fontFamily: FONT_TYPE.MEDIUM, color: COLORS.PRIMARY_1}}
              suffix={` ${Translate('textBaht')}`}
            />
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
              {`${data_show?.age_forcast}`}
            </TextMedium>
          </View>
        </View>

        <View
          style={{
            borderColor: COLORS.BORDER,
            borderWidth: 0.5,
            marginTop: ViewScale(30),
          }}
        />

        {/* จำนวนเงินลงทุนที่คาดว่าจะได้รับจากแผนการลงทุนปัจจุบัน */}
        <View style={styles.viewContaner}>
          <TextMedium style={{textAlign: 'center'}} color={COLORS.PRIMARY}>
            {Translate('textAmountExpectInvestCurrent')}
          </TextMedium>

          <View style={styles.imageContainer}>
            <Image
              source={require('assets/images/moneyBag.png')}
              resizeMode={'contain'}
              style={{width: wp(40)}}
            />
          </View>
          <TextPoints
            number={data_show?.result2}
            size={FONT_SIZE.TITLE_3}
            style={{fontFamily: FONT_TYPE.MEDIUM}}
            suffix={` ${Translate('textBaht')}`}
          />
        </View>

        <View style={styles.viewContaner_Mony_retire_current}>
          <View style={styles.viewContaner_Mony_retire_current_Detel}>
            <View>
              <TextMedium size={FONT_SIZE.BODY_2}>
                {Translate('textSpend_A_Month')}
              </TextMedium>
              <TextPoints
                number={data_show?.result3}
                size={FONT_SIZE.TITLE_1}
                style={{fontFamily: FONT_TYPE.MEDIUM, color: COLORS.PRIMARY_1}}
                suffix={` ${Translate('textBaht')}`}
              />
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
                {`${data_show?.age_forcast}`}
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

        <View
          style={{
            marginTop: ViewScale(30),
          }}>
          <Button
            title={Translate('textTryNewPlanButton')}
            type="fill"
            onPress={handleOnPress}
          />
        </View>
      </Container>
    </RootScroll>
  );
};
