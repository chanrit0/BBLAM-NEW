import React from 'react';
import { View, FlatList } from 'react-native';

// custom
import styles from './Style';
import { globalStyle, COLORS } from 'styles';
import { Translate } from 'function';
import { ViewScale, FontScale, setSpinner, StampSession } from 'utils';

// global components
import Header from 'components/header/MainHeader';
import { Container } from 'components/common';
import {
  Button,
  SafeAreaView,
  FocusAwareStatusBar,
  TextBold,
} from 'components/atoms';
import { SimpleLineIcons } from 'components/Icons';

// local components
import Box from './components/Box';

// lib
import FastImage from 'react-native-fast-image';

// recoil
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  languageState,
  userInfoState,
  termOfUseState
} from 'recoil-state';

// services
import { checkPrivilegeUser } from 'services/api';

export default function Portal({ navigation, route }) {
  const [terms, setTerms] = useRecoilState(termOfUseState);
  useRecoilValue(languageState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [selected, setSelected] = React.useState(null);

  const onPress = async () => {
    const role = selected === 0 ? 'committee' : 'member';

    if (selected === 0) {
      setSpinner(true);
      console.log('role1',role);
      await checkPrivilegeUser({ role })
        .then(response => {
          const code = String(response?.code);
          const status_member = response?.status_member;
          if (code === '00') {
            setSelected(null);
            navigation.navigate('PVDConnect');
          } else if (code === '02') {
            setUserInfo(value => ({ ...value, ...status_member, role }));
            navigation.reset({
              index: 0,
              routes: [{ name: 'CommitteeRoute' }],
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      setSpinner(true);
      console.log('role2',role);
      await checkPrivilegeUser({ role })
        .then(response => {
          const code = String(response?.code);
          const status_member = response?.status_member;

          if (code === '00') {
            setSelected(null);
            navigation.navigate('PVDConnect');
          } else if (code === '02') {
            setUserInfo(value => ({ ...value, ...status_member, role }));
            if (!terms?.ChangFundTermsOfService) {
              // const { ChangFundTermsOfService, ...others } = terms;
              // setTerms({ ChangFundTermsOfService: false, ...others });
              navigation.navigate('ChangeFund');
            } else {
              navigation.reset({
                index: 0,
                routes: [{ name: 'MemberRoute' }],
              });
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  return (
    <SafeAreaView style={styles.flex}>
      <FocusAwareStatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.WHITE}
      />
      <Header navigation={navigation} />
      <View style={styles.logoContainer}>
        <FastImage
          source={require('../../../assets/images/logo.png')}
          style={globalStyle.logo}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <View style={styles.body}>
        <Container>
          <TextBold style={styles.title}>
            {Translate('textChoosePrivilege')}
          </TextBold>

          <FlatList
            data={[
              {
                id: 0,
                title: Translate('textForFundCommittee'),
                icon: (
                  <FastImage
                    resizeMode={FastImage.resizeMode.contain}
                    style={{
                      width: ViewScale(22),
                      height: ViewScale(22),
                    }}
                    source={require('assets/images/Tabbar/DuoUsers.png')}
                  />
                ),
              },
              {
                id: 1,
                title: Translate('textForFundMember'),
                icon: (
                  <SimpleLineIcons
                    name="user"
                    color={COLORS.WHITE}
                    size={FontScale(20)}
                  />
                ),
              },
            ]}
            scrollEnabled={false}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => (
              <Box
                title={item.title}
                icon={item.icon}
                selected={selected === index ? true : false}
                onPress={() => {
                  setSelected(index);
                }}
              />
            )}
          />
        </Container>
      </View>
      <Container style={[styles.unflex, styles.footerContainer]}>
        <Button
          title={Translate('textNext')}
          type="fill"
          disabled={selected === null}
          animate
          onPress={onPress}
        />
      </Container>
    </SafeAreaView>
  );
}
