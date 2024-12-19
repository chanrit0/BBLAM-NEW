import {Button, CheckBox, TextMedium, TextRegular} from 'components/atoms';
import {Container} from 'components/common';
import HomeHeaderOnly from 'components/header/HomeHeaderOnly';
import {Translate} from 'function';
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {COLORS, SPACING} from 'styles';
import {ViewScale} from 'utils';

export default ({
  title,
  content_title,
  content,
  onPress,
  onEndReachCheck = true,
  backIconCallback,
}) => {
  const [isAgree, setIsAgree] = React.useState(false);

  const _onPressAgree = () => {
    setIsAgree(!isAgree);
  };

  return (
    <>
      <HomeHeaderOnly
        title={title}
        isBackIcon
        backIconCallback={backIconCallback}
      />
      <Container>
        <View style={{flex: 1}}>
          <TextMedium
            color={COLORS.PRIMARY}
            style={{
              textAlign: 'center',
              marginTop: ViewScale(20),
              marginBottom: ViewScale(10),
            }}>
            {content_title}
          </TextMedium>
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: COLORS.SECONDARY,
              minHeight: '40%',
              marginBottom: ViewScale(20),
            }}>
            <FlatList
              onEndReachedThreshold={0}
              onEndReached={() => {
                return onEndReachCheck && setIsAgree(true);
              }}
              data={content}
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.contentContainerStyle}
              keyExtractor={(item, index) => 'RiskProfileTerms-' + index}
              renderItem={({item}) => {
                return (
                  <TextRegular style={{marginBottom: ViewScale(30), textAlign: 'justify'}}>
                    {item}
                  </TextRegular>
                );
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={_onPressAgree}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: ViewScale(20),
            flexDirection: 'row',
          }}>
          <CheckBox value={isAgree} />
          <TextRegular>{Translate('textAgreementCheck')}</TextRegular>
        </TouchableOpacity>
        <Button
          title={Translate('textConfirm2')}
          type="fill"
          disabled={!isAgree}
          onPress={onPress}
        />
      </Container>
      <View style={{marginBottom: SPACING.FOOTER_HEIGHT}} />
      <SafeAreaView />
    </>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingVertical: ViewScale(10),
    paddingHorizontal: ViewScale(10),
  },
});
