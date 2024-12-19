/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {Switch} from 'react-native-switch';
import {COLORS, FONT_TYPE} from 'styles';
import {isTablet, FontScale} from 'utils';

export default props => {
  const value = props.value;
  const onChange = props.onChange;

  return (
    <>
      <Switch
        activeText={'TH'}
        inActiveText={'EN'}
        value={value}
        onValueChange={() => {
          onChange(!value);
        }}
        backgroundActive={COLORS.PRIMARY}
        backgroundInactive={COLORS.PRIMARY}
        circleBorderActiveColor={COLORS.PRIMARY}
        circleBorderInactiveColor={COLORS.PRIMARY}
        circleBorderWidth={1}
        switchLeftPx={8} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
        switchRightPx={8} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
        switchWidthMultiplier={isTablet ? 2.5 : 2}
        activeTextStyle={{
          fontSize: FontScale(16),
          fontFamily: FONT_TYPE.MEDIUM,
        }}
        inactiveTextStyle={{
          fontSize: FontScale(16),
          fontFamily: FONT_TYPE.MEDIUM,
        }}
        {...props}
      />
    </>
  );
};
