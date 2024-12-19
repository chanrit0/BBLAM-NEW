/* eslint-disable react-native/no-inline-styles */
// React
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

// custom
import {ViewScale, FontScale, filterInputNumberPoint} from 'utils';

// components
import {Slider, TextRegular, TextMedium} from 'components/atoms';
import {Ionicons, MaterialIcons} from 'components/Icons';

// lib
import {Input} from 'react-native-elements';
import {COLORS, FONT_SIZE, FONT_TYPE} from 'styles';
import {useNavigation} from '@react-navigation/native';

export default ({
  name = '????',
  ratio = 0,
  oldratio = 0,
  hideOldRatio = false,
  onPress,
  canClose = false,
  onValueChange,
  tooltip = null,
  value = 0,
  isHighlight = false,
  index,
}) => {
  const oldvalue = React.useRef('');
  const isFocused = React.useRef(false);
  const navigation = useNavigation();

  const filterInput = (value, oldvalue) => {
    let parseValue = parseFloat(value);

    if (parseValue >= 0 && parseValue <= ratio && parseValue !== '') {
      return parseValue.toFixed(2).toString();
    }

    return oldvalue;
  };

  const _onValueChange = data => {
    if (data <= 100) {
      onValueChange(data, index);
    }
  };

  const _onValueSliderChange = data => {
    onValueChange(data.toFixed(2), index);
  };

  const handleTooltip = () => {
    navigation.navigate('TooltipTable', {data: tooltip});
  };

  return (
    <View
      style={[
        {
          flexDirection: 'column',
          paddingVertical: ViewScale(15),
          borderBottomWidth: 0.5,
          borderColor: COLORS.BORDER,
        },
        isHighlight && {backgroundColor: 'rgba(255, 216, 20,0.5)'},
      ]}>
      {/* close button */}
      {canClose && (
        <TouchableOpacity
          onPress={onPress}
          style={{
            padding: ViewScale(8),
            position: 'absolute',
            right: 0,
            top: 0,
          }}>
          <Ionicons name="close-circle" size={FontScale(24)} />
        </TouchableOpacity>
      )}

      <TextMedium
        size={FONT_SIZE.TITLE_1}
        color={COLORS.PRIMARY}
        style={{alignSelf: 'center'}}>
        {name}
      </TextMedium>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: ViewScale(5),
          alignSelf: 'center',
        }}>
        <TextRegular size={FONT_SIZE.BODY_2}>
          {'สัดส่วนที่สามารถลงทุนได้'} {ratio}%
        </TextRegular>
        {tooltip !== null && (
          <TouchableOpacity
            style={{marginLeft: ViewScale(5)}}
            onPress={handleTooltip}>
            <MaterialIcons
              name="help-outline"
              color="#666666"
              size={FontScale(16)}
            />
          </TouchableOpacity>
        )}
      </View>
      <Slider
        style={{width: '80%', alignSelf: 'center'}}
        minimumValue={0}
        maximumValue={ratio}
        step={0.01}
        value={
          isFocused.current ? parseFloat(oldvalue.current) : parseFloat(value)
        }
        onValueChange={_onValueSliderChange}
      />

      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <View style={{flexDirection: 'column', alignItems: 'flex-end'}}>
          <TextRegular size={FONT_SIZE.BODY_2}>
            {'สัดส่วนการลงทุนที่เลือก'}
          </TextRegular>
          {!hideOldRatio && (
            <TextRegular size={FONT_SIZE.BODY_2} style={styles.grid2}>
              {'สัดส่วนการลงทุนเดิม'}
            </TextRegular>
          )}
        </View>

        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <Input
            // disabled
            // maxLength={5}
            containerStyle={{width: ViewScale(120)}}
            value={value.toString()}
            disabledInputStyle={{
              fontSize: FontScale(16),
              fontFamily: FONT_TYPE.REGULAR,
              textAlign: 'center',
              height: 20,
              opacity: 1,
              color: COLORS.PRIMARY,
            }}
            inputStyle={{
              fontSize: FontScale(16),
              fontFamily: FONT_TYPE.REGULAR,
              textAlign: 'center',
              height: 20,
              opacity: 1,
              color: COLORS.PRIMARY,
            }}
            onChangeText={_onValueChange}
            onFocus={e => {
              oldvalue.current = value;
              isFocused.current = true;
            }}
            onEndEditing={e => {
              _onValueChange(
                parseFloat(
                  filterInput(
                    filterInputNumberPoint(
                      e.nativeEvent.text,
                      oldvalue.current,
                    ),
                    oldvalue.current,
                  ),
                ),
              );
              isFocused.current = false;
            }}
            inputContainerStyle={{
              height: 20,
            }}
            errorStyle={{display: 'none'}}
          />
          {!hideOldRatio && (
            <TextRegular
              style={styles.grid2}
              color={COLORS.PRIMARY}
              size={FONT_SIZE.BODY_2}>
              {oldratio.toFixed(2) ?? 0}
            </TextRegular>
          )}
        </View>

        <View style={{flexDirection: 'column'}}>
          <TextRegular>%</TextRegular>
          {!hideOldRatio && <TextRegular style={styles.grid2}>%</TextRegular>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  grid2: {
    marginTop: ViewScale(10),
  },
});
