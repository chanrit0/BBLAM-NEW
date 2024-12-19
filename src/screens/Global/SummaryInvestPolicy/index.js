/* eslint-disable react-hooks/rules-of-hooks */

// React
import React from 'react';
import {View} from 'react-native';

// custom
import {Translate} from 'function';
import {setSpinner, ViewScale} from 'utils';
import {SegmentControlTabStyle} from './Style';

// components
import {RootScroll, Container} from 'components/common';
import ListSumInvest from 'components/Global/ListSummaryInvestPolicy';

// lib
import {useRecoilValue} from 'recoil';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {languageState, userInfoState} from 'recoil-state';
import {useNavigation} from '@react-navigation/native';
import _ from 'lodash';
import {TextMedium} from 'components/atoms';
import {COLORS} from 'styles';
import ServerErrorPage from '../ServerErrorPage';

export default function index({data = [], callapi, isServerError}) {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [listData, setListdata] = React.useState([]);
  const userInfo = useRecoilValue(userInfoState);

  useRecoilValue(languageState);

  const _selectedTeb = index => {
    setListdata(data[index] === undefined ? [] : data[index]);
    setSelectedTab(index);
  };

  React.useEffect(() => {
    if (!_.isEmpty(data)) {
      setListdata(data[selectedTab]);
    }
  }, [data]);

  const handleOnRefreshServerError = () => {
    setSpinner(true);
    callapi().finally(() => setSpinner(false));
  };

  return (
    <RootScroll
      onRefreshCallback={callapi}
      title={Translate('textSummaryInvestment')}
      isBackIcon={userInfo.role === 'committee' ? false : true}
      flexContainer
      headerChildren={
        <Container style={{flex: 0, marginTop: ViewScale(20)}}>
          <SegmentedControlTab
            values={['YTD', '3YRS', '5YRS']}
            selectedIndex={selectedTab}
            onTabPress={_selectedTeb}
            {...SegmentControlTabStyle}
          />
        </Container>
      }>
      {listData.length > 0 ? (
        listData.map((item, index) => {
          return (
            <View key={'reportid-' + index}>
              <ListSumInvest
                data={item}
                onPress={() => {
                  navigation.navigate('ReportDetail', {
                    sub_code: item.sub_code,
                    sub_name: item.sub_name,
                    tabIndex: selectedTab,
                  });
                }}
              />
            </View>
          );
        })
      ) : (
        <>
          {isServerError ? (
            <ServerErrorPage onPress={handleOnRefreshServerError} />
          ) : (
            <View
              style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
              <TextMedium color={COLORS.THIRDARY}>ไม่พบข้อมูล</TextMedium>
            </View>
          )}
        </>
      )}
    </RootScroll>
  );
}
