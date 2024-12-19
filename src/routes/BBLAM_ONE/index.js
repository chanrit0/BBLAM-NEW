import React from 'react';
import { TransitionPresets } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { COLORS } from 'styles';

import DrawerStack from './Stack/Drawer';
import DrawerScreen from 'screens/BBLAM_ONE/Drawer';
import { useRecoilValue } from 'recoil';
import { userDeviceStatusState } from 'recoil-state';
import { widthPercentageToDP } from 'react-native-responsive-screen';

export default () => {
  const DrawerOne = createDrawerNavigator();
  const { isSignIn } = useRecoilValue(userDeviceStatusState);


  return (
    <DrawerOne.Navigator
      drawerStyle={{
        backgroundColor: COLORS.GRAY_2,
        width: widthPercentageToDP(90),
      }} 
      drawerContent={props => <DrawerScreen {...props} />}
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <DrawerOne.Screen
        name="Drawer"
        component={DrawerStack}
        options={{
          swipeEnabled: isSignIn,
        }}
      />
    </DrawerOne.Navigator>
  );
};
