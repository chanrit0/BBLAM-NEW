import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Translate} from 'function';
import {ViewScale, FontScale, numberWithCommas} from 'utils';
import {Container} from 'components/common';
import {TextPoints, TextMedium, TextRegular} from 'components/atoms';
import {COLORS, FONT_SIZE, FONT_TYPE} from 'styles';
import _ from 'lodash';

/**
 *
 * name={} FundName={} MemberCount={} total={}
 *
 */

export function ListFundBoxSubFund({
  name = '????',
  FundName = '????',
  MemberCount = '',
  total = '',
}) {
  return (
    <View style={styles.container}>
      <Container style={styles.containerFlex}>
        <View style={{flex: 1, paddingRight: ViewScale(10)}}>
          <TextMedium color={COLORS.PRIMARY}>{name}</TextMedium>
          <TextRegular size={FONT_SIZE.BODY_3}>{FundName}</TextRegular>
          {_.isEmpty(MemberCount) ? null : (
            <TextRegular size={FONT_SIZE.BODY_3}>
              {Translate('textMembership')}{' '}
              <TextMedium color={COLORS.PRIMARY} size={FONT_SIZE.BODY_2}>
                {numberWithCommas(MemberCount)}
              </TextMedium>{' '}
              {Translate('textPerIndividal')}
            </TextRegular>
          )}
        </View>
        <View style={styles.rightItems}>
          <TextRegular size={FONT_SIZE.BODY_3}>
            {_.isEmpty(MemberCount) &&
              total !== null &&
              Translate('textYourInvestmentPolicyInvestmentPolicyRate')}
            {/* `${Translate('textMoneyTotal')} (${Translate('textBaht')})`} */}
          </TextRegular>
          {_.isEmpty(MemberCount) && total !== null && (
            <TextPoints
              number={total}
              suffix={_.isEmpty(MemberCount) && '%'}
              pointSizeSame
              size={FONT_SIZE.BODY_2}
              style={{
                color: COLORS.PRIMARY,
                fontFamily: FONT_TYPE.MEDIUM,
              }}
            />
          )}
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  rightItems: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  containerFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    paddingVertical: ViewScale(15),
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.BORDER,
  },
});
