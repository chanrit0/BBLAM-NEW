/* eslint-disable react/self-closing-comp */

// React
import React from 'react';
import {View, StyleSheet} from 'react-native';

// custom
import {Translate} from 'function';
import {setSpinner, ViewScale} from 'utils';
import {COLORS, FONT_SIZE} from 'styles';

// components
import {RootScroll, Container} from 'components/common';
import {InvestmentOverview, NameProfile} from 'components/organisms';
import {MyReturnTotalAmount} from 'components/molecules';
import {TextMedium, TextRegular} from 'components/atoms';
import {ListStrategyInvestment} from 'components/Board/MemberProfile/ListStrategyInvestment';
import {getDetailMember} from 'services/api/committee';

// pages
import Summary from './Summary';
import _ from 'lodash';
import {useRecoilValue} from 'recoil';
import {userInfoState} from 'recoil-state';

export default ({route}) => {
  const {em_code} = route.params;
  const userInfo = useRecoilValue(userInfoState);

  const [apiData, setApiData] = React.useState({
    contribution: [],
    detail: [],
    financial: [],
    investment: [],
    graph: [],
  });
  const [load, setLoad] = React.useState(true);

  const callapi = async () => {
    await getDetailMember({
      em_code,
      com_code: userInfo.com_code,
      fund_code: userInfo.fund_code,
    })
      .then(response => {
        if (response.status == 'success' || response.code == '02') {
          const convert_graph_data = () => {
            const employer_part = parseFloat(response.data.graph.employer_part);
            const member_path = parseFloat(response.data.graph.member_path);

            return [
              {
                x: 'ส่วนของนายจ้าง',
                y: employer_part,
              },
              {
                x: 'ส่วนของลูกจ้าง',
                y: member_path,
              },
            ];
          };

          const graph = !_.isEmpty(response.data.graph)
            ? {
                data: convert_graph_data(),
                choice_date: response.data.graph.choice_date,
                cont_sum_total: response.data.graph.cont_sum_total,
              }
            : [];

          setApiData({
            ...response.data,
            graph: graph,
          });
          setLoad(false);
        }
      })
      .catch(error => {
        console.log({error});
      });
  };

  React.useEffect(() => {
    setSpinner(true);
    callapi().finally(() => setSpinner(false));
  }, []);

  return (
    <RootScroll
      isBackIcon
      flexContainer
      headerChildren={
        <NameProfile
          data={{
            name: `${apiData.detail?.em_name ?? ''} ${
              apiData.detail?.em_lastname ?? ''
            }`,
            info: [
              [Translate('textMemberId'), em_code],
              [Translate('textEmployer'), apiData.detail?.com_name],
              [Translate('textEmployerId'), apiData.detail?.com_code],
              [Translate('textInstitution'), apiData.detail?.em_type],
              [Translate('textPhoneNumber'), apiData.detail?.em_tel],
              [Translate('textEmail'), apiData.detail?.em_email],
            ],
          }}
        />
      }
      backgroundColor={COLORS.GRAY}>
      {!load && (
        <>
          <InvestmentOverview
            data={apiData.graph?.data}
            total={apiData.graph?.cont_sum_total}
            date={apiData.graph?.choice_date}
          />
          <View style={styles.totalAmountContainer}>
            <MyReturnTotalAmount
              total={apiData.financial?.cont_sum_total}
              saving={apiData.financial?.cont_cum_total}
              contribution={apiData.financial?.cont_cont_total}
              benefitSaving={apiData.financial?.cont_bent_total}
              benefitContribution={apiData.financial?.cont_bent_cont_total}
              unit={apiData.financial?.unit}
            />
          </View>
          <View>
            <Container style={styles.contianerStrategyInvestment}>
              <TextMedium size={FONT_SIZE.BODY_2}>
                {'นโยบายการลงทุน'}
              </TextMedium>
              <TextRegular size={FONT_SIZE.BODY_2} color={COLORS.PRIMARY}>
                {`ทางเลือกการลงทุน ${apiData.investment?.choice_no}`}
              </TextRegular>
            </Container>
            {apiData.investment?.data?.map((item, index) => (
              <View key={'invesmentId-' + index}>
                <ListStrategyInvestment
                  sub_code={item.sub_code}
                  sub_name={item.sub_name}
                  percent_policy={item.percent_policy}
                  percent_precent={item.percent_precent}
                />
              </View>
            ))}
          </View>
          <Container style={styles.containerSummary}>
            <TextMedium size={FONT_SIZE.BODY_2}>
              {'เงินนำส่งรายเดือน'}
            </TextMedium>
          </Container>
          <Summary data={apiData.contribution} />
        </>
      )}
    </RootScroll>
  );
};

const styles = StyleSheet.create({
  contianerStrategyInvestment: {
    marginVertical: ViewScale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerSummary: {
    marginVertical: ViewScale(15),
  },
  totalAmountContainer: {
    backgroundColor: COLORS.GRAY,
    paddingTop: ViewScale(10),
  },
});
