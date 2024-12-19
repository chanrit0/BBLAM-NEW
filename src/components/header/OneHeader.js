import {useNavigation} from '@react-navigation/native';
import {Ionicons} from 'components/Icons';
import {TextMedium} from 'components/atoms';
import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {COLORS, SPACING} from 'styles';
import {FontScale, ViewScale} from 'utils';

export default ({title = '', titlecenter = false, children}) => {
  const navigation = useNavigation();

  const goBack = () => {
    return navigation.goBack();
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.container}>
        <TouchableOpacity onPress={goBack} style={styles.backbutton}>
          <Ionicons
            name="arrow-back"
            size={FontScale(35)}
            color={COLORS.PRIMARY}
          />
        </TouchableOpacity>
        <View
          style={[
            styles.header_content,
            titlecenter && {paddingLeft: 0, alignItems: 'center'},
          ]}>
          <TextMedium color={COLORS.PRIMARY}>{title}</TextMedium>
        </View>
        <View style={styles.right_content}></View>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: COLORS.GRAY_1,
  },
  container: {
    minHeight: SPACING.HEADER_HEIGHT,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  backbutton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SPACING.HEADER_HEIGHT,
  },
  header_content: {
    paddingLeft: ViewScale(10),
    justifyContent: 'center',
    flex: 1,
  },
  title_container: {
    position: 'absolute',
    alignSelf: 'center',
  },
  right_content: {
    width: SPACING.HEADER_HEIGHT,
  },
});
