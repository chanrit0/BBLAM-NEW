// React
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

// custom
import { setSpinner, ViewScale } from 'utils';
import { COLORS } from 'styles';
import styles from './Style';

// components
import NameFlagHeader from './components/NameFlagHeader';
import { MyReturnTotalAmount } from 'components/molecules';
import { Company, Fund } from 'components/Icons/Customs';
import { GraphArea } from 'components/atoms';
import { RootScroll } from 'components/common';
import FundMemberList from 'components/Board/FundMemberList';
import SubFund from 'components/Board/SubFund';
import InvestmentChoice from 'components/Board/InvestmentChoice';

// data

// recoil
import { useRecoilState, useRecoilValue } from 'recoil';
import { languageState, switchingState, userInfoState } from 'recoil-state';
import { getAlLFund, getDashboard } from 'services/api/committee';
import SwitchSFandIC from 'components/Board/SwitchSFandIC';
import ServerErrorPage from 'screens/Global/ServerErrorPage';

export default ({ navigation, route }) => {
  useRecoilValue(languageState);

  const [toggleSwitch, setToggleSwitch] = React.useState(false); // false -> SubFund , true -> InvestmentChoice
  const [apiData, setApiData] = React.useState([]);
  const [onPressGraph, setOnPressGraph] = React.useState(false);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [switching, setSwitching] = useRecoilState(switchingState);

  const com_code = React.useRef(userInfo.com_code);
  const fund_code = React.useRef(userInfo.fund_code);
  const [isServerError, setIsServerError] = React.useState(false);
  const isAll = React.useRef({
    select_all: switching.isCompanyAll || switching.isFundAll ? true : false,
    company_all: switching.isCompanyAll,
    fund_all: switching.isFundAll,
  });

  const callapi = async () => {
    setUserInfo(v => ({
      ...v,
      com_code: com_code.current,
      fund_code: fund_code.current,
    }));
    await getDashboard({
      com_code: com_code.current,
      fund_code: fund_code.current,
    })
      .then(response => {
        if (response.status === 'success') {
          setApiData(response?.data);
          setIsServerError(false);
          setSwitching(v => ({ ...v, isFundAll: false }));
        }
      })
      .catch(error => {
        setIsServerError(true);
        console.log(error);
      });
  };

  const callapiFundAll = async () => {
    console.log('fundall');
    setSpinner(true);
    await getAlLFund({ com_code: com_code.current })
      .then(response => {
        if (response.status === 'success') {
          setApiData(v => ({
            ...v,
            financial: response?.data?.financial,
            com_name: response?.data?.com_name,
            count_member: response?.data?.count_member,
            graph: response?.data?.graph,
          }));
          setIsServerError(false);
          setSwitching(v => ({ ...v, isFundAll: true }));
        }
      })
      .catch(error => {
        setIsServerError(true);
        console.log(error);
      })
      .finally(() => setSpinner(false));
  };

  React.useEffect(() => {
    setSpinner(true);
    if (switching.isFundAll) {
      callapiFundAll().finally(() => setSpinner(false));
    } else {
      callapi().finally(() => setSpinner(false));
    }
  }, []);

  const selectRefresh = () => {
    if (isAll.current.select_all) {
      return callapiFundAll;
    } else {
      return callapi;
    }
  };

  const handleOnRefreshServerError = () => {
    setSpinner(true);
    callapi().finally(() => {
      setSpinner(false);
    });
  };

  return (
    <RootScroll
      onRefreshCallback={selectRefresh()}
      isBackIcon
      scrollEnabled={!onPressGraph}
      headerChildren={
        <NameFlagHeader
          data={{
            name: `${userInfo?.fullname}`,
            // name: `${userInfo?.name} ${userInfo?.surname}`,
            company: apiData?.com_name,
            fund_name: apiData?.fund_name,
            isFundAll: isAll?.current.fund_all,
          }}
        />
      }
      flexContainer
      backgroundColor={COLORS.GRAY}
      headerRightChildren={
        <View
          style={{
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SelectFundDrawer', {
                callapiFundAll: callapiFundAll,
                callapiHome: callapi,
                isAll,
                com_code,
                fund_code,
              });
            }}>
            <Fund
              style={{
                marginLeft: ViewScale(10),
              }}
              width={ViewScale(35)}
              height={ViewScale(35)}
            />
          </TouchableOpacity>
        </View>
      }>
      {isServerError ? (
        <ServerErrorPage onPress={handleOnRefreshServerError} />
      ) : (
        <>
          {/* graph */}
          <View style={{ backgroundColor: '#FFF' }}>
            <GraphArea
              data={apiData?.graph?.plot_graph}
              min={apiData?.graph?.min_y}
              max={apiData?.graph?.max_y}
              date={apiData?.graph?.date_present_graph}
              setOnPressGraph={setOnPressGraph}
            />
          </View>

          {/* สรุปเงิน */}
          <View style={styles.totalContainer}>
            <MyReturnTotalAmount
              total={apiData?.financial?.cont_sum_total}
              saving={apiData?.financial?.cont_cum_total}
              contribution={apiData?.financial?.cont_cont_total}
              benefitSaving={apiData?.financial?.cont_bent_total}
              benefitContribution={apiData?.financial?.cont_bent_cont_total}
              unit={apiData?.financial?.unit}
            />
          </View>

          {/* สรุปสมาชิกกองทุน​ (ราย) */}
          <View>
            {!isAll.current.select_all && (
              <FundMemberList
                data={apiData?.count_member}
              // onPress={_goToMemberProfileList}
              />
            )}
          </View>

          {apiData?.subfund && apiData?.choice && !isAll.current.select_all && (
            <>
              {/* switch  */}
              <SwitchSFandIC onChange={setToggleSwitch} />
              {/* switch choice */}
              {!toggleSwitch && <SubFund data={apiData?.subfund} />}
              {toggleSwitch && <InvestmentChoice data={apiData?.choice} />}
            </>
          )}
        </>
      )}
    </RootScroll>
  );
};
