/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Container} from 'components/common';
import styles from '../Style';
import {TextLight, TextBold} from 'components/atoms';
import {COLORS, FONT_SIZE} from 'styles';
import FastImage from 'react-native-fast-image';
import dayjs from 'dayjs';
import buddhistEra from 'dayjs/plugin/buddhistEra';

const NewsList = ({date, title, image, onPress}) => {
  dayjs.locale('th');
  dayjs.extend(buddhistEra);
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.lineHorizontal} />
        <Container>
          <View style={styles.newsContainer}>
            <FastImage
              style={styles.image}
              source={{
                uri: image,
                priority: FastImage.priority.normal,
              }}
            />
            <View style={styles.newsTextContainer}>
              <TextBold
                size={FONT_SIZE.BODY_3}
                color={COLORS.PRIMARY}
                numberOfLines={4}>
                {title}
              </TextBold>
            </View>
            <TextLight size={FONT_SIZE.BODY_3} style={styles.dateRight}>
              {dayjs(date).format('DD/MM/BBBB')}
            </TextLight>
          </View>
        </Container>
        <View style={styles.lineHorizontal} />
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(NewsList);
