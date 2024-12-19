import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {ViewScale} from 'utils';
import {TextMedium, TextLight} from 'components/atoms';
import {SimpleLineIcons} from 'components/Icons';
import {COLORS, FONT_SIZE} from 'styles';

export default ({
  image,
  icon,
  title,
  content,
  date = '',
  onPress,
  color = 'black',
}) => {
  icon = React.cloneElement(icon, {
    style: {width: ViewScale(15), height: ViewScale(15)},
  });
  image = React.cloneElement(image, {
    style: {
      borderRadius: ViewScale(4),
      width: ViewScale(100),
      height: ViewScale(100),
    },
  });
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.image}>{image}</View>
      <View style={styles.content}>
        <View style={styles.header}>
          {icon}
          <TextMedium style={[styles.headerText, {color}]}>{title}</TextMedium>
        </View>
        <View style={styles.wrapText}>
          <TextLight style={styles.descText}>{content}</TextLight>
        </View>
        <View style={styles.date}>
          <View style={styles.dateContainer}>
            <SimpleLineIcons name="clock" />
            <TextLight style={styles.dateText}>{date}</TextLight>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    borderRadius: ViewScale(4),
    paddingHorizontal: ViewScale(17),
    paddingTop: ViewScale(15),
    paddingBottom: ViewScale(20),
    marginBottom: ViewScale(10),
    flexDirection: 'row',
  },
  image: {
    width: ViewScale(100),
    height: ViewScale(100),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: FONT_SIZE.BODY_1,
    marginLeft: ViewScale(5),
  },
  content: {
    flex: 1,
    marginLeft: ViewScale(15),
  },
  wrapText: {flexDirection: 'row'},
  descText: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: FONT_SIZE.BODY_3,
  },
  dateText: {
    fontSize: FONT_SIZE.BODY_3,
    marginLeft: ViewScale(5),
  },
  date: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: ViewScale(15),
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
