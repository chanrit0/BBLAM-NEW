/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
// React
import React from 'react';
import {View, StyleSheet, Animated} from 'react-native';

// custom
import {Translate} from 'function';
import {ViewScale, FontScale} from 'utils';

// components
import {Container} from 'components/common';
import {TextPoints} from 'components/atoms';
import {TextRegular, TextLight, TextMedium} from 'components/atoms';
import {Ionicons} from 'components/Icons';

// lib
import {ListItem} from 'react-native-elements';
import {COLORS, FONT_SIZE, FONT_TYPE, SPACING} from 'styles';

export default function ListItemAccordion({
  name = '????',
  status = '????',
  payment = '????',
  resignDate = '????',
  payDate = '????',

  payMethod = '????',
  tax = '????',
  registerDate = '????',
}) {
  const ChevronView = Animated.createAnimatedComponent(View);
  const ChevronValue = React.useRef(new Animated.Value(0)).current;
  const ChevronAnimated = ChevronValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-180deg'],
  });
  const [expanded, setExpanded] = React.useState(false);

  Animated.timing(ChevronValue, {
    toValue: expanded ? 1 : 0,
    duration: 300,
    useNativeDriver: true,
  }).start();

  return (
    <ListItem.Accordion
      content={
        <View style={{flexDirection: 'row'}}>
          <Container
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginRight: 0,
            }}>
            {/* left */}
            <View style={{flex: 0.55}}>
              <View style={{flexDirection: 'row'}}>
                <TextMedium numberOfLines={1}>{name}</TextMedium>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    backgroundColor: '#eef2f6',
                    paddingHorizontal: ViewScale(20),
                    paddingVertical: ViewScale(2),
                    marginTop: ViewScale(5),
                  }}>
                  <TextLight size={FONT_SIZE.BODY_3}>
                    {'เหตุที่พ้นสภาพ - '}
                    {status}
                  </TextLight>
                </View>
              </View>
              <TextRegular
                size={FONT_SIZE.BODY_3}
                style={{marginTop: ViewScale(10)}}>
                {'วันที่สิ้นสุดสมาชิกภาพ'}{' '}
                <TextRegular color={'#666464'} size={FONT_SIZE.BODY_3}>
                  {resignDate}
                </TextRegular>
              </TextRegular>
            </View>
            {/* right */}
            <View style={{alignItems: 'flex-end', flex: 0.45}}>
              <TextLight size={FONT_SIZE.BODY_2}>{'เงินที่จ่าย'}</TextLight>
              <TextPoints
                number={payment}
                suffix={` ${Translate('textBaht')}`}
                style={{
                  fontFamily: FONT_TYPE.MEDIUM,
                  color: COLORS.PRIMARY,
                }}
              />
              <TextLight
                size={FONT_SIZE.BODY_3}
                style={{marginTop: ViewScale(5)}}>
                {'วันที่จ่ายเงิน'}{' '}
                <TextLight color={'#666464'} size={FONT_SIZE.BODY_3}>
                  {payDate}
                </TextLight>
              </TextLight>
            </View>
          </Container>
          <View style={{width: SPACING.CONTAINER_MARGIN_HORIZONTAL}}>
            <ChevronView
              style={{
                alignItems: 'center',
                transform: [
                  {
                    rotate: ChevronAnimated,
                  },
                ],
              }}>
              <Ionicons name="chevron-down-sharp" size={FontScale(20)} />
            </ChevronView>
          </View>
        </View>
      }
      noIcon
      isExpanded={expanded}
      containerStyle={{
        paddingHorizontal: 0,
        paddingVertical: ViewScale(15),
      }}
      rightIconContainerStyle={{marginRight: ViewScale(20)}}
      onPress={() => {
        setExpanded(!expanded);
      }}>
      {expanded && (
        <Container>
          <View style={{backgroundColor: '#eef2f6', padding: ViewScale(15)}}>
            <View style={styles.justaligncen}>
              <TextRegular size={FONT_SIZE.BODY_2}>
                {'วิธีการจ่าย'}
              </TextRegular>
              <TextRegular size={FONT_SIZE.BODY_2} color={COLORS.PRIMARY}>
                {payMethod}
              </TextRegular>
            </View>
            <View style={styles.justaligncen}>
              <TextRegular size={FONT_SIZE.BODY_2}>
                {'ภาษีหัก ณ ที่จ่าย'}
              </TextRegular>
              <TextRegular size={FONT_SIZE.BODY_2} color={COLORS.PRIMARY}>
                {tax}
              </TextRegular>
            </View>
            <View style={styles.justaligncen}>
              <TextRegular size={FONT_SIZE.BODY_2}>
                {'วันที่เป็นสมาชิกกองทุน'}
              </TextRegular>
              <TextRegular size={FONT_SIZE.BODY_2} color={COLORS.PRIMARY}>
                {registerDate}
              </TextRegular>
            </View>
          </View>
        </Container>
      )}
    </ListItem.Accordion>
  );
}

const styles = StyleSheet.create({
  justaligncen: {
    marginBottom: ViewScale(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
