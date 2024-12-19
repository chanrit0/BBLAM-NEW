// React
import React from 'react';
import { View, TouchableOpacity, InteractionManager } from 'react-native';

// custom
import { setSpinner, StampSession, ViewScale } from 'utils';
import { COLORS } from 'styles';
import styles from './Style';

// components
import { NameFlagHeader } from 'components/organisms';
import { MyReturnTotalAmount } from 'components/molecules';
import { Company, Fund } from 'components/Icons/Customs';
import { GraphArea } from 'components/atoms';
import { RootScroll } from 'components/common';
import FundMemberList from 'components/Board/FundMemberList';
import SubFund from 'components/Board/SubFund';
import InvestmentChoice from 'components/Board/InvestmentChoice';

// data

// recoil
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { languageState, switchingState, userInfoState } from 'recoil-state';
import {
  getAllCompany,
  getAlLFund,
  getCheckDepositAccess,
  getCountDeposit,
  getDashboard,
} from 'services/api/committee';
import SwitchSFandIC from 'components/Board/SwitchSFandIC';
import ServerErrorPage from 'screens/Global/ServerErrorPage';
import { useIsFocused } from '@react-navigation/native';

export default function Home({ navigation, route }) {
  useRecoilValue(languageState);

  const [toggleSwitch, setToggleSwitch] = React.useState(false); // false -> SubFund , true -> InvestmentChoice
  const [apiData, setApiData] = React.useState([]);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [switching, setSwitching] = useRecoilState(switchingState);
  const [onPressGraph, setOnPressGraph] = React.useState(false);
  const [isServerError, setIsServerError] = React.useState(false);
  const focused = useIsFocused();

  const com_code = React.useRef(userInfo.com_code);
  const fund_code = React.useRef(userInfo.fund_code);
  const isAll = React.useRef({
    select_all: false,
    company_all: false,
    fund_all: false,
  });

  const callapi = async () => {
    await getDashboard({
      com_code: com_code.current,
      fund_code: fund_code.current,
    })
      .then(response => {
        if (response.status === 'success') {
          setApiData(response?.data);
        }
        if (switching.isFundAll) {
          setSwitching(v => ({ ...v, isFundAll: false }));
        }
        setIsServerError(false);
      })
      .then(callCheckAccessChangeAccumulate)
      .then(callGetCountDeposit)
      .catch(error => {
        setIsServerError(true);
        console.log({ error, path: '/Board/Home/#getDashboard' });
      })
      .finally(() => {
        // console.log(`switch com_code to : ${com_code.current}`);
        // console.log(`switch fund_code to : ${fund_code.current}`);
      });
  };

  const callapiCompanyAll = async () => {
    console.log('companyall');
    setSpinner(true);
    await getAllCompany()
      .then(response => {
        if (response.status === 'success') {
          setApiData(response.data);
          setIsServerError(false);

          if (switching.isFundAll) {
            setSwitching(v => ({ ...v, isFundAll: false }));
          }
        }
      })
      .then(callGetCountDeposit)
      .catch(error => {
        setIsServerError(true);
        console.log(error);
      })
      .finally(() => setSpinner(false));
  };

  const callGetCountDeposit = async status => {
    await getCountDeposit({
      fund_code: fund_code.current,
      com_code: com_code.current,
    })
      .then(response => {
        setUserInfo(v => ({
          ...v,
          deposit_count_member: response?.count_notify,
        }));
      })
      .catch(error => {
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
          setSwitching(v => ({ ...v, isFundAll: true }));
          setIsServerError(false);
        }
      })
      .then(callGetCountDeposit)
      .catch(error => {
        setIsServerError(true);
        console.log(error);
      })
      .finally(() => setSpinner(false));
  };

  const callCheckAccessChangeAccumulate = async () => {
    await getCheckDepositAccess({
      com_code: com_code.current,
      fund_code: fund_code.current,
    })
      .then(response => setUserInfo(v => ({ ...v, deposit_status: true })))
      .catch(error => {
        setUserInfo(v => ({
          ...v,
          deposit_status: false,
        }));
      });
  };

  React.useEffect(() => {
    setSpinner(true);
    callapi().finally(() => {
      setSpinner(false);
    });
  }, []);

  React.useEffect(() => {
    if (!focused) {
      fund_code.current = userInfo.fund_code;
      isAll.current.fund_all = switching.isFundAll;
      isAll.current.company_all = switching.isCompanyAll;
      isAll.current.select_all =
        switching.isCompanyAll || switching.isFundAll ? true : false;
      if (switching.isFundAll) {
        callapiFundAll();
      } else {
        callapi();
      }
    }
  }, [userInfo.fund_code, switching.isFundAll]);

  const selectRefresh = () => {
    if (isAll.current.select_all) {
      if (isAll.current.company_all) {
        return callapiCompanyAll;
      } else {
        return callapiFundAll;
      }
    } else {
      return callapi;
    }
  };

  const handleOnRefreshServerError = () => {
    setSpinner(true);
    callapi().finally(() => setSpinner(false));
  };

  const _goToMemberProfileList = React.useCallback(() => {
    navigation.navigate('MemberProfileList');
  }, []);

  return (
    <RootScroll
      scrollEnabled={!onPressGraph}
      onRefreshCallback={selectRefresh()}
      headerChildren={
        !isServerError && (
          <NameFlagHeader
            data={
              apiData?.com_name
                ? {
                  name: `${userInfo?.fullname}`,
                  // name: `${userInfo?.name} ${userInfo?.surname}`,
                  company: apiData?.com_name,
                  fund_name: apiData?.fund_name,
                  isFundAll: isAll?.current.fund_all,
                  isCompanyAll: isAll?.current.company_all,
                }
                : null
            }
          />
        )
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
              navigation.navigate('SelectCompany', {
                callapiCompanyAll: callapiCompanyAll,
                callapiFundAll: callapiFundAll,
                callapiHome: callapi,
                isAll,
                com_code,
                fund_code,
              });
            }}>
            <Company width={ViewScale(35)} height={ViewScale(35)} />
          </TouchableOpacity>
          {!isAll.current.company_all && (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SelectFund', {
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
          )}
        </View>
      }>
      {isServerError ? (
        <ServerErrorPage onPress={handleOnRefreshServerError} />
      ) : (
        <>
          {/* graph */}
          <View style={{ backgroundColor: COLORS.WHITE }}>
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
}
