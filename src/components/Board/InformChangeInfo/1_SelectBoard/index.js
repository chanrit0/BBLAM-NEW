/* eslint-disable react-hooks/rules-of-hooks */
// React
import React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';

// custom
import {Translate} from 'function';
import {ViewScale} from 'utils';

// components
import ScrollableTabView from '../ScrollableTabView';

// pages
import ChangeBoard from './pages/1_ChangeBoard';
import ChangeQuatityBoard from './pages/2_ChangeQuatityBoard';
import ChangeNameBoard from './pages/3_ChangeNameBoard';
import ChangeEmailBoard from './pages/4_ChangeEmailBoard';
import ChangeSignBoard from './pages/6_ChangeSignBoard';
import ChangeConditionBoard from './pages/5_ChangeConditionBoard';

export default function index() {
  return (
    <View style={styles.scrolltabViewContainer}>
      <ScrollableTabView>
        <ChangeBoard label={Translate('textSection1_ChangeCommittee')} />
        <ChangeQuatityBoard
          label={Translate('textSection1_AdjustCommitteeAmount')}
        />
        <ChangeNameBoard
          label={Translate('textSection1_ChangeNameCommittee')}
        />
        <ChangeEmailBoard
          label={Translate('textSection1_ChangeEmailCommittee')}
        />
        <ChangeSignBoard
          label={Translate('textSection1_ChangeSignatureComittee')}
        />
        <ChangeConditionBoard
          label={Translate('textSection1_ChangeConditionSignComittee')}
        />
      </ScrollableTabView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrolltabViewContainer: {
    flex: 1,
    marginTop: ViewScale(15),
  },
});
