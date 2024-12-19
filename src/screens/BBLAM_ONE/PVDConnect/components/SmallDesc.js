// React
import React from 'react';
import {View} from 'react-native';

// customs
import {Translate} from 'function';
import styles from '../Style';

// components
import {TextRegular} from 'components/atoms';

export const SmallDesc = () => (
  <View style={styles.DescriptionContainer}>
    <TextRegular style={styles.textDescriptContent}>
      {Translate('textPVDConnectSDecs')}
    </TextRegular>
  </View>
);
