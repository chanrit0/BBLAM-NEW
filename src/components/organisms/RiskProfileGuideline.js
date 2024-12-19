import {View, StyleSheet} from 'react-native';
import React from 'react';
import {Container, ScoreLevel} from 'components/common';
import {TextMedium, TextRegular} from 'components/atoms';
import {COLORS, FONT_SIZE, FONT_TYPE} from 'styles';
import {Translate} from 'function';
import {ViewScale} from 'utils';

const GUIDLINE_DATA = [
  {
    score: 1,
    value: '10-16',
    percent: 5,
    text: Translate('textRiskProfileAssetInvest'),
  },
  {
    score: 17,
    value: '17-22',
    percent: 10,
    text: Translate('textRiskProfileAssetInvest'),
  },
  {
    score: 23,
    value: '23-28',
    percent: 30,
    text: Translate('textRiskProfileAssetInvest'),
  },
  {
    value: '29-34',
    score: 29,
    percent: 50,
    text: Translate('textRiskProfileAssetInvest'),
  },
  {
    value: '35-40',
    score: 35,
    percent: 50,
    text: 'สัดส่วนการลงทุนสินทรัพย์\nเสี่ยงมากกว่า ',
  },
];

export default () => {
  return (
    <Container
      style={{
        flex: 0,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      {GUIDLINE_DATA.map((item, index) => {
        return (
          <View style={styles.contentRisk} key={'id' + index}>
            <View style={{flex: 1}}>
              <TextMedium>{Translate('textRiskProfileTotalScore')}</TextMedium>
              <TextMedium size={FONT_SIZE.TITLE_1} color={COLORS.PRIMARY}>
                {item.value}
              </TextMedium>
              <TextRegular size={FONT_SIZE.BODY_3}>
                {item.text}
                <TextMedium size={FONT_SIZE.BODY_3}>{item.percent}%</TextMedium>
              </TextRegular >
            </View>
            <ScoreLevel
              title={Translate('textRiskProfileTakeRisk')}
              textTitleStyle={{fontFamily: FONT_TYPE.REGULAR}}
              textSize={FONT_SIZE.BODY_1}
              score={item.score}
              type={'noarrow'}
            />
          </View>
        );
      })}
    </Container>
  );
};

const styles = StyleSheet.create({
  contentRisk: {
    paddingVertical: ViewScale(15),
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.BORDER,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
