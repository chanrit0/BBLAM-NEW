/* eslint-disable react-hooks/rules-of-hooks */
// React
import React from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';

// custom
import { Translate } from 'function';
import { FontScale, setSpinner, ViewScale } from 'utils';
import styles from './Style';

// components
import { RootScroll, Container } from 'components/common';
import {
  Switch,
  LineHorizontal,
  TextRegular,
  TextMedium,
} from 'components/atoms';
import { isTablet } from 'utils';
import { COLORS, FONT_SIZE, FONT_TYPE, SPACING } from 'styles';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { userInfoState } from 'recoil-state';
import {
  ChangeStatusSwitch,
  getCheckDepositAccess,
  sendDeposit1,
  sendDeposit2,
  sendDeposit3,
} from 'services/api/committee';
import { AlertFailed, AlertSuccess, AlertWarning } from 'components/molecules';
import _ from 'lodash';
import dayjs from 'dayjs';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import Type1 from './components/Type1';
import Type2 from './components/Type2';
import Type3 from './components/Type3';
import Condition from './components/Condition';

export default ({ navigation }) => {
  dayjs.locale('th');
  dayjs.extend(buddhistEra);
  const userInfo = useRecoilValue(userInfoState);
  const {
    control,
    watch,
    handleSubmit,
    reset,
    unregister,
    getValues,
    setValue,
    resetField,
    clearErrors,
  } = useForm({
    defaultValues: {
      com_code: userInfo.com_code,
      fund_code: userInfo.fund_code,
      type: 1,
      data: [],
      set_range: 1,
      decimal_allow: 1,
      max_change_rate: {
        value: 1,
        rule: [
          {
            day_start: '',
            day_end: '',
            month_com: '',
            month_change: '',
            status_change: 1,
          },
        ],
      },
    },
  });

  const [toggleSwitch, setToggleSwitch] = React.useState(false);
  const userDepositId = React.useRef('');

  const onSubmit = handleSubmit(
    async data => {
      const sendData = FilterDataToAPI(data);

      if (sendData.type === 3 && sendData.data.length == 0) {
        return navigation.navigate('Alert1', {
          children: AlertFailed('กรุณากรอกข้อมูลให้ครบถ้วน'),
          title: Translate('textConfirm2'),
        });
      }

      if (sendData.type === 1) {
        console.log('data type 1', JSON.stringify(sendData));
        SendDeposit1(sendData);
      }

      if (sendData.type === 2) {
        console.log('data type 2', JSON.stringify(sendData));
        SendDeposit2(sendData);
      }

      if (sendData.type === 3) {
        console.log('data type 3', JSON.stringify(sendData, undefined, 2));
        SendDeposit3(sendData);
      }
    },
    error => {
      console.log(error);
    },
  );

  const SendDeposit1 = async data => {
    setSpinner(true);
    await sendDeposit1(data)
      .then(response => {
        if (response.status == 'success') {
          navigation.navigate('Alert1', {
            children: AlertSuccess('ทำรายการสำเร็จ'),
            title: Translate('textConfirm2'),
          });
        } else {
          navigation.navigate('Alert1', {
            children: AlertSuccess('ทำรายการไม่สำเร็จ'),
            title: Translate('textConfirm2'),
          });
        }
      })
      .catch(error => {
        navigation.navigate('Alert1', {
          children: AlertFailed(error.message_header, error.message_body),
          title: Translate('textConfirm2'),
        });
      })
      .finally(() => setSpinner(false));
  };

  const SendDeposit2 = async data => {
    setSpinner(true);
    await sendDeposit2(data)
      .then(response => {
        if (response.status == 'success') {
          navigation.navigate('Alert1', {
            children: AlertSuccess('ทำรายการสำเร็จ'),
            title: Translate('textConfirm2'),
          });
        } else {
          navigation.navigate('Alert1', {
            children: AlertSuccess('ทำรายการไม่สำเร็จ'),
            title: Translate('textConfirm2'),
          });
        }
      })
      .catch(error => {
        navigation.navigate('Alert1', {
          children: AlertFailed(error.message_header, error.message_body),
          title: Translate('textConfirm2'),
        });
      })
      .finally(() => setSpinner(false));
  };

  const SendDeposit3 = async data => {
    setSpinner(true);
    await sendDeposit3(data)
      .then(response => {
        if (response.status == 'success') {
          navigation.navigate('Alert1', {
            children: AlertSuccess('ทำรายการสำเร็จ'),
            title: Translate('textConfirm2'),
          });
        } else {
          navigation.navigate('Alert1', {
            children: AlertSuccess('ทำรายการไม่สำเร็จ'),
            title: Translate('textConfirm2'),
          });
        }
      })
      .catch(error => {
        console.log(error);
        navigation.navigate('Alert1', {
          children: AlertFailed(error.message_header, error.message_body),
          title: Translate('textConfirm2'),
        });
      })
      .finally(() => setSpinner(false));
  };

  const FilterDataToAPI = data => {
    return {
      com_code: data.com_code,
      fund_code: data.fund_code,
      type: data.type,
      ...(data.type === 1 && {
        min_rate: data.decimal_allow2 === 2 ? data.min_rate.replace(/\.\d*/, '') : data.min_rate,
        max_rate: data.decimal_allow2 === 2 ? data.max_rate.replace(/\.\d*/, '') : data.max_rate,
        decimal_allow: data.decimal_allow2,
      }),
      ...(data.type === 2 && {
        rate: [data.rate_1, data.rate_2, data.rate_3, data.rate_4].filter(
          item => item !== '',
        ),
      }),
      ...(data.type === 3 && {
        subtype: data.subtype,
        set_range: data.set_range,
        decimal_allow: data.decimal_allow,
        data: data.data.map(item => {
          return {
            ...(data.subtype != 3 && {
              detail_type: item.detail_type,
            }),
            ...(data.subtype == 3 && {
              detail_type_text: item.detail_type_text,
            }),
            ...(data.subtype != 3 && {
              ...([2, 5].includes(item.detail_type)
                ? {
                  start: item.start,
                  end: item.end,
                }
                : { value: item.value }),
            }),
            ...(data.set_range === 2
              ? { rate: item.rate }
              : { rate_start: item.rate_start, rate_end: item.rate_end }),
          };
        }),
      }),
      ...(data.type === 3 &&
        data.subtype === 4 && {
        other: data.other,
      }),
      max_change_rate: data.max_change_rate,
    };
  };

  const callCheckAccess = async () => {
    await getCheckDepositAccess({
      com_code: userInfo.com_code,
      fund_code: userInfo.fund_code,
    })
      .then(response => {
        if (response.status == 'success') {
          const data = response.data[0];
          const openStatus = data.open_status == '1' ? false : true;
          const id = data.deposit_id;
          setToggleSwitch(true);
          userDepositId.current = id;
        }
      })
      .catch(error => {
        navigation.navigate('Alert1', {
          children: AlertWarning(error.message_header, error.message_body),
          title: Translate('textConfirm2'),
          onPress: () => {
            navigation.popToTop();
          },
        });
      });
  };

  React.useEffect(() => {
    setSpinner(true);
    callCheckAccess().finally(() => {
      setSpinner(false);
    });
  }, []);

  const handleToggleSwitch = async () => {
    const status = !toggleSwitch ? 2 : 1;
    setToggleSwitch(!toggleSwitch);
    await ChangeStatusSwitch({ id: userDepositId.current, status })
      .then(res => console.log(res))
      .catch(error => console.log(error));
  };

  return (
    <RootScroll
      isBackIcon
      title={Translate('textSetUpCumulativePayoutRate')}
      flexContainer>
      {/* switch */}
      <View>
        <Container style={styles.rootContainer}>
          <TextMedium>{Translate('textUseCumulativePayoutRate')}</TextMedium>
          <Switch
            value={toggleSwitch}
            onChange={handleToggleSwitch}
            renderActiveText={false}
            renderInActiveText={false}
            circleBorderWidth={1}
            switchLeftPx={2}
            backgroundInactive={COLORS.GRAY_3}
            switchRightPx={2}
            switchWidthMultiplier={isTablet ? 2.5 : 2}
          />
        </Container>
        <LineHorizontal />
      </View>

      {toggleSwitch && (
        <>
          <Container style={{ flex: 0, marginTop: ViewScale(20) }}>
            <TextMedium>
              {Translate('textChooseCumulativePayoutRate')}
            </TextMedium>
            <TextRegular size={FONT_SIZE.BODY_3} color={'#4c637b'}>
              {Translate('textChooseCumulativePayoutRate_Decs')}
            </TextRegular>
          </Container>

          {/* checkbox1 */}

          <Controller
            control={control}
            name="type"
            render={({ field: { onChange, value } }) => {
              return (
                <>
                  <Type1
                    control={control}
                    onChangeType={onChange}
                    valueType={value}
                    getValues={getValues}
                    unregister={unregister}
                    clearErrors={clearErrors}
                  />
                  <Type2
                    control={control}
                    onChangeType={onChange}
                    valueType={value}
                    getValues={getValues}
                    watch={watch}
                    unregister={unregister}
                    clearErrors={clearErrors}
                  />
                  <Type3
                    control={control}
                    onChangeType={onChange}
                    valueType={value}
                    reset={reset}
                    unregister={unregister}
                    setValue={setValue}
                    resetField={resetField}
                    getValues={getValues}
                    clearErrors={clearErrors}
                  />
                </>
              );
            }}
          />

          <Condition control={control} onSubmit={onSubmit} />
        </>
      )}
    </RootScroll>
  );
};
