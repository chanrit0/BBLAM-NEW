// React
import React from 'react';
import {View, StyleSheet} from 'react-native';

// custom
import {ViewScale} from 'utils';

// components
import ScrollableTabView from '../ScrollableTabView';

// pages
import CompanyName from './pages/1_CompanyName';
import CompanyAddress from './pages/2_CompanyAddress';
import DeliveryAddress from './pages/3_DeliveryAddress';

export default function index() {
  return (
    <View style={styles.scrolltabViewContainer}>
      <ScrollableTabView>
        <CompanyName label={'ขื่อบริษัท'} width={ViewScale(260)} />
        <CompanyAddress label={'ที่อยู่บริษัท'} width={ViewScale(260)} />
        <DeliveryAddress
          label={'ที่อยู่สำหรับการรับ-ส่งเอกสาร'}
          width={ViewScale(260)}
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
