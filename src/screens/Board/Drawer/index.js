/* eslint-disable react-hooks/rules-of-hooks */

// React
import React from 'react';
import {View, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';

// custom
import {ViewScale} from 'utils';
import {SPACING} from 'styles';

// components
import {ListItemAccordion, List} from 'components/Drawer';
import {Container} from 'components/common';
import {LinearGradient} from 'components/atoms';
import {Menu} from 'components/Icons/Customs';

// lib
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {route} from './route';

// recoil
import {useRecoilState, useRecoilValue} from 'recoil';
import {languageState, userInfoState} from 'recoil-state';

// hooks
import BackToBBLAMONE from 'components/Drawer/BackToBBLAMONE';

export default function index({navigation}) {
  useRecoilValue(languageState);
  const {bottom} = useSafeAreaInsets();
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const _navigate = item => {
    if (item.routeType === 'jumpTo') {
      navigation.jumpTo('Drawer', {
        screen: 'Home',
        params: {
          screen: item.route,
        },
      });
    } else {
      navigation.navigate('Drawer', {
        screen: item.route,
      });
    }
    navigation.closeDrawer();
  };

  const _onPressBBLAMONE = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'BBLAMONERoute'}],
    });
  };

  return (
    <View style={{flex: 1}}>
      {/* header */}
      <LinearGradient type="Drawer">
        {/* hamburger */}
        <View>
          <Container style={{flex: 0, marginLeft: 0}}>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-start',
                alignItems: 'center',
                justifyContent: 'center',
                height: SPACING.HEADER_HEIGHT,
                paddingHorizontal: SPACING.CONTAINER_MARGIN_HORIZONTAL,
              }}
              onPress={() => navigation.closeDrawer()}>
              <Menu width={ViewScale(25)} height={ViewScale(25)} />
            </TouchableOpacity>
          </Container>
        </View>
      </LinearGradient>

      <View style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* content */}
          <ListItemAccordion
            navigation={navigation}
            icon={route()[0].icon}
            title={route()[0].title}
            content={route()[0].subtitle}
          />

          <ListItemAccordion
            navigation={navigation}
            icon={route()[1].icon}
            title={route()[1].title}
            content={route()[1].subtitle}
          />
          {/* รายงานสรุปการเปลี่ยนทางเลือกการลงทุน */}
          {/* <List
            icon={route()[2].icon}
            title={route()[2].title}
            onPress={() => {
              _navigate(route()[2]);
            }}
          /> */}
          {/* รายงานสรุปการทำแบบประเมินความเสี่ยงของสมาชิก */}
          <List
            icon={route()[3].icon}
            title={route()[3].title}
            onPress={() => {
              _navigate(route()[3]);
            }}
          />
          {/* ข้อมูลสมาชิก สำหรับลงทะเบียนเข้าใช้งาน ระบบ Online */}
          {/* <List
              icon={route()[4].icon}
              title={route()[4].title}
              onPress={() => {
                _navigate(route()[4]);
              }}
            /> */}
          {/* ตรวจสอบสถานะการลาออกของสมาชิก */}
          <List
            icon={route()[5].icon}
            title={route()[5].title}
            onPress={() => {
              _navigate(route()[5]);
            }}
          />
          {/* การเปลี่ยนแปลงอัตราการจ่ายสะสม */}
          {userInfo.deposit_status && (
            <ListItemAccordion
              navigation={navigation}
              icon={route()[6].icon}
              title={route()[6].title}
              content={route()[6].subtitle}
              index={6}
            />
          )}

          {/* แจ้งเปลี่ยนข้อมูล */}
          <List
            icon={route()[7].icon}
            title={route()[7].title}
            onPress={() => {
              _navigate(route()[7]);
            }}
          />
          {/* ดาวน์โหลดข้อมูล */}
          <List
            icon={route()[8].icon}
            title={route()[8].title}
            onPress={() => {
              _navigate(route()[8]);
            }}
          />
          {/* ตั้งค่า */}
          {/* <List
            icon={route()[9].icon}
            title={route()[9].title}
          /> */}
          <View style={{height: bottom}} />
        </ScrollView>
        <BackToBBLAMONE onPress={_onPressBBLAMONE} />
      </View>
    </View>
  );
}
