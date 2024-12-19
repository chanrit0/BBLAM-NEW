import React from 'react';
import {View} from 'react-native';
import {TextMedium, TextRegular} from 'components/atoms';
import {ViewScale} from 'utils';
import styles from '../Style';
import {useWatch} from 'react-hook-form';
import {COLORS} from 'styles';

export default ({control}) => {
  const watch = useWatch({control});
  delete watch['data_show'];
  let total = Object.values(watch).reduce(
    (prev, cur) => parseFloat(cur) + prev,
    0,
  );

  return (
    <View style={styles.sumContainer}>
      <TextMedium>{'รวม'}</TextMedium>
      <View style={styles.row}>
        <TextRegular
          style={{
            marginTop: ViewScale(10),
          }}>
          {'สัดส่วนการลงทุนที่เลือก'}
        </TextRegular>
        <TextMedium color={total > 100 ? COLORS.ERROR : COLORS.BLACK_1}>
          {total.toFixed(2).toString()}%
        </TextMedium>
      </View>
    </View>
  );
};
