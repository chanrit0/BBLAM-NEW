import {useNavigation} from '@react-navigation/core';
import {Container, RootScroll} from 'components/common';
import {LineHorizontal, TextMedium, TextRegular} from 'components/atoms';
import {Translate} from 'function';
import {setSpinner, ViewScale} from 'utils';
import React from 'react';
import {View} from 'react-native';
import {COLORS, FONT_SIZE} from 'styles';
import {ChangeFundScore, TwoButtons} from 'components/organisms';
import styles from './Style';
import _ from 'lodash';
import Table from './components/Table';
import RiskProfileButton from './components/RiskProfileButton';
import {getRetirePlan2, sendRetirePlan2} from 'services/api/member';

export default ({route}) => {
  const data_resend = route.params?.data_resend;
  const navigation = useNavigation();
  const data = React.useRef({
    asumpt_input1_pct: '',
    asumpt_input2_pct: '',
    asumpt_input3_pct: '',
    asumpt_input4_pct: '',
    asumpt_input5_pct: '',
    asumpt_input6_pct: '',
  });
  const [apiData, setApiData] = React.useState({
    assumption_tooltip: '',
    data_show: [],
    data_year: [],
    risk: {
      risk_update_date: '',
      score: '',
    },
  });

  const callapi = async () => {
    await getRetirePlan2()
      .then(response => {
        setApiData({
          assumption_tooltip: response?.assumption_tooltip,
          data_show: response?.data_show,
          data_year: response?.data_year,
          risk: {
            risk_update_date: response?.risk?.risk_update_date,
            score: response?.risk?.score,
          },
        });
      })
      .catch(error => console.log(error));
  };

  const handleNext = async () => {
    setSpinner(true);
    await sendRetirePlan2({...data.current, ...data_resend})
      .then(response => {
        navigation.navigate('TryNewPlanPage4', {
          data_resend: response?.data_resend,
        });
      })
      .catch(error => console.log(error));
  };

  React.useEffect(() => {
    setSpinner(true);
    callapi().finally(() => setSpinner(false));
  }, []);

  return (
    <RootScroll
      title={Translate('textTryNewPlan')}
      isBackIcon
      flexContainer
      fixTab={false}>
      <View>
        <Container style={{flex: 0}}>
          <View style={{marginTop: ViewScale(20)}}>
            <TextRegular size={FONT_SIZE.BODY_2} color={COLORS.PRIMARY}>
              ({Translate('textTryNewPlanDesc1')})
            </TextRegular>
            <TextRegular
              size={FONT_SIZE.BODY_3}
              style={{marginTop: ViewScale(10)}}>
              - {Translate('textTryNewPlanDesc2')}
            </TextRegular>
            <TextRegular
              size={FONT_SIZE.BODY_3}
              style={{marginTop: ViewScale(10)}}>
              - {Translate('textTryNewPlanDesc3')}
            </TextRegular>
          </View>
        </Container>
        <LineHorizontal style={{marginTop: ViewScale(10)}} />
        <ChangeFundScore
          date={apiData.risk.risk_update_date}
          score={apiData.risk.score}
        />
        <RiskProfileButton />
        <LineHorizontal style={{marginTop: ViewScale(10)}} />
        <Container style={styles.container}>
          <TextMedium color={COLORS.PRIMARY} style={styles.title}>
            {Translate('textTryNewPlanAssetClass')}
          </TextMedium>
          <TextRegular style={{marginBottom: ViewScale(10)}}>
            {Translate('textTryNewPlanAssetClassDesc')}
          </TextRegular>
          {apiData.data_year.length > 0 && apiData.data_show.length > 0 && (
            <Table
              dataYear={apiData.data_year}
              dataShow={apiData.data_show}
              assumptionTooltip={apiData.assumption_tooltip}
              setData={data}
            />
          )}
          <TextRegular
            size={FONT_SIZE.BODY_3}
            style={{marginTop: ViewScale(10)}}>
            {Translate('textTryNewPlanTableDesc')}
          </TextRegular>
          <TextMedium style={{marginTop: ViewScale(10)}}>
            {'Disclaimer'}
          </TextMedium>
          <TextRegular
            size={FONT_SIZE.BODY_2}
            style={{marginTop: ViewScale(10)}}>
            {Translate('textTryNewPlanDisclaimer')}
          </TextRegular>
        </Container>
        <TwoButtons callback={handleNext} />
      </View>
    </RootScroll>
  );
};
