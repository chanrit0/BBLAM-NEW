import {TextRegular, TextMedium, Tooltip} from 'components/atoms';
import {Translate} from 'function';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {Input} from 'react-native-elements';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Cell, Col, Cols, Row, Table} from 'react-native-table-component';
import {COLORS, FONT_SIZE, FONT_TYPE} from 'styles';
import {filterInputNumberPoint, ViewScale} from 'utils';
import styles from '../Style';

const assetClassComp = (value, tooltip) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: ViewScale(5),
      }}>
      <TextMedium size={14} style={{flex: 1}}>
        {value}
      </TextMedium>
      {tooltip != '' && (
        <Tooltip
          iconStyle={{
            size: FONT_SIZE.BODY_2,
            color: COLORS.THIRDARY,
          }}
          tooltip={
            <View style={{width: widthPercentageToDP(80)}}>
              <TextRegular
                size={FONT_SIZE.BODY_2}
                style={{color: COLORS.WHITE}}>
                {tooltip}
              </TextRegular>
            </View>
          }
        />
      )}
    </View>
  );
};

const assumtionComp = (value, tooltip) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: ViewScale(5),
        width: '100%',
      }}>
      <TextMedium
        size={FONT_SIZE.BODY_3}
        style={{flex: 1, textAlign: 'center'}}
        color={COLORS.WHITE}>
        {value}
        {'   '}
        {tooltip != undefined ||
          (tooltip != '' && (
            <Tooltip
              iconStyle={{
                size: FONT_SIZE.BODY_2,
                color: COLORS.WHITE,
              }}
              tooltip={
                <View>
                  <TextRegular
                    size={FONT_SIZE.BODY_2}
                    style={{color: COLORS.WHITE}}>
                    {tooltip}
                  </TextRegular>
                </View>
              }
            />
          ))}
      </TextMedium>
    </View>
  );
};

const AssumtionContentComp = ({setData, index, GValue}) => {
  const [value, onChange] = React.useState(String(GValue));
  const oldvalue = React.useRef('');

  const handleSetData = v => {
    data = filterInputNumberPoint(v.nativeEvent.text, oldvalue.current);
    onChange(data);
    switch (index) {
      case 0:
        setData.current.asumpt_input1_pct = data;
        break;
      case 1:
        setData.current.asumpt_input2_pct = data;
        break;
      case 2:
        setData.current.asumpt_input3_pct = data;
        break;
      case 3:
        setData.current.asumpt_input4_pct = data;
        break;
      case 4:
        setData.current.asumpt_input5_pct = data;
        break;
      case 5:
        setData.current.asumpt_input6_pct = data;
        break;
    }
  };

  React.useEffect(() => {
    switch (index) {
      case 0:
        setData.current.asumpt_input1_pct = parseFloat(value);
        break;
      case 1:
        setData.current.asumpt_input2_pct = parseFloat(value);
        break;
      case 2:
        setData.current.asumpt_input3_pct = parseFloat(value);
        break;
      case 3:
        setData.current.asumpt_input4_pct = parseFloat(value);
        break;
      case 4:
        setData.current.asumpt_input5_pct = parseFloat(value);
        break;
      case 5:
        setData.current.asumpt_input6_pct = parseFloat(value);
        break;
    }
  }, []);

  return (
    <View>
      <Input
        inputContainerStyle={{
          backgroundColor: 'rgba(255,255,255,.2)',
          borderColor: COLORS.WHITE,
          borderWidth: 0.5,
          borderBottomWidth: 0.5,
        }}
        value={value}
        onChangeText={onChange}
        onEndEditing={handleSetData}
        onFocus={() => {
          oldvalue.current = value;
        }}
        errorStyle={{display: 'none'}}
        inputStyle={{
          color: COLORS.WHITE,
          fontFamily: FONT_TYPE.REGULAR,
          textAlign: 'center',
          fontSize: 14,
        }}
      />
    </View>
  );
};

const YearComp = (value, year) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.GRAY_4,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TextRegular size={16} style={{textAlign: 'center'}} color={COLORS.BLACK}>
        {value}
        {'\n'}
        <TextRegular size={14}>{year.replace(/-/g, '$&\n')}</TextRegular>
      </TextRegular>
    </View>
  );
};

export default ({dataYear, dataShow, assumptionTooltip, setData}) => {
  const [state] = React.useState({
    assetClass: {
      header: [Translate('textTryNewPlanAssetClassType')],
      content: dataShow.map((item, index) =>
        assetClassComp(item.Asset_Class, item.asset_tooltip),
      ),
    },
    avgReturn: {
      header: [Translate('textTryNewPlanAvgReturn')],
      content: dataYear.map((item, index) => [
        YearComp(item.duration_name, item.duration_year),
        ...dataShow.map(itemShow => {
          if (index == 0) {
            return itemShow.Year_3.toFixed(2);
          } else if (index == 1) {
            return itemShow.Year_5.toFixed(2);
          } else if (index == 2) {
            return itemShow.Year_10.toFixed(2);
          }
        }),
      ]),
    },

    assumtion: {
      header: [assumtionComp(Translate('textTryNewPlanAssumtion'))],
      content: dataShow.map((item, index) => {
        return (
          <AssumtionContentComp
            setData={setData}
            index={index}
            GValue={item.Assumption.toFixed(2)}
          />
        );
      }),
    },
  });

  return (
    <>
      <Table
        style={{flexDirection: 'row', flex: 1}}
        borderStyle={{borderWidth: 0.5, borderColor: COLORS.BORDER_1}}>
        <Table style={{width: ViewScale(150)}}>
          <Col
            data={state.assetClass.header}
            height={ViewScale(170)}
            textStyle={styles.textTableTitle}
            style={styles.cellHeader}
          />
          <Col
            data={state.assetClass.content}
            height={80}
            borderStyle={{borderWidth: 0.5, borderColor: COLORS.BORDER_1}}
          />
        </Table>
        <Table style={{flex: 1}}>
          <Col
            data={state.avgReturn.header}
            height={ViewScale(70)}
            textStyle={styles.textTableTitle}
            style={styles.cellHeader}
          />
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            style={{borderColor: COLORS.BORDER_1, borderWidth: 0.5}}>
            <Table
              style={{flexDirection: 'row'}}
              borderStyle={{borderWidth: 0.5, borderColor: COLORS.BORDER_1}}>
              <Cols
                heightArr={[
                  ...Array(7)
                    .fill(0)
                    .map((e, i) => (i !== 0 ? 80 : ViewScale(100))),
                ]}
                widthArr={[
                  ...Array(3)
                    .fill(0)
                    .map(() => ViewScale(90)),
                ]}
                data={state.avgReturn.content}
                textStyle={{textAlign: 'center', fontFamily: FONT_TYPE.REGULAR}}
                style={styles.tableCenter}
              />
            </Table>
          </ScrollView>
        </Table>
        <Table
          style={[styles.tableContainerRight, {width: ViewScale(90)}]}
          borderStyle={{borderWidth: 0.5, borderColor: COLORS.BORDER_1}}>
          <Col
            data={state.assumtion.header}
            height={ViewScale(170)}
            width={ViewScale(90)}
          />
          <Col data={state.assumtion.content} />
        </Table>
      </Table>
    </>
  );
};
