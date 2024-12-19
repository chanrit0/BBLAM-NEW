// react
import React from 'react';
import {useWindowDimensions, View} from 'react-native';

// custom
import styles from '../Style';

// lib
import {useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {TabView} from 'react-native-tab-view';

// Step
import StepOne from './StepOne';
import StepTwo from './StepTwo';

// recoil
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {languageState, userAuthenState} from 'recoil-state';
import {StepIndicators} from 'components/organisms';

export default function index({onIndexChange, index}) {
  const lang = useRecoilValue(languageState);
  const StepOneForm = useForm();
  const StepTwoForm = useForm();
  const navigation = useNavigation();

  const layout = useWindowDimensions();
  const [routes] = React.useState([{key: 'firststep'}, {key: 'secondstep'}]);

  const setUserAuthenData = useSetRecoilState(userAuthenState);

  React.useEffect(() => {
    return () => setUserAuthenData(null);
  }, []);
  
  const renderScene = ({route}) => {
    switch (route.key) {
      case 'firststep':
        return (
          <StepOne
            navigation={navigation}
            onIndexChange={onIndexChange}
            handleForm={StepOneForm}
            lang={lang}
          />
        );
      case 'secondstep':
        return (
          <StepTwo
            navigation={navigation}
            handleForm={StepTwoForm}
            StepOneForm={StepOneForm}
            lang={lang}
          />
        );
    }
  };

  return (
    <>
      <View style={styles.StepIndicatorContainer}>
        <StepIndicators currentStep={index} />
      </View>
      <TabView
        swipeEnabled={false}
        renderTabBar={() => null}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={onIndexChange}
        initialLayout={{width: layout.width}}
      />
    </>
  );
}
