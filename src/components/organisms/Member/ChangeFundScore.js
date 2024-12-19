import React from 'react';
import {View, StyleSheet} from 'react-native';
import {COLORS, FONT_SIZE} from 'styles';
import {Translate} from 'function';
import {ViewScale} from 'utils';
import {ScoreLevel} from 'components/common';
import {TextRegular, TextBold, TextLight} from 'components/atoms';
import _ from 'lodash';

export default ({date = '', score = 0}) => {
  return (
    <View style={styles.container}>
      <View style={styles.Incontainer}>
        <ScoreLevel
          isFull={true}
          title={Translate('textScoreLevelAcceptableRisk')}
          score={score}
        />
        <View style={styles.lineVertical} />
        <View style={styles.containerRight}>
          <TextRegular>{Translate('textScoreLevelYourScore')}</TextRegular>
          <TextBold color={COLORS.PRIMARY} size={FONT_SIZE.TITLE_4}>
            {score == 0 || score == null ? 0 : score}
          </TextBold>
          <TextLight size={FONT_SIZE.BODY_3}>
            {date && Translate('textScoreLevelLastedDateEvaluate2')}{' '}
            {!_.isEmpty(date) ? date : 'ยังไม่ได้ประเมิน'}
          </TextLight>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: COLORS.BORDER,
    paddingVertical: ViewScale(10),
  },
  Incontainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: ViewScale(10),
  },
  lineVertical: {borderColor: COLORS.BORDER, borderWidth: 1},
  containerRight: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
