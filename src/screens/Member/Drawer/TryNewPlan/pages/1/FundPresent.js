import React from 'react';
import {View} from 'react-native';
import {ListItem} from 'react-native-elements';
import Input from '../../components/Input';
import {TextMedium} from 'components/atoms';
import {Translate} from 'function';
import {addCommas, filterInputNumberPoint, ViewScale} from 'utils';
import {Container} from 'components/common';
import styles, {InputFullProps} from './Style';
import {COLORS, SPACING} from 'styles';
import {Controller} from 'react-hook-form';

export default ({control, expanded, handleExpanded}) => {
  const oldvalue = React.useRef([]);

  return (
    <ListItem.Accordion
      content={
        <TextMedium color={COLORS.PRIMARY}>
          {Translate('textCurrentProvidentFundInformationTitle')}
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
      onPress={handleExpanded('FundPresent')}>
      <Container style={!expanded && {height: 0, display: 'none'}}>
        {/* อัตราสะสม ต่อเดืือน */}
        <View style={{marginTop: ViewScale(20)}}>
          <Controller
            name="cash_from_employee"
            control={control}
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
                placeholder="5,000.00"
                onChangeText={onChange}
                value={filterInputNumberPoint(value)}
                errorMessage={error?.message}
                disabled
                label={() => (
                  <TextMedium style={styles.eachTitle}>
                    {Translate('textCurrentProvidentFundInformation_1')}
                  </TextMedium>
                )}
                {...InputFullProps(Translate('textBaht'))}
              />
            )}
          />
        </View>

        {/* เงินนำส่งเข้ากองทุนน */}
        <View>
          <Controller
            name="return_byfund"
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
                onChangeText={onChange}
                value={filterInputNumberPoint(value)}
                errorMessage={error?.message}
                disabled
                placeholder="10.00"
                label={() => (
                  <View>
                    <View style={{flexDirection: 'row'}}>
                      <TextMedium style={styles.eachTitleHypothesis}>
                        {Translate('textHypothesis')}
                      </TextMedium>

                      <TextMedium style={styles.eachTitle}>
                        {' '}
                        {Translate('textCurrentProvidentFundInformation_2')}
                      </TextMedium>
                    </View>
                    <TextMedium style={styles.eachTitle}>
                      {Translate('textCurrentProvidentFundInformation_2_1')}
                    </TextMedium>
                  </View>
                )}
                {...InputFullProps('%')}
              />
            )}
          />
        </View>

        {/* ผลตอบแทนกองทุนที่ได้รับ */}
        <View>
          <Controller
            name="fund_total"
            control={control}
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
                value: 1,
                message: Translate('textInputRequired'),
              },
            }}
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <Input
                onChangeText={onChange}
                value={filterInputNumberPoint(value)}
                errorMessage={error?.message}
                disabled
                onFocus={() => (oldvalue.current['fund_total'] = value)}
                // onEndEditing={v => {
                //   onChange(
                //     filterInputNumberPoint(
                //       v.nativeEvent.text,
                //       oldvalue.current['fund_total'],
                //     ),
                //   );
                //   oldvalue.current['fund_total'] = '';
                // }}
                placeholder="200,000.00"
                label={() => (
                  <TextMedium style={styles.eachTitle}>
                    {Translate('textCurrentProvidentFundInformation_3')}
                  </TextMedium>
                )}
                {...InputFullProps(Translate('textBaht'))}
              />
            )}
          />
        </View>

        {/* จำนวนเงินในกองทุนสำรองเลี้ยงชีพจาดแหล้งที่อื่น เช่น หองทุนลกหย่อนภาษี */}
        <View>
          <Controller
            name="cash_from_other"
            control={control}
            defaultValue={''}
            rules={{
              // pattern: {
              //   // value: /^[-]?([0-9]*[.])?[0-9]+$/,
              //   value: /^\$(0|[1-9][0-9]{0,2})(,\d{3})*(\.\d{1,2})?$/,
              //   message: Translate('textInputOnlyNumber'),
              // },
              required: {
                value: 0,
                message: Translate('textInputRequired'),
              },
              min: {
                value: 0,
                message: Translate('textInputRequired'),
              },
            }}
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <Input
                onChangeText={onChange}
                value={value.toString()}
                errorMessage={error?.message}
                placeholder="300,000.00"
                onFocus={() => {
                  oldvalue.current['cash_from_other'] = value;
                }}
                onEndEditing={v => {
                  const Number0 = v.nativeEvent.text?.replace(/\,/g, '');
                  onChange(
                    filterInputNumberPoint(
                      Number0,
                      oldvalue.current['cash_from_other'],
                    ),
                  );
                  // onChange(
                  //   filterInputNumberPoint(
                  //     v.nativeEvent.text,
                  //     oldvalue.current['cash_from_other'],
                  //   ).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                  // );
                  oldvalue.current['cash_from_other'] = '';
                }}
                label={() => (
                  <TextMedium style={styles.eachTitle}>
                    {Translate('textCurrentProvidentFundInformation_4')}
                  </TextMedium>
                )}
                {...InputFullProps(Translate('textBaht'))}
              />
            )}
          />
        </View>
      </Container>
    </ListItem.Accordion>
  );
};
