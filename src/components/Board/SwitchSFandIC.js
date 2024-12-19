// ปุ่ม switch ระหว่าง SubFund & ทางเลือกการลงทุน

// React
import React from 'react';
import {View, StyleSheet} from 'react-native';

// custom
import {Translate} from 'function';
import {isTablet, ViewScale} from 'utils';

// components
import {Container} from 'components/common';
import {Switch, TextRegular, TextMedium} from 'components/atoms';
import {FONT_SIZE} from 'styles';

export default function SwitchSFandIC({onChange}) {
  const [toggleSwitch, setToggleSwitch] = React.useState(false); // false -> SubFund , true -> InvestmentChoice

  const _toggle = () => {
    setToggleSwitch(!toggleSwitch);
    onChange(!toggleSwitch);
  };

  return (
    <View style={{paddingVertical: ViewScale(15)}}>
      <Container style={styles.containerSwitch}>
        <TextMedium size={FONT_SIZE.BODY_2}>
          {!toggleSwitch
            ? Translate('textFund')
            : Translate('textAlternativeList')}
        </TextMedium>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextRegular
            size={FONT_SIZE.BODY_2}
            color={!toggleSwitch ? 'black' : '#949393'}>
            {'Sub Fund'}
          </TextRegular>
          <View style={{marginHorizontal: ViewScale(10)}}>
            <Switch
              renderActiveText={false}
              renderInActiveText={false}
              value={toggleSwitch}
              // switchWidthMultiplier={3}
              switchLeftPx={isTablet ? 1.5 : 2}
              switchRightPx={isTablet ? 1.5 : 2}
              circleSize={ViewScale(20)}
              barHeight={ViewScale(20)}
              onChange={_toggle}
            />
          </View>
          <TextRegular
            size={FONT_SIZE.BODY_2}
            color={toggleSwitch ? 'black' : '#949393'}>
            {Translate('textInvestmentChoice')}
          </TextRegular>
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  containerSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
