// React
import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  InteractionManager,
  ScrollView,
  Keyboard,
  useWindowDimensions,
} from 'react-native';

// custom
import {ViewScale, FontScale, setSpinner} from 'utils';

// components
import {Ionicons} from 'components/Icons';
import {Container} from 'components/common';
import {
  Button,
  Picker,
  TextRegular,
  TextMedium,
  TextLight,
} from 'components/atoms';
// lib
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useForm, useFieldArray, Controller, useWatch} from 'react-hook-form';

import {COLORS, FONT_SIZE} from 'styles';
import {AlertFailed, AlertHTML, FundBoxDIY} from 'components/molecules';
import {Translate} from 'function';
import {sendInvestment} from 'services/api/member';
import _ from 'lodash';

export default ({data, callbackBack, typeRebalance, choice_no}) => {
  const navigation = useNavigation();
  const [passwordMatch, setPasswordMatch] = React.useState(false);
  const focused = useIsFocused();

  const {control, getValues, setValue, handleSubmit} = useForm({
    defaultValues: {
      ti_type_change: 'change_investment',
      ti_rebalance: '',
      data: data.filter((item, index) => index < 3),
    },
  });

  const {fields, remove} = useFieldArray({
    control,
    name: 'data',
  });

  const resetData = data => {
    setValue('data', data);
  };

  const removeData = index => () => {
    return remove(index);
  };

  const items = React.useMemo(() => {
    let items = [];
    if (typeRebalance !== '') {
      if (typeRebalance == 'N') {
        return (items = [
          {
            value: '1',
            label: 'ปรับสัดส่วนเงินลงทุนปัจจุบัน (Re-Balance)',
          },
          {
            value: '2',
            label: 'เปลี่ยนสัดส่วนเงินลงทุนเข้าใหม่ (Re-Allocate)',
          },
          {
            value: '3',
            label:
              'ปรับสัดส่วนเงินลงทุนปัจจุบัน \nและเปลี่ยนสัดส่วนเงินลงทุนเข้าใหม่ \n(Re-Balance & Re-Allocate)',
          },
        ]);
      } else {
        return (items = [
          {
            value: '3',
            label:
              'ปรับสัดส่วนเงินลงทุนปัจจุบัน \nและเปลี่ยนสัดส่วนเงินลงทุนเข้าใหม่ \n(Re-Balance & Re-Allocate)',
          },
        ]);
      }
    }
  }, [typeRebalance]);

  const sendapi = handleSubmit(
    async data => {
      // ลบ obj ที่ไม่มีค่า
      const filtered_data = data.data.reduce(function (filtered, option) {
        if (option.value > 0) {
          let someNewValue = {
            sub_code: option.sub_code,
            percent: option.value,
          };
          filtered.push(someNewValue);
        }
        return filtered;
      }, []);

      const filtered = {
        ...data,
        data: filtered_data,
      };

      await sendInvestment({...filtered, choice_no})
        .then(response => {
          if (response.code == '02' || response.status == 'success') {
            navigation.navigate('SuccessPage', {
              data: response.data,
              choice_name: response.choice_name,
              date: response.date,
            });
          } else {
            if (!_.isEmpty(response?.sub_code)) {
              resetData(
                getValues('data').map(item => ({
                  ...item,
                  isHighlight: response?.sub_code.includes(item.sub_code),
                })),
              );
            }
            navigation.navigate('Alert1', {
              children:
                response?.html_show == '1'
                  ? AlertHTML({html: response.message})
                  : AlertFailed(response.message),
              title: Translate('textConfirm2'),
            });
          }
        })
        .catch(error => console.log({error}));
    },
    error => console.log(error),
  );

  const _Confirm = handleSubmit(
    data => {
      Keyboard.dismiss();
      if (checkData()) {
        navigation.navigate('CheckPassword', {
          setPasswordMatch,
        });
      }
    },
    error => {
      console.log(error);
    },
  );

  const checkData = () => {
    const total = getValues('data')
      .map((item, index) => parseFloat(item.value))
      .reduce((p, c) => p + c);
    let word;
    if (total > 100) {
      word = 'มากกว่า';
    } else if (total < 100) {
      word = 'น้อยกว่า';
    } else {
      return true;
    }

    navigation.navigate('Alert1', {
      children: AlertFailed(
        'ไม่สามารถทำรายการได้',
        `เนื่องจากสัดส่วนการลงทุนของท่าน \n${word} 100.00%`,
      ),
      title: Translate('textConfirm2'),
    });

    return false;
  };

  React.useEffect(() => {
    if (passwordMatch === true && focused) {
      InteractionManager.runAfterInteractions(() => {
        sendapi().finally(() => {
          setSpinner(false);
          setPasswordMatch(false);
        });
      });
    }
  }, [passwordMatch, focused]);

  return (
    <View>
      <ScrollView>
        {fields.map((field, index) => (
          <View key={field.id}>
            <Controller
              control={control}
              defaultValue={'0.00'}
              name={`data.${index}.value`}
              render={({field: {onChange, value}}) => {
                return (
                  <FundBoxDIY
                    name={field?.sub_code}
                    ratio={field?.max_percent}
                    oldratio={field?.member_current_percent ?? 0}
                    canClose={fields.length < 2 ? false : true}
                    onPress={removeData(index)}
                    index={index}
                    tooltip={field?.tooltip}
                    onValueChange={onChange}
                    value={value}
                    isHighlight={field?.isHighlight}
                  />
                );
              }}
            />
          </View>
        ))}
      </ScrollView>

      <View style={[styles.borderTop]}>
        <Container style={{flex: 0}}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              navigation.navigate('AddFund', {
                items: data,
                resetList: resetData,
                current_list: getValues('data'),
              });
            }}>
            <Ionicons
              name="add-circle"
              size={FontScale(20)}
              color={COLORS.PRIMARY}
            />
            <TextMedium
              color={COLORS.PRIMARY}
              style={{marginLeft: ViewScale(5)}}>
              {'เพิ่ม'}
            </TextMedium>
          </TouchableOpacity>
          {/* รวม */}
          <TotalComp control={control} fields={fields} />
          <View style={{flexDirection: 'column'}}>
            <View style={styles.changeMethodContainer}>
              <TextMedium>{'วิธีการปรับแผนการลงทุนใหม่'}</TextMedium>
              <View style={{marginTop: ViewScale(10)}}>
                <Controller
                  control={control}
                  name="ti_rebalance"
                  rules={{required: true}}
                  render={({field: {onChange, value}, fieldState: {error}}) => (
                    <Picker
                      error={error}
                      items={items}
                      value={value}
                      numberOfLines={3}
                      onValueChange={onChange}
                      placeholder={'ระบุวิธีการปรับแผนการลงทุนใหม่'}
                    />
                  )}
                />
              </View>
            </View>
            <View style={styles.changeMethodContainer}>
              <TextMedium>{Translate('textEffectiveDate')}</TextMedium>
              <View style={styles.dayResult}>
                <TextLight>{'วันคำนวณจำนวนหน่วยที่ใกล้ที่สุด'}</TextLight>
              </View>
            </View>
          </View>
          {/* Botton */}
          <View style={styles.containerFooter}>
            <Button
              title="ย้อนกลับ"
              type="border"
              style={styles.ButtonLeft}
              onPress={callbackBack}
            />
            <Button
              title="ยืนยันการทำรายการ"
              type="fill"
              style={styles.ButtonRight}
              onPress={_Confirm}
            />
          </View>
        </Container>
      </View>
    </View>
  );
};

const TotalComp = ({control, fields}) => {
  const watch = useWatch({control, name: 'data'});

  let dataa = 0;
  watch.map((item, index) => {
    if (item.value === undefined) {
      dataa += 0;
    } else {
      dataa += parseFloat(item.value);
    }
  });

  if (_.isNaN(dataa)) {
    dataa = 0;
  }

  return (
    <View style={styles.sumContainer}>
      <TextMedium>{'รวม'}</TextMedium>
      <View style={styles.row}>
        <TextRegular style={{marginTop: ViewScale(10)}}>
          {'สัดส่วนการลงทุนที่เลือก'}
        </TextRegular>
        <TextMedium style={{color: dataa !== 100 ? COLORS.ERROR : 'black'}}>
          {dataa.toFixed(2).toString()}%
        </TextMedium>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dayResult: {
    marginTop: ViewScale(10),
    backgroundColor: '#eef2f6',
    padding: ViewScale(15),
  },
  changeMethodContainer: {
    marginTop: ViewScale(20),
  },
  containerFooter: {
    marginTop: ViewScale(35),
    marginBottom: ViewScale(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ButtonLeft: {
    width: '48%',
  },
  ButtonRight: {
    width: '48%',
  },
  borderTop: {
    borderTopWidth: 0.5,
    borderColor: COLORS.BORDER,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: ViewScale(10),
  },
  sumContainer: {
    backgroundColor: '#eef2f6',
    padding: ViewScale(20),
    marginTop: ViewScale(10),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const AlertCheck = ({value}) => {
  let word;
  if (value > 100) {
    word = 'เกิน';
  } else {
    word = 'น้อยกว่า';
  }

  return (
    <View style={{alignItems: 'center'}}>
      <TextMedium>{`ไม่สามารถทำรายการได้`}</TextMedium>
      <TextRegular
        size={FONT_SIZE.BODY_2}
        style={{marginTop: ViewScale(10), textAlign: 'center'}}>
        {`เนื่องจากสัดส่วนการลงทุนของท่าน \n${word} `}
        <TextMedium size={FONT_SIZE.BODY_2}>100.00%</TextMedium>
      </TextRegular>
    </View>
  );
};
