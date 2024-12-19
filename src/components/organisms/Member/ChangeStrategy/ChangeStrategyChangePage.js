import {LineHorizontal, Picker} from 'components/atoms';
import {Container} from 'components/common';
import {TextMedium, TextRegular} from 'components/atoms';
import {Translate} from 'function';
import {ViewScale, FontScale, isIOS} from 'utils';
import React from 'react';
import {View, Text} from 'react-native';
import {IconButton} from 'react-native-paper';
import {COLORS, FONT_SIZE} from 'styles';
import _ from 'lodash';

export default ({index, data, goToPage}) => {
  const PickerData = data.map((item, index) => ({
    label: item.sub_name,
    value: index,
  }));

  return (
    <View>
      <Container>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: ViewScale(20),
            marginBottom: ViewScale(30),
          }}>
          <TextMedium size={FONT_SIZE.TITLE_1}>
            {Translate('textChangeStrategyHeader')}
          </TextMedium>
          <View style={{marginVertical: ViewScale(5)}}>
            <Picker
              hidePlaceHolder
              placeholder={isIOS ? {} : ''}
              items={PickerData}
              value={index}
              pickerStyle={{
                backgroundColor: COLORS.PRIMARY,
                color: COLORS.WHITE,
                fontSize: FONT_SIZE.BODY_1,
                width: ViewScale(300),
              }}
              inputContainer={{
                width: ViewScale(320),
                borderWidth: 0,
                alignItems: 'center',
                backgroundColor: COLORS.PRIMARY,
              }}
              containerStyle={{
                backgroundColor: COLORS.PRIMARY,
              }}
              iconStyle={{
                color: COLORS.WHITE,
              }}
              iconContainer={{
                width: ViewScale(50),
              }}
              onValueChange={item => {
                item === null ? goToPage(index) : goToPage(item);
              }}
            />
          </View>
          {data[index].choice_type === 'lifepath' && (
            <View
              style={{
                alignSelf: 'center',
                marginTop: ViewScale(10),
                alignItems: 'center',
              }}>
              {!_.isEmpty(data[index]?.birth) && (
                <TextRegular size={FONT_SIZE.BODY_2}>
                  {data[index]?.birth}
                </TextRegular>
              )}
              <TextRegular size={FONT_SIZE.BODY_3} color={COLORS.THIRDARY}>
                {'หากข้อมูลไม่ถูกต้องกรุณากดปุ่ม ย้อนกลับเพิ่อแก้ไขข้อมูล'}
              </TextRegular>
            </View>
          )}
        </View>
      </Container>
      <LineHorizontal />
    </View>
  );
};
