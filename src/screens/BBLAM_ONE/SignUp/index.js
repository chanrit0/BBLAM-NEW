// react
import React from 'react';

// custom
import {View, useWindowDimensions, KeyboardAvoidingView} from 'react-native';
import {Translate} from 'function';
import styles from './Style';
import {isIOS} from 'utils';

// components
import Header from 'components/header/MainHeader';
import {FocusAwareStatusBar, SafeAreaView, TextBold} from 'components/atoms';
import TabBar from './modules/TabBar';
// lib
import {TabView} from 'react-native-tab-view';

// route
import EmailScreen from './Tabs/Email';
import PhoneNumberScreen from './Tabs/PhoneNumber';
import {useRecoilValue} from 'recoil';
import {userAuthenState} from 'recoil-state';
import {COLORS} from 'styles';

export default function SignUp({navigation, route}) {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0); // index ภาพรวม
  const [indexEmail, setIndexEmail] = React.useState(0); // index email
  const [indexPhoneNumber, setIndexPhoneNumber] = React.useState(0); //index phonenumber
  const userAuthenData = useRecoilValue(userAuthenState);
  const [routes, setRoutes] = React.useState([]);

  React.useEffect(() => {
    if (userAuthenData === null) {
      setRoutes([
        {key: 'email', title: Translate('textRegisterWithEmail')},
        {key: 'phonenumber', title: Translate('textRegisterWithPhoneNumber')},
      ]);
      return;
    }

    if (userAuthenData?.ref_code.length === 8) {
      // if user is member
      if (
        (userAuthenData?.email === '' && userAuthenData?.pullData) ||
        userAuthenData === null
      ) {
        setRoutes([
          {key: 'phonenumber', title: Translate('textRegisterWithPhoneNumber')},
        ]);
      } else {
        setRoutes([{key: 'email', title: Translate('textRegisterWithEmail')}]);
      }
    } else {
      setRoutes([{key: 'email', title: Translate('textRegisterWithEmail')}]);
    }
  }, []);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'email':
        return <EmailScreen onIndexChange={setIndexEmail} index={indexEmail} />;
      case 'phonenumber':
        return (
          <PhoneNumberScreen
            onIndexChange={setIndexPhoneNumber}
            index={indexPhoneNumber}
          />
        );
    }
  };

  return (
    <SafeAreaView>
      <FocusAwareStatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.WHITE}
      />

      <Header
        navigation={navigation}
        style={{backgroundColor: COLORS.WHITE}}
        callbackFunction={(() => {
          switch (index) {
            case 0:
              if (indexEmail > 0) {
                return () => {
                  setIndexEmail(0);
                };
              } else {
                return null;
              }
            case 1:
              if (indexPhoneNumber > 0) {
                return () => {
                  setIndexPhoneNumber(0);
                };
              } else {
                return null;
              }
            default:
              break;
          }
        })()}
      />
      <KeyboardAvoidingView style={{flex: 1}} behavior={isIOS ? 'padding' : ''}>
        <TextBold style={styles.header}>
          {Translate('textRegister')}
          {' BBLAM'}
        </TextBold>

        <View style={styles.TabBar}>
          {routes.length > 0 && (
            <TabView
              renderTabBar={props => <TabBar {...props} />}
              navigationState={{index, routes}}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{width: layout.width}}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
