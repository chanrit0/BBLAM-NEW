/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Container} from 'components/common';
import {TextRegular, TextMedium} from 'components/atoms';
import {Ionicons} from 'components/Icons';
import {Translate} from 'function';
import {ViewScale, FontScale, isTablet} from 'utils';
import {COLORS, FONT_SIZE} from 'styles';
import _ from 'lodash';

export default function ListSumInvest({data = null, onPress}) {
  const showIcon = () => {
    let iconName = ['add-circle', 'remove-circle'];
    let indexIcon = 0;

    if (data.return_fund > 0) {
      indexIcon = 0;
    } else {
      indexIcon = 1;
    }

    return (
      <Ionicons
        name={iconName[indexIcon]}
        color={indexIcon != 0 ? 'red' : COLORS.SUCCESS}
        size={FontScale(20)}
      />
    );
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderColor: '#dadbdd',
        borderBottomWidth: 1,
        paddingVertical: ViewScale(15),
      }}>
      <Container
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flex: 1}}>
          <TextMedium color={COLORS.PRIMARY}>{data?.sub_code}</TextMedium>
          <TextRegular size={FONT_SIZE.BODY_3}>
            {data?.sub_name === null
              ? ''
              : `${data?.sub_name.replace(/\(/, match => {
                  return !isTablet ? `\n${match}` : '';
                })}`}
          </TextRegular>
          <TextRegular size={FONT_SIZE.BODY_3}>
            {Translate('textRemiitanceDateRightHeader')}
            {!_.isEmpty(data?.date) ? data?.date : '-'}
          </TextRegular>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <View style={{alignItems: 'flex-end'}}>
            <TextMedium color={COLORS.PRIMARY} size={FONT_SIZE.BODY_2}>
              {'NAV '} {!_.isEmpty(data?.nav) ? data?.nav : '-'}{' '}
              {Translate('textBaht')}
            </TextMedium>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: ViewScale(3),
              }}>
              {showIcon()}

              <TextMedium
                style={{marginLeft: ViewScale(5)}}
                color={COLORS.THIRDARY}
                size={FONT_SIZE.BODY_3}>
                {`${
                  !_.isEmpty(data?.return_fund)
                    ? Math.abs(parseFloat(data?.return_fund)).toFixed(2)
                    : '- '
                }% | BM ${
                  !_.isEmpty(data?.return_bm)
                    ? parseFloat(data?.return_bm).toFixed(2)
                    : '- '
                }%`}
              </TextMedium>
            </View>
          </View>
          <View style={{marginLeft: ViewScale(10)}}>
            <Ionicons
              name="chevron-forward-circle"
              color={COLORS.PRIMARY}
              size={FontScale(24)}
            />
          </View>
        </View>
      </Container>
    </TouchableOpacity>
  );
}
