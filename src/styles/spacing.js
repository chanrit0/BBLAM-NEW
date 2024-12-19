import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {FontScale, isTablet, ViewScale} from 'utils';

export const INPUT_HEIGHT = ViewScale(55);
export const HEADER_HEIGHT = ViewScale(70);
export const HEADER_PADDING_HORIZONTAL = ViewScale(15);
export const FOOTER_HEIGHT = ViewScale(30);
export const TABBAR_HEIGHT = ViewScale(80);
export const CONTAINER_MARGIN_HORIZONTAL = wp(6);
export const TABBAR_ICONS_SIZE = isTablet ? ViewScale(15) : ViewScale(26);
export const TABBAR_FONT_SIZE = FontScale(12);
export const ALERT_HEIGHT = ViewScale(200);
export const DRAWER_PADDING_VERTICAL = ViewScale(15);
export const DRAWER_WIDTH_HEIGHT_ICONS = ViewScale(20);
