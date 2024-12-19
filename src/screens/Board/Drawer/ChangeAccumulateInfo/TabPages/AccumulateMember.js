/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
// React
import React from 'react';
import {TouchableOpacity, FlatList, RefreshControl} from 'react-native';

// custom
import {Translate} from 'function';
import {ViewScale} from 'utils';

// components
import {Container} from 'components/common';
import {TextRegular} from 'components/atoms';
import {AntDesign} from 'components/Icons';
import List from '../components/List';
import {COLORS, FONT_SIZE} from 'styles';
import {getDepositExcelDownload} from 'services/api/committee';
import {useRecoilValue} from 'recoil';
import {userInfoState} from 'recoil-state';

export default function AccumulateMember({data, callapi}) {
  const userInfo = useRecoilValue(userInfoState);
  const [refreshing, setRefreshing] = React.useState(false);

  const callDownloadExcel = async () => {
    await getDepositExcelDownload({
      com_code: userInfo.com_code,
      fund_code: userInfo.fund_code,
      title: 'รายงานอัตราสะสม',
      filetype: 'xls',
    });
  };

  const onRefresh = () => {
    setRefreshing(true);
    callapi().finally(() => setRefreshing(false));
  };

 const dataTest = [{
  "em_pre_name": "PRE778012",
  "em_name": "PRE778012NAME778012 SNAME778012",
  "em_lastname": "SNAME778012",
  "deposit_rate_old": "N/A",
  "deposit_rate": "11.00",
  "created_at_th": "17/10/2565",
  "deposit_rate_status": "อนุมัติ"
}]

  return (
    <FlatList
      data={data}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <Container style={{flex: 0}}>
          <TouchableOpacity
            onPress={callDownloadExcel}
            style={{
              alignSelf: 'flex-end',
              paddingVertical: ViewScale(15),
            }}>
            <TextRegular
              color={COLORS.PRIMARY}
              size={FONT_SIZE.BODY_2}
              style={{marginRight: ViewScale(10)}}>
              {`${Translate('textDownloadCumulativeRateReport')} `}
              <AntDesign name="download" size={FONT_SIZE.TITLE_1} />
            </TextRegular>
          </TouchableOpacity>
        </Container>
      }
      renderItem={({item}) => (
        <List
          name={item.em_name}
          date={item.created_at_th}
          deposit_rate={item.deposit_rate}
          deposit_rate_status={item.deposit_rate_status}
        />
      )}
      keyExtractor={(item, index) => 'AccumulateMemberId' + index}
    />
  );
}
