import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Translate} from 'function';
import {ViewScale, FontScale} from 'utils';
import {Container} from 'components/common';
import {TextMedium, TextLight} from 'components/atoms';
import {COLORS, FONT_SIZE, FONT_TYPE} from 'styles';
import _ from 'lodash';

export default ({data}) => {
  if (_.isEmpty(data?.data.sw_list)) {
    return <View />;
  } else {
    return (
      <>
        {data?.data.sw_list.map((item, index) => {
          return (
            <View key={'ChangeHistory-' + index}>
              <View
                style={{borderTopWidth: 0.5, borderColor: COLORS.PRIMARY}}
              />
              <View
                style={{
                  paddingVertical: ViewScale(10),
                }}
                key={index}>
                <Container>
                  <View style={styles.changeListContainer_InContainer}>
                    <TextMedium>
                      {item?.seq_id}
                    </TextMedium>
                    <View style={{flexDirection: 'column'}}>
                      <TextLight>{'วันที่ทำรายการ'}</TextLight>
                      <TextLight style={styles.date}>
                        {item.created_at}
                      </TextLight>
                    </View>
                    <View style={{flexDirection: 'column'}}>
                      <TextLight>{'วันที่มีผล'}</TextLight>
                      <TextLight style={styles.date}>
                        {item.effective_date}
                      </TextLight>
                    </View>
                  </View>
                </Container>
              </View>
              {index === data?.data.sw_list.length - 1 && (
                <View
                  style={{borderBottomWidth: 0.5, borderColor: COLORS.PRIMARY}}
                />
              )}
            </View>
          );
        })}
      </>
    );
  }
};

const styles = StyleSheet.create({
  date: {
    color: COLORS.PRIMARY,
    fontSize: FONT_SIZE.BODY_1,
  },
  changeListContainer_InContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  headerTop: {
    paddingVertical: ViewScale(20),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTop_text1: {
    fontFamily: FONT_TYPE.REGULAR,
    fontSize: FONT_SIZE.TITLE_2,
  },
  headerTop_textStress: {
    color: COLORS.PRIMARY,
    fontSize: FONT_SIZE.TITLE_3,
    fontFamily: FONT_TYPE.MEDIUM,
  },
  headerTop_text2: {
    fontFamily: FONT_TYPE.LIGHT,
    color: '#4c637b',
    fontSize: FONT_SIZE.TITLE_2,
  },
});
