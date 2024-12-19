// React
import React from 'react';
import {View, StyleSheet} from 'react-native';

// custom
import {Translate} from 'function';
import {ViewScale} from 'utils';

// components
import {ScoreLevel, Container} from 'components/common';
import {
  LineHorizontal,
  TextRegular,
  TextBold,
  TextLight,
  TextMedium,
} from 'components/atoms';
import {COLORS, FONT_SIZE} from 'styles';
// lib

export function ListEvaluate({name = '', score = 0, date = ''}) {
  return (
    <View>
      <Container style={styles.container}>
        <View style={styles.insideContainer}>
          <TextMedium
            size={FONT_SIZE.BODY_2}
            ellipsizeMode="tail"
            numberOfLines={1}>
            {name}
          </TextMedium>
          <View style={{flexDirection: 'row'}}>
            <TextRegular size={FONT_SIZE.BODY_2}>
              {Translate('textScoreEvaluateRisk')}
            </TextRegular>
            <TextBold
              color={COLORS.PRIMARY}
              size={FONT_SIZE.BODY_2}
              style={{marginLeft: ViewScale(10)}}>
              {score}
            </TextBold>
          </View>
          <TextLight size={FONT_SIZE.BODY_3}>
            {Translate('textScoreLevelLastedDateEvaluate')}{' '}
            <TextLight size={FONT_SIZE.BODY_3} color={'#acb3c5'}>
              {date}
            </TextLight>
          </TextLight>
        </View>
        <View style={[styles.containerRight]}>
          <ScoreLevel
            isFull
            score={score}
            textSize={FONT_SIZE.BODY_2}
            boxSizeWidth={ViewScale(12.5)}
            boxSizeHeight={ViewScale(20)}
            title={Translate('textScoreLevelAcceptableRisk')}
          />
        </View>
      </Container>
      <LineHorizontal />
    </View>
  );
}

const styles = StyleSheet.create({
  insideContainer: {
    flex: 1,
    width: '80%',
    justifyContent: 'space-between',
  },
  container: {
    paddingTop: ViewScale(20),
    paddingBottom: ViewScale(30),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerRight: {
    alignItems: 'center',
    // transform: [{scale: 0.85}],
  },
});
