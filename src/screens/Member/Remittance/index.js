// React
import React from 'react';
import { View } from 'react-native';

// custom
import styles from './Style';
import { Translate } from 'function';
import { isTablet, setSpinner } from 'utils';

// components

import { Container, RootScroll } from 'components/common';
import { ActivityIndicator, TextMedium } from 'components/atoms';
import ReturnInvestmentPolicy from './components/ReturnInvestmentPolicy';
import MoneyMovements from './components/MoneyMovements';

// recoil
import { useRecoilValue } from 'recoil';
import { languageState, userInfoState } from 'recoil-state';

// lib
import _ from 'lodash';

// services

import { getPayOffandMovement } from 'services/api/member';
import ServerErrorPage from 'screens/Global/ServerErrorPage';
import { useIsMounted } from 'hooks';

export default function Remittance() {
  useRecoilValue(languageState);
  const userInfo = useRecoilValue(userInfoState);
  const [payOffData, setPayOffData] = React.useState([]);
  const [movementData, setMovementData] = React.useState(null);
  const [isServerError, setIsServerError] = React.useState(false);
  // const [isLoading, setIsLoading] = React.useState(true);
  const callapi = async () => {
    await getPayOffandMovement(userInfo.em_code)
      .then(response => {
        const payoff = response.payoff;
        setPayOffData(payoff);
        setMovementData({
          amount_brought: response.amount_brought,
          amount_delivered_during_the_year:
            response.amount_delivered_during_the_year,
          transfer_amount: response.transfer_amount,
          total: response.total,
        });
        setIsServerError(false);
        // setIsLoading(false);
      })
      .catch(error => {
        setIsServerError(true);
        console.log({ error, path: '/screen/Member/Remittance/#getPayOff' });
      });
  };

  React.useEffect(() => {
    callapi();
  }, []);

  const renderPayOffData = () => {
    if (payOffData?.length > 0) {
      return (
        <>
          {payOffData?.map((item, index) => (
            <View key={'ReturnInvestmentPolicyId-' + index}>
              <ReturnInvestmentPolicy
                name={item?.sub_code}
                date={item?.choice_date}
                begin={item?.begin_period}
                present={item?.present}
                avg={item?.total_unit_total}
                saving={item?.cont_cum_total}
                contribution={item?.cont_cont_total}
                benefitSaving={item?.cont_bent_total}
                benefitContribution={item?.cont_bent_cont_total}
                rateReturnBeginYear={item?.rateReturnBeginYear}
                total={item?.cont_sum_total}
                rateRL={item?.Return_Fund_YTD}
                rateRR={item?.Return_BM_YTD}
                tooltipBM={item?.Return_BM_3Yrs}
                tooltip3Yrs={item?.Return_Fund_3Yrs}
                tooltipBM5Yrs={item?.Return_BM_5Yrs}
                tooltip5Yrs={item?.Return_Fund_5Yrs}
                number_of_unit={item?.number_of_unit}
                begin_date={item?.begin_date}
                present_date={item?.present_date}
                total_member_unit={item?.total_member_unit}
                total_company_unit={item?.total_member_unit}
              />
            </View>
          ))}
        </>
      );
    } else {
      return <View />;
    }
  };

  const handleRefreshServerError = () => {
    setSpinner(true);
    callapi().finally(() => setSpinner(false));
  };

  const renderMoveMentData = () => {
    if (movementData !== null) {
      return (
        <>
          <MoneyMovements
            name={'ยอดยกมา'}
            date={movementData?.amount_brought?.date}
            saving={movementData?.amount_brought?.cont_cum_prv}
            contribution={movementData?.amount_brought?.cont_cum_prv}
            benefitSaving={movementData?.amount_brought?.cont_bent_prv}
            benefitContribution={
              movementData?.amount_brought?.cont_bent_cont_prv
            }
            total={movementData?.amount_brought?.cont_sum_prv}
          />
          <MoneyMovements
            name={`ยอดเงินนำส่ง${isTablet ? '' : '\n'}ระหว่างปี`}
            date={movementData?.amount_delivered_during_the_year?.date}
            saving={
              movementData?.amount_delivered_during_the_year?.cont_cum_income_y
            }
            contribution={
              movementData?.amount_delivered_during_the_year?.cont_cont_income_y
            }
            benefitSaving={
              movementData?.amount_delivered_during_the_year?.cont_bent_income_y
            }
            benefitContribution={
              movementData?.amount_delivered_during_the_year
                ?.cont_bent_cont_income_y
            }
            total={
              movementData?.amount_delivered_during_the_year?.cont_sum_income_y
            }
          />
          <MoneyMovements
            name={'รับโอนระหว่างปี'}
            date={movementData?.transfer_amount?.date}
            saving={movementData?.transfer_amount?.cont_cum_tran_y}
            contribution={movementData?.transfer_amount?.cont_cont_tran_y}
            benefitSaving={movementData?.transfer_amount?.cont_bent_tran_y}
            benefitContribution={
              movementData?.transfer_amount?.cont_bent_cont_tran_y
            }
            total={movementData?.transfer_amount?.cont_sum_tran_y}
          />
          <MoneyMovements
            name={'รวม'}
            date={movementData?.total?.date}
            saving={movementData?.total?.cont_cum_total}
            contribution={movementData?.total?.cont_cont_total}
            benefitSaving={movementData?.total?.cont_bent_total}
            benefitContribution={movementData?.total?.cont_bent_cont_total}
            total={movementData?.total?.cont_sum_total}
          />
        </>
      );
    } else {
      return <View />;
    }
  };

  return (
    <RootScroll
      onRefreshCallback={callapi}
      title={Translate('textRemittanceTitle')}
      flexContainer>
      <Container>
        {/* ผลตอบแทนนโยบายการลงทุน */}
        {!isServerError ? (
          <>
            {payOffData?.length > 0 && (
              <>
                <View style={styles.texttitleContainer}>
                  <TextMedium style={styles.texttitle}>
                    {Translate('textRemittanceSection1')}
                  </TextMedium>
                </View>
                {renderPayOffData()}
              </>
            )}

            {/* รายการความเคลื่อนไหวของเงินกองทุน */}
            {movementData !== null && (
              <>
                <View style={styles.texttitleContainer}>
                  <TextMedium style={styles.texttitle}>
                    {Translate('textRemittanceSection2')}
                  </TextMedium>
                </View>
                {renderMoveMentData()}
              </>
            )}
          </>
        ) : (
          <ServerErrorPage onPress={handleRefreshServerError} />
          // <View
          //   style={{
          //     flex: 1,
          //     justifyContent: 'center',
          //     alignItems: 'center',
          //   }}>
          //   {/* <ActivityIndicator /> */}
          // </View>
        )}
      </Container>
    </RootScroll>
  );
}
