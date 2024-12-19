// React
import React from 'react';
import {TouchableOpacity} from 'react-native';

// customs
import styles from '../Style';

// global components
import {TextMedium} from 'components/atoms';

export default ({style, onPress, title, icon}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.ButtonDrawerContainer}>
      {icon}
      <TextMedium style={[styles.ButtonDrawerText_Space, style]}>
        {title}
      </TextMedium>
    </TouchableOpacity>
  );
};
