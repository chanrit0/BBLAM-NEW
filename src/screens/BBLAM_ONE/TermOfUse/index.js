/* eslint-disable react-native/no-inline-styles */
// React
import React, {useState} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  InteractionManager,
  StatusBar,
} from 'react-native';

// custom
import styleTermOfUse from './Style';
import {Translate} from 'function';
import {ViewScale} from 'utils';
import {COLORS, SPACING} from 'styles';

// components
import {Container} from 'components/common';
import {
  Button,
  SafeAreaView,
  FocusAwareStatusBar,
  CheckBox,
  TextLight,
  TextBold,
} from 'components/atoms';
import Header from 'components/header/MainHeader';

// lib
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

// recoil
import {useRecoilState} from 'recoil';
import {termOfUseState} from 'recoil-state';

export default function ConditionUse({navigation, route}) {
  const [isAgreement, setAgreement] = useState(false);
  const [terms, setTerms] = useRecoilState(termOfUseState);
  const routeName = useState(route?.name)[0];

  const toggleAgreement = () => {
    let isCheck = isAgreement;
    setAgreement(!isCheck);
  };

  const _Route = async () => {
    if (routeName === 'TermOfUse') {
      InteractionManager.runAfterInteractions(() => {
        const {TermOfUse, ...others} = terms;
        setTerms({TermOfUse: true, ...others});
      });
    } else {
      navigation.navigate('Alert2', {
        TouchableBackdrop: true,
        onPressR: () => {
          navigation.navigate('PVDConnect');
        },
        onPressL: () => {
          navigation.reset({
            index: 0,
            routes: [{name: 'BBLAMONERoute'}],
          });
        },
      });
    }
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.WHITE} />
      {routeName != 'TermOfUse' && <Header navigation={navigation} />}
      <View
        style={{
          flexGrow: 1,
          marginTop: routeName === 'TermOfUse' ? ViewScale(20) : 0,
        }}>
        <TextBold style={styleTermOfUse.HeaderText}>
          {Translate(
            routeName === 'DisclosureOfPersonalInformation'
              ? 'textDisclosureOfPersonalInformation_title'
              : 'textTermOfUseTitle',
          )}
        </TextBold>
        <Container style={{marginHorizontal: wp(5)}}>
          <View style={styleTermOfUse.content}>
            <FlatList
              onEndReachedThreshold={0}
              onEndReached={() => {
                setAgreement(true);
              }}
              showsVerticalScrollIndicator={false}
              data={Translate(
                routeName === 'DisclosureOfPersonalInformation'
                  ? 'textDisclosureOfPersonalInformation'
                  : 'textTermOfUse',
              )}
              keyExtractor={(item, index) => 'id' + index}
              columnWrapperStyle={styleTermOfUse.columnWrapperStyle}
              renderItem={({item, index}) => {
                return (
                  <TextLight style={styleTermOfUse.text}>{item}</TextLight>
                );
              }}
            />
          </View>
        </Container>
        {/* Agreement */}
        <TouchableOpacity
          style={{
            marginVertical: ViewScale(15),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: ViewScale(15),
          }}
          onPress={() => {
            toggleAgreement(!isAgreement);
          }}>
          <CheckBox
            style={{
              marginRight: ViewScale(10),
              width: ViewScale(18),
              height: ViewScale(18),
            }}
            value={isAgreement}
          />
          <TextLight style={styleTermOfUse.textAgreement}>
            {Translate('textAgreementCheck')}
          </TextLight>
        </TouchableOpacity>
      </View>

      {/* button */}
      <Container style={{flex: 0, marginBottom: SPACING.FOOTER_HEIGHT}}>
        <Button
          title={Translate('textConfirm2')}
          type="fill"
          onPress={_Route}
          disabled={!isAgreement}
        />
      </Container>
    </SafeAreaView>
  );
}
