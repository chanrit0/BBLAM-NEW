// React
import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Container} from 'components/common';
import {ViewScale} from 'utils';
import {TextRegular, TextMedium} from 'components/atoms';
import {useRecoilValue} from 'recoil';
import {userInfoState} from 'recoil-state';
import {COLORS, FONT_SIZE} from 'styles';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default ({data = null}) => {
  const userInfo = useRecoilValue(userInfoState);

  if (data === null) {
    return <Loader />;
  } else {
    return (
      <LinearGradient
        colors={['#2E4E88', 'transparent']}
        locations={[0.04, 0.75]}
        useAngle={true}
        angle={90}
        style={styles.NameContainer}>
        <Container style={{flex: 0}}>
          <TextMedium style={[styles.text, styles.text1]}>
            {userInfo?.fullname ?? ''}
          </TextMedium>
          <TextRegular style={[styles.text, styles.text2]}>
            {userInfo.role === 'member' ? data?.fund_name : 'คณะกรรมการกองทุน'}
          </TextRegular>
          <TextRegular style={[styles.text, styles.text3]}>
            {data?.company ?? ''}
          </TextRegular>
          {data?.isFundAll && !data?.isCompanyAll ? (
            <TextRegular style={[styles.text, styles.text2]}>
              {'กองทุนรวมทั้งหมด'}
            </TextRegular>
          ) : (
            <>
              {data?.fund_name &&
                userInfo.role === 'committee' &&
                !data?.isCompanyAll && (
                  <TextRegular style={[styles.text, styles.text2]}>
                    {data.fund_name}
                  </TextRegular>
                )}
            </>
          )}
        </Container>
      </LinearGradient>
    );
  }
};

const Loader = () => {
  return (
    <LinearGradient
      colors={['#2E4E88', 'transparent']}
      //   style={{height: height != null ? height : hp(35)}}
      locations={[0.04, 0.75]}
      useAngle={true}
      angle={90}
      style={styles.NameContainer}>
      <Container style={{flex: 0}}>
        <SkeletonPlaceholder
          highlightColor={COLORS.LOADER_FOREGROUND}
          backgroundColor={COLORS.LOADER_BACKGROUND}>
          <SkeletonPlaceholder.Item
            width={ViewScale(200)}
            height={ViewScale(20)}
            borderRadius={ViewScale(2)}
            marginTop={ViewScale(5)}
            marginBottom={ViewScale(10)}
          />
          <SkeletonPlaceholder.Item
            width={ViewScale(250)}
            height={ViewScale(20)}
            borderRadius={ViewScale(2)}
            marginBottom={ViewScale(10)}
          />
          <SkeletonPlaceholder.Item
            width={ViewScale(150)}
            height={ViewScale(20)}
            borderRadius={ViewScale(2)}
          />
        </SkeletonPlaceholder>
      </Container>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  NameContainer: {
    // marginTop: ViewScale(30),
    paddingVertical: ViewScale(15),
    justifyContent: 'center',
    minHeight: ViewScale(120),
    // marginBottom: ViewScale(30),
  },
  text: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZE.TITLE_1,
  },
  text2: {
    fontSize: FONT_SIZE.BODY_2,
  },
  text3: {
    fontSize: FONT_SIZE.BODY_1,
  },
});
