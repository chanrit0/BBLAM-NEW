/* eslint-disable react-native/no-inline-styles */
// React
import React from 'react';

// components
import {TextRegular, TextMedium} from 'components/atoms';

// lib
import _ from 'lodash';
import {isIOS, numberWithCommas, FontScale} from 'utils';
import {FONT_SIZE} from 'styles';

/*
 * -- Usage --
 *
 * {Textpoints('number:string')}
 *
 */

export default ({
  size,
  number = 0,
  pointSizeSame,
  suffix,
  style,
  containerStyle,
}) => { 
 
  let numberStr = String(number);
  let integer = '';
  let point = '';

  try {
    integer = numberStr.split('.')[0];
    point = numberStr.split('.')[1];
  } catch (e) {
    integer = numberStr;
    point = '00';
  }

  if (_.isEmpty(point)) {
    point = '00';
  }

  const FONT_SIZE_FULL = size !== undefined ? size : FONT_SIZE.BODY_1;
  const FONT_SIZE_POINTS = pointSizeSame
    ? FONT_SIZE_FULL
    : FONT_SIZE_FULL - FontScale(4);

  return (
    <>
      <TextRegular
        style={[
          {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          },
          containerStyle,
        ]}>
        {isIOS && (
          <>
            {/* point */}
            <TextRegular
              style={[
                {
                  fontSize: FONT_SIZE_FULL,
                },
                {...style},
              ]}>
              {numberWithCommas(integer)}.
            </TextRegular>
            {/* points */}
            <TextRegular
              style={[
                {
                  fontSize: FONT_SIZE_POINTS,
                },
                {...style},
              ]}>
              {point}
            </TextRegular>
            {suffix !== undefined && (
              <TextRegular
                style={[
                  {
                    fontSize: FONT_SIZE_FULL,
                  },
                  ,
                  {...style},
                ]}>
                {suffix}
              </TextRegular>
            )}
          </>
        )}
        {!isIOS && (
          <>
            {/* point */}
            <TextRegular
              style={[
                {
                  fontSize: FONT_SIZE_FULL,
                },
                {...style},
              ]}>
              {numberWithCommas(integer)}.
            </TextRegular>
            {/* points */}
            <TextRegular
              style={[
                {
                  fontSize: FONT_SIZE_POINTS,
                },
                {...style},
              ]}>
              {point}
            </TextRegular>
            {suffix !== undefined && (
              <TextRegular
                style={[
                  {
                    fontSize: FONT_SIZE_FULL,
                  },
                  ,
                  {...style},
                ]}>
                {suffix}
              </TextRegular>
            )}
          </>
        )}
      </TextRegular>
    </>
  );
};
