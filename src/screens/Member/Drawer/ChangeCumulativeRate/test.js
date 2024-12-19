/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/rules-of-hooks */
// React
import React from 'react';
import { View, TouchableOpacity, Text, Keyboard } from 'react-native';

// custom
import { ViewScale, FontScale, setSpinner, filterInputNumberPoint } from 'utils';
import { COLORS, FONT_TYPE } from 'styles';
import { Container, RootScroll } from 'components/common';

import styles, { InputSmallProps } from './Style';

// global components
import {
  Tooltip,
  CheckBox,
  Button,
  Slider,
  LineHorizontal,
  TextRegular,
  TextMedium,
  Picker,
} from 'components/atoms';
import { FONT_SIZE } from 'styles';

// lib
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Translate } from 'function';
import { getDeposit, sendDeposit } from 'services/api/member';
import { Controller, useForm } from 'react-hook-form';
import { AlertDoSuccess, AlertFailed, AlertWarning } from 'components/molecules';
import _ from 'lodash';
import { AntDesign, MaterialIcons } from 'components/Icons';

export default function index() {
  const { control, getValues, handleSubmit, trigger } = useForm();

  const [apiData, setApiData] = React.useState(null);
  const [num, setnum] = React.useState(null);
  const [pickerValue, onPickerChange] = React.useState(0);
  const navigation = useNavigation();
  const inputRef = React.useRef(null);
  const isSlideFocus = React.useRef(false);
  const oldvalue = React.useRef('');

  const callapi = async () => {
    await getDeposit()
      .then(response => {
        if (response.status === 'success') {
          setApiData(response.data);
        }
      })
      .catch(error => {
        navigation.navigate('Alert1', {
          children: AlertFailed('มีบางอย่างผิดพลาดกรุณาลองใหม่อีกครั้ง'),
          title: Translate('textConfirm2'),
          onPress: () => {
            navigation.goBack();
          },
        });
        // console.log(error);
      });
  };

  const sendapi = handleSubmit(
    async data => {
      let sendData =
        apiData.type == 1 || apiData?.type == 3
          ? String(parseFloat(data.deposit_rate).toFixed(2))
          : apiData.rate[data.deposit_rate];

      setSpinner(true);
      await sendDeposit({
        deposit_rate: sendData,
      })
        .then(response => {
          if (response.status == 'success') {
            navigation.navigate('Alert1', {
              children: <AlertDoSuccess />,
              title: Translate('textConfirm2'),
            });
          }
        })
        .catch(error => {
          console.log({ error });
          navigation.navigate('Alert1', {
            children: AlertWarning(error.message_header, error.message_body),
            title: Translate('textConfirm2'),
          });
        })
        .finally(() => setSpinner(false));
    },
    error => console.log(error),
  );

  const rangeValue = React.useMemo(() => {
    if (apiData == null) return;

    if (apiData.type == 1) {
      return [apiData.min_rate, apiData.max_rate];
    } else if (apiData.type == 2 && apiData.rate.length > 0) {
      if (apiData.rate.length === 1) {
        return [apiData.rate[0], apiData.rate[0]];
      } else {
        return [apiData.rate[0], apiData.rate[apiData.rate.length - 1]];
      }
    } else {
      return [5, 15, 5, 15];
    }
  }, [apiData]);

  const sliderValue = React.useMemo(() => {
    if (apiData == null) return;

    if (apiData.type == 1) {
      return [apiData.min_rate, apiData.max_rate];
    } else if (apiData.type == 2 && apiData.rate.length > 0) {
      if (apiData.rate.length === 1) {
        return [0, 0];
      } else {
        return [0, apiData.rate.length - 1];
      }
    } else {
      return [5, 15, 5, 15];
    }
  }, [apiData]);

  const InputValue = value => {
    if (apiData?.type == 1 || apiData?.type == 3) {
      if (inputRef.current !== null) {
        if (inputRef.current.isFocused()) {
          if (isSlideFocus.current) {
            return String(value.toFixed(2));
          } else {
            return value;
          }
        } else {
          return String(value.toFixed(2));
        }
      } else {
        return value.toFixed(2).toString();
      }
    } else {
      return String(apiData?.rate[value].toFixed(2));
    }
  };

  const [value, setValue] = React.useState(1);

  const handleChange = event => {
    console.log('>>???>>>', event.target);
    const value = Math.max(min, Math.min(max, Number(event.target.value)));
    setValue(value);
  };

  React.useEffect(() => {
    setSpinner(true);
    callapi().finally(() => {
      setSpinner(false);
    });
  }, []);

  return (
    <RootScroll
      title={Translate('textChangeCumulativeRate')}
      isBackIcon
      flexContainer
      fixTab={false}>
      {apiData !== null && (
        <>
          <Container style={{ flex: 0, paddingBottom: ViewScale(20) }}>
            {/* Confirm Button */}

            {/* กล่องสีเทา */}
            <View style={styles.topContainer}>
              <TextRegular color={COLORS.PRIMARY}>
                {
                  'อัตราการจ่ายเงินสะสมที่สามารถปรับเปลี่ยนได้ตามที่กองทุนฯ / กองทุนเฉพาะส่วนกำหนด'
                }
              </TextRegular>
              <RangeValueComp apiData={apiData} />
              {/* อัตราเงินสะสมนำส่งปัจจุบัน */}
              <View style={styles.ComulativeRatePresentContainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: ViewScale(20),
                  }}>
                  <TextMedium size={FONT_SIZE.BODY_2}>
                    {'อัตราเงินสะสมนำส่งปัจจุบัน '}
                  </TextMedium>
                  <Tooltip
                    tooltip={
                      <View style={{ width: wp(80) }}>
                        <TextRegular
                          style={{ color: COLORS.WHITE }}
                          size={FONT_SIZE.BODY_2}>
                          {
                            'จะแสดงค่า เมื่อท่านได้มีการแจ้งเปลี่ยนแปลงอัตราเงินสะสมไปแล้ว 1 ครั้ง'
                          }
                        </TextRegular>
                      </View>
                    }
                  />
                </View>
                <TextMedium color={COLORS.PRIMARY}>
                  {apiData?.deposit_rate == 'N/A'
                    ? apiData?.deposit_rate
                    : `${parseFloat(apiData?.deposit_rate).toFixed(2)}%`}
                </TextMedium>
              </View>
            </View>
          </Container>
          <LineHorizontal />
          <Container>
            <View style={styles.MiddleContainer}>
              <TextMedium color={COLORS.PRIMARY}>
                {'เลือกอัตราสะสมใหม่'}
              </TextMedium>

              {apiData?.type == 3 ? (
                <View
                  style={{
                    marginVertical: ViewScale(10),
                    paddingBottom: ViewScale(10),
                  }}>
                  <TextMedium
                    size={FONT_SIZE.BODY_2}
                    style={{ marginBottom: ViewScale(10) }}>
                    {apiData?.rate_detail?.sub_type_name}
                  </TextMedium>
                  <Picker
                    hidePlaceHolder
                    items={apiData?.rate_detail?.sub_type_data.map(
                      (item, index) => ({
                        label: item?.detail_type,
                        value: index,
                      }),
                    )}
                    onValueChange={onPickerChange}
                  />

                  {apiData?.set_range == 2 && (
                    <>
                      <TextMedium
                        size={FONT_SIZE.BODY_2}
                        style={{
                          marginTop: ViewScale(10),
                          marginBottom: ViewScale(10),
                        }}>
                        {'อัตราเงินสะสมใหม่'}
                      </TextMedium>
                      <Controller
                        name="deposit_rate"
                        control={control}
                        defaultValue={
                          apiData?.rate_detail?.sub_type_data[pickerValue]
                            ?.rate[0]
                        }
                        render={({ field: { onChange } }) => (
                          <Picker
                            hidePlaceHolder
                            items={apiData?.rate_detail?.sub_type_data[
                              pickerValue
                            ]?.rate.map((item, index) => ({
                              label: `${item}%`,
                              value: String(item),
                            }))}
                            onValueChange={onChange}
                          />
                        )}
                      />
                    </>
                  )}
                </View>
              ) : (
                <>
                  <TextRegular
                    style={{
                      fontSize: FontScale(13),
                      marginTop: ViewScale(10),
                    }}>
                    {`อัตราเงินสะสมที่เปลี่ยนได้สูงสุด ตั้งแต่ ${rangeValue[0].toFixed(
                      2,
                    )}% - ${rangeValue[1].toFixed(2)}% ของค่าจ้าง `}
                    <Tooltip
                      tooltip={
                        <View style={{ width: wp(80) }}>
                          <TextRegular
                            style={{ color: COLORS.WHITE }}
                            size={FONT_SIZE.BODY_3}>
                            {
                              'เงินที่ลูกจ้างจ่ายเข้ากองทุนเพื่อตนเองส่วนหนึ่ง เรียกว่า “เงินสะสม” ซึ่งกฏหมายกำหนดให้สะสมได้ตั้งแต่ 2%-15% ของค่าจ้าง\n\nอัตราการจ่ายเงินสะสมที่ลูกจ้างสามารถปรับเปลี่ยนได้นั้น ต้องเป็นไปตามเอกสารแนบท้ายกองทุนฯ / กองทุนเฉพาะส่วน กำหนด'
                            }
                          </TextRegular>
                        </View>
                      }
                    />
                  </TextRegular>
                </>
              )}
              {!(apiData?.set_range == 2 && apiData?.type == 3) && (
                <Controller
                  name="deposit_rate"
                  control={control}
                  defaultValue={sliderValue[0]}
                  rules={{
                    required: true,
                    validate: {
                      less: v =>
                        parseFloat(v) >= sliderValue[0] ||
                        'ท่านปรับเปลี่ยนอัตราต่ำกว่าร้อยละที่กำหนดไว้',
                      more: v =>
                        parseFloat(v) <= sliderValue[1] ||
                        'ท่านปรับเปลี่ยนอัตราเกินร้อยละที่กำหนดไว้',
                    },
                  }}
                  render={({ field: { onChange, value }, fieldState: { error } }) => {
                    return (
                      <>
                        <View style={styles.sliderContainer}>
                          <Slider
                            style={{
                              width: '70%',
                              height: 40,
                              alignSelf: 'center',
                              marginVertical: ViewScale(15),
                            }}
                            step={
                              apiData?.type == 1 || apiData?.type == 3
                                ? 0.01
                                : 1
                            }
                            minimumValue={sliderValue[0]}
                            maximumValue={sliderValue[1]}
                            onSlidingComplete={() =>
                              (isSlideFocus.current = false)
                            }
                            onSlidingStart={() => (isSlideFocus.current = true)}
                            value={
                              inputRef.current !== null
                                ? inputRef.current.isFocused()
                                  ? InputValue(value) * 1
                                  : value
                                : value
                            }
                            onValueChange={v => {
                              trigger();
                              onChange(v);
                            }}
                          />
                          <TextMedium
                            style={{ position: 'absolute', left: 0, bottom: 0 }}
                            size={FONT_SIZE.BODY_2}>
                            {`${parseFloat(rangeValue[0]).toFixed(2)}%`}
                          </TextMedium>
                          <TextMedium
                            style={{
                              position: 'absolute',
                              right: 0,
                              bottom: 0,
                            }}
                            size={FONT_SIZE.BODY_2}>
                            {`${parseFloat(rangeValue[1]).toFixed(2)}%`}
                          </TextMedium>
                        </View>
                        <View style={styles.CumulativeRateNew}>
                          <TextRegular>อัตราเงินสะสมใหม่ที่เลือก</TextRegular>
                          <Input
                            ref={inputRef}
                            errorMessage={error?.message}
                            disabled={apiData?.type == 2 ? true : false}
                            errorStyle={{
                              fontFamily: FONT_TYPE.REGULAR,
                              width: ViewScale(250),
                              textAlign: 'right',
                              transform: [
                                {
                                  translateX: ViewScale(-180),
                                },
                              ],
                            }}
                            inputContainerStyle={
                              error && {
                                borderBottomColor: COLORS.ERROR,
                              }
                            }
                            style={error && { color: COLORS.ERROR }}
                            value={InputValue(value)}
                            onFocus={() => {
                              oldvalue.current = value;
                            }}
                            onEndEditing={() => {
                              onChange(
                                parseFloat(
                                  filterInputNumberPoint(
                                    value,
                                    oldvalue.current,
                                  ),
                                ),
                              );
                            }}
                            onChangeText={onChange}
                            {...InputSmallProps}
                          />
                          <TextRegular>%</TextRegular>
                        </View>
                      </>
                    );
                  }}
                />
              )}
            </View>
          </Container>
          <LineHorizontal />
          <Container>
            <MaxChangeRate data={apiData} />

            {/* TermOfUse */}

            <Agreement {...{ navigation, sendapi }} />
            {/* <View style={{height: bottom}} /> */}
          </Container>
        </>
      )}
    </RootScroll>
  );
}

const Agreement = ({ sendapi, navigation }) => {
  const [widthCheckbox, setWidthCheckbox] = React.useState(0);
  const [onCheckBox, setOnCheckBox] = React.useState(false);

  const _ChangeHistory = () => {
    navigation.navigate('ChangeCumulativeRateHistory');
  };

  return (
    <>
      <View>
        <TouchableOpacity
          style={{ marginTop: ViewScale(20) }}
          onPress={() => {
            setOnCheckBox(!onCheckBox);
          }}>
          <TextRegular size={FONT_SIZE.BODY_3}>
            <View
              onLayout={({ nativeEvent }) => {
                setWidthCheckbox(nativeEvent.layout.width);
              }}>
              <CheckBox value={onCheckBox} />
            </View>
            ข้าพเจ้ามีความประสงค์ให้หักเงินจากค่าจ้างของข้าพเจ้าในอัตราส่วน
            ตามที่ระบุข้างต้น (อัตราเงินสะสมใหม่ที่เลือก)
            เพื่อนำส่งเข้าสะสมในกองทุนสำรองเลี้ยงชีพ ในส่วนของพนักงาน
          </TextRegular>
        </TouchableOpacity>
        <TextRegular size={FONT_SIZE.BODY_3} style={{ marginTop: ViewScale(20) }}>
          <View style={{ width: widthCheckbox }} />
          ข้าพเจ้าเข้าใจและรับทราบว่า เงินสมทบที่บริษัทฯ
          จ่ายเข้ากองทุนสำรองเลี้ยงชีพ ในส่วนของนายจ้าง
          จะมีอัตราตามที่กำหนดไว้ในข้อบังคับกองทุน กองทุนเฉพาะส่วน
          ซึ่งอาจเป็นอัตราที่แตกต่างจากอัตราของเงินสะสมที่ข้าพเจ้าได้จ่ายเข้ากองทุนสำรองเลี้ยงชีพ
          ในส่วนของพนักงาน
        </TextRegular>
      </View>
      <TouchableOpacity
        onPress={_ChangeHistory}
        style={{ alignSelf: 'center', marginVertical: ViewScale(20) }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <MaterialIcons
            name="history"
            color={COLORS.PRIMARY}
            size={ViewScale(20)}
          />
          <TextMedium
            color={COLORS.PRIMARY}
            style={{ marginLeft: ViewScale(10) }}>
            {'ประวัติการเปลี่ยนอัตราเงินสะสม'}
          </TextMedium>
          <MaterialIcons
            name="chevron-right"
            color={COLORS.PRIMARY}
            size={ViewScale(25)}
          />
        </View>
      </TouchableOpacity>

      <Button
        title="ยืนยัน"
        type="fill"
        disabled={!onCheckBox}
        onPress={sendapi}
      />
    </>
  );
};

const MaxChangeRate = ({ data }) => {
  return (
    <View style={{ alignItems: 'center', marginTop: ViewScale(20) }}>
      <TextRegular
        color={COLORS.FOURTHDARY}
        size={FONT_SIZE.BODY_2}
        style={{ marginBottom: ViewScale(20) }}>
        เปลี่ยนแปลงได้ปีละ{' '}
        <TextMedium color={COLORS.FOURTHDARY} size={FONT_SIZE.BODY_2}>
          {_.isEmpty(data?.max_change_rate) ? '-' : data?.max_change_rate}
        </TextMedium>{' '}
        ครั้ง
      </TextRegular>

      {data?.open_time.map((item, index) => (
        <View
          key={'max_change_rate_id' + index}
          style={{
            flexDirection: 'row',
            width: '100%',
            paddingHorizontal: ViewScale(10),
            paddingVertical: ViewScale(20),
            backgroundColor: item.colors_date == 1 ? COLORS.GRAY : '#3ca80017',
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'flex-start',
            }}>
            {item.colors_date == 2 && (
              <AntDesign name={'checkcircle'} color={COLORS.SUCCESS} />
            )}
            <TextMedium
              size={FONT_SIZE.BODY_3}
              style={{ marginLeft: ViewScale(5) }}>
              {item?.no}
            </TextMedium>
          </View>
          <View style={{ flex: 1 }}>
            <TextRegular size={FONT_SIZE.BODY_3}>ตั้งแต่วันที่</TextRegular>
            <TextRegular
              size={FONT_SIZE.BODY_3}
              style={{ marginTop: ViewScale(10) }}>
              เริ่มมีผล
            </TextRegular>
          </View>
          <View style={{ flex: 1.6 }}>
            <TextMedium size={FONT_SIZE.BODY_3}>{item?.range_date}</TextMedium>
            <TextMedium
              size={FONT_SIZE.BODY_3}
              style={{ marginTop: ViewScale(10) }}>
              {item?.month_change}
            </TextMedium>
          </View>
          <View style={{ flex: 1 }}>
            <TextRegular size={FONT_SIZE.BODY_3}>ของทุกปี</TextRegular>
            <TextRegular
              size={FONT_SIZE.BODY_3}
              style={{ marginTop: ViewScale(10) }}>
              {item?.status_change}
            </TextRegular>
          </View>
        </View>
      ))}
    </View>
  );
};

const RangeValueComp = ({ apiData }) => {
  const renderPercent = React.useCallback(() => {
    if (apiData === null) return;

    if (apiData.type == 1) {
      return (
        <TextRegular style={{ marginTop: ViewScale(10) }} size={FONT_SIZE.BODY_2}>
          <TextMedium color={COLORS.PRIMARY} size={FONT_SIZE.BODY_2}>
            {apiData.min_rate
              ? String(parseFloat(apiData.min_rate).toFixed(2))
              : apiData.min_rate}
            %
          </TextMedium>
          <TextRegular size={FONT_SIZE.BODY_2}>{`  ถึง  `}</TextRegular>
          <TextMedium color={COLORS.PRIMARY} size={FONT_SIZE.BODY_2}>
            {apiData.max_rate
              ? String(parseFloat(apiData.max_rate).toFixed(2))
              : apiData.max_rate}
            %
          </TextMedium>
        </TextRegular>
      );
    } else if (apiData.type == 2) {
      return (
        <TextRegular style={{ marginTop: ViewScale(10) }} size={FONT_SIZE.BODY_2}>
          {apiData.rate.map((item, index) => (
            <Text key={'CumulativeId-' + index}>
              <TextMedium color={COLORS.PRIMARY} size={FONT_SIZE.BODY_2}>
                {item ? String(parseFloat(item).toFixed(2)) : item}%
              </TextMedium>
              {index < apiData.rate.length - 1 && (
                <TextRegular size={FONT_SIZE.BODY_2}>{`  หรือ  `}</TextRegular>
              )}
            </Text>
          ))}
        </TextRegular>
      );
    } else {
      return null;
    }
  }, [apiData]);

  if (apiData?.type == 3) {
    return null;
  }

  return (
    <View style={styles.boxGray}>
      <TextRegular size={FONT_SIZE.BODY_3} style={{ textAlign: 'center' }}>
        {'กำหนดช่วงอัตรา-สมาชิกสามารถเลือกจ่ายเงินสะสมได้ในอัตรา'}
      </TextRegular>
      {renderPercent()}
    </View>
  );
};
