import {View, TouchableOpacity} from 'react-native';
import React from 'react';

import styles, {SegmentedControlTabProps} from '../Style';
import {
  Button,
  CheckBox,
  InputBorder,
  InputElement,
  LineHorizontal,
  Picker,
  TextMedium,
  TextRegular,
} from 'components/atoms';
import {COLORS, FONT_SIZE, FONT_TYPE, SPACING} from 'styles';
import {Translate} from 'function';
import {ViewScale} from 'utils';
import {Container} from 'components/common';
import {Controller, useFieldArray, useWatch} from 'react-hook-form';
import {Input} from 'react-native-elements';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import dayjs from 'dayjs';
import {useNavigation} from '@react-navigation/native';

const DateArray = Array(31)
  .fill(0)
  .map((item, index) => ({label: String(index + 1), value: index + 1}));

export default ({control, onSubmit}) => {
  const navigation = useNavigation();

  const [agreement, setAgreement] = React.useState(false);

  const MonthArray = React.useMemo(() =>
    Array(12)
      .fill(0)
      .map(
        (item, index) => ({
          label: dayjs(new Date(99, index)).format('MMMM'),
          value: index + 1,
        }),
        [],
      ),
  );

  const handleOnPressHistorySetting = () => {
    navigation.navigate('ChangeAccumulateHistory');
  };

  const value = useWatch({control, name: 'max_change_rate.value'});
  const rule = useWatch({control, name: 'max_change_rate.rule'});

  const {fields, append, remove} = useFieldArray({
    control,
    name: 'max_change_rate.rule',
  });

  React.useEffect(() => {
    if (value > rule.length) {
      append(
        [...Array(value - rule.length).keys()].map(() => ({
          day_start: '',
          day_end: '',
          month_com: '',
          month_change: '',
          status_change: 1,
        })),
      );
    } else {
      const start = value;
      const end = rule.length;
      const range = [...Array(end - start + 1).keys()].map(x => x + start);
      remove(range);
    }
  }, [value]);

  return (
    <View style={styles.chexBoxGroupContainer}>
      <View style={styles.footerContainer}>
        <Container style={{marginBottom: ViewScale(20)}}>
          <TextMedium
            size={FONT_SIZE.BODY_2}
            style={{marginVertical: ViewScale(10)}}>
            {Translate('textCumulativePayoutRateCondition')}
          </TextMedium>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <TextRegular
              size={FONT_SIZE.BODY_3}
              style={{marginVertical: ViewScale(10)}}>
              {'เปลี่ยนแปลงอัตราการจ่ายเงินสะสมได้ปีละ'}
            </TextRegular>
            <Controller
              control={control}
              name="max_change_rate.value"
              defaultValue={null}
              rules={{required: true}}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <Picker
                  //   inputContainer={error && {borderColor: COLORS.ERROR}}
                  containerStyle={{
                    marginHorizontal: ViewScale(10),
                    width: ViewScale(80),
                  }}
                  hidePlaceHolder
                  onValueChange={onChange}
                  items={Array(20)
                    .fill(0)
                    .map((item, index) => ({
                      value: index + 1,
                      label: String(index + 1),
                    }))}
                />
              )}
            />
            <TextRegular
              size={FONT_SIZE.BODY_3}
              style={{marginVertical: ViewScale(10)}}>
              {'ครั้ง'}
            </TextRegular>
          </View>
        </Container>

        <LineHorizontal
          style={{borderBottomWidth: 0.5, borderColor: COLORS.BORDER}}
        />

        {fields.map((field, index) => (
          <View
            key={field.id}
            style={{
              borderBottomWidth: 1,
              borderColor: COLORS.BORDER,
              paddingVertical: ViewScale(25),
            }}>
            <Container>
              <TextMedium size={FONT_SIZE.BODY_2}>
                โดยมีความประสงค์ดังนี้
              </TextMedium>
              <TextMedium
                size={FONT_SIZE.BODY_2}
                style={{marginTop: ViewScale(10)}}>
                {`ครั้งที่ ${index + 1}`}
              </TextMedium>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TextRegular style={{marginRight: ViewScale(10)}}>
                  ตั้งแต่วันที่
                </TextRegular>
                <Controller
                  control={control}
                  name={`max_change_rate.rule.${index}.day_start`}
                  rules={{required: true}}
                  render={({field: {onChange, value}, fieldState: {error}}) => (
                    <Input
                      placeholder="วัน"
                      style={[styles.picker]}
                      inputContainerStyle={[
                        styles.input,
                        error && styles.errorStyle,
                      ]}
                      containerStyle={{paddingHorizontal: 0, flex: 1}}
                      inputStyle={{
                        fontSize: FONT_SIZE.BODY_3,
                        fontFamily: FONT_TYPE.REGULAR,
                      }}
                      errorMessage={error?.message}
                      errorStyle={
                        error?.message
                          ? {fontFamily: FONT_TYPE.REGULAR}
                          : {display: 'none'}
                      }
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />
                <TextRegular style={{marginHorizontal: ViewScale(10)}}>
                  ถึงวันที่
                </TextRegular>

                <Controller
                  control={control}
                  name={`max_change_rate.rule.${index}.day_end`}
                  rules={{required: true}}
                  render={({field: {onChange, value}, fieldState: {error}}) => (
                    <Input
                      placeholder="วัน"
                      style={[styles.picker]}
                      inputContainerStyle={[
                        styles.input,
                        error && styles.errorStyle,
                      ]}
                      containerStyle={{paddingHorizontal: 0, flex: 1}}
                      inputStyle={{
                        fontSize: FONT_SIZE.BODY_3,
                        fontFamily: FONT_TYPE.REGULAR,
                      }}
                      errorMessage={error?.message}
                      errorStyle={
                        error?.message
                          ? {fontFamily: FONT_TYPE.REGULAR}
                          : {display: 'none'}
                      }
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: ViewScale(15),
                }}>
                <Controller
                  control={control}
                  name={`max_change_rate.rule.${index}.month_com`}
                  defaultValue={null}
                  rules={{required: true}}
                  render={({field: {onChange, value}, fieldState: {error}}) => (
                    <Picker
                      inputContainer={error && {borderColor: COLORS.ERROR}}
                      containerStyle={{
                        marginRight: ViewScale(10),
                        flex: 1,
                      }}
                      placeholder={'เดือน'}
                      onValueChange={onChange}
                      items={MonthArray}
                    />
                  )}
                />
                <TextRegular>ของทุกปี</TextRegular>
              </View>
              <TextRegular
                style={{marginTop: ViewScale(15)}}
                size={FONT_SIZE.BODY_2}>
                โดยที่อัตราเงินสะสมใหม่จะเริ่มมีผลใช้บังคับตั้งแต่รอบการจ่ายค่าจ้างประจำเดือน
              </TextRegular>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: ViewScale(15),
                }}>
                <Controller
                  control={control}
                  name={`max_change_rate.rule.${index}.month_change`}
                  defaultValue={null}
                  rules={{required: true}}
                  render={({field: {onChange, value}, fieldState: {error}}) => (
                    <Picker
                      inputContainer={error && {borderColor: COLORS.ERROR}}
                      containerStyle={{
                        marginRight: ViewScale(10),
                        flex: 1,
                      }}
                      placeholder={'เดือน'}
                      onValueChange={onChange}
                      items={MonthArray}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`max_change_rate.rule.${index}.status_change`}
                  rules={{required: true}}
                  render={({field: {onChange, value}, fieldState: {error}}) => {
                    return (
                      <SegmentedControlTab
                        values={['ปีเดียวกัน', 'ปีถัดไป']}
                        selectedIndex={value - 1}
                        onTabPress={v => onChange(v + 1)}
                        {...SegmentedControlTabProps}
                      />
                    );
                  }}
                />
              </View>
            </Container>
          </View>
        ))}

        <Container style={{marginTop: ViewScale(20)}}>
          <TouchableOpacity
            onPress={handleOnPressHistorySetting}
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <TextMedium size={FONT_SIZE.BODY_2} color={COLORS.PRIMARY}>
              ดูการตั้งค่าล่าสุด
            </TextMedium>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setAgreement(!agreement);
            }}>
            <View style={styles.termOfUseContainer}>
              <CheckBox value={agreement} />
              <TextRegular size={FONT_SIZE.BODY_3} style={styles.shiftCheckbox}>
                {Translate('textCumulativePayoutRateAgreement')}
              </TextRegular>
            </View>
          </TouchableOpacity>

          <View style={styles.buttonFooterContainer}>
            <Button
              type="fill"
              title={Translate('textSave')}
              disabled={!agreement}
              onPress={onSubmit}
            />
          </View>
        </Container>
      </View>
    </View>
  );
};
