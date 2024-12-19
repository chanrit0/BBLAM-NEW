import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from '../Style';
import {Container} from 'components/common';
import {CheckBox, TextRegular} from 'components/atoms';
import {FONT_SIZE, FONT_TYPE} from 'styles';
import {Controller} from 'react-hook-form';
import {Translate} from 'function';
import {Input} from 'react-native-elements';
import {REGEX_TWO_DEGIT} from 'constants';
import {filterInputNumberPoint} from 'utils';

export default ({
  control,
  onChangeType,
  valueType,
  getValues,
  watch,
  clearErrors,
}) => {
  const handleOnPressType = () => {
    onChangeType(2);
  };

  return (
    <View style={styles.chexBoxGroupContainer}>
      <Container>
        {/* title */}
        <TouchableOpacity
          onPress={handleOnPressType}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <CheckBox
            boxType={'circle'}
            disabled
            onCheck={valueType === 2}
            isCustom
          />
          <TextRegular size={FONT_SIZE.BODY_3} style={styles.shiftCheckbox}>
            {Translate('textChooseCumulativePayoutRate_2')}
          </TextRegular>
        </TouchableOpacity>

        {/* picker */}
        <View style={styles.pickerContainer}>
          <View style={styles.pickerContent}>
            {getValues('type') == 2 ? (
              <Controller
                control={control}
                name="rate_1"
                defaultValue={'2.00'}
                rules={{
                  required: {
                    value:
                      getValues('type') == 2 &&
                      watch('rate_1') === '' &&
                      watch('rate_2') === '' &&
                      watch('rate_3') === '' &&
                      watch('rate_4') === '',
                    message: Translate('textInputRequired'),
                  },
                  pattern: {
                    value: REGEX_TWO_DEGIT,
                    message: Translate('textInputOnlyNumber'),
                  },
                  validate: {
                    range: v =>
                      (parseFloat(v) >= 2 && parseFloat(v) <= 15) ||
                      'อัตราสะสมสามารถปรับเปลี่ยนได้ ระหว่าง 2-15%',
                  },
                }}
                render={({field: {onChange, value}, fieldState: {error}}) => (
                  <Input
                    placeholder="กำหนดช่วงอัตรา"
                    style={[styles.picker]}
                    inputContainerStyle={[
                      styles.input,
                      error && styles.errorStyle,
                    ]}
                    containerStyle={{paddingHorizontal: 0}}
                    inputStyle={{
                      fontSize: FONT_SIZE.BODY_3,
                      fontFamily: FONT_TYPE.REGULAR,
                    }}
                    errorMessage={error?.message}
                    errorStyle={
                      error
                        ? {fontFamily: FONT_TYPE.REGULAR}
                        : {display: 'none'}
                    }
                    value={value}
                    onChangeText={v => {
                      onChange(String(v.match(REGEX_TWO_DEGIT) ?? ''));
                    }}
                    onEndEditing={() => {
                      onChange(filterInputNumberPoint(value));
                    }}
                    onTouchStart={handleOnPressType}
                  />
                )}
              />
            ) : (
              <Controller
                control={control}
                name="rate_11"
                defaultValue={'2.00'}
                render={({field: {onChange, value}, fieldState: {error}}) => (
                  <Input
                    placeholder="กำหนดช่วงอัตรา"
                    style={[styles.picker]}
                    inputContainerStyle={[
                      styles.input,
                      error && styles.errorStyle,
                    ]}
                    containerStyle={{paddingHorizontal: 0}}
                    inputStyle={{
                      fontSize: FONT_SIZE.BODY_3,
                      fontFamily: FONT_TYPE.REGULAR,
                    }}
                    errorMessage={error?.message}
                    errorStyle={
                      error
                        ? {fontFamily: FONT_TYPE.REGULAR}
                        : {display: 'none'}
                    }
                    value={value}
                    onChangeText={v => {
                      onChange(String(v.match(REGEX_TWO_DEGIT) ?? ''));
                    }}
                    onEndEditing={() => {
                      onChange(filterInputNumberPoint(value));
                    }}
                    onTouchStart={handleOnPressType}
                  />
                )}
              />
            )}
          </View>
          <View style={styles.pickerTextContainer}>
            <TextRegular style={styles.pickerText} size={FONT_SIZE.BODY_3}>
              {Translate('textOr')}
            </TextRegular>
          </View>

          <View style={styles.pickerContent}>
            {getValues('type') == 2 ? (
              <Controller
                control={control}
                name="rate_2"
                defaultValue={'5.00'}
                rules={{
                  pattern: {
                    value: REGEX_TWO_DEGIT,
                    message: Translate('textInputOnlyNumber'),
                  },
                  validate: {
                    range: v =>
                      (parseFloat(v) >= 2 && parseFloat(v) <= 15) ||
                      'อัตราสะสมสามารถปรับเปลี่ยนได้ ระหว่าง 2-15%',
                  },
                }}
                render={({field: {onChange, value}, fieldState: {error}}) => (
                  <Input
                    placeholder="กำหนดช่วงอัตรา"
                    style={[styles.picker]}
                    inputContainerStyle={[
                      styles.input,
                      error && styles.errorStyle,
                    ]}
                    containerStyle={{paddingHorizontal: 0}}
                    inputStyle={{
                      fontSize: FONT_SIZE.BODY_3,
                      fontFamily: FONT_TYPE.REGULAR,
                    }}
                    errorMessage={error?.message}
                    errorStyle={
                      error
                        ? {fontFamily: FONT_TYPE.REGULAR}
                        : {display: 'none'}
                    }
                    value={value}
                    onChangeText={v => {
                      onChange(String(v.match(REGEX_TWO_DEGIT) ?? ''));
                    }}
                    onEndEditing={() => {
                      onChange(filterInputNumberPoint(value));
                    }}
                    onTouchStart={handleOnPressType}
                  />
                )}
              />
            ) : (
              <Controller
                control={control}
                name="rate_22"
                defaultValue={'5.00'}
                render={({field: {onChange, value}, fieldState: {error}}) => (
                  <Input
                    placeholder="กำหนดช่วงอัตรา"
                    style={[styles.picker]}
                    inputContainerStyle={[
                      styles.input,
                      error && styles.errorStyle,
                    ]}
                    containerStyle={{paddingHorizontal: 0}}
                    inputStyle={{
                      fontSize: FONT_SIZE.BODY_3,
                      fontFamily: FONT_TYPE.REGULAR,
                    }}
                    errorMessage={error?.message}
                    errorStyle={
                      error
                        ? {fontFamily: FONT_TYPE.REGULAR}
                        : {display: 'none'}
                    }
                    value={value}
                    onChangeText={v => {
                      onChange(String(v.match(REGEX_TWO_DEGIT) ?? ''));
                    }}
                    onEndEditing={() => {
                      onChange(filterInputNumberPoint(value));
                    }}
                    onTouchStart={handleOnPressType}
                  />
                )}
              />
            )}
          </View>
          <View style={styles.pickerTextContainer}>
            <TextRegular style={styles.pickerText} size={FONT_SIZE.BODY_3}>
              {Translate('textOr')}
            </TextRegular>
          </View>

          <View style={styles.pickerContent}>
            {getValues('type') == 2 ? (
              <Controller
                control={control}
                name="rate_3"
                defaultValue={'7.00'}
                rules={{
                  pattern: {
                    value: REGEX_TWO_DEGIT,
                    message: Translate('textInputOnlyNumber'),
                  },
                  validate: {
                    range: v =>
                      (parseFloat(v) >= 2 && parseFloat(v) <= 15) ||
                      'อัตราสะสมสามารถปรับเปลี่ยนได้ ระหว่าง 2-15%',
                  },
                }}
                render={({field: {onChange, value}, fieldState: {error}}) => (
                  <Input
                    placeholder="กำหนดช่วงอัตรา"
                    style={[styles.picker]}
                    inputContainerStyle={[
                      styles.input,
                      error && styles.errorStyle,
                    ]}
                    containerStyle={{paddingHorizontal: 0}}
                    inputStyle={{
                      fontSize: FONT_SIZE.BODY_3,
                      fontFamily: FONT_TYPE.REGULAR,
                    }}
                    errorMessage={error?.message}
                    errorStyle={
                      error
                        ? {fontFamily: FONT_TYPE.REGULAR}
                        : {display: 'none'}
                    }
                    value={value}
                    onChangeText={v => {
                      onChange(String(v.match(REGEX_TWO_DEGIT) ?? ''));
                    }}
                    onEndEditing={() => {
                      onChange(filterInputNumberPoint(value));
                    }}
                    onTouchStart={handleOnPressType}
                  />
                )}
              />
            ) : (
              <Controller
                control={control}
                name="rate_33"
                defaultValue={'7.00'}
                render={({field: {onChange, value}, fieldState: {error}}) => (
                  <Input
                    placeholder="กำหนดช่วงอัตรา"
                    style={[styles.picker]}
                    inputContainerStyle={[
                      styles.input,
                      error && styles.errorStyle,
                    ]}
                    containerStyle={{paddingHorizontal: 0}}
                    inputStyle={{
                      fontSize: FONT_SIZE.BODY_3,
                      fontFamily: FONT_TYPE.REGULAR,
                    }}
                    errorMessage={error?.message}
                    errorStyle={
                      error
                        ? {fontFamily: FONT_TYPE.REGULAR}
                        : {display: 'none'}
                    }
                    value={value}
                    onChangeText={v => {
                      onChange(String(v.match(REGEX_TWO_DEGIT) ?? ''));
                    }}
                    onEndEditing={() => {
                      onChange(filterInputNumberPoint(value));
                    }}
                    onTouchStart={handleOnPressType}
                  />
                )}
              />
            )}
          </View>
          <View style={styles.pickerTextContainer}>
            <TextRegular style={styles.pickerText} size={FONT_SIZE.BODY_3}>
              {Translate('textOr')}
            </TextRegular>
          </View>

          <View style={styles.pickerContent}>
            {getValues('type') == 2 ? (
              <Controller
                control={control}
                name="rate_4"
                defaultValue={'11.00'}
                rules={{
                  pattern: {
                    value: REGEX_TWO_DEGIT,
                    message: Translate('textInputOnlyNumber'),
                  },
                  validate: {
                    range: v =>
                      (parseFloat(v) >= 2 && parseFloat(v) <= 15) ||
                      'อัตราสะสมสามารถปรับเปลี่ยนได้ ระหว่าง 2-15%',
                  },
                }}
                render={({field: {onChange, value}, fieldState: {error}}) => (
                  <Input
                    placeholder="กำหนดช่วงอัตรา"
                    style={[styles.picker]}
                    inputContainerStyle={[
                      styles.input,
                      error && styles.errorStyle,
                    ]}
                    containerStyle={{paddingHorizontal: 0}}
                    inputStyle={{
                      fontSize: FONT_SIZE.BODY_3,
                      fontFamily: FONT_TYPE.REGULAR,
                    }}
                    errorMessage={error?.message}
                    errorStyle={
                      error
                        ? {fontFamily: FONT_TYPE.REGULAR}
                        : {display: 'none'}
                    }
                    value={value}
                    onChangeText={v => {
                      onChange(String(v.match(REGEX_TWO_DEGIT) ?? ''));
                    }}
                    onEndEditing={() => {
                      onChange(filterInputNumberPoint(value));
                    }}
                    onTouchStart={handleOnPressType}
                  />
                )}
              />
            ) : (
              <Controller
                control={control}
                name="rate_41"
                defaultValue={'11.00'}
                render={({field: {onChange, value}, fieldState: {error}}) => (
                  <Input
                    placeholder="กำหนดช่วงอัตรา"
                    style={[styles.picker]}
                    inputContainerStyle={[
                      styles.input,
                      error && styles.errorStyle,
                    ]}
                    containerStyle={{paddingHorizontal: 0}}
                    inputStyle={{
                      fontSize: FONT_SIZE.BODY_3,
                      fontFamily: FONT_TYPE.REGULAR,
                    }}
                    errorMessage={error?.message}
                    errorStyle={
                      error
                        ? {fontFamily: FONT_TYPE.REGULAR}
                        : {display: 'none'}
                    }
                    value={value}
                    onChangeText={v => {
                      onChange(String(v.match(REGEX_TWO_DEGIT) ?? ''));
                    }}
                    onEndEditing={() => {
                      onChange(filterInputNumberPoint(value));
                    }}
                    onTouchStart={handleOnPressType}
                  />
                )}
              />
            )}
          </View>
        </View>
      </Container>
    </View>
  );
};
