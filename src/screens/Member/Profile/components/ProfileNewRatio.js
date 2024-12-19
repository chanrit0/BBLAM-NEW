import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GraphDonut, TextRegular } from 'components/atoms';
import { ViewScale } from 'utils';
import { FONT_SIZE } from 'styles';

export default function ProfileNewRatio({ data }) {
  return (
    <View style={styles.container}>
      <GraphDonut data={data} isInvestNew />
      <TextRegular size={FONT_SIZE.BODY_3} style={styles.text}>
        {'ถ้าสัดส่วนเกิน จะนำเงินใหม่ไปลงทุนในนโยบายตามที่บริษัทกำหนด'}
      </TextRegular>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#FFF' },
  text: { alignSelf: 'center', marginVertical: ViewScale(10) },
});
