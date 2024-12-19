/* eslint-disable react-native/no-inline-styles */
// React
import React, {useState} from 'react';

// custom
import {COLORS} from 'styles';
import {ViewScale} from 'utils';

// components
import {MaterialIcons} from 'components/Icons';

// lib
import {Tooltip} from 'react-native-elements';

export default ({tooltip, iconStyle, containerStyle, icon, ...props}) => {
  const [tooltipSize, setTooltipSize] = useState({w: 500, h: 500});

  const tooltipClone = React.cloneElement(tooltip, {
    onLayout: e =>
      setTooltipSize({
        w: e.nativeEvent.layout.width,
        h: e.nativeEvent.layout.height,
      }),
  });

  return (
    <Tooltip
      {...props}
      popover={tooltipClone}
      width={tooltipSize.w + 30}
      height={tooltipSize.h + 30}
      backgroundColor={'#848484'}
      skipAndroidStatusBar={false}
      overlayColor={'transparent'}
      containerStyle={[
        {
          borderRadius: 0,
          backgroundColor: COLORS.TOOLTIP,
          color: COLORS.WHITE,
        },
        containerStyle,
      ]}>
      {icon ? (
        icon
      ) : (
        <MaterialIcons
          name="help-outline"
          size={iconStyle?.size !== undefined ? iconStyle.size : ViewScale(20)}
          color={
            iconStyle?.color !== undefined ? iconStyle.color : COLORS.PRIMARY
          }
        />
      )}
    </Tooltip>
  );
};
