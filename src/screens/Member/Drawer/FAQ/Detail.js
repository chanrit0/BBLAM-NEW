import {Container} from 'components/common';
import HomeHeaderOnly from 'components/header/HomeHeaderOnly';
import {TextMedium} from 'components/atoms';
import React from 'react';
import {View, ScrollView} from 'react-native';
import {ViewScale} from 'utils';
import {FONT_SIZE} from 'styles';

export default function Detail({route}) {
  const params = route.params;

  const renderContent = React.useCallback(() => {
    let contentShow = [];

    if (params.content !== undefined) {
      params.content.forEach((item, index) => {
        contentShow.push(
          <View
            key={'faqId-' + index}
            style={{
              marginVertical: ViewScale(15),
              paddingVertical: ViewScale(15),
              paddingHorizontal: ViewScale(10),
              backgroundColor: index % 2 ? 'rgba(0, 164, 153,0.2)' : '',
              alignItems: 'flex-start',
            }}>
            <TextMedium
              size={FONT_SIZE.BODY_2}
              color={'#00A499'}
              style={{marginBottom: ViewScale(20)}}>
              Q. {item.faq_question}
            </TextMedium>
            <TextMedium size={FONT_SIZE.BODY_2}>
              A. {item.faq_answer}
            </TextMedium>
          </View>,
        );
      });
    }

    return contentShow;
  }, []);

  return (
    <>
      <HomeHeaderOnly title={params.title} isBackIcon={true} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container style={{flex: 0}}>{renderContent()}</Container>
      </ScrollView>
    </>
  );
}
