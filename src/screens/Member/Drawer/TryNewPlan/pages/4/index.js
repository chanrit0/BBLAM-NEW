import {View} from 'react-native';
import React from 'react';
import {Container, RootScroll} from 'components/common';
import {Translate} from 'function';
import {setSpinner, ViewScale} from 'utils';
import {COLORS, FONT_SIZE} from 'styles';
import {LineHorizontal, TextRegular, TextMedium} from 'components/atoms';
import {ChangeFundScore, TwoButtons} from 'components/organisms';
import RiskProfileButton from './components/RiskProfileButton';
import {AlertFailed, FundBoxDIY} from 'components/molecules';
import {getRetirePlan3, sendRetirePlan3} from 'services/api/member';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import styles from './Style';
import Total from './components/Total';

export default ({navigation, route}) => {
  const [apiData, setApiData] = React.useState({
    risk: {
      risk_update_date: '',
      score: '',
    },
  });
  const data_resend = route.params.data_resend;
  const {control, setValue, handleSubmit} = useForm();
  const {fields} = useFieldArray({control, name: 'data_show'});

  const handleConfirm = handleSubmit(
    data => {
      var asset_input1_pct = parseFloat(data.asset_input1_pct);
      var asset_input2_pct = parseFloat(data.asset_input2_pct);
      var asset_input3_pct = parseFloat(data.asset_input3_pct);
      var asset_input4_pct = parseFloat(data.asset_input4_pct);
      var asset_input5_pct = parseFloat(data.asset_input5_pct);
      var asset_input6_pct = parseFloat(data.asset_input6_pct);
      var tota =
        asset_input6_pct +
        asset_input5_pct +
        asset_input4_pct +
        asset_input3_pct +
        asset_input2_pct +
        asset_input1_pct;
      if (tota === 100.0 && tota != 0.0) {
        delete data?.data_show;
        sendapi(data);
      } else {
        let textError = 'กรุณาเลือกนโยบายการลงทุนให้ครบ 100%'
        navigation.navigate('Alert1', {
          children: AlertFailed(textError),
          title: Translate('textConfirm2'),
        });
      }
    },
    error => console.log(error),
  );

  const sendapi = async data => {
    setSpinner(true);
    const response = await sendRetirePlan3({...data_resend, ...data}).catch(
      error => console.log(error),
    );
    if (response?.status == 'fail') {
      navigation.navigate('Alert1', {
        children: AlertFailed(response?.message),
        title: Translate('textConfirm2'),
      });
    } else {
      navigation.navigate('TryNewPlanPageResult', {
        data_show: response?.data_show,
        data_resend: data_resend,
      });
      setSpinner(false);
    }
  };

  const callapi = async () => {
    await getRetirePlan3()
      .then(response => {
        if (response.status == 'success') {
          setApiData({
            risk: {
              risk_update_date: response?.risk?.risk_update_date,
              score: response?.risk?.score,
            },
          });
          setValue('data_show', response?.data_show);
        }
      })
      .catch(error => console.log(error));
  };

  React.useEffect(() => {
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
        <View
          style={{
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: COLORS.BORDER,
            padding: ViewScale(15),
          }}>
          <View
            style={{
              paddingVertical: ViewScale(10),
              alignItems: 'center',
              backgroundColor: COLORS.PRIMARY,
            }}>
            <TextMedium color={COLORS.WHITE}>{'นโยบายการลงทุน'}</TextMedium>
          </View>
        </View>
        {fields.map((field, index) => (
          <View key={field.id}>
            <Controller
              name={`asset_input${index + 1}_pct`}
              defaultValue={'0.00'}
              control={control}
              render={({field: {onChange, value}}) => (
                <FundBoxDIY
                  hideOldRatio
                  name={field.Group_asset}
                  tooltipText={field.asset_tooltip}
                  ratio={field.max_percent}
                  onValueChange={onChange}
                  value={value}
                />
              )}
            />
          </View>
        ))}
        <Container>
          <Total control={control} />
          <View style={styles.changeMethodContainer}>
            <TextMedium>{'วิธีการปรับแผนการลงทุนใหม่'}</TextMedium>
            <View style={styles.dayResult}>
              <TextRegular size={FONT_SIZE.BODY_3}>
                {
                  'ปรับสัดส่วนเงินลงทุนปัจจุบัน และเปลี่ยนสัดส่วนเงินลงทุนเข้าใหม่ (Rebalance & Re-allocate)'
                }
              </TextRegular>
            </View>
          </View>
        </Container>

        <TwoButtons
          btnRightTitle={Translate('textConfirm1')}
          callback={handleConfirm}
        />
      </View>
    </RootScroll>
  );
};
