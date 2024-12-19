import React from 'react';
import {DeviceStatusState} from 'recoil-state';
import JailMonkey from 'jail-monkey';
import {getUserInfo} from 'services/api/Autorization';
import SplashScreen from 'react-native-splash-screen';
import {useRecoilState} from 'recoil';
import Jailbreak from 'screens/Global/Jailbreak';
import NoInternetConnection from 'screens/Global/NoInternetConnection';
import CheckInternetConnection from 'services/CheckInternetConnection';

export default ({children}) => {
  const [deviceStatus, setDeviceStatus] = useRecoilState(DeviceStatusState);

  const isJailbreak = () => {
    return JailMonkey.isJailBroken();
  };

  React.useEffect(() => {
    async function fetchData() {
      try {
        let jailbreakStatus = false;

        if (!__DEV__) {
          jailbreakStatus = isJailbreak();
        }

        await getUserInfo();

        setDeviceStatus({
          isJailbreak: jailbreakStatus,
        });

        SplashScreen.hide();
      } catch (error) {
        console.error('Error in useEffect:', error);
      }
    }
    fetchData();
  }, []);

  if (!CheckInternetConnection()) {
    return <NoInternetConnection />;
  }

  if (deviceStatus.isJailbreak) {
    return <Jailbreak />;
  }

  return children;
};
