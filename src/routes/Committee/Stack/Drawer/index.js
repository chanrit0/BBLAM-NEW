import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';

import DrawerScreen from 'screens/Board/Drawer';

import TabStack from '../TabBar';

import ResignMemberCheckScreen from 'screens/Board/Drawer/ResignMemberCheck';
import ChangeAccumulateInfoScreen from 'screens/Board/Drawer/ChangeAccumulateInfo';
import ChangeAccumulateScreen from 'screens/Board/Drawer/ChangeAccumulate';
import ChangeAccumulateHistoryScreen from 'screens/Board/Drawer/ChangeAccumulateHistory';
import InformChangeInfoScreen from 'screens/Board/Drawer/InformChangeInfo';
import PasscodeScreen from 'screens/Global/Passcode';
import ChangePasswordScreen from 'screens/Global/ChangePassword';
import Report11Screen from 'screens/Board/Drawer/ReportPVDFund/Report11';
import Report12Screen from 'screens/Board/Drawer/ReportPVDFund/Report12';
import Report13Screen from 'screens/Board/Drawer/ReportPVDFund/Report13';
import ReportBondScreen from 'screens/Board/Drawer/ReportPVDFund/ReportBond';
import ReportMemberSummaryInvestmentPlanScreen from 'screens/Board/Drawer/ReportMemberSummaryInvestmentPlan';
import SelectFundScreenDrawer from 'screens/Board/Drawer/ReportMemberSummaryInvestmentPlan/pages/SelectFund';
import ChangeStrategyConditionScreen from 'screens/Board/Drawer/ChangeStrategyCondition';
import SelectCompanyScreen from 'screens/Board/Home/pages/SelectCompany';
import SelectFundScreen from 'screens/Board/Home/pages/SelectFund';
import DownloadDocsScreen from 'screens/Board/Drawer/DownloadDocs';

import { widthPercentageToDP } from 'react-native-responsive-screen';
import { COLORS } from 'styles';
import { isTablet } from 'utils';

const DrawerStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={TabStack} />
      <Stack.Screen
        name="ResignMemberCheck"
        component={ResignMemberCheckScreen}
      />
      <Stack.Screen
        name="ChangeAccumulateInfo"
        component={ChangeAccumulateInfoScreen}
        options={{
          cardStyle: {
            backgroundColor: COLORS.GRAY,
          },
        }}
      />
      <Stack.Screen
        name="ChangeAccumulate"
        component={ChangeAccumulateScreen}
      />
      <Stack.Screen
        name="ChangeAccumulateHistory"
        component={ChangeAccumulateHistoryScreen}
      />

      <Stack.Screen
        name="InformChangeInfo"
        component={InformChangeInfoScreen}
      />
      <Stack.Screen
        name="ReportMemberSummaryInvestmentPlan"
        component={ReportMemberSummaryInvestmentPlanScreen}
        options={{
          cardStyle: {
            backgroundColor: COLORS.GRAY,
          },
        }}
      />
      <Stack.Screen
        name="SelectFundDrawer"
        component={SelectFundScreenDrawer}
      />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="Passcode" component={PasscodeScreen} />
      <Stack.Screen name="Report11" component={Report11Screen} />
      <Stack.Screen name="Report12" component={Report12Screen} />
      <Stack.Screen name="Report13" component={Report13Screen} />
      <Stack.Screen name="ReportBond" component={ReportBondScreen} />
      <Stack.Screen
        name="ChangeStrategyCondition"
        component={ChangeStrategyConditionScreen}
      />
      <Stack.Screen name="SelectCompany" component={SelectCompanyScreen} />
      <Stack.Screen name="SelectFund" component={SelectFundScreen} />
      <Stack.Screen name="DownloadDocs" component={DownloadDocsScreen} />
    </Stack.Navigator>
  );
};

export default () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerStyle={{
        width: widthPercentageToDP(85),
      }}
      drawerContent={props => <DrawerScreen {...props} />}
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Drawer.Screen name="Drawer" component={DrawerStack} />
    </Drawer.Navigator>
  );
};
