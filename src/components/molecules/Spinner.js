// React
import React from 'react';
import {Animated, View, Modal, StatusBar} from 'react-native';
import {ActivityIndicator} from 'components/atoms';
import {useSetRecoilState} from 'recoil';
import {spinnerState} from 'recoil-state';
import {showSmallAlert} from 'utils';

export default ({visible, ...props}) => {
  const setSpinner = useSetRecoilState(spinnerState);

  React.useEffect(() => {
    let timer = setTimeout(() => {
      setSpinner(false);
    }, 60000); // 60 sec

    return () => {
      clearTimeout(timer);
    };
  }, [visible]);

  return (
    <>
      {visible && (
        <View
          style={{
            zIndex: 99,
            width: '100%',
            height: '100%',
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,0.2)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <StatusBar backgroundColor={'rgba(0,0,0,0.1)'} />
          <ActivityIndicator />
        </View>
      )}
    </>
  );
};
