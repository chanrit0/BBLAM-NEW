import {TextRegular, TextBold} from 'components/atoms';
import {Translate} from 'function';
import {StatusBar} from 'react-native';
import React from 'react';
import {COLORS, FONT_SIZE} from 'styles';
import {ViewScale} from 'utils';

export default () => {
  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor={COLORS.PRIMARY} />
      <TextBold>{Translate('textAlertHeaderLogin_BBLAMONE')}</TextBold>
      <TextRegular
        style={{
          marginTop: ViewScale(10),
          fontSize: FONT_SIZE.BODY_2,
          color: COLORS.FOURTHDARY,
          textAlign: 'center',
        }}>
        {Translate('textAlertBodyLogin_BBLAMONE')}
      </TextRegular>
    </>
  );
};
