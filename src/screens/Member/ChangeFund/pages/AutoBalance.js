/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { RootScroll } from 'components/common';
import { Translate } from 'function';
import { useRecoilValue } from 'recoil';
import { languageState } from 'recoil-state';
import { useNavigation } from '@react-navigation/core';
import {
  AutoBalanceButton,
  AutoBalanceHeader,
  AutoBalanceInput,
  ChangeFundScore,
} from 'components/organisms';
import { useForm } from 'react-hook-form';
import { getAutoBalanceChange, sendAutoBalanceChange } from 'services/api/member';
import { setSpinner } from 'utils';
import _ from 'lodash';
import { InteractionManager, View } from 'react-native';
import { AlertFailed, AlertSuccess } from 'components/molecules';
import ServerErrorPage from 'screens/Global/ServerErrorPage';

export default function index() {
  const [passwordMatch, setPasswordMatch] = React.useState(false);
  const [isServerError, setIsServerError] = React.useState(false);

  const navigation = useNavigation();
  useRecoilValue(languageState);
  const { control, handleSubmit, setValue, clearErrors } = useForm({
    defaultValues: {
      ti_type_change: 'change_auto',
      ti_rebalance: 1,
      type_auto: 1,
    },
  });

  const [selectedType, setSelectedType] = React.useState(0);
  const [dataValue, setDateValue] = React.useState('');
  const [monthValue, setMonthValue] = React.useState('');
  const [riskValue, setRiskValue] = React.useState(null);
  const [showType, setShowType] = React.useState(0);
  const [typeRebalance, setTypeRebalance] = React.useState('');
  const [apiData, setApiData] = React.useState(null);

  const _ConfirmFunction = handleSubmit(
    data => {
      navigation.navigate('AutoBalanceTerms', {
        goToScreen: 'CheckPassword',
        screenProps: {
          setPasswordMatch,
          goToScreen: 'AutoBalance',
        },
      });
    },
    error => console.log(error),
  );

  const callapi = async () => {
    await getAutoBalanceChange()
      .then(response => {
        if (response.code === '02' || response.status == 'success') {
          const data = response.data_list;
          const type = response.type;
          setRiskValue(response.customer_risk_profile);
          setShowType(type);
          setTypeRebalance(response.type_rebalance);
          setValue('type_auto', type);
          setApiData(data);
          navigation.navigate('Alert4', {
            children:
              'ข้าพเจ้า (สมาชิก) รับทราบและตกลงว่า การวางแผนปรับสัดส่วนมูลค่าเงินลงทุนอัตโนมัติ Auto Rebalance Program มีผลในวันคำนวณจำนวนหน่วย (Trade date) ที่ใกล้ที่สุด นับแต่วันที่มีผลของคำสั่ง',
          });
        } else {
          navigation.goBack();
          navigation.navigate('Alert1', {
            children: AlertFailed(response.message),
            title: Translate('textConfirm2'),
          });
        }
        setIsServerError(false);
      })
      .catch(error => {
        setIsServerError(true);
        console.log(error);
      });
  };

  const sendapi = handleSubmit(
    async data => {
      await sendAutoBalanceChange(data)
        .then(response => {
          if (response.code == '02') {
            navigation.navigate('Alert1', {
              children: AlertSuccess('ทำรายการสำเร็จ'),
              title: Translate('textConfirm2'),
              onPress: () => {
                navigation.popToTop();
              },
            });
          } else {
            navigation.goBack();
            navigation.navigate('Alert1', {
              children: AlertFailed(response.message),
              title: Translate('textConfirm2'),
            });
          }
        })
        .catch(error => {
          console.log({ error });
        });
    },
    error => console.log(error),
  );

  React.useEffect(() => {
    setSpinner(true);
    callapi().finally(() => {
      setSpinner(false);
    });
  }, []);

  React.useEffect(() => {
    if (passwordMatch === true) {
      InteractionManager.runAfterInteractions(() => {
        setSpinner(true);
        sendapi().finally(() => {
          setSpinner(false);
          setPasswordMatch(false);
        });
      });
    }
  }, [passwordMatch]);

  const handleOnRefreshServerError = () => {
    setSpinner(true);
    callapi().finally(() => {
      setSpinner(false);
    });
  };

  return (
    <>
      <RootScroll title={Translate('textChangeFundTitle')} flexContainer>
        {isServerError ? (
          <ServerErrorPage onPress={handleOnRefreshServerError} />
        ) : (
          <>
            {_.isEmpty(apiData) ? (
              <View />
            ) : (
              <>
                <ChangeFundScore
                  date={riskValue?.date}
                  score={riskValue?.score}
                />
                <AutoBalanceHeader />
                <AutoBalanceInput
                  control={control}
                  selectedType={selectedType}
                  setSelectedType={setSelectedType}
                  setDateValue={setDateValue}
                  monthValue={monthValue}
                  setMonthValue={setMonthValue}
                  itemType={showType}
                  items={apiData}
                  setValue={setValue}
                  clearErrors={clearErrors}
                  typeRebalance={typeRebalance}
                />
                <AutoBalanceButton onConfirm={_ConfirmFunction} />
              </>
            )}
          </>
        )}
      </RootScroll>
    </>
  );
}
