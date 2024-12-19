import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from '../Style';
import {Container} from 'components/common';
import {CheckBox, Picker, TextRegular} from 'components/atoms';
import {FONT_SIZE} from 'styles';
import {Translate} from 'function';
import FormChange from 'screens/Board/Drawer/ChangeAccumulate/components/FormChange';
import {isTablet, ViewScale} from 'utils';

export default ({
  control,
  onChangeType,
  valueType,
  reset,
  unregister,
  setValue,
  resetField,
  getValues,
}) => {
  const handleOnPressType = () => {
    onChangeType(3);
  };

  return (
    <View style={styles.chexBoxGroupContainer}>
      <Container>
        {/* title */}
        <TouchableOpacity
          onPress={handleOnPressType}
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
          }}>
          <View style={{padding: ViewScale(3)}}>
            <CheckBox
              boxType={'circle'}
              disabled
              onCheck={valueType === 3}
              isCustom
            />
          </View>
          <TextRegular size={FONT_SIZE.BODY_3} style={styles.shiftCheckbox}>
            {Translate('textChooseCumulativePayoutRate_3').replace(
              /ตำแหน่งงาน/,
              match => (!isTablet ? `\n${match}` : ''),
            )}
          </TextRegular>
        </TouchableOpacity>
        {/* pickerForm */}

        <FormChange
          unregister={unregister}
          control={control}
          handleOnPressType={handleOnPressType}
          reset={reset}
          setValue={setValue}
          resetField={resetField}
          getValues={getValues}
        />
      </Container>
    </View>
  );
};
