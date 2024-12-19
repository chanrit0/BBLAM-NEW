import React from 'react';
import { TouchableHighlight } from 'react-native';
import { COLORS } from 'styles';

export default props => (
  <TouchableHighlight {...props} underlayColor={COLORS.ONPRESSED_FILL_HIGHLIGHT} />
);
