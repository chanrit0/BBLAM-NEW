import { Picker } from 'components/atoms';
import { Container } from 'components/common';
import { TextRegular } from 'components/atoms';
import { Translate } from 'function';
import { ViewScale, FontScale, isIOS } from 'utils';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { COLORS, FONT_SIZE, FONT_TYPE, SPACING } from 'styles';
import { Controller } from 'react-hook-form';
import _ from 'lodash';

export default ({ itemType = 2, items, control, setValue, typeRebalance }) => {
  const [controlTab, setControlTab] = React.useState(0);
  const [pickerone, setPickerOne] = React.useState(0);
  const [pickertwo, setPickerTwo] = React.useState(0);

  const itemsRebalance = React.useMemo(() => {
    let items = [];
    if (typeRebalance !== '') {
      if (typeRebalance == 'N') {
        return (items = [
          {
            value: '1',
            label: 'ปรับสัดส่วนเงินลงทุนปัจจุบัน (Re-Balance)',
          },
          // {
          //   value: '2',
          //   label: 'เปลี่ยนสัดส่วนเงินลงทุนเข้าใหม่ (Re-Allocate)',
          // },
          // {
          //   value: '3',
          //   label:
          //     'ปรับสัดส่วนเงินลงทุนปัจจุบัน \nและเปลี่ยนสัดส่วนเงินลงทุนเข้าใหม่ \n(Re-Balance & Re-Allocate)',
          // },
        ]);
      } else {
        return (items = [
          {
            value: '3',
            label: 'ปรับสัดส่วนเงินลงทุนปัจจุบัน \nและเปลี่ยนสัดส่วนเงินลงทุนเข้าใหม่ \n(Re-Balance & Re-Allocate)',
          },
        ]);
      }
    }
  }, [typeRebalance]);

  const convertItems = React.useMemo(() => {
    if (itemType == 1) {
      return items.sw_duration.map(item => ({
        label: `${item.sw_start} - ${item.sw_end}`,
        value: item.sw_code,
      }));
    } else if (itemType == 2) {
      let result = [];

      result[0] = items[controlTab].list_month.map(item => ({
        label: `${item.duration_month}`,
        value: item.sw_code,
      }));

      if (pickerone !== 0) {
        let date = parseInt(
          items[controlTab].list_month[pickerone - 1].list_day,
        );
        let back_date = new Date().getDate();
        result[1] = Array(date)
          .fill(date)
          .map((item, index) => ({
            label: String(index + 1),
            value: String(index + 1),
          }))
          .splice(back_date - 1, date);
      }

      return result;
    } else if (itemType == 3) {
      let result = [];

      result[0] = items.list_month.map(item => ({
        label: `${item.duration_month}`,
        value: item.sw_code,
      }));

      if (pickerone !== 0) {
        let date = parseInt(items.list_month[pickerone - 1].list_day);
        let back_date = new Date().getDate();

        result[1] = Array(date)
          .fill(date)
          .map((item, index) => ({
            label: String(index + 1),
            value: String(index + 1),
          }))
          .splice(back_date - 1, date);
      }

      return result;
    }
  }, [controlTab, pickerone, pickertwo]);

  const textSelect = React.useMemo(() => {
    switch (parseInt(itemType)) {
      case 1:
        return [Translate('textRangeDate')];
      case 2:
        return [Translate('textHalfYear'), Translate('textFullYear')];
      case 3:
        return [Translate('textFullYear')];
      default:
        return [Translate('textRangeDate')];
    }
  }, [itemType]);

  const renderPicker = React.useCallback(
    () => (
      <>
        {itemType == 1 && (
          <PickComp
            control={control}
            itemType={itemType}
            title={Translate('textAutoBalanceEveryDate')}
            convertItems={convertItems}
            onChangeValue={setPickerOne}
            name={'sw_code'}
          />
        )}
        {itemType == 2 && (
          <>
            {/* <PickComp
              control={control}
              itemType={itemType}
              title={
                controlTab == 0
                  ? Translate('textAutoBalanceGroupMonths1')
                  : Translate('textAutoBalanceGroupMonths2')
              }
              convertItems={convertItems[0]}
              onChangeValue={setPickerOne}
              name={'sw_code'}
            /> */}
            {/* {pickerone !== 0 && (
              <PickComp
                control={control}
                itemType={itemType}
                title={Translate('textAutoBalanceEveryDate')}
                convertItems={convertItems[1]}
                onChangeValue={setPickerTwo}
                name={'date'}
              />
            )} */}
          </>
        )}
        {itemType == 3 && (
          <>
            {/* <PickComp
              control={control}
              itemType={itemType}
              title={Translate('textAutoBalanceGroupMonths2')}
              convertItems={convertItems[0]}
              onChangeValue={setPickerOne}
              name={'sw_code'}
            /> */}
            {/* {pickerone !== 0 && (
              <PickComp
                control={control}
                itemType={itemType}
                title={Translate('textAutoBalanceEveryDate')}
                convertItems={convertItems[1]}
                onChangeValue={setPickerTwo}
                name={'date'}
              />
            )} */}
          </>
        )}
      </>
    ),
    [convertItems, pickerone],
  );

  const resetPicker = React.useCallback(() => {
    setPickerOne(0);
    setPickerTwo(0);
    setValue('date', '');
    setValue('sw_code', '');
  }, []);

  return (
    <View style={styles.DefineStrategy}>
      <Container>
        <TextRegular style={{ marginVertical: ViewScale(20) }}>
          {Translate('textAutoBalanceSetPlanDetail')}
        </TextRegular>
        <Controller
          name="type_auto"
          defaultValue={itemType}
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              {itemType == 1 && (
                <View
                  style={{
                    backgroundColor: COLORS.PRIMARY,
                    width: '100%',
                    height: SPACING.INPUT_HEIGHT,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TextRegular color="white">{textSelect}</TextRegular>
                </View>
              )}
              {itemType == 2 && (
                <SegmentedControlTab
                  values={textSelect}
                  selectedIndex={controlTab}
                  onTabPress={v => {
                    console.log('v',v + 2);
                    resetPicker();
                    setControlTab(v);
                    onChange(v + 2);
                  }}
                  {...SegmentedControlTabProps}
                />
              )}
              {itemType == 3 && (
                <View
                  style={{
                    backgroundColor: COLORS.PRIMARY,
                    width: '100%',
                    height: SPACING.INPUT_HEIGHT,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TextRegular color="white">{textSelect}</TextRegular>
                </View>
              )}
            </>
          )}
        />
        {renderPicker()}
        <TextRegular style={{ marginVertical: ViewScale(20) }}>
          {'วิธีการปรับแผนการลงทุนใหม่'}
        </TextRegular>
        <Controller
          control={control}
          name="ti_rebalance"
          rules={{ required: true }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Picker
              disabled={true}
              hidePlaceHolder
              // error={error}
              items={itemsRebalance}
              // value={value}
              // onValueChange={onChange}
              value={1}
              onValueChange={value => {
                value === null || value === undefined
                  ? onChange(value)
                  : onChange(value);
              }}
              numberOfLines={3}
              // placeholder={'ระบุวิธีการปรับแผนการลงทุนใหม่'}
              placeholder={isIOS ? {} : ''}
              statusIcon={true}
            />
          )}
        />
      </Container>
    </View>
  );
};

const PickComp = ({
  itemType,
  title,
  control,
  convertItems,
  name,
  onChangeValue,
}) => (
  <View>
    <TextRegular style={{ marginTop: ViewScale(20) }}>{title}</TextRegular>

    <View style={{ marginTop: ViewScale(20) }}>
      <Controller
        control={control}
        name={name}
        rules={{ required: true }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Picker
            items={convertItems}
            value={value}
            onValueChange={(v, i) => {
              onChangeValue(i);
              onChange(v);
            }}
            placeholder={Translate('textAutoBalancePicker1')}
            error={error}
          />
        )}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  DefineStrategy: {
    borderTopWidth: 1,
    borderColor: COLORS.BORDER,
    marginTop: ViewScale(10),
  },
});

const SegmentedControlTabProps = {
  activeTabStyle: {
    backgroundColor: COLORS.PRIMARY,
  },
  firstTabStyle: {
    marginRight: ViewScale(10),
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  lastTabStyle: {
    marginLeft: ViewScale(10),
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  tabStyle: {
    height: SPACING.INPUT_HEIGHT,
    borderColor: 'transparent',
    textColor: '#000',
    backgroundColor: '#eef2f6',
  },
  tabTextStyle: {
    color: '#000',
    fontFamily: FONT_TYPE.REGULAR,
    fontSize: FONT_SIZE.BODY_1,
  },
};
