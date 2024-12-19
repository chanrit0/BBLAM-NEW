import React from 'react';
import {View, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {Container} from 'components/common';
import {
  SearchBar,
  TextMedium,
  TextRegular,
  SafeAreaView,
} from 'components/atoms';
import {Ionicons} from 'components/Icons';
import {ViewScale, FontScale, setSpinner} from 'utils';
import {Fund} from 'components/Icons/Customs';

import {FONT_SIZE, COLORS, SPACING} from 'styles';
import {getFundList} from 'services/api/committee';
import HomeHeaderOnly from 'components/header/HomeHeaderOnly';
import ServerErrorPage from 'screens/Global/ServerErrorPage';
import {Translate} from 'function';
import {EmptyData} from 'components/organisms';
import {useRecoilState} from 'recoil';
import {userInfoState} from 'recoil-state';

export default function SelectFund({navigation, route}) {
  const callapiFundAll = route.params.callapiFundAll;
  const callapiHome = route.params.callapiHome;
  const com_code = route.params?.com_code;
  const oldFund_code = route.params?.fund_code;
  const isAll = route.params?.isAll;

  const [search, setSearch] = React.useState('');
  const [isServerError, setIsServerError] = React.useState(false);
  const [apiData, setApiData] = React.useState([]);
  const [list, setList] = React.useState([]);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const _onSearch = value => {
    filtered = apiData.filter(item => item.fund_name.includes(search));
    setList(filtered);
    setSearch(value);
  };

  const callapi = async () => {
    await getFundList({com_code: com_code.current})
      .then(response => {
        if (response.code == '02') {
          let result = [
            {fund_name: 'ทั้งหมด (ALL)', fund_code: '99all'},
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

  const _onPress = fund_code => async () => {
    if (fund_code === '99all') {
      isAll.current.select_all = true;
      isAll.current.company_all = false;
      isAll.current.fund_all = true;
      callapiFundAll(com_code);
      navigation.navigate('Home');
    } else {
      oldFund_code.current = fund_code;
      isAll.current.select_all = false;
      isAll.current.company_all = false;
      isAll.current.fund_all = false;
      setUserInfo(v => ({
        ...v,
        com_code: com_code.current,
        fund_code: fund_code,
      }));
      setSpinner(true);
      callapiHome().finally(() => setSpinner(false));
      navigation.navigate('Home');
    }
  };

  const handlerOnRefreshServerError = () => {
    setSpinner(true);
    callapi().finally(() => setSpinner(false));
  };

  return (
    <>
      <HomeHeaderOnly isBackIcon>
        <Container style={{flex: 0}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Fund width={26} height={26} />
            <TextMedium
              color={COLORS.WHITE}
              size={FONT_SIZE.TITLE_3}
              style={{marginLeft: ViewScale(10)}}>
              {'กองทุน'}
            </TextMedium>
          </View>
          {/* <TextRegular color={COLORS.WHITE} style={{marginTop: ViewScale(5)}}>
            {data.FundList.name}
          </TextRegular> */}
          <View style={{marginTop: ViewScale(10)}}>
            <SearchBar value={search} onChangeText={_onSearch} />
          </View>
        </Container>
      </HomeHeaderOnly>
      {isServerError ? (
        <ServerErrorPage onPress={handlerOnRefreshServerError} />
      ) : (
        <FlatList
          data={list}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => 'SelectFundId' + index}
          contentContainerStyle={{paddingBottom: SPACING.FOOTER_HEIGHT}}
          ListEmptyComponent={<EmptyData title={Translate('textNoData')} />}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={_onPress(item.fund_code)}
                key={item.fund_code}
                style={{borderBottomWidth: 0.5, borderColor: COLORS.BORDER}}>
                <Container style={styles.containerList}>
                  <View style={styles.textWrap}>
                    <TextRegular style={styles.text}>
                      {item.fund_name}
                    </TextRegular>
                  </View>
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
  text: {
    flex: 1,
    flexWrap: 'wrap',
  },
  textWrap: {
    flex: 1,
    flexDirection: 'row',
  },
  containerList: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: ViewScale(20),
  },
});
