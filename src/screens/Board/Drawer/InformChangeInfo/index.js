// React
import React from 'react';
import {View, Text, KeyboardAvoidingView} from 'react-native';
// custom
import {Translate} from 'function';
import styles from './Style';

// components
import {RootScroll, Container} from 'components/common';
import {Picker, TextMedium} from 'components/atoms';

import SelectBox1 from 'components/Board/InformChangeInfo/1_SelectBoard';
import SelectBox2 from 'components/Board/InformChangeInfo/2_SelectCordinator';
import SelectBox3 from 'components/Board/InformChangeInfo/3_SelectCompany';

export default function InformChangeInfo() {
  const [typePicker, setTypePicker] = React.useState(0);

  const items = [
    {label: Translate('textCommittee'), value: '1'},
    {
      label: `${Translate('textReportRecipient')} / ${Translate(
        'textCoordinator',
      )}`,
      value: '2',
    },
    {label: Translate('textCompany'), value: '3'},
  ];

  return (
    <RootScroll
      title={Translate('textInformChangeInfo')}
      flexContainer
      isBackIcon
      fixTab={false}>
      <View style={styles.rootContainer}>
        <Container style={{flex: 0}}>
          <TextMedium>{Translate('textTitleInformChangeInfo')}</TextMedium>
          <View style={styles.pickerContainer}>
            <Picker
              items={items}
              onValueChange={setTypePicker}
              placeholder={'โปรดเลือกหัวข้อ'}
            />
          </View>
        </Container>
      </View>
      {/* content */}
      {Number(typePicker) === 1 && <SelectBox1 />}
      {Number(typePicker) === 2 && <SelectBox2 />}
      {Number(typePicker) === 3 && <SelectBox3 />}
    </RootScroll>
  );
}
