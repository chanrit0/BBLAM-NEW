import {StyleSheet} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {ViewScale, FontScale} from 'utils';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import * as FONT_SIZE from './typography';
import * as SPACING from './spacing';
import * as COLORS from './colors';
import G_STYLES from './global';

export const isTablet = DeviceInfo.isTablet();

// SPACING
export const DRAWER_BODY_CONTAINER = wp(6);
export const DRAWER_PADDING_VERTICAL = ViewScale(15);
export const DRAWER_WIDTH_HEIGHT_ICONS = ViewScale(20);
export const DRAWER_SHIFT_ICONS = ViewScale(10);
export const BOX_HEIGHT = ViewScale(50); // INPUT_HEIGHT
export const FOOTER_HEIGHT = ViewScale(30);
export const TABBAR_ICONS_SIZE = isTablet ? ViewScale(15) : ViewScale(24);

export const FONT_TYPE = {
  SEMI_BOLD: 'Upload-SemiBold',
  MEDIUM: 'Upload-Medium',
  REGULAR: 'Upload-Light',
  LIGHT: 'Upload-ExtraLight',
};

export const scaleFont = size => FontScale(size);

// TYPOGRAPHY
export {FONT_SIZE, SPACING, COLORS, G_STYLES};

export const globalStyle = StyleSheet.create({
  logo: {
    height: ViewScale(170),
    width: ViewScale(200),
    transform: [{scale: 1.5}],
  },
  viewOpenPopup: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  IconPopup: {
    alignItems: 'flex-end',
    padding: ViewScale(5),
  },
  backdropStyle: {
    backgroundColor: 'blue',
    opacity: 0.2,
  },
  overlayStyle: {
    height: ViewScale(200),
    padding: ViewScale(0),
    borderRadius: ViewScale(0),
    width: wp(90),
    justifyContent: 'center',
  },
  viewOverlay: {alignItems: 'center', justifyContent: 'center', height: '90%'},
});
