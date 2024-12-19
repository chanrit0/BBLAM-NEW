import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import React from 'react';

import ChangeFundScreen from 'screens/Member/ChangeFund';
import MainChangeFundScreen from 'screens/Member/ChangeFund/pages/Main';
import TransactionInfoScreen from 'screens/Member/ChangeFund/pages/TransactionInfo';
import AutoBalanceScreen from 'screens/Member/ChangeFund/pages/AutoBalance';
import ChangeStrategyScreen from 'screens/Member/ChangeFund/pages/ChangeStrategy';
import TransactionInfoDetailScreen from 'screens/Member/ChangeFund/pages/TransactionInfo/Detail';
import AddFundScreen from 'screens/Member/ChangeFund/pages/AddFund';
import SuccessPageScreen from 'screens/Member/ChangeFund/pages/ChangeStrategy/SuccessPage';
import TooltipTableScreen from 'screens/Member/ChangeFund/pages/TooltipTable';

// recoil
import {useRecoilValue} from 'recoil';
import {termOfUseState} from 'recoil-state';

export default () => {
  const Stack = createStackNavigator();
  const termOfUse = useRecoilValue(termOfUseState);
  
  return (
    <Stack.Navigator initialRouteName="MainChangeFund" headerMode="none">
      {/* {!termOfUse?.ChangFundTermsOfService && (
        <Stack.Screen name="ChangeFund" component={ChangeFundScreen} />
      )} */}
      <Stack.Screen name="MainChangeFund" component={MainChangeFundScreen} />
      <Stack.Screen
        name="SuccessPage"
        component={SuccessPageScreen}
        options={{
          ...TransitionPresets.ScaleFromCenterAndroid,
        }}
      />
      <Stack.Screen name="TransactionInfo" component={TransactionInfoScreen} />
      <Stack.Screen
        name="TransactionInfoDetail"
        component={TransactionInfoDetailScreen}
      />
      <Stack.Screen name="AutoBalance" component={AutoBalanceScreen} />
      <Stack.Screen name="ChangeStrategy" component={ChangeStrategyScreen} />
      <Stack.Screen name="AddFund" component={AddFundScreen} />
      <Stack.Screen name="TooltipTable" component={TooltipTableScreen} />
    </Stack.Navigator>
  );
};
