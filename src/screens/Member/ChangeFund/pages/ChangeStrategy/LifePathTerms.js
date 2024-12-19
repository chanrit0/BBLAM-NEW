import {TemplateTerms} from 'components/templates';
import {Translate} from 'function';
import React from 'react';
import {isTablet} from 'utils';

export default ({navigation, route}) => {
  const {goToScreen, screenProps} = route.params;

  const _onPress = () => {
    navigation.replace(goToScreen, screenProps);
  };

  return (
    <>
      <TemplateTerms
        title={Translate('textRiskProfileTitle')}
        content_title={`ข้อกำหนดสำหรับทางเลือกการลงทุนแบบ ${
          !isTablet ? '\n' : ''
        } Life Path (LP)`}
        content={Translate('textLifePathTerms')}
        onEndReachCheck={true}
        onPress={_onPress}
      />
    </>
  );
};
