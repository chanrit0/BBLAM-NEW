// React
import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';

// custom
import {Translate} from 'function';
import {ViewScale, FontScale} from 'utils';

// components
import {Container} from 'components/common';
import {
  Tooltip,
  TextPoints,
  SearchBar,
  TextRegular,
  TextMedium,
} from 'components/atoms';

// lib
import {COLORS, FONT_SIZE, FONT_TYPE} from 'styles';

export default ({data, onSearch}) => {
  return (
    <Container style={{flex: 0}}>
      <TextMedium color={COLORS.WHITE} size={FONT_SIZE.TITLE_2}>
        {Translate('textMember_payment')}
      </TextMedium>
      {data !== null && (
        <>
          <TextRegular color={COLORS.WHITE}>{data?.com_name}</TextRegular>
          <TextRegular color={COLORS.WHITE} size={FONT_SIZE.BODY_2}>
            {Translate('textRemiitanceDateRightHeader')}
            {` ${data?.date ?? ''}`}
          </TextRegular>
          <View
            style={{
              borderBottomWidth: 0.5,
              borderColor: COLORS.WHITE,
              marginVertical: ViewScale(10),
            }}
          />
          <View style={styles.justalign}>
            {/* left  */}
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextRegular size={FONT_SIZE.BODY_2} color={COLORS.WHITE}>
                  {Translate('textTotalPaidBackMember')}
                </TextRegular>
                {/* <View style={{marginLeft: ViewScale(5)}}>
                  <Tooltip
                    tooltip={
                      <View>
                        <TextRegular
                          color={COLORS.WHITE}
                          size={FONT_SIZE.BODY_2}>
                          {Translate('textResignTooltip')}
                        </TextRegular>
                      </View>
                    }
                    iconStyle={{color: COLORS.WHITE, size: FontScale(14)}}
                  />
                </View> */}
              </View>
              <TextPoints
                number={data?.sum_all}
                pointSizeSame
                suffix={` ${Translate('textBaht')}`}
                style={{fontFamily: FONT_TYPE.MEDIUM, color: COLORS.WHITE}}
              />
            </View>

            {/* right */}

            <View
              style={{
                width: ViewScale(180),
                flexDirection: 'row',
              }}>
              {/* <View>
                <TextRegular style={styles.textcolumnright}>
                  {Translate('textLeaveJob')}
                </TextRegular>
                <TextRegular style={styles.textcolumnright}>
                  {Translate('textLeaveFund')}
                </TextRegular>
              </View>
              <View style={{flex: 1, alignItems: 'center'}}>
                <TextRegular style={styles.textcolumnright}>
                  {data?.count_resign_job}
                </TextRegular>
                <TextRegular style={styles.textcolumnright}>
                  {data?.count_resign_fund}
                </TextRegular>
              </View> */}
              {/* <View>
                <TextRegular style={styles.textcolumnright}>
                  {'ราย'}
                </TextRegular>
                <TextRegular style={styles.textcolumnright}>
                  {'ราย'}
                </TextRegular>
              </View> */}
            </View>
          </View>

          {/* searchbar */}
          {/* <SearchBar onChangeText={onSearch} /> */}
        </>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  justalign: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textcolumnright: {
    color: 'white',
    fontSize: FontScale(16),
  },
});
