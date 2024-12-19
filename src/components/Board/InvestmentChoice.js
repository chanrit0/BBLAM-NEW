/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Translate} from 'function';
import {ViewScale, FontScale, numberWithCommas} from 'utils';
import {Container} from 'components/common';
import {MaterialIcons} from 'components/Icons';
import {ListFundBoxSubFund} from './ListFundBoxSubFund';
import {COLORS, FONT_SIZE} from 'styles';
import {TextRegular, TextMedium} from 'components/atoms';
import _ from 'lodash';
import {EmptyData} from 'components/organisms';

export default function InvestmentChoice({data}) {
  const [pages, setPages] = React.useState(0);

  const _NextPage = () => {
    if (pages < data.length - 1) {
      setPages(pages + 1);
    }
  };

  const _BackPage = () => {
    if (pages > 0) {
      setPages(pages - 1);
    }
  };

  return (
    <View style={{paddingVertical: ViewScale(10)}}>
      {data.length > 0 ? (
        <>
          <Container style={styles.investPolicy}>
            <TextRegular
              style={{
                fontSize: FONT_SIZE.BODY_2,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              {Translate('textInvestmentPolicy')}
            </TextRegular>

            {/* pages */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={_BackPage}>
                <MaterialIcons
                  size={FontScale(22)}
                  name="chevron-left"
                  style={{color: COLORS.PRIMARY}}
                />
              </TouchableOpacity>
              <TextRegular
                size={FONT_SIZE.BODY_2}
                style={{marginHorizontal: ViewScale(10)}}
                color={COLORS.PRIMARY}>
                {Translate('textChangeStrategyHeader')}
                {' 0'}
                {pages + 1}
                {'/'}
                {`0${data.length}`}
              </TextRegular>
              <TouchableOpacity onPress={_NextPage}>
                <MaterialIcons
                  size={FontScale(22)}
                  name="chevron-right"
                  style={{color: COLORS.PRIMARY}}
                />
              </TouchableOpacity>
            </View>
          </Container>

          {/* title */}
          <View style={styles.section2}>
            <Container style={styles.section2Container}>
              {/* Left */}
              <View>
                <TextMedium>
                  {`${Translate('textChangeStrategyHeader')} `}
                  {data[pages]?.choice_no}
                </TextMedium>
                <TextRegular size={FONT_SIZE.BODY_2}>
                  {`${Translate('textMembership')} `}
                  <TextMedium color={COLORS.PRIMARY} size={FONT_SIZE.BODY_2}>
                    {!_.isEmpty(data) &&
                      numberWithCommas(data[pages]?.count_member)}
                  </TextMedium>
                  {` ${Translate('textPerIndividal')}`}
                </TextRegular>
              </View>

              {/* Right */}
              {/* <View style={styles.section2Right}>
           <TextRegular size={FONT_SIZE.BODY_2}>{`${Translate(
             'textMoneyTotal',
           )} (${Translate('textBaht')})`}</TextRegular>
           <TextPoints
             pointSizeSame
             number={data ? data[pages]?.sum_total : 0}
             size={FONT_SIZE.BODY_2}
             style={{color: COLORS.PRIMARY, fontFamily: FONT_TYPE.MEDIUM}}
           />
         </View> */}
            </Container>
          </View>

          {/* FundBoxSubFund */}
          {data.length > 0
            ? data[pages].data.map((item, index) => (
                <View key={'FundBoxSubListid-' + index}>
                  <ListFundBoxSubFund
                    name={item.sub_code}
                    FundName={item.sub_name}
                    total={item.percent}
                  />
                </View>
              ))
            : null}
        </>
      ) : (
        <EmptyData title={Translate('textNoData')} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section2: {
    backgroundColor: '#FFF',
    borderBottomWidth: 0.5,
    borderColor: COLORS.BORDER,
  },
  section2Container: {
    paddingVertical: ViewScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  section2Right: {
    alignItems: 'flex-end',
  },
  investPolicy: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: ViewScale(10),
  },
});
