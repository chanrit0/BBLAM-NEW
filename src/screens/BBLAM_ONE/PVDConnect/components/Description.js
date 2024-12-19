// React
import React from 'react';
import {View} from 'react-native';

// customs
import styles from '../Style';

// global components
import {TextRegular, TextBold} from 'components/atoms';
import {Translate} from 'function';

export const Description = () => {
  return (
    <View style={styles.DescriptionContainer}>
      <View>
        <View style={styles.viewTitle}>
          <TextRegular style={styles.bullet}>{'\u2022'}</TextRegular>
          <TextBold style={styles.textDescriptTitle}>
            {Translate('textPVDConnectDescC1')}
          </TextBold>
        </View>

        <TextRegular style={styles.textDescriptContent}>
          {Translate('textPVDConnectDescC1D')}
        </TextRegular>
      </View>
      <View style={styles.column2}>
        <View style={styles.viewTitle}>
          <TextRegular style={styles.bullet}>{'\u2022'}</TextRegular>
          <TextBold style={styles.textDescriptTitle}>
            {Translate('textPVDConnectDescC2')}
          </TextBold>
        </View>
        <TextRegular style={styles.textDescriptContent}>
          {Translate('textPVDConnectDescC2D')}
        </TextRegular>
      </View>
    </View>
  );
};
