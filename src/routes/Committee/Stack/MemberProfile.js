import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import CompanyProfileScreen from 'screens/Board/MemberProfile';
import MemberListScreen from 'screens/Board/ListMember';
import DetailMemberScreen from 'screens/Board/MemberProfile/DetailMember';
import {COLORS} from 'styles';

export default () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="CompanyProfile"
        component={CompanyProfileScreen}
        options={{
          cardStyle: {
            backgroundColor: COLORS.GRAY,
          },
        }}
      />
      <Stack.Screen name="MemberProfileList" component={MemberListScreen} />
      <Stack.Screen name="MemberProfileDetail" component={DetailMemberScreen} />
    </Stack.Navigator>
  );
};
