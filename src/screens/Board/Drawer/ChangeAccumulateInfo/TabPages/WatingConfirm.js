// React
import React from 'react';
import {View, FlatList, RefreshControl} from 'react-native';

// custom
import {setSpinner, ViewScale} from 'utils';

// components
import {Container} from 'components/common';
import ApproveAllBtn from 'components/Board/ChangeAccumulate/ApproveAllBtn';
import ListWaiting from 'components/Board/ChangeAccumulate/ListWaiting';
import {StyleSheet} from 'react-native';
import {
  getCountDeposit,
  sendApproveWaitingConfirm,
  sendApproveWaitingConfirmAll,
  sendCancelWaitingConfirm,
} from 'services/api/committee';
import {useRecoilState} from 'recoil';
import {userInfoState} from 'recoil-state';
import {TextMedium} from 'components/atoms';
import {COLORS, FONT_SIZE} from 'styles';
import {FETCH_DATA_LIMIT} from 'config';
import {EmptyData} from 'components/organisms';

export default function WatingConfirm({data, callapi}) {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [refreshing, setRefreshing] = React.useState(false);

  const CancelId = id => async () => {
    setSpinner(true);
    await sendCancelWaitingConfirm({id})
      .then(response => {
        if (response.status == 'success') {
          callapi();
          getDepositCount();
        }
      })
      .catch(error => console.log(error))
      .finally(() => setSpinner(false));
  };

  const getDepositCount = async () => {
    await getCountDeposit({
      fund_code: userInfo.fund_code,
      com_code: userInfo.com_code,
    })
      .then(response => {
        console.log(response);
        setUserInfo(v => ({...v, deposit_count_member: response.count_notify}));
      })
      .catch(error => console.log(error));
  };

  const onRefresh = () => {
    setRefreshing(true);
    callapi().finally(() => setRefreshing(false));
  };

  const ApproveId = id => async () => {
    setSpinner(true);
    await sendApproveWaitingConfirm({id})
      .then(response => {
        if (response.status == 'success') {
          callapi();
          getDepositCount();
        }
      })
      .catch(error => console.log(error))
      .finally(() => setSpinner(false));
  };

  const ApproveAll = async () => {
    setSpinner(true);
    await sendApproveWaitingConfirmAll({
      com_code: userInfo.com_code,
      fund_code: userInfo.fund_code,
    })
      .then(response => {
        if (response.status == 'success') {
          callapi();
          getDepositCount();
        }
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setSpinner(false));
  };

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        data.length > 0 && (
          <Container style={{flex: 0}}>
            <View style={styles.ApproveAllBtnStyle}>
              <ApproveAllBtn onPress={ApproveAll} />
            </View>
          </Container>
        )
      }
      data={data}
      renderItem={({item}) => (
        <ListWaiting
          name={item.em_name}
          accOld={item.deposit_rate_old}
          accNew={item.deposit_rate}
          date={item.created_at_th}
          onCancel={CancelId(item.id)}
          onApprove={ApproveId(item.id)}
        />
      )}
      ListEmptyComponent={<EmptyData title="ไม่มีสมาชิกรอการอนุมัติ" />}
      keyExtractor={item => item.id}
    />
  );
}

const styles = StyleSheet.create({
  ApproveAllBtnStyle: {
    paddingVertical: ViewScale(15),
  },
});
