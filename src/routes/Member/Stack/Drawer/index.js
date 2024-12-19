import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

// Stack
import TabBarStack from '../TabBar';
import TryNewPlanStack from './Stack/TryNewPlan';
import NewsStack from './Stack/News';
import ChangeCumulativeRateStack from './Stack/ChangeCumulativeRate';
import MemberPayment from './Stack/member_payment';

// Screen
import ReportDetailScreen from 'screens/Global/SummaryInvestPolicy/Detail';
import CalculateMoneyScreen from 'screens/Member/Drawer/CalculateMoney';
import DownloadDocsScreen from 'screens/Member/Drawer/DownloadDocs';
import FAQScreen from 'screens/Member/Drawer/FAQ';
import FAQDetailScreen from 'screens/Member/Drawer/FAQ/Detail';

import ChangePasswordScreen from 'screens/Global/ChangePassword';
import ChangePasscodeScreen from 'screens/Global/Passcode';
import CheckPasswordScreen from 'screens/Global/CheckPassword';
import SummaryInvestmentPolicyScreen from 'screens/Member/Drawer/SummaryInvestmentPolicy';
import AutoBalanceTerms from 'screens/Member/ChangeFund/pages/AutoBalanceTerms';
import LifePathTermsScreen from 'screens/Member/ChangeFund/pages/ChangeStrategy/LifePathTerms';

export default () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={TabBarStack} />
      <Stack.Screen
        name="SummaryInvestPolicy"
        component={SummaryInvestmentPolicyScreen}
      />
      <Stack.Screen name="ReportDetail" component={ReportDetailScreen} />
      <Stack.Screen name="TryNewPlan" component={TryNewPlanStack} />
      <Stack.Screen name="CalculateMoney" component={CalculateMoneyScreen} />
      <Stack.Screen name="DownloadDocs" component={DownloadDocsScreen} />
      <Stack.Screen name="FAQ" component={FAQScreen} />
      <Stack.Screen name="FAQDetail" component={FAQDetailScreen} />
      <Stack.Screen name="News" component={NewsStack} />
      <Stack.Screen name="MemberPayment" component={MemberPayment} />
      <Stack.Screen
        name="ChangeCumulativeRate"
        component={ChangeCumulativeRateStack}
      />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="Passcode" component={ChangePasscodeScreen} />
      <Stack.Screen name="CheckPassword" component={CheckPasswordScreen} />
      <Stack.Screen name="AutoBalanceTerms" component={AutoBalanceTerms} />

      <Stack.Screen name="LifePathTerms" component={LifePathTermsScreen} />
    </Stack.Navigator>
  );
};
