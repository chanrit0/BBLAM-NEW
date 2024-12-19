import React from 'react';
import {View, Text} from 'react-native';
import TemplatesSelectFund from 'components/templates/Committee/SelectFund';

export default ({route}) => {
  const {callapiFundAll, com_code, callapiHome, isAll, fund_code} =
    route.params;

  return (
    <TemplatesSelectFund
      com_code={com_code}
      callapiFundAll={callapiFundAll}
      fund_code={fund_code}
      callapiHome={callapiHome}
      isAll={isAll}
    />
  );
};
