// React
import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

// custom
import {
  ViewScale,
  FontScale,
  RemoveData,
  isIOS,
  filterInputNumberPoint,
} from 'utils';
import RootStyles from '../Style';

// components
import { Picker, TextRegular, CheckBox, TextMedium } from 'components/atoms';
import { Ionicons } from 'components/Icons';

// constant
import { TouchableOpacity } from 'react-native';
import { COLORS, FONT_SIZE, FONT_TYPE, SPACING } from 'styles';
import { Controller, useFieldArray, useWatch } from 'react-hook-form';
import _ from 'lodash';
import { Input } from 'react-native-elements';
import { Translate } from 'function';
import { REGEX_NUMBER } from 'constants';
import { REGEX_TWO_DEGIT } from 'constants';

const ITEMS = [
  { label: 'อายุการทำงาน', value: 1 },
  { label: 'อายุการเป็นสมาชิก', value: 2 },
  { label: 'ตำแหน่งงาน', value: 3 },
  { label: 'อื่นๆ', value: 4 },
];

const children_items1 = [
  { label: 'น้อยกว่า', value: 1 },
  { label: 'น้อยกว่าหรือเท่ากับ', value: 4 },
];
const children_items2 = [
  { label: 'ตั้งแต่', value: 2 },
  { label: 'ตั้งแต่ (ขึ้นไป)', value: 3 },
];

const children_items3 = [
  { label: 'มากกว่า', value: 5 },
  { label: 'มากกว่า (ขึ้นไป)', value: 6 },
];

const children_itemsOther = { label: 'อื่นๆ', value: 7 };

const FormChange = ({
  control,
  handleOnPressType,
  reset,
  unregister,
  setValue,
  resetField,
  getValues,
}) => {
  const data = useWatch({ control, name: 'data' });
  const subtype = useWatch({ control, name: 'subtype' });
  const set_range = useWatch({ control, name: 'set_range' });
  const decimal_allow = useWatch({ control, name: 'decimal_allow' });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'data',
  });

  const addContent = () => {
    append({
      detail_type: '',
      value: '',
      ...(set_range === 1
        ? { rate_start: '', rate_end: '' }
        : { rate: [{ rate: '' }, { rate: '' }] }),
    });
  };

  const removeContent1 = index => () => {
    let removeData = [];
    for (let i = index; i < data.length; i++) {
      removeData.push(i);
    }

    remove(removeData);
  };

  const updateSetRange = () => {
    let data_temp = data;

    data_temp.forEach((item, index) => {
      update(index, { ...item, rate: [{ rate: '' }, { rate: '' }] });
    });
  };

  const resetData = () => {
    resetField('data');
  };

  const removeContent = index => () => {
    remove(index);
  };

  const DecimalPointsFilter = () => {
    setValue(
      'data',
      data.map(ele => {
        let temp = {};

        for (const [key, value] of Object.entries(ele)) {
          temp[key] = value;

          if (key === 'rate') {
            temp[key] = value.map(item =>
              typeof item === 'string' ? item.match(REGEX_NUMBER)[0] : item,
            );
          }

          if (typeof value === 'string') {
            if (['rate_start', 'rate_end'].includes(key)) {
              temp[key] = value.match(REGEX_NUMBER)
                ? value.match(REGEX_NUMBER)[0]
                : value;
            }
          }
        }

        return temp;
      }),
    );
  };

  const RenderAddButton = () => {
    let button = (
      <TouchableOpacity
        onPress={addContent}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-end',
          marginTop: ViewScale(5),
          marginVertical: ViewScale(10),
        }}>
        <Ionicons
          name="add-circle"
          size={FontScale(20)}
          color={COLORS.PRIMARY}
        />
        <TextMedium
          style={{
            marginLeft: ViewScale(5),
          }}
          color={COLORS.PRIMARY}>
          {'เพิ่ม'}
        </TextMedium>
      </TouchableOpacity>
    );

    if (subtype === undefined || subtype === null || subtype === '') {
      return null;
    }

    if (data.length > 0) {
      if (
        (data[0].detail_type === null ||
          data[0].detail_type === undefined ||
          data[0].detail_type === '') &&
        [1, 2, 4].includes(subtype)
      ) {
        return null;
      }

      if (data.length > 1 && [1, 2, 4].includes(subtype)) {
        if (
          data[data.length - 1].detail_type === null ||
          data[data.length - 1].detail_type === undefined ||
          data[data.length - 1].detail_type === ''
        ) {
          return null;
        }

        if (
          data[data.length - 1].detail_type === children_items2[1].value ||
          data[data.length - 1].detail_type === children_items3[1].value
        ) {
          return null;
        }
      }
    }

    return button;
  };

  const RenderContent = index => {
    let items;
    let isType2 = false;
    let isMore = false;

    if (index === 0) {
      items = [...children_items1];

      if (subtype === 4) {
        items[2] = children_itemsOther;
      }
    } else {
      if (data[index - 1].detail_type === children_itemsOther.value) {
        items = [children_itemsOther];
      } else if (data[0].detail_type === children_items1[0].value) {
        items = [...children_items2];
        if (subtype === 4) {
          items[2] = children_itemsOther;
        }
      } else if (data[0].detail_type === children_items1[1].value) {
        items = [...children_items3];
        if (subtype === 4) {
          items[2] = children_itemsOther;
        }
      } else if (data[0].detail_type === children_itemsOther.value) {
        items = [children_itemsOther];
      }

      if (
        data[index]?.detail_type !== null &&
        data[index]?.detail_type !== undefined &&
        data[index]?.detail_type !== '' &&
        [children_items2[0].value, children_items3[0].value].includes(
          data[index].detail_type,
        )
      ) {
        if (children_items3[0].value == data[index].detail_type) {
          isMore = true;
        }
        isType2 = true;
      }
    }

    switch (subtype) {
      case 1:
      case 2:
        return (
          <Content1
            decimal_allow={decimal_allow}
            onPressRemove={removeContent1(index)}
            control={control}
            index={index}
            update={update}
            handleOnPressType={handleOnPressType}
            remove={remove}
            isType2={isType2}
            items={items}
            set_range={set_range}
            watchData={data}
            isMore={isMore}
          />
        );

      case 3:
        return (
          <Content2
            decimal_allow={decimal_allow}
            onPressRemove={removeContent(index)}
            control={control}
            index={index}
            update={update}
            set_range={set_range}
            handleOnPressType={handleOnPressType}
            remove={remove}
          />
        );
      case 4:
        return (
          <Content1
            decimal_allow={decimal_allow}
            onPressRemove={removeContent1(index)}
            control={control}
            index={index}
            update={update}
            handleOnPressType={handleOnPressType}
            remove={remove}
            isType2={isType2}
            items={items}
            set_range={set_range}
            subtype={subtype}
            watchData={data}
            isMore={isMore}
          />
        );

      default:
        return null;
    }
  };

  React.useEffect(() => {
    resetData();
  }, [subtype]);

  return (
    <View style={styles.rootContainer}>
      {/* header */}
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <Controller
            control={control}
            name={'subtype'}
            defaultValue={null}
            render={({ field: { onChange, value } }) => (
              <Picker
                placeholder={'เลือกช่วงอัตรา'}
                containerStyle={styles.pickerHeader}
                items={ITEMS}
                onValueChange={v => {
                  onChange(v);
                  handleOnPressType();
                }}
              />
            )}
          />
          <Controller
            control={control}
            name="set_range"
            render={({ field: { onChange, value } }) => (
              <TouchableOpacity
                TouchableOpacity
                style={styles.noRateRange}
                onPress={() => {
                  updateSetRange();
                  onChange(value === 2 ? 1 : 2);
                }}>
                <CheckBox
                  style={{
                    marginRight: !isIOS ? ViewScale(10) : 0,
                    backgroundColor: isIOS ? COLORS.WHITE : null,
                    borderRadius: 0,
                  }}
                  value={value === 2 ? true : false}
                  tintColors={{ false: COLORS.WHITE, true: COLORS.WHITE }}
                  onCheckColor={COLORS.PRIMARY}
                  tintColor={COLORS.WHITE}
                  onFillColor={COLORS.WHITE}
                  onTintColor={COLORS.WHITE}
                />
                <TextRegular
                  style={styles.pickerHeaderText}
                  color={COLORS.WHITE}>
                  {'ไม่กำหนดช่วงอัตรา'}
                </TextRegular>
              </TouchableOpacity>
            )}
          />
        </View>
        {subtype === 4 && (
          <Controller
            control={control}
            name={'other'}
            defaultValue={''}
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                placeholder="โปรดระบุ"
                onChangeText={onChange}
                value={value}
                style={RootStyles.input}
                inputStyle={{
                  fontFamily: FONT_TYPE.REGULAR,
                  fontSize: FONT_SIZE.BODY_2,
                  height: SPACING.INPUT_HEIGHT,
                }}
                inputContainerStyle={
                  !error
                    ? {
                      borderBottomWidth: 0,
                    }
                    : {
                      borderWidth: 1,
                      borderBottomColor: COLORS.ERROR,
                      borderBottomWidth: 1,
                    }
                }
                errorStyle={{ display: 'none' }}
                containerStyle={{
                  width: ViewScale(200),
                  marginTop: ViewScale(10),
                  paddingHorizontal: 0,
                }}
              />
            )}
          />
        )}
      </View>

      {/* content */}
      {fields.map((field, index) => (
        <View key={field.id}>{RenderContent(index)}</View>
      ))}

      {/* add btn */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: ViewScale(10),
        }}>
        <Controller
          name="decimal_allow"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                onChange(value === 2 ? 1 : 2);
                DecimalPointsFilter();
              }}>
              <CheckBox value={value === 2} />
              <TextRegular size={FONT_SIZE.BODY_2}>
                ไม่ยินยอมให้กรอกเป็นทศนิยม
              </TextRegular>
            </TouchableOpacity>
          )}
        />
        <RenderAddButton />
      </View>
    </View>
  );
};

const Content1 = ({
  onPressRemove,
  control,
  index,
  remove,
  items,
  decimal_allow,
  isType2,
  set_range,
  subtype,
  watchData,
  isMore,
}) => {
  const [typeOther, setTypeOther] = React.useState(true);
  const filterNumberBasedOnDecimal = (value) => {
    // กรองค่าสำหรับจำนวนเต็มหรือทศนิยมตาม decimal_allow2
    if (decimal_allow === 2) {
      return value.replace(/\.\d*/, ''); // ตัดทศนิยมออกถ้า decimal_allow2 === 2
    }
    return value; // อนุญาตทศนิยมถ้า decimal_allow2 === 1
  };
  return (
    <View style={styles.contentContianer}>
      <View style={styles.rowContainer}>
        <Controller
          control={control}
          name={`data.${index}.detail_type`}
          rules={{ required: true }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Picker
              placeholder={'โปรดระบุ'}
              items={items}
              onValueChange={v => {
                if (v == 7 || v == undefined) {
                  setTypeOther(true)
                } else {
                  setTypeOther(false)
                }
                onChange(v);
              }}
              value={value}
              pickerStyle={{
                backgroundColor: COLORS.WHITE,
              }}
              containerStyle={{
                backgroundColor: COLORS.WHITE,
                flex: 0.5,
              }}
              error={error}
            />
          )}
        />
        {isType2 ? (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                width: ViewScale(70),
                marginRight: ViewScale(5),
              }}>
              <Controller
                name={`data.${index}.start`}
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <Input
                    style={RootStyles.picker}
                    inputContainerStyle={[
                      RootStyles.input,
                      { paddingRight: ViewScale(30) },
                      error && RootStyles.errorStyle,
                    ]}
                    containerStyle={{
                      paddingHorizontal: 0,
                    }}
                    inputStyle={{
                      fontSize: FONT_SIZE.BODY_3,
                      fontFamily: FONT_TYPE.REGULAR,
                    }}
                    errorStyle={{ display: 'none' }}
                    value={value}
                    onChangeText={v => {
                      let dataChange =
                        subtype === 4 ? v : String(v.match(REGEX_NUMBER) ?? '');
                      onChange(dataChange);
                    }}
                  />
                )}
              />
              {subtype !== 4 && (
                <TextRegular
                  style={{
                    position: 'absolute',
                    top: '25%',
                    right: ViewScale(10),
                  }}>
                  {Translate('textYear')}
                </TextRegular>
              )}
            </View>
            <TextRegular size={FONT_SIZE.BODY_3} style={{ alignSelf: 'center' }}>
              {isMore ? 'แต่ไม่เกิน' : 'แต่น้อยกว่า'}
            </TextRegular>
            <View
              style={{
                width: ViewScale(70),
                marginLeft: ViewScale(5),
              }}>
              <Controller
                name={`data.${index}.end`}
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <Input
                    style={RootStyles.picker}
                    inputContainerStyle={[
                      RootStyles.input,
                      { paddingRight: ViewScale(30) },
                      error && RootStyles.errorStyle,
                    ]}
                    containerStyle={{
                      paddingHorizontal: 0,
                    }}
                    inputStyle={{
                      fontSize: FONT_SIZE.BODY_3,
                      fontFamily: FONT_TYPE.REGULAR,
                    }}
                    errorStyle={{ display: 'none' }}
                    value={value}
                    onChangeText={v => {
                      let dataChange =
                        subtype === 4 ? v : String(v.match(REGEX_NUMBER) ?? '');
                      onChange(dataChange);
                    }}
                  />
                )}
              />
              {subtype !== 4 && (
                <TextRegular
                  style={{
                    position: 'absolute',
                    top: '25%',
                    right: ViewScale(10),
                  }}>
                  {Translate('textYear')}
                </TextRegular>
              )}
            </View>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              marginLeft: ViewScale(10),
            }}>
            <Controller
              name={`data.${index}.value`}
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Input
                  style={RootStyles.picker}
                  placeholder={'โปรดระบุ'}
                  inputContainerStyle={[
                    RootStyles.input,
                    { paddingRight: ViewScale(30) },
                    error && RootStyles.errorStyle,
                  ]}
                  containerStyle={{
                    paddingHorizontal: 0,
                  }}
                  inputStyle={{
                    fontSize: FONT_SIZE.BODY_3,
                    fontFamily: FONT_TYPE.REGULAR,
                  }}
                  errorStyle={{ display: 'none' }}
                  value={value}
                  onChangeText={v => {
                    let data =
                      typeOther ? v : String(v.match(REGEX_NUMBER) ?? '');
                    onChange(data);
                  }}
                />
              )}
            />
            {!typeOther && (
              <TextRegular
                style={{
                  position: 'absolute',
                  top: '25%',
                  right: ViewScale(10),
                }}>
                {Translate('textYear')}
              </TextRegular>
            )}
          </View>
        )}

        <TouchableOpacity style={styles.remove} onPress={onPressRemove}>
          <Ionicons
            name="remove-circle"
            color={COLORS.ERROR}
            size={FontScale(24)}
          />
        </TouchableOpacity>
      </View>
      <TextRegular
        style={{ fontSize: FONT_SIZE.BODY_2, marginTop: ViewScale(10) }}>
        {'อัตราการจ่ายเงินสะสม'}
      </TextRegular>
      <View style={[styles.rowContainer, { marginTop: ViewScale(10) }]}>
        {set_range === 1 ? (
          <>
            <View
              style={{
                flex: 1,
              }}>
              <Controller
                name={`data.${index}.rate_start`}
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: Translate('textInputRequired'),
                  },
                  validate: {
                    more: v =>
                      (parseFloat(v) >= 2 && parseFloat(v) <= 15) ||
                      'อัตราสะสมสามารถปรับเปลี่ยนได้ ระหว่าง 2-15%',
                    less: v =>
                      parseFloat(v) < watchData[index].rate_end ||
                      'อัตราสะสมสามารถปรับเปลี่ยนได้ ระหว่าง 2-15%',
                  },
                }}
                render={({ field: { onChange, value }, fieldState: { error } }) => {
                  return <Input
                    style={RootStyles.picker}
                    inputContainerStyle={[
                      RootStyles.input,
                      { paddingRight: ViewScale(30) },
                      error && RootStyles.errorStyle,
                    ]}
                    containerStyle={{
                      flex: 1,
                      paddingHorizontal: 0,
                    }}
                    inputStyle={{
                      fontSize: FONT_SIZE.BODY_3,
                      fontFamily: FONT_TYPE.REGULAR,
                    }}
                    errorMessage={error?.message}
                    errorStyle={
                      error
                        ? { fontFamily: FONT_TYPE.REGULAR }
                        : { display: 'none' }
                    }
                    value={filterNumberBasedOnDecimal(value)}
                    onChangeText={v => {
                      onChange(
                        String(
                          v.match(
                            decimal_allow === 2
                              ? REGEX_NUMBER
                              : REGEX_TWO_DEGIT,
                          ) ?? '',
                        ),
                      );
                    }}
                    onEndEditing={v => {
                      onChange(filterInputNumberPoint(value));
                    }}
                  />
                }}
              />
              <TextRegular
                style={{
                  position: 'absolute',
                  top: ViewScale(15),
                  right: ViewScale(10),
                }}>
                {'%'}
              </TextRegular>
            </View>

            <View
              style={{
                height: ViewScale(55),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TextRegular
                style={{
                  marginHorizontal: ViewScale(10),
                  alignSelf: 'center',
                }}
                size={FONT_SIZE.BODY_2}>
                {'ถึง'}
              </TextRegular>
            </View>
            <View
              style={{
                flex: 1,
              }}>
              <Controller
                name={`data.${index}.rate_end`}
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: Translate('textInputRequired'),
                  },

                  validate: {
                    range: v =>
                      (parseFloat(v) >= 2 && parseFloat(v) <= 15) ||
                      'อัตราสะสมสามารถปรับเปลี่ยนได้ ระหว่าง 2-15%',
                    more: v =>
                      parseFloat(v) > watchData[index].rate_start ||
                      'อัตราสะสมสามารถปรับเปลี่ยนได้ ระหว่าง 2-15%',
                  },
                }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <Input
                    style={RootStyles.picker}
                    inputContainerStyle={[
                      RootStyles.input,
                      { paddingRight: ViewScale(30) },
                      error && RootStyles.errorStyle,
                    ]}
                    containerStyle={{
                      flex: 1,
                      paddingHorizontal: 0,
                    }}
                    inputStyle={{
                      fontSize: FONT_SIZE.BODY_3,
                      fontFamily: FONT_TYPE.REGULAR,
                    }}
                    errorStyle={
                      error
                        ? { fontFamily: FONT_TYPE.REGULAR }
                        : { display: 'none' }
                    }
                    errorMessage={error?.message}
                    value={filterNumberBasedOnDecimal(value)}
                    onChangeText={v =>
                      onChange(
                        String(
                          v.match(
                            decimal_allow === 2
                              ? REGEX_NUMBER
                              : REGEX_TWO_DEGIT,
                          ) ?? '',
                        ),
                      )
                    }
                    onEndEditing={v => {
                      onChange(filterInputNumberPoint(value));
                    }}
                  />
                )}
              />
              <TextRegular
                style={{
                  position: 'absolute',
                  top: ViewScale(15),
                  right: ViewScale(10),
                }}>
                {'%'}
              </TextRegular>
            </View>
          </>
        ) : (
          <RateComp
            control={control}
            decimal_allow={decimal_allow}
            globalIndex={index}
          />
        )}
      </View>
    </View>
  );
};

const RateComp = ({ control, globalIndex, decimal_allow }) => {
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: `data.${globalIndex}.rate`,
  });

  const AddRate = () => {
    append({ rate: '' });
  };

  const RemoveRate = () => {
    remove(fields.length - 1);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}>
      <View style={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap' }}>
        {fields.map((field, index) => (
          <View
            key={field.id}
            style={
              fields.length === 1
                ? { flex: 1 }
                : {
                  width: ViewScale(120),
                  ...(fields.length > 2 &&
                    index > 1 && { marginTop: ViewScale(10) }),
                }
            }>
            <View style={[styles.rowContainer, { flex: 1 }]}>
              <View style={{ flex: 1 }}>
                <Controller
                  defaultValue={''}
                  name={`data.${globalIndex}.rate.${index}`}
                  control={control}
                  rules={{
                    validate: {
                      range: v =>
                        (parseFloat(v) >= 2 && parseFloat(v) <= 15) ||
                        'อัตราสะสมสามารถปรับเปลี่ยนได้ ระหว่าง 2-15%',
                    },
                  }}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <Input
                      style={RootStyles.picker}
                      inputContainerStyle={[
                        RootStyles.input,
                        { paddingRight: ViewScale(30) },
                        error && RootStyles.errorStyle,
                      ]}
                      containerStyle={{
                        flex: 1,
                        paddingHorizontal: 0,
                      }}
                      inputStyle={{
                        fontSize: FONT_SIZE.BODY_3,
                        fontFamily: FONT_TYPE.REGULAR,
                      }}
                      errorStyle={
                        error
                          ? { fontFamily: FONT_TYPE.REGULAR }
                          : { display: 'none' }
                      }
                      errorMessage={error?.message}
                      value={value}
                      onChangeText={v =>
                        onChange(
                          String(
                            v.match(
                              decimal_allow === 2
                                ? REGEX_NUMBER
                                : REGEX_TWO_DEGIT,
                            ) ?? '',
                          ),
                        )
                      }
                    />
                  )}
                />
                <TextRegular
                  style={{
                    position: 'absolute',
                    top: ViewScale(15),
                    right: ViewScale(10),
                  }}>
                  {'%'}
                </TextRegular>
              </View>
              {index < fields.length - 1 && (
                <View
                  style={{
                    height: SPACING.INPUT_HEIGHT,
                    justifyContent: 'center',
                  }}>
                  <TextRegular
                    style={{
                      marginHorizontal: ViewScale(10),
                      alignSelf: 'center',
                    }}
                    size={FONT_SIZE.BODY_2}>
                    {'หรือ'}
                  </TextRegular>
                </View>
              )}
            </View>
          </View>
        ))}
      </View>
      <View
        style={{
          flexDirection: 'row',
          maxWidth: ViewScale(80),
          height: ViewScale(50),
        }}>
        <TouchableOpacity style={{ alignSelf: 'center' }} onPress={AddRate}>
          <TextMedium
            color={COLORS.PRIMARY}
            size={FONT_SIZE.BODY_3}
            style={{
              marginHorizontal: ViewScale(10),
            }}>
            เพิ่ม
          </TextMedium>
        </TouchableOpacity>
        {fields.length > 1 && (
          <TouchableOpacity style={{ alignSelf: 'center' }} onPress={RemoveRate}>
            <TextMedium
              color={COLORS.ERROR}
              size={FONT_SIZE.BODY_3}
              style={{
                marginHorizontal: ViewScale(10),
              }}>
              ลบ
            </TextMedium>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const Content2 = ({
  onPressRemove,
  control,
  index,
  set_range,
  decimal_allow,
}) => {
  return (
    <View style={styles.contentContianer}>
      <View style={styles.rowContainer}>
        <View
          style={{
            flex: 1,
          }}>
          <Controller
            name={`data.${index}.detail_type_text`}
            control={control}
            rules={{ required: true }}
            defaultValue={''}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                style={RootStyles.picker}
                placeholder={'โปรดระบุ'}
                inputContainerStyle={[
                  RootStyles.input,
                  { paddingRight: ViewScale(30) },
                  error && RootStyles.errorStyle,
                ]}
                containerStyle={{
                  paddingHorizontal: 0,
                }}
                inputStyle={{
                  fontSize: FONT_SIZE.BODY_3,
                  fontFamily: FONT_TYPE.REGULAR,
                }}
                errorStyle={{ display: 'none' }}
                value={String(value)}
                onChangeText={v => {
                  onChange(v);
                }}
              />
            )}
          />
        </View>

        <TouchableOpacity style={styles.remove} onPress={onPressRemove}>
          <Ionicons
            name="remove-circle"
            color={COLORS.ERROR}
            size={FontScale(24)}
          />
        </TouchableOpacity>
      </View>
      <TextRegular
        style={{ fontSize: FONT_SIZE.BODY_2, marginTop: ViewScale(10) }}>
        {'อัตราการจ่ายเงินสะสม'}
      </TextRegular>
      <View style={[styles.rowContainer, { marginTop: ViewScale(10) }]}>
        {set_range === 1 ? (
          <>
            <View
              style={{
                flex: 1,
              }}>
              <Controller
                name={`data.${index}.rate_start`}
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <Input
                    style={RootStyles.picker}
                    inputContainerStyle={[
                      RootStyles.input,
                      { paddingRight: ViewScale(30) },
                      error && RootStyles.errorStyle,
                    ]}
                    containerStyle={{
                      flex: 1,
                      paddingHorizontal: 0,
                    }}
                    inputStyle={{
                      fontSize: FONT_SIZE.BODY_3,
                      fontFamily: FONT_TYPE.REGULAR,
                    }}
                    errorStyle={{ display: 'none' }}
                    value={value}
                    onChangeText={v =>
                      onChange(
                        String(
                          v.match(
                            decimal_allow === 2
                              ? REGEX_NUMBER
                              : REGEX_TWO_DEGIT,
                          ) ?? '',
                        ),
                      )
                    }
                  />
                )}
              />
              <TextRegular
                style={{
                  position: 'absolute',
                  top: '25%',
                  right: ViewScale(10),
                }}>
                {'%'}
              </TextRegular>
            </View>

            <TextRegular
              style={{ marginHorizontal: ViewScale(10), alignSelf: 'center' }}
              size={FONT_SIZE.BODY_2}>
              {'ถึง'}
            </TextRegular>
            <View
              style={{
                flex: 1,
              }}>
              <Controller
                name={`data.${index}.rate_end`}
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <Input
                    style={RootStyles.picker}
                    inputContainerStyle={[
                      RootStyles.input,
                      { paddingRight: ViewScale(30) },
                      error && RootStyles.errorStyle,
                    ]}
                    containerStyle={{
                      flex: 1,
                      paddingHorizontal: 0,
                    }}
                    inputStyle={{
                      fontSize: FONT_SIZE.BODY_3,
                      fontFamily: FONT_TYPE.REGULAR,
                    }}
                    errorStyle={{ display: 'none' }}
                    value={value}
                    onChangeText={v =>
                      onChange(
                        String(
                          v.match(
                            decimal_allow === 2
                              ? REGEX_NUMBER
                              : REGEX_TWO_DEGIT,
                          ) ?? '',
                        ),
                      )
                    }
                  />
                )}
              />
              <TextRegular
                style={{
                  position: 'absolute',
                  top: '25%',
                  right: ViewScale(10),
                }}>
                {'%'}
              </TextRegular>
            </View>
          </>
        ) : (
          <RateComp
            control={control}
            decimal_allow={decimal_allow}
            globalIndex={index}
          />
        )}
      </View>
    </View>
  );
};

export default FormChange;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
  },
  noRateRange: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    marginLeft: ViewScale(10),
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginVertical: ViewScale(5),
  },
  iconText: {
    marginLeft: ViewScale(5),
    fontSize: FontScale(18),
  },
  remove: {
    marginLeft: ViewScale(10),
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  textinput: {
    fontFamily: FONT_TYPE.REGULAR,
    height: SPACING.INPUT_HEIGHT,
    paddingLeft: ViewScale(10),
  },
  textinputYearLong: {
    flex: 1,
  },
  textinputPercent: {
    flex: 1,
  },
  pickerTitleLeft: {
    marginRight: ViewScale(5),
  },
  pickerContent: {
    height: SPACING.INPUT_HEIGHT,
    flex: 1,
  },
  contentContianer: {
    marginTop: ViewScale(15),
    padding: ViewScale(15),
    backgroundColor: COLORS.GRAY,
  },
  pickerHeader: {
    backgroundColor: '#eef2f6',
    width: ViewScale(200),
  },
  pickerHeaderText: {
    fontSize: FontScale(16),
    marginHorizontal: ViewScale(10),
  },
  header: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
    alignItems: 'flex-start',
    paddingVertical: ViewScale(10),
    paddingHorizontal: ViewScale(5),
  },
  rootContainer: {
    marginTop: ViewScale(10),
  },
});
