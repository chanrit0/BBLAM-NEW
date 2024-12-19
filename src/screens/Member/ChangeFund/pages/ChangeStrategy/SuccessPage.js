/* eslint-disable react-native/no-inline-styles */
// React
import React from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';

// custom
import {ViewScale, FontScale} from 'utils';

// components
import {FundBox} from 'components/organisms';
import {AntDesign} from 'components/Icons';
import {Container} from 'components/common';
import {Button, TextRegular, TextMedium} from 'components/atoms';

// data

// lib
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS, FONT_SIZE} from 'styles';

export default function SuccessPage({navigation, route}) {
  const {bottom} = useSafeAreaInsets();
  const {data, choice_name, date} = route.params;

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView />
      <View style={{marginTop: ViewScale(120)}}>
        <View style={{alignItems: 'center', marginBottom: ViewScale(10)}}>
          <AntDesign
            name="checkcircle"
            color={COLORS.SUCCESS}
            size={FontScale(50)}
          />
          <TextMedium
            size={FONT_SIZE.TITLE_1}
            style={{marginTop: ViewScale(20)}}>
            {'ทำรายการสำเร็จ'}
          </TextMedium>
          <TextRegular>{`วันที่ ${date}`}</TextRegular>

          <TextMedium
            color={COLORS.PRIMARY}
            size={FONT_SIZE.TITLE_2}
            style={{marginTop: ViewScale(20)}}>
            {choice_name}
          </TextMedium>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{height: ViewScale(440)}}>
          <View style={{marginTop: ViewScale(30)}}>
            {data?.map((item, index) => (
              <FundBox
                key={'FundBox-' + String(index)}
                RName={item.sub_code}
                name={item.sub_name}
                ratio={item.percent}
              />
            ))}
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          flex: 1,
          width: '100%',
          justifyContent: 'flex-end',
        }}>
        <Container style={{flex: 0, marginBottom: bottom + ViewScale(30)}}>
          <TouchableOpacity
            onPress={() => {
              navigation.replace('TransactionInfo');
            }}>
            <TextMedium
              color={COLORS.PRIMARY}
              style={{
                alignSelf: 'center',
                marginBottom: ViewScale(20),
                textDecorationLine: 'underline',
              }}>
              {'ข้อมูลทำรายการ'}
            </TextMedium>
          </TouchableOpacity>
          <Button
            type="fill"
            title="ปิด"
            onPress={() => {
              navigation.popToTop();
            }}
          />
        </Container>
      </View>
    </View>
  );
}
