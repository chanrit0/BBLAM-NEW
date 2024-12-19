/* eslint-disable react/self-closing-comp */
import React from 'react';
import { View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Container } from 'components/common';
import {
  SafeAreaView,
  SearchBar,
  TextRegular,
  TextMedium,
} from 'components/atoms';
import { Company } from 'components/Icons/Customs';
import { ViewScale, FontScale, setSpinner } from 'utils';
import { Ionicons } from 'components/Icons';

import { COLORS, FONT_SIZE, SPACING } from 'styles';
import { getCompanyList } from 'services/api/committee';
import _ from 'lodash';
import { useRecoilState } from 'recoil';
import { userInfoState } from 'recoil-state';
import HomeHeaderOnly from 'components/header/HomeHeaderOnly';
import ServerErrorPage from 'screens/Global/ServerErrorPage';
import { Translate } from 'function';
import { EmptyData } from 'components/organisms';

export default function SelectCompany({ navigation, route }) {
  const callapiCompanyAll = route.params.callapiCompanyAll;
  const callapiFundAll = route.params.callapiFundAll;
  const callapiHome = route.params.callapiHome;
  const fund_code = route.params.fund_code;
  const oldCom_code = route.params.com_code;
  const isAll = route.params.isAll;

  const [search, setSearch] = React.useState('');
  const [apiData, setApiData] = React.useState(null);
  const [isServerError, setIsServerError] = React.useState(false);
  const [list, setList] = React.useState([]);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const _onSearch = value => {
    let filtered = apiData.filter(item => item.com_name.includes(search));
    if (value === '') {
      filtered = apiData;
    }
    setList(filtered);
    setSearch(value);
  };

  const callapi = async () => {
    await getCompanyList()
      .then(response => {
        if (response.code == '02') {
          let result = [
            { com_name: 'ทั้งหมด (ALL)', com_code: '99all' },
            ...response.data,
          ];
          setApiData(result);
          setList(result);
          setIsServerError(false);
        }
      })
      .catch(error => {
        setIsServerError(true);
        console.log(error);
      });
  };

  React.useEffect(() => {
    setSpinner(true);
    callapi().finally(() => {
      setSpinner(false);
    });
  }, []);

  const _onPress = (com_code, com_name) => () => {
    if (com_code === '99all') {
      isAll.current.select_all = true;
      isAll.current.company_all = true;
      isAll.current.fund_all = false;
      callapiCompanyAll();
      navigation.navigate('Home');
    } else {
      oldCom_code.current = com_code;
      setUserInfo(v => ({ ...v, com_name }));
      navigation.navigate('SelectFund', {
        callapiFundAll,
        callapiHome,
        com_code: oldCom_code,
        fund_code,
        isAll,
      });
    }
  };

  const handleOnRefreshServerError = () => {
    setSpinner(true);
    callapi().finally(() => setSpinner(false));
  };

  return (
    <>
      <HomeHeaderOnly isBackIcon>
        <Container style={{ flex: 0 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Company width={26} height={26} />
            <TextMedium
              color="#FFF"
              size={FONT_SIZE.TITLE_3}
              style={{ marginLeft: ViewScale(10) }}>
              {'บริษัท'}
            </TextMedium>
          </View>
          <View style={{ marginTop: ViewScale(10) }}>
            <SearchBar value={search} onChangeText={_onSearch} />
          </View>
        </Container>
      </HomeHeaderOnly>
      {isServerError ? (
        <ServerErrorPage onPress={handleOnRefreshServerError} />
      ) : (
        <FlatList
          data={list}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: SPACING.FOOTER_HEIGHT }}
          keyExtractor={(item, index) => 'SelectCompanyId' + index}
          ListEmptyComponent={<EmptyData title={Translate('textNoData')} />}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                key={item.com_code}
                style={{ borderBottomWidth: 0.5, borderColor: COLORS.BORDER }}
                onPress={_onPress(item.com_code, item.com_name)}>
                <Container style={styles.containerList}>
                  <TextRegular style={styles.textFlatlist}>
                    {item.com_name}
                  </TextRegular>
                  <Ionicons
                    name="chevron-forward-circle"
                    color={COLORS.PRIMARY}
                    size={FontScale(22)}
                  />
                </Container>
              </TouchableOpacity>
            );
          }}
        />
      )}

      <SafeAreaView noTop />
    </>
  );
}

const styles = StyleSheet.create({
  textFlatlist: {
    flex: 1,
  },
  containerList: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: ViewScale(20),
  },
});
