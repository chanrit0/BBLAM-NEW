/* eslint-disable react-native/no-inline-styles */

// React
import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';

// custom
import styles from './Style';
import {Translate} from 'function';
import {COLORS, FONT_SIZE} from 'styles';
import {setSpinner, ViewScale} from 'utils';

// components
import {TextRegular, TextBold, TextMedium, TextLight, ActivityIndicator} from 'components/atoms';
import {Container, RootScroll, ScoreLevel} from 'components/common';

// lib
import {useNavigation} from '@react-navigation/native';

// recoil
import {useRecoilState, useRecoilValue} from 'recoil';
import {languageState, userInfoState} from 'recoil-state';

// services
import {getCustomerRiskProfile} from 'services/api/member';
import {RiskProfileGuideline} from 'components/organisms';
import ServerErrorPage from 'screens/Global/ServerErrorPage';

export default () => {
  useRecoilValue(languageState);
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [isServerError, setIsServerError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [apiData, setApiData] = React.useState({
    risk_profile_date: '',
    risk_profile_score: 0,
  });

  // function
  const handleRiskProfileOnPress = () => {
    navigation.navigate('RiskProfileTerms', {goBack: true});
  };

  const callApi = async () => {
    await getCustomerRiskProfile(userInfo.em_code)
      .then(response => {
        if (response.risk_verify === 'active') {
          setUserInfo(v => ({...v, risk_profile_status: true}));
        } else {
          setUserInfo(v => ({...v, risk_profile_status: false}));
        }

        if (
          response.risk_verify === 'active' ||
          response.risk_verify === 'expire'
        ) {
          setApiData({
            risk_profile_score: response?.data?.score,
            risk_profile_date: response?.data?.risk_update_date,
          });
        }
        setIsServerError(false);
      })
      .catch(error => {
        setIsServerError(true);
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };

  const handleOnRefreshServerError = () => {
    setSpinner(true);
    callApi().finally(() => setSpinner(false));
  };

  React.useEffect(() => {
    callApi();
  }, [userInfo.risk_profile_status]);

  return (
    <RootScroll
      onRefreshCallback={callApi}
      flexContainer
      title={Translate('textRiskProfileTitle')}>
      {!isLoading && !isServerError ? (
        <>
          <Container style={{flex: 0}}>
            <View style={styles.scoreEvalutaionContainer}>
              <TextMedium size={FONT_SIZE.TITLE_1}>
                {Translate('textRiskProfileScore')}
              </TextMedium>
              <TouchableOpacity
                onPress={handleRiskProfileOnPress}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextRegular size={FONT_SIZE.TITLE_1} color={COLORS.PRIMARY}>
                  {Translate('textRiskProfileDo')}
                </TextRegular>
                <Image
                  source={require('assets/icons/arrow-thin-right.png')}
                  resizeMode={'contain'}
                  style={styles.arrowright}
                />
              </TouchableOpacity>
            </View>

            {/* headerScore */}

            <View style={styles.scoreContainer}>
              <View style={{flex: 0.6}}>
                <ScoreLevel
                  title={Translate('textScoreLevelAcceptableRisk')}
                  textSize={FONT_SIZE.BODY_1}
                  isFull={true}
                  score={apiData?.risk_profile_score}
                />
              </View>
              <View style={styles.containerRight}>
                <TextMedium>{Translate('textScoreLevelYourScore')}</TextMedium>
                <TextBold color={COLORS.PRIMARY} size={FONT_SIZE.TITLE_3}>
                  {apiData?.risk_profile_score ?? 0}
                </TextBold>
                <TextLight  size={FONT_SIZE.BODY_4} style={{textAlign: 'center'}}>
                  {apiData?.risk_profile_date !== ''
                    ? `${Translate('textScoreLevelLastedDateEvaluate')} ${
                        apiData?.risk_profile_date
                      }`
                    : 'ยังไม่มีการประเมิน'}
                </TextLight>
              </View>
            </View>
          </Container>

          {/* header Guidline */}
          <View style={styles.headerGuideline}>
            <Container style={{flex: 0}}>
              <TextMedium size={FONT_SIZE.TITLE_1}>
                {Translate('textRiskProfileGuidelineInvestment')}
              </TextMedium>
            </Container>
          </View>
          <RiskProfileGuideline />
          <Container>
            <TextRegular
              size={FONT_SIZE.BODY_3}
              style={{marginTop: ViewScale(20)}}>
              {Translate('textRiskProfileRemark')}
            </TextRegular>
          </Container>
        </>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      )}
      {isServerError && (
        <ServerErrorPage onPress={handleOnRefreshServerError} />
      )}
    </RootScroll>
  );
};
