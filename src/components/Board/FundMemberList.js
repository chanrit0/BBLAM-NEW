import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {View, Text} from 'react-native';
import {Container} from 'components/common';
import {Ionicons} from 'components/Icons';
import {MultipleUsers} from 'components/Icons/Customs';
import {COLORS, SPACING} from 'styles';
import {TextMedium} from 'components/atoms';
import {Translate} from 'function';
import {ViewScale, FontScale, numberWithCommas} from 'utils';

export default ({onPress, data = 0}) => {
  return (
    <View style={styles.memberFundButton}>
      <Container style={styles.memberFundButtonContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MultipleUsers />
          <TextMedium style={{marginLeft: ViewScale(10)}}>
            {Translate('textFundMember')}
            {` (${Translate('textPerIndividal')})`}
          </TextMedium>
        </View>
        <View style={styles.memberFundButtonRightIcon}>
          <TextMedium
            color={COLORS.PRIMARY}
            style={{marginRight: ViewScale(10)}}>
            {data}
          </TextMedium>
          {/* <Ionicons
            name="chevron-forward-circle"
            color={COLORS.PRIMARY}
            size={FontScale(22)}
          /> */}
        </View>
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  memberFundButton: {
    backgroundColor: '#FFF',
    paddingVertical: ViewScale(20),
  },
  memberFundButtonContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  memberFundButtonRightIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
