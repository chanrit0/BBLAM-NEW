/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React from 'react';
import {View} from 'react-native';
import {ListItem} from 'react-native-elements';
import {TextRegular, TextMedium, TextLight, Slider} from 'components/atoms';
import {Container} from 'components/common';
import {COLORS, SPACING} from 'styles';
import {Translate} from 'function';
import {filterInputNumberPoint, ViewScale} from 'utils';
import styles, {InputSmallProps, InputFullProps} from './Style';
import {Controller} from 'react-hook-form';
import Input from '../../components/Input';
import _ from 'lodash';

export default ({
  control,
  filterInput,
  MAX = 100,
  MIN = 0,
  handleExpanded,
  expanded,
}) => {
  const oldvalue = React.useRef({
    salary: '',
    salary_up_pct: '',
  });

  return (
    <ListItem.Accordion
      content={
        <TextMedium color={COLORS.PRIMARY}>
          {Translate('textBasicInfo')}
        </TextMedium>
      }
      isExpanded={expanded}
      containerStyle={{
        backgroundColor: COLORS.WHITE,
        paddingHorizontal: SPACING.CONTAINER_MARGIN_HORIZONTAL,
        borderColor: COLORS.BORDER,
        borderBottomWidth: 1,
        justifyContent: 'space-between',
      }}
      onPress={handleExpanded('BasicInfo')}>
      <Container style={!expanded && {height: 0, display: 'none'}}>
        {/* AgeNow */}
        <Controller
          control={control}
          name="age_now"
          defaultValue={0}
          rules={{
            min: {
              value: 1,
              message: Translate('textInputRequired'),
            },
          }}
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <View style={{marginTop: ViewScale(10)}}>
              <View style={styles.rowContainer}>
                <TextMedium style={styles.eachTitle}>
                  {Translate('textBasicInfo_AgeNow')}
                </TextMedium>
                <View style={styles.rowInput}>
                  <Input
                    value={String(value)}
                    onChangeText={filterInput(onChange, value)}
                    errorMessage={error?.message}
                    slider
                    {...InputSmallProps(error)}
                  />
                  <TextRegular style={styles.eachTitle}>
                    {Translate('textYear')}
                  </TextRegular>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'stretch',
                  justifyContent: 'center',
                }}>
                <Slider
                  value={value}
                  onValueChange={onChange}
                  minimumValue={MIN}
                  maximumValue={MAX}
                />
              </View>
            </View>
          )}
        />

        {/* AgeRetireTarget */}
        <Controller
          control={control}
          name="age_toexit"
          defaultValue={0}
          rules={{
            min: {
              value: 1,
              message: Translate('textInputRequired'),
            },
          }}
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <>
              <View style={[styles.rowContainer]}>
                <TextMedium style={styles.eachTitle}>
                  {Translate('textBasicInfo_AgeRetire')}
                </TextMedium>
                <View style={styles.rowInput}>
                  <Input
                    value={String(value)}
                    errorMessage={error?.message}
                    onChangeText={filterInput(onChange, value)}
                    slider
                    {...InputSmallProps(error)}
                  />
                  <TextLight style={styles.eachTitle}>
                    {Translate('textYear')}
                  </TextLight>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'stretch',
                  justifyContent: 'center',
                }}>
                <Slider
                  value={value}
                  onValueChange={onChange}
                  minimumValue={MIN}
                  maximumValue={MAX}
                />
              </View>
            </>
          )}
        />

        {/* Salary */}
        <View style={{marginTop: ViewScale(30)}}>
          <Controller
            name="salary"
            control={control}
            defaultValue={''}
            rules={{
              // pattern: {
              //   // value: /^[-]?([0-9][,]*[.])?[0-9]+$/,
              //   value: /^\$(0|[1-9][0-9]{0,2})(,\d{3})*(\.\d{1,2})?$/,
              //   message: Translate('textInputOnlyNumber'),
              // },
              required: {
                value: true,
                message: Translate('textInputRequired'),
              },
              min: {
                value: 0,
                message: Translate('textInputRequired'),
              },
            }}
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <Input
                placeholder={'30,000.00'}
                errorMessage={error?.message}
                label={() => (
                  <TextMedium style={styles.eachTitle}>
                    {Translate('textBasicInfo_SalaryNow')}
                  </TextMedium>
                )}
                onChangeText={onChange}
                value={value.toString()}
                onFocus={() => {
                  oldvalue.current.salary = value;
                }}
                onEndEditing={v => {
                  const Number0 = v.nativeEvent.text?.replace(/\,/g, '');
                  onChange(
                    filterInputNumberPoint(Number0, oldvalue.current.salary),
                  );
                  oldvalue.current.salary = '';
                }}
                {...InputFullProps(Translate('textBaht'))}
              />
            )}
          />
        </View>

        {/* Salary Expect */}
        <View>
          <Controller
            name="salary_up_pct"
            control={control}
            defaultValue={''}
            rules={{
              pattern: {
                value: /^[-]?([0-9]*[.])?[0-9]+$/,
                message: Translate('textInputOnlyNumber'),
              },
              required: {
                value: true,
                message: Translate('textInputRequired'),
              },
              min: {
                value: 0,
                message: Translate('textInputRequired'),
              },
            }}
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <Input
                errorMessage={error?.message}
                placeholder={'10.00'}
                label={() => (
                  <TextMedium style={styles.eachTitle}>
                    {Translate('textBasicInfo_avgSalaryRate')}
                  </TextMedium>
                )}
                onChangeText={onChange}
                value={value.toString()}
                onFocus={() => {
                  oldvalue.current.salary_up_pct = value;
                }}
                onEndEditing={v => {
                  onChange(
                    filterInputNumberPoint(
                      v.nativeEvent.text,
                      oldvalue.current.salary_up_pct,
                    ),
                  );
                  oldvalue.current.salary_up_pct = '';
                }}
                {...InputFullProps('%')}
              />
            )}
          />
        </View>
      </Container>
    </ListItem.Accordion>
  );
};
