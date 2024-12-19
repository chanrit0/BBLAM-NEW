/* eslint-disable react-native/no-inline-styles */
// React
import React from 'react';
import {View} from 'react-native';

// custom
import {Translate} from 'function';
import {ViewScale} from 'utils';
import {COLORS, FONT_SIZE, FONT_TYPE} from 'styles';

// components
import {MyReturnGrid4} from 'components/molecules';
import {TextMedium, TextPoints} from 'components/atoms';
import {isIOS} from 'utils';

export default ({
  total = 0,
  saving,
  contribution,
  benefitSaving,
  benefitContribution,
  unit = Translate('textBaht'),
}) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.WHITE,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'rgba(26,54,134,0.3)',
      }}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {isIOS ? (
          <TextMedium
            style={{
              marginTop: ViewScale(20),
            }}>
            {Translate('textMoneyTotal')}
          </TextMedium>
        ) : (
          <TextMedium
            style={{
              marginTop: ViewScale(20),
            }}>
            {Translate('textMoneyTotal')}
          </TextMedium>
        )}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}>
          <TextPoints
            number={total}
            suffix={` ${unit}`}
            style={{
              fontFamily: FONT_TYPE.MEDIUM,
            }}
            size={FONT_SIZE.TITLE_2}
          />
        </View>
      </View>
      <MyReturnGrid4
        saving={saving}
        contribution={contribution}
        benefitSaving={benefitSaving}
        benefitContribution={benefitContribution}
        unit={unit}
      />
    </View>
  );
};
