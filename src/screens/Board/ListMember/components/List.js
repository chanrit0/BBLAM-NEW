/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Container} from 'components/common';
import {TextRegular, TextMedium} from 'components/atoms';
import {Translate} from 'function';
import {ViewScale} from 'utils';
import {Ionicons} from 'components/Icons';
import {COLORS, FONT_SIZE} from 'styles';
import _ from 'lodash';

export default ({data, onPress}) => {
  return (
    <TouchableOpacity style={styles.border} onPress={onPress}>
      <Container style={styles.container}>
        <View style={styles.containerLeft}>
          <TextMedium size={FONT_SIZE.BODY_2} numberOfLines={1}>
            {data?.em_name}
          </TextMedium>
          <View style={styles.containerInLeft}>
            <View>
              <TextRegular size={FONT_SIZE.BODY_4}>
                {'ทางเลือกการลงทุน'}
              </TextRegular>
              <TextRegular size={FONT_SIZE.BODY_4}>
                {'เงินสะสมรายเดือน'}
              </TextRegular>
            </View>
            <View style={styles.containerInLeft_Right}>
              <TextMedium
                size={FONT_SIZE.BODY_4}
                color={COLORS.PRIMARY}
                numberOfLines={1}>
                {`ทางเลือกการลงทุน ${data?.choice_no}`}
              </TextMedium>
              <View style={styles.em_cb_container}>
                <TextMedium size={FONT_SIZE.BODY_4} color={COLORS.PRIMARY}>
                  {`${data?.em_cb} ${
                    data?.em_cb === '-' ? '' : Translate('textBaht')
                  }`}
                </TextMedium>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.containerRight}>
          <TextRegular size={FONT_SIZE.BODY_4}>
            {'จำนวนเงินในกองทุน'}
          </TextRegular>
          <View style={styles.cont_sum_total_container}>
            <TextMedium size={FONT_SIZE.BODY_3} color={COLORS.PRIMARY}>
              {`${data?.cont_sum_total} ${
                data?.cont_sum_total !== '-' ? Translate('textBaht') : ''
              }`}
            </TextMedium>
          </View>
          <TextRegular size={FONT_SIZE.BODY_4} color={'#666464'}>
            {`ข้อมูล ณ วันที่ ${data?.choice_date}`}
          </TextRegular>
        </View>
        <View style={styles.iconContainer}>
          <Ionicons
            name="chevron-forward-circle"
            color={COLORS.PRIMARY}
            size={FONT_SIZE.TITLE_2}
          />
        </View>
      </Container>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cont_sum_total_container: {flexDirection: 'row', justifyContent: 'center'},
  em_cb_container: {flexDirection: 'row', justifyContent: 'flex-start'},
  containerLeft: {
    flex: 1,
  },
  iconContainer: {
    marginLeft: ViewScale(20),
  },
  border: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: COLORS.BORDER,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: ViewScale(10),
  },
  containerInLeft_Right: {
    flex: 1,
    marginLeft: ViewScale(10),
  },
  containerInLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerRight: {
    alignItems: 'flex-end',
  },
});
