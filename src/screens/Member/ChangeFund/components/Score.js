import React from 'react';
import {View, StyleSheet} from 'react-native';
import {COLORS, FONT_SIZE} from 'styles';
import {Translate} from 'function';
import {ViewScale} from 'utils';
import {Container, ScoreLevel} from 'components/common';
import {TextRegular, TextBold, TextLight} from 'components/atoms';

export default function Score({date = '??/??/????', score = '0'}) {
  return (
    <View style={styles.container}>
      <Container>
        <View style={styles.Incontainer}>
          <ScoreLevel
            isFull={true}
            title={Translate('textScoreLevelAcceptableRisk')}
            score={score}
          />
          <View style={styles.lineVertical} />
          <View style={styles.containerRight}>
            <TextRegular size={FONT_SIZE.BODY_1}>
              {Translate('textScoreLevelYourScore')}
            </TextRegular>
            <TextBold color={COLORS.PRIMARY} size={FONT_SIZE.TITLE_4}>
              {score}
            </TextBold>
            <TextLight size={FONT_SIZE.BODY_3}>
              {Translate('textScoreLevelLastedDateEvaluate')} {date}
            </TextLight>
          </View>
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: COLORS.BORDER,
    paddingVertical: ViewScale(10),
  },
  Incontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: ViewScale(10),
  },
  lineVertical: {borderColor: COLORS.BORDER, borderWidth: 1},
  containerRight: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
