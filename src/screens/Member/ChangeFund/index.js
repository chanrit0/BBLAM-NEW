import React from 'react';

import {useRecoilValue} from 'recoil';
import {languageState} from 'recoil-state';

import styles from './Style';

// recoil
import {setSpinner, ViewScale} from 'utils';
import {Translate} from 'function';
import {Container, RootScroll} from 'components/common';
import {View} from 'native-base';
import {Platform, ScrollView, TouchableOpacity} from 'react-native';
import {Button, CheckBox, TextRegular} from 'components/atoms';
import {callQuestionChangeFund} from 'services/api/member';
import ServerErrorPage from 'screens/Global/ServerErrorPage';
import {SPACING} from 'styles';

/**
 *
 * -- Index Order --
 *
 * ******* Main ********
 * 0 -> Agreement
 * 1 -> Main
 * 2 -> AutoBalance
 * 3 -> ChangeStrategy
 *
 */

export default function ChangeFund({navigation}) {
  const [isAgreement, setisAgreement] = React.useState(false);
  const [agreement, setAgreement] = React.useState([]);
  const [isServerError, setIsServerError] = React.useState(false);
  useRecoilValue(languageState);

  const handleOnPressAgreement = async () => {
    // navigation.replace('MainChangeFund');
    navigation.reset({
      index: 0,
      routes: [{name: 'MemberRoute'}],
    });
  };

  const _onPressCheckBox = () => {
    setisAgreement(!isAgreement);
  };

  const callapi = async () => {
    await callQuestionChangeFund()
      .then(response => {
        setAgreement(response.textChangeFundAgreementContent);
        setIsServerError(false);
      })
      .catch(error => {
        setIsServerError(true);
        console.log(error);
      });
  };

  const handleOnEndReached = () => {
    setisAgreement(true);
  };

  const handleOnRefreshServerError = () => {
    setSpinner(true);
    callapi().finally(() => setSpinner(false));
  };

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  React.useEffect(() => {
    callapi();
  }, []);

  return (
    <RootScroll
      title={Translate('textChangeFundTitle')}
      scrollEnabled={false}
      isBackIcon={true}
      flexContainer>
      {/* {agreement.length !== 0 ? ( */}
      <Container>
        <View style={{flex: 1}}>
          {/* header */}
          <View style={styles.texttitleContainer}>
            <TextRegular style={styles.texttitle}>
              {Translate('textChangeFundAgreementTitle')}
            </TextRegular>
          </View>
          {/* header */}
          <View style={styles.content}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              onScroll={({nativeEvent}) => {
                if (isCloseToBottom(nativeEvent)) {
                  handleOnEndReached();
                }
              }}
              scrollEventThrottle={400}>
              {agreement.map((item, index) => (
                <TextRegular
                  key={'ChangeFundAgreementId-' + index}
                  style={styles.text}>
                  {item}
                </TextRegular>
              ))}
            </ScrollView>
          </View>
          {/* Agreement */}
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              paddingHorizontal: ViewScale(20),
              marginTop: ViewScale(20),
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
            onPress={_onPressCheckBox}>
            <CheckBox value={isAgreement} />
            <TextRegular style={styles.textAgreement}>
              {Translate('textAgreementCheck')}
            </TextRegular>
          </TouchableOpacity>
          {/* Agreement */}
          <Button
            title={Translate('textConfirm')}
            type="fill"
            onPress={handleOnPressAgreement}
            disabled={isAgreement ? false : true}
            style={{
              marginTop: ViewScale(20),
              marginBottom: Platform.OS == 'ios' ? 0 : SPACING.FOOTER_HEIGHT,
            }}
          />
        </View>
      </Container>
      {/* ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator />
        </View>
      )} */}
      {isServerError && (
        <ServerErrorPage onPress={handleOnRefreshServerError} />
      )}
    </RootScroll>
  );
}
