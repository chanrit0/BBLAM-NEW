import React from 'react';
import {View} from 'react-native';
import {COLORS, FONT_SIZE, FONT_TYPE} from 'styles';
import {Container} from 'components/common';
import {Translate} from 'function';
import {FontScale, ViewScale} from 'utils';
import {TextPoints, TextLight, TextMedium} from 'components/atoms';
import _ from 'lodash';

export default ({data}) => {
  const renderView = React.useCallback(
    (item, index) => (
      <View key={item && 'userInvestmentPolicyId-' + index}>
        <View>
          <View
            style={{
              paddingVertical: ViewScale(10),
            }}>
            <Container>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <TextMedium color={COLORS.PRIMARY}>
                  {item?.sub_code ?? '-'}
                </TextMedium>
                <TextLight size={FONT_SIZE.BODY_3} color={COLORS.FOURTHDARY}>
                  {Translate('textYourInvestmentPolicyCurrentInvestmentRate')}
                </TextLight>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <TextLight
                  size={FONT_SIZE.BODY_3}
                  style={{flex: 1, flexWrap: 'wrap'}}>
                  {item?.sub_name ?? '-'}
                </TextLight>
                {item?.percent ? (
                  <TextPoints
                    pointSizeSame
                    suffix={'%'}
                    number={item.percent}
                    size={FONT_SIZE.BODY_1}
                    style={{
                      fontFamily: FONT_TYPE.MEDIUM,
                      color: COLORS.PRIMARY,
                    }}
                  />
                ) : (
                  <TextMedium color={COLORS.PRIMARY} size={FONT_SIZE.BODY_3}>
                    -
                  </TextMedium>
                )}
              </View>
              <TextLight size={FONT_SIZE.BODY_3}>
                {Translate('textYourInvestmentPolicyInvestmentPolicyRate')}{' '}
                {item?.max_percent ? (
                  <TextPoints
                    pointSizeSame
                    suffix={'%'}
                    number={item.max_percent}
                    size={FontScale(16)}
                    style={{
                      fontFamily: FONT_TYPE.MEDIUM,
                    }}
                  />
                ) : (
                  <TextMedium color={COLORS.PRIMARY} size={FONT_SIZE.BODY_3}>
                    -
                  </TextMedium>
                )}
              </TextLight>
            </Container>
          </View>
        </View>
        <View style={{borderBottomWidth: 1, borderColor: COLORS.BORDER}} />
      </View>
    ),
    [data],
  );

  const render = data => {
    if (_.isEmpty(data?.data)) {
      return <View />;
    } else {
      return (
        <>
          <View style={{borderBottomWidth: 1, borderColor: COLORS.BORDER}} />
          {data.data.map((item, index) => renderView(item, index))}
        </>
      );
    }
  };

  return render(data);
};
