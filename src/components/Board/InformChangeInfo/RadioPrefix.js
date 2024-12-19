/* eslint-disable react-native/no-inline-styles */
// Raect
import React from 'react';
import {View, TouchableOpacity, TextInput, StyleSheet} from 'react-native';

// custom
import {isIOS, ViewScale} from 'utils';
// components
import {CheckBox} from 'components/atoms';
import {TextRegular} from 'components/atoms';
import {COLORS, FONT_SIZE, FONT_TYPE} from 'styles';

export default function RadioPrefix({key, onPress, etcActive = false, error}) {
  const radioBtnData = ['นาย', 'นาง', 'นางสาว', 'อื่น ๆ'];
  const [prefix, setPrefix] = React.useState('');

  const [radio, setRadio] = React.useState(99);

  const _onPress = index => () => {
    setRadio(index);
    onPress(index === 3 && etcActive ? prefix : radioBtnData[index]);
  };

  const renderRadio = React.useCallback(() => {
    return (
      <>
        <View style={{flexDirection: 'row', flex: 1}}>
          {radioBtnData.map((item, index) => (
            <TouchableOpacity
              key={'radioPrefixId-' + index}
              style={{
                marginLeft:
                  index > 0 ? (isIOS ? ViewScale(10) : ViewScale(5)) : 0,
                flexDirection: 'row',
                alignItems: 'center',
                flex: index === 3 ? 1 : 0,
              }}
              onPress={_onPress(index)}>
              <CheckBox
                isCustom
                style={[
                  error && {borderColor: COLORS.ERROR},
                  !isIOS && {marginRight: ViewScale(5)},
                ]}
                onCheck={radio === index}
              />
              {radio === 3 && index === 3 && etcActive ? (
                <View style={{flex: 1}}>
                  <TextInput
                    value={prefix}
                    onChangeText={setPrefix}
                    placeholder={'โปรดระบุ'}
                    style={{
                      flex: 1,
                      fontSize: ViewScale(15),
                      fontFamily: FONT_TYPE.REGULAR,
                      borderColor: COLORS.BORDER,
                      borderBottomWidth: 1,
                    }}
                  />
                </View>
              ) : (
                <TextRegular
                  size={FONT_SIZE.BODY_3}
                  style={error && styles.error}>
                  {item}
                </TextRegular>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </>
    );
  }, [error, radio, prefix]);

  return (
    <View key={key} style={{flex: 1}}>
      {renderRadio()}
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    color: COLORS.ERROR,
  },
});
