/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
// React
import React from 'react';

// custom
import {Translate} from 'function';
import {setSpinner, ViewScale} from 'utils';

// components
import {Container, RootScroll} from 'components/common';
import {Button} from 'components/atoms';
import {SPACING} from 'styles';
import {useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';

import BasicInfo from './BasicInfo';
import RetireTarget from './RetireTarget';
import FundPresent from './FundPresent';

import {getRetirePlan1, sendRetirePlan1} from 'services/api/member';
import {AlertWarningAge} from 'components/molecules';

export default () => {
  const navigation = useNavigation();
  const {control, handleSubmit, setValue} = useForm();
  const [expandedAll, setExpandedAll] = React.useState({
    BasicInfo: false,
    FundPresent: false,
    RetireTarget: false,
  });

  // const handleOnPress = () => {
  //   navigation.navigate('TryNewPlanPage2');
  // };

  const handleOnPress = handleSubmit(
    data => {
      if (data.age_toexit < data.age_now) {
        return navigation.navigate('Alert1', {
          children: AlertWarningAge(
            Translate('textAlertAge_nowMore_thanAge_toexitBBLAMONE'),
          ),
          title: Translate('textConfirm2'),
        });
      } else if (data.age_forcast < data.age_toexit) {
        return navigation.navigate('Alert1', {
          children: AlertWarningAge(
            Translate('textAlertAge_forcast_thanAge_toexitBBLAMONE'),
          ),
          title: Translate('textConfirm2'),
        });
      } else {
        data['salary'] = data.salary.replaceAll(',', '');
        data['exp_afterexit'] = data.exp_afterexit.replaceAll(',', '');
        data['cash_from_other'] =
          data.cash_from_other != undefined
            ? data.cash_from_other.replaceAll(',', '')
            : 0;

        sendapi(data);
      }
    },
    error => {
      setExpandedAll({
        BasicInfo: true,
        FundPresent: true,
        RetireTarget: true,
      });
    },
  );

  const handleExpanded = type => () => {
    if (type == 'BasicInfo') {
      setExpandedAll(v => ({...v, BasicInfo: !v.BasicInfo}));
    } else if (type == 'FundPresent') {
      setExpandedAll(v => ({...v, FundPresent: !v.FundPresent}));
    } else if (type == 'RetireTarget') {
      setExpandedAll(v => ({...v, RetireTarget: !v.RetireTarget}));
    }
  };

  const sendapi = async data => {
    setSpinner(true);
    
    const result = await sendRetirePlan1(data)
      .then(response => {
        navigation.navigate('TryNewPlanPage2', {
          data_resend: response?.data_resend,
          data_show: response?.data_show,
        });
      })
      .catch(error => console.log(error))
      .finally(() => setSpinner(false));

    return result;
  };

  const filterInput = (onChange, oldvalue) => value => {
    let parseValue = parseInt(value.replace(/[^\d]/g, ''));
    if (value === '') {
      parseValue = 0;
    }

    if (parseValue >= 0 && parseValue <= 100 && parseValue !== '') {
      return onChange(parseValue);
    }

    return onChange(oldvalue);
  };

  const callapi = async () => {
    await getRetirePlan1()
      .then(response => {
        if (response?.status == 'success') {
          setValue('cash_from_employee', response.data.cash_from_employee);
          setValue('return_byfund', response.data.return_byfund);
          setValue('fund_total', response.data.fund_total);
          setValue('cash_from_other', response.data.cash_from_other);
        }
      })
      .catch(error => {
        console.log(error);
      });
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
      <BasicInfo
        control={control}
        filterInput={filterInput}
        handleExpanded={handleExpanded}
        expanded={expandedAll.BasicInfo}
      />
      <RetireTarget
        control={control}
        filterInput={filterInput}
        handleExpanded={handleExpanded}
        expanded={expandedAll.RetireTarget}
      />
      <FundPresent
        control={control}
        handleExpanded={handleExpanded}
        expanded={expandedAll.FundPresent}
      />
      <Container
        style={{
          flexGrow: 1,
          marginTop: ViewScale(20),
          justifyContent: 'flex-end',
          marginBottom: SPACING.FOOTER_HEIGHT,
        }}>
        <Button
          title={Translate('textCalculate')}
          type="fill"
          onPress={handleOnPress}
        />
      </Container>
    </RootScroll>
  );
};
