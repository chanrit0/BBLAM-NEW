import {View, Text} from 'react-native';
import React from 'react';
import {RiskProfileGuideline} from 'components/organisms';
import {ListItem} from 'react-native-elements';
import {TextMedium} from 'components/atoms';
import {Translate} from 'function';
import {CONTAINER_MARGIN_HORIZONTAL} from 'styles/spacing';

export default () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };
  return (
    <ListItem.Accordion
      content={
        <View style={{flex: 1}}>
          <TextMedium>
            {Translate('textRiskProfileGuidelineInvestment')}
          </TextMedium>
        </View>
      }
      containerStyle={{paddingHorizontal: CONTAINER_MARGIN_HORIZONTAL}}
      isExpanded={expanded}
      onPress={handleExpand}>
      {expanded && <RiskProfileGuideline />}
    </ListItem.Accordion>
  );
};
