import React from 'react';
import {View} from 'react-native';
import {ListItem} from 'react-native-elements';
import Input from '../../components/Input';
import {TextRegular, TextMedium, TextLight} from 'components/atoms';
import {Container} from 'components/common';
import {Slider, Tooltip} from 'components/atoms';

import {Translate} from 'function';
import {filterInputNumberPoint, numberWithCommas, ViewScale} from 'utils';
import styles, {InputSmallProps, InputFullProps} from './Style';
import {COLORS, FONT_SIZE, SPACING} from 'styles';
import {Controller} from 'react-hook-form';

export default ({
  control,
  filterInput,
  MAX = 100,
  MIN = 0,
  expanded,
  handleExpanded,
}) => {
  const oldvalue = React.useRef([]);

  return (
    <ListItem.Accordion
      content={
        <>
          <TextMedium color={COLORS.PRIMARY}>
            {Translate('textRetireTarget')}
          </TextMedium>
        </>
      }
      isExpanded={expanded}
      containerStyle={{
        backgroundColor: COLORS.WHITE,
        paddingHorizontal: SPACING.CONTAINER_MARGIN_HORIZONTAL,

        borderColor: COLORS.BORDER,
        borderBottomWidth: 1,
        justifyContent: 'space-between',
      }}
      onPress={handleExpanded('RetireTarget')}>
      <Container style={!expanded && {height: 0, display: 'none'}}>
        {/* คาดการ์ณอายุ */}

        <Controller
          name="age_forcast"
          control={control}
          defaultValue={0}
          rules={{
            min: {
              value: 1,
              message: Translate('textInputRequired'),
            },
          }}
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <>
              <View style={{flexDirection: 'column'}}>
                <View style={[styles.rowContainer, {marginTop: ViewScale(20)}]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <TextMedium
                      style={[styles.eachTitle, {marginRight: ViewScale(5)}]}>
                      {Translate('textRetireTargetPredictAge')}
                    </TextMedium>
                    <Tooltip
                      iconStyle={{
                        size: FONT_SIZE.BODY_2,
                        color: COLORS.THIRDARY,
                      }}
                      tooltip={
                        <View
                          style={{
                            height: ViewScale(80),
                            width: ViewScale(150),
                          }}>
                          <TextRegular
                            size={FONT_SIZE.BODY_2}
                            style={{color: COLORS.WHITE}}>
                            {Translate('textRetireTargetPredictAgeTooltip')}
                          </TextRegular>
                        </View>
                      }
                    />
                  </View>
                  <View style={[styles.rowInput]}>
                    <Input
                      value={String(value)}
                      onChangeText={filterInput(onChange, value)}
                      errorMessage={error?.message}
                      slider
                      {...InputSmallProps(error)}
                    />
                    <TextLight style={styles.eachTitle}>
                      {Translate('textYear')}
                    </TextLight>
                  </View>
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

        <View>
          <Controller
            control={control}
            name="exp_afterexit"
            rules={{
              // pattern: {
              //   // value: /^[-]?([0-9]*[.])?[0-9]+$/,
              //   value: /^\$(0|[1-9][0-9]{0,2})(,\d{3})*(\.\d{1,2})?$/,
              //   message: Translate('textInputOnlyNumber'),
              // },
              required: {
                value: true,
                message: Translate('textInputRequired'),
              },
              min: {
                value: 1,
                message: Translate('textInputRequired'),
              },
            }}
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <Input
                placeholder="20,000.00"
                label={() => (
                  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    <TextMedium
                      style={[styles.eachTitle, {marginRight: ViewScale(10)}]}>
                      {Translate('textMonthlyExpense')}
                    </TextMedium>
                    <TextLight style={styles.eachDesc}>
                      {Translate('textMonthlyExpense2')}
                    </TextLight>
                  </View>
                )}
                value={value}
                onFocus={() => {
                  // if (v.nativeEvent.text != '') {
                  //   const Number0 = v.nativeEvent.text?.replace(/\,/g, '');
                  //   onChange(Number0);
                  // } else {
                  oldvalue.current['exp_afterexit'] = value;
                  // }
                }}
                onEndEditing={v => {
                  const Number0 = v.nativeEvent.text?.replace(/\,/g, '');
                  onChange(
                    filterInputNumberPoint(
                      Number0,
                      oldvalue.current['exp_afterexit'],
                    ),
                  );
                  // onChange(
                  //   filterInputNumberPoint(
                  //     v.nativeEvent.text,
                  //     oldvalue.current['exp_afterexit'],
                  //   ).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                  // );
                  oldvalue.current['exp_afterexit'] = '';
                }}
                errorMessage={error?.message}
                onChangeText={onChange}
                {...InputFullProps(Translate('textBaht'))}
              />
            )}
          />
        </View>

        <View>
          <Controller
            name="rate_ft"
            control={control}
            defaultValue={'3.00'}
            rules={{
              pattern: {
                value: /^[+-]?([0-9]*[.])?[0-9]+$/,
                message: Translate('textInputOnlyNumber'),
              },
              required: {
                value: true,
                message: Translate('textInputRequired'),
              },
              min: {
                value: 1,
                message: Translate('textInputRequired'),
              },
            }}
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <Input
                placeholder={'3.00'}
                errorMessage={error?.message}
                onChangeText={onChange}
                value={value}
                onFocus={() => (oldvalue.current['rate_ft'] = value)}
                onEndEditing={v => {
                  onChange(
                    filterInputNumberPoint(
                      v.nativeEvent.text,
                      oldvalue.current['rate_ft'],
                    ),
                  );
                  oldvalue.current['rate_ft'] = '';
                }}
                label={() => (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <TextMedium
                      style={[styles.eachTitle, {marginRight: ViewScale(5)}]}>
                      {Translate('textEstimateAvgInflationRate')}
                    </TextMedium>
                    {/* <Tooltip
                      iconStyle={{
                        size: FONT_SIZE.BODY_2,
                        color: COLORS.THIRDARY,
                      }}
                      tooltip={
                        <View>
                          <TextRegular
                            size={FONT_SIZE.BODY_2}
                            style={{color: COLORS.WHITE}}>
                            {Translate('textEstimateAvgInflationRateTooltip')}
                          </TextRegular>
                        </View>
                      }
                    /> */}
                  </View>
                )}
                {...InputFullProps(`%`)}
              />
            )}
          />
        </View>

        {/* อัตราผลตอบแทนหลังเกษียน */}

        <View>
          <Controller
            name="rate_after_exit"
            control={control}
            defaultValue={'0.25'}
            rules={{
              pattern: {
                value: /^[+-]?([0-9]*[.])?[0-9]+$/,
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
                placeholder="0.25"
                onChangeText={onChange}
                value={value}
                errorMessage={error?.message}
                onFocus={() => (oldvalue.current['rate_after_exit'] = value)}
                onEndEditing={v => {
                  onChange(
                    filterInputNumberPoint(
                      v.nativeEvent.text,
                      oldvalue.current['rate_after_exit'],
                    ),
                  );
                  oldvalue.current['rate_after_exit'] = '';
                }}
                label={() => (
                  <View style={{flexDirection: 'row'}}>
                    <View>
                      <TextMedium style={styles.eachTitle}>
                        {Translate('textEstimateAvgAnnualReceivedRetirement')}
                      </TextMedium>
                    </View>
                    <View style={{marginTop: ViewScale(3)}}>
                      <Tooltip
                        iconStyle={{
                          size: FONT_SIZE.BODY_2,
                          color: COLORS.THIRDARY,
                        }}
                        tooltip={
                          <View>
                            <TextRegular
                              size={FONT_SIZE.BODY_2}
                              style={{color: COLORS.WHITE}}>
                              {Translate('textAverage_Return_Per_Year_Tooltip')}
                            </TextRegular>
                          </View>
                        }
                      />
                    </View>
                  </View>
                )}
                {...InputFullProps(`%`)}
              />
            )}
          />
        </View>
      </Container>
    </ListItem.Accordion>
  );
};
