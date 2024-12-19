/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/self-closing-comp */

// React
import React from 'react';
import {View} from 'react-native';
// custom
import {Translate} from 'function';
import {setSpinner, ViewScale} from 'utils';
// components
import {RootScroll} from 'components/common';
import {MyReturnTotalAmount} from 'components/molecules';
import {TextRegular, TextMedium} from 'components/atoms';
import {Company} from 'components/Icons/Customs';
import FundMemberList from 'components/Board/FundMemberList';
import SwitchSFandIC from 'components/Board/SwitchSFandIC';
import SubFund from 'components/Board/SubFund';
import InvestmentChoice from 'components/Board/InvestmentChoice';
// lib

// data
import {useRecoilValue} from 'recoil';
import {languageState, userInfoState} from 'recoil-state';
import {COLORS, FONT_SIZE, SPACING} from 'styles';
import {getCompanyInfo} from 'services/api/committee';
import {useIsMounted} from 'hooks';
import _ from 'lodash';
import ServerErrorPage from 'screens/Global/ServerErrorPage';

export default function index({navigation}) {
  useRecoilValue(languageState);
  const userInfo = useRecoilValue(userInfoState);
  const [apiData, setApiData] = React.useState({
    choice_date: '',
    com_name: '',
    financial: null,
    count_member: '',
    subfund: [],
    choice: [],
  });
  const [toggleSwitch, setToggleSwitch] = React.useState(false); // false -> SubFund , true -> InvestmentChoice
  const [isServerError, setIsServerError] = React.useState(false);

  const _goToMemberProfileList = React.useCallback(() => {
    navigation.navigate('MemberProfileList');
  }, []);

  const callapi = async () => {
    await getCompanyInfo({
      com_code: userInfo.com_code,
      fund_code: userInfo.fund_code,
    })
      .then(response => {
        if (response.status == 'success' || response.code == '02') {
          setApiData(response.data);
        }
        setIsServerError(false);
      })
      .catch(error => {
        setIsServerError(true);
        console.log({error});
      });
  };

  const handleOnRefreshServerError = () => {
    setSpinner(true);
    callapi().finally(() => {
      setSpinner(false);
    });
  };

  React.useEffect(() => {
    callapi();
  }, [userInfo.com_code, userInfo.fund_code]);

  return (
    <RootScroll
      onRefreshCallback={callapi}
      flexContainer
      backgroundColor={COLORS.GRAY}
      headerCenterChildren={
        <TextMedium
          color={COLORS.WHITE}
          size={FONT_SIZE.TITLE_3}
          style={{textAlign: 'center'}}>
          {Translate('textMemberMoneyInformation')}
        </TextMedium>
      }
      headerChildren={
        <View style={{alignItems: 'center', marginBottom: ViewScale(20)}}>
          <Company width={80} height={80} backgroundColor={COLORS.PRIMARY} />
          <TextMedium
            color={COLORS.WHITE}
            size={FONT_SIZE.TITLE_2}
            style={{
              marginTop: ViewScale(10),
              paddingHorizontal: SPACING.CONTAINER_MARGIN_HORIZONTAL,
              textAlign: 'center',
            }}>
            {apiData?.com_name}
          </TextMedium>
          <TextRegular color={COLORS.WHITE}>
            {Translate('textRemiitanceDateRightHeader')}
            {_.isEmpty(apiData.choice_date) ? '-' : apiData.choice_date}
          </TextRegular>
        </View>
      }>
      {isServerError ? (
        <ServerErrorPage onPress={handleOnRefreshServerError} />
      ) : (
        <>
          {/* ยอดเงินรวม */}
          <View
            style={{
              paddingBottom: ViewScale(10),
              backgroundColor: COLORS.GRAY,
            }}>
            <MyReturnTotalAmount
              total={apiData.financial?.cont_sum_total}
              saving={apiData.financial?.cont_cum_total}
              contribution={apiData.financial?.cont_cont_total}
              benefitSaving={apiData.financial?.cont_bent_total}
              benefitContribution={apiData.financial?.cont_bent_cont_total}
              unit={apiData.financial?.unit}
            />
          </View>

          {/* สรุปสมาชิกกองทุน​ (ราย) */}
          <View>
            <FundMemberList
              // onPress={_goToMemberProfileList}
              data={apiData?.count_member}
            />
          </View>

          {apiData?.subfund && apiData?.choice && (
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
