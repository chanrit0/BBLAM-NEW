import {TemplateTerms} from 'components/templates';
import {Translate} from 'function';
import React from 'react';
import {View, Text} from 'react-native';

export default ({navigation, route}) => {
  const {goToScreen, screenProps} = route.params;

  const _onPress = () => {
    navigation.replace(goToScreen, screenProps);
  };

  return (
    <TemplateTerms
      title={Translate('textRiskProfileTitle')}
      content_title={
        'ข้อกำหนดสำหรับวางแผนปรับสัดส่วนมูลค่าเงินลงทุนอัตโนมัติ (Auto Rebalance Program)'
      }
      content={Translate('textAutoBalanceTerms')}
      onEndReachCheck={true}
      onPress={_onPress}
    />
  );
};
