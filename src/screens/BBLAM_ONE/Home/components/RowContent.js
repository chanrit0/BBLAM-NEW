import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ViewScale, FontScale} from 'utils';
import {TextMedium, TextLight, TextBold} from 'components/atoms';
import {COLORS, FONT_SIZE} from 'styles';
import {Container} from 'components/common';

export default function RowContent({
  fundname,
  fundDesc,
  point,
  percent,
  style,
}) {
  fundname = 'BBASIC';
  fundDesc = 'กองทุนเปิดบัวหลวงปัจจัย 4';
  point = '19.0138';
  percent = '+11.29%';
  return (
    <View style={[styles.container, style]}>
      <View style={{backgroundColor: 'gray', height: ViewScale(120)}} />
      <Container
        style={{
          marginHorizontal: '6.5%',
          paddingVertical: ViewScale(10),
        }}>
        <View style={{flexGrow: 1}}>
          <TextMedium style={styles.textTitle}>{fundname}</TextMedium>
          <TextLight style={styles.textDesc}>{fundDesc}</TextLight>
        </View>

        <View style={{flexGrow: 1}}>
          <TextMedium style={styles.textTitle}>{point}</TextMedium>
          <TextBold style={styles.textPercent}>{percent}</TextBold>
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  textPercent: {
    color: COLORS.SUCCESS,
    fontSize: FONT_SIZE.TITLE_3,
  },
  textDesc: {
    color: COLORS.PRIMARY,
    fontSize: FontScale(15),
  },
  textTitle: {
    color: COLORS.PRIMARY,
    fontSize: FONT_SIZE.TITLE_4,
  },
  container: {
    overflow: 'hidden',
    backgroundColor: COLORS.WHITE,
    borderRadius: 4,
    width: ViewScale(200),
  },
});
