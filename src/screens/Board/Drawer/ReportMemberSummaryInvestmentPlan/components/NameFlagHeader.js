// React
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Container} from 'components/common';
import {ViewScale, FontScale} from 'utils';
import {TextRegular, TextMedium} from 'components/atoms';
import {Translate} from 'function';
import {COLORS} from 'styles';

export default function NameFlagHeader({data}) {
  return (
    <View style={styles.NameContainer}>
      <Container style={{flex: 0}}>
        <TextMedium style={[styles.text, styles.text1]}>
          {Translate('textBoardDrawerHeader2_sub3')}
        </TextMedium>
        <TextRegular style={[styles.text, styles.text3]}>
          {data?.company ?? ''}
        </TextRegular>
        {data?.isFundAll ? (
          <TextRegular style={[styles.text, styles.text3]}>
            {'กองทุนรวมทั้งหมด'}
          </TextRegular>
        ) : (
          <>
            {data?.fund_name && (
              <TextRegular style={[styles.text, styles.text3]}>
                {data?.fund_name}
              </TextRegular>
            )}
          </>
        )}
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  NameContainer: {
    justifyContent: 'center',
  },
  text: {
    color: COLORS.WHITE,
    fontSize: FontScale(20),
  },
  text3: {
    fontSize: FontScale(16),
  },
});
