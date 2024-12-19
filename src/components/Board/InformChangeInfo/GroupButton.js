/* eslint-disable react-native/no-inline-styles */
// React
import React from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

// custom
import {ViewScale} from 'utils';

// components
import {TextRegular} from 'components/atoms';
import {COLORS, FONT_SIZE, SPACING} from 'styles';

export default function GroupButton({
  items,
  itemsSend,
  onSelectedIndex,
  containerStyle,
  buttonStyle,
}) {
  const [selected, setSelected] = React.useState(0);

  const _setOnPress = index => {
    setSelected(index);
    onSelectedIndex(itemsSend[index]);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {items.map((item, index) => (
        <View key={'itemgroupbutton-' + index} style={buttonStyle}>
          <TouchableOpacity
            onPress={() => {
              _setOnPress(index);
            }}
            style={[
              styles.button,
              {
                backgroundColor:
                  selected === index ? COLORS.PRIMARY : COLORS.GRAY,
                marginRight: index === 0 ? ViewScale(10) : null,
              },
            ]}>
            <TextRegular
              size={FONT_SIZE.BODY_2}
              color={selected === index ? COLORS.WHITE : COLORS.BLACK}
              style={{textAlign: 'center'}}>
              {item}
            </TextRegular>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  button: {
    minWidth: ViewScale(100),
    height: SPACING.INPUT_HEIGHT,
    justifyContent: 'center',
    paddingVertical: ViewScale(10),
  },
});
