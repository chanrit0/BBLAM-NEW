import React from 'react';
import {Controller} from 'react-hook-form';
import {View, TouchableOpacity} from 'react-native';
import {TextBold, TextRegular, CheckBox} from 'components/atoms';
import {Translate} from 'function';
import {ViewScale} from 'utils';
import {COLORS} from 'styles';

export default InputPrefixName = ({ControllerProps}) => {
  const [selected, setSelected] = React.useState(null);
  const prefixName = React.useState([
    'textPrefixMr',
    'textPrefixMiss',
    'textPrefixMrs',
  ])[0];

  return (
    <View style={{marginBottom: ViewScale(30)}}>
      <Controller
        {...ControllerProps}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TextBold color={COLORS.PRIMARY}>
              {Translate('textPrefixName')}
              <TextBold color={COLORS.ERROR}>*</TextBold>
            </TextBold>

            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}>
              {prefixName.map((item, index) => {
                return (
                  <View key={'PrefixNameId-' + index}>
                    <TouchableOpacity
                      onPress={() => {
                        setSelected(index);
                        onChange(Translate(prefixName[index]));
                      }}
                      style={{flexDirection: 'row', alignItems: 'center'}}>
                      <CheckBox isCustom onCheck={selected === index} />
                      <TextRegular
                        style={{
                          marginLeft: ViewScale(10),
                          color: error !== undefined ? COLORS.ERROR : '#000',
                        }}>
                        {Translate(item)}
                      </TextRegular>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
        )}
      />
    </View>
  );
};
