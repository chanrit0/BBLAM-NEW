import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from '../Style';
import { Container } from 'components/common';
import { CheckBox, TextRegular } from 'components/atoms';
import { FONT_SIZE, FONT_TYPE } from 'styles';
import { Controller, useWatch } from 'react-hook-form';
import { Translate } from 'function';
import { Input } from 'react-native-elements';
import { REGEX_TWO_DEGIT, REGEX_NUMBER } from 'constants';
import { filterInputNumberPoint, ViewScale } from 'utils';

const Type1 = ({ control, onChangeType, valueType, getValues, clearErrors }) => {
  const minRateInputRef = React.useRef(null); // useRef สำหรับ min_rate
  const maxRateInputRef = React.useRef(null); // useRef สำหรับ max_rate
  const decimal_allow2 = useWatch({ control, name: 'decimal_allow2' });
  const handleOnPressType = () => {
    onChangeType(1);
  };

  const handleDecimalChange = (onChange, value) => {
    onChange(value === 2 ? 1 : 2);

    // blur input ทั้งหมดเมื่อค่า decimal_allow2 เปลี่ยน
    if (minRateInputRef.current) {
      minRateInputRef.current.blur();
    }
    if (maxRateInputRef.current) {
      maxRateInputRef.current.blur();
    }
  };

  const filterNumberBasedOnDecimal = (value) => {
    // กรองค่าสำหรับจำนวนเต็มหรือทศนิยมตาม decimal_allow2
    if (decimal_allow2 === 2) {
      return value.replace(/\.\d*/, ''); // ตัดทศนิยมออกถ้า decimal_allow2 === 2
    } else {
      return value;
    }
  };

  return (
    <View style={styles.chexBoxGroupContainer}>
      <Container>
        {/* title */}
        <TouchableOpacity
          onPress={handleOnPressType}
          style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CheckBox
            boxType={'circle'}
            disabled
            onCheck={valueType === 1}
            isCustom
          />
          <TextRegular size={FONT_SIZE.BODY_3} style={styles.shiftCheckbox}>
            {Translate('textChooseCumulativePayoutRate_1')}
          </TextRegular>
        </TouchableOpacity>

        {/* picker */}
        <View style={styles.pickerContainer}>
          <View style={styles.pickerContent}>
            <Controller
              control={control}
              name="min_rate"
              defaultValue={'2.00'}
              rules={{
                required: {
                  value: getValues('type') == 1 ? true : false,
                  message: Translate('textInputRequired'),
                },
                pattern: {
                  value: REGEX_TWO_DEGIT,
                  message: Translate('textInputOnlyNumber'),
                },
                validate: {
                  more: v =>
                    parseFloat(v) >= 2 ||
                    'อัตราสะสมสามารถปรับเปลี่ยนได้ ตั้งแต่ 2% ขึ้นไป',
                  less: v =>
                    parseFloat(v) < getValues('max_rate') ||
                    'อัตราสะสมสามารถปรับเปลี่ยนได้ ระหว่าง 2-15%',
                },
              }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Input
                  ref={minRateInputRef}
                  placeholder="กำหนดช่วงอัตรา"
                  style={[styles.picker]}
                  inputContainerStyle={[
                    styles.input,
                    error && styles.errorStyle,
                  ]}
                  containerStyle={{ paddingHorizontal: 0 }}
                  inputStyle={{
                    fontSize: FONT_SIZE.BODY_3,
                    fontFamily: FONT_TYPE.REGULAR,
                  }}
                  errorMessage={error?.message}
                  errorStyle={
                    error ? { fontFamily: FONT_TYPE.REGULAR } : { display: 'none' }
                  }
                  value={filterNumberBasedOnDecimal(value)}
                  onChangeText={v => {
                    onChange(
                      String(
                        v.match(
                          decimal_allow2 === 2
                            ? REGEX_NUMBER
                            : REGEX_TWO_DEGIT,
                        ) ?? '',
                      ),
                    )
                    // onChange(String(v.match(REGEX_TWO_DEGIT) ?? ''));
                  }}
                  // onEndEditing={() => {
                  //   onChange(filterInputNumberPoint(value));
                  // }}
                  onTouchStart={handleOnPressType}
                />
              )}
            />
          </View>
          <View style={styles.pickerTextContainer}>
            <TextRegular style={styles.pickerText} size={FONT_SIZE.BODY_3}>
              {Translate('textTo')}
            </TextRegular>
          </View>
          <View style={styles.pickerContent}>
            <Controller
              control={control}
              name="max_rate"
              defaultValue={'15.00'}
              rules={{
                required: {
                  value: getValues('type') == 1 ? true : false,
                  message: Translate('textInputRequired'),
                },
                pattern: {
                  value: REGEX_TWO_DEGIT,
                  message: Translate('textInputOnlyNumber'),
                },
                validate: {
                  more: v =>
                    parseFloat(v) > getValues('min_rate') ||
                    'อัตราสะสมสามารถปรับเปลี่ยนได้ ระหว่าง 2-15%',
                  less: v =>
                    parseFloat(v) <= 15 ||
                    'อัตราสะสมสามารถปรับเปลี่ยนได้ ไม่เกิน 15%',
                },
              }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Input
                  ref={maxRateInputRef}
                  placeholder="กำหนดช่วงอัตรา"
                  style={[styles.picker]}
                  inputContainerStyle={[
                    styles.input,
                    error && styles.errorStyle,
                  ]}
                  containerStyle={{ paddingHorizontal: 0 }}
                  inputStyle={{
                    fontSize: FONT_SIZE.BODY_3,
                    fontFamily: FONT_TYPE.REGULAR,
                  }}
                  errorMessage={error?.message}
                  errorStyle={
                    error ? { fontFamily: FONT_TYPE.REGULAR } : { display: 'none' }
                  }
                  value={filterNumberBasedOnDecimal(value)}
                  onChangeText={v => {
                    onChange(
                      String(
                        v.match(
                          decimal_allow2 === 2
                            ? REGEX_NUMBER
                            : REGEX_TWO_DEGIT,
                        ) ?? '',
                      ),
                    )
                    // onChange(String(v.match(REGEX_TWO_DEGIT) ?? ''));
                  }}
                  // onEndEditing={() => {
                  //   onChange(filterInputNumberPoint(value));
                  // }}
                  onTouchStart={handleOnPressType}
                />
              )}
            />
          </View>
        </View>

        {/* check decimal */}
        <View
          style={{
            alignItems: 'flex-start',
            marginTop: ViewScale(10),
          }}>
          <Controller
            name="decimal_allow2"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  handleDecimalChange(onChange, value);
                }}>
                <CheckBox value={value === 2} />
                <TextRegular size={FONT_SIZE.BODY_2}>
                  ไม่ยินยอมให้กรอกเป็นทศนิยม
                </TextRegular>
              </TouchableOpacity>
            )}
          />
        </View>
      </Container>
    </View>
  );
};

export default Type1;
