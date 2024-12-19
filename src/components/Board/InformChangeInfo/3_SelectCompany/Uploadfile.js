/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
// React
import React from 'react';
import {TouchableOpacity} from 'react-native';

// custom
import {ViewScale} from 'utils';

// components
import {Container} from 'components/common';
import {TextRegular} from 'components/atoms';
import {Upload} from 'components/Icons/Customs';
import {COLORS} from 'styles';

import DocumentPicker from 'react-native-document-picker';
import _ from 'lodash';

export default function Uploadfile({
  noContainer = false,
  onPress,
  title = 'กรุณาแนบสำเนาหนังสือรับรองจากกระทรวงพาณิชย์\nยังไม่ต้องลงนามรับรองสำเนาถูกต้อง',
  error,
}) {
  const [file, setFile] = React.useState(null);

  const handleOnPress = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setFile(res);
      return onPress(res[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
        console.log(err);
      } else {
        throw err;
      }
    }
  };

  return (
    <Container
      style={[
        {flex: 0, marginTop: ViewScale(20)},
        noContainer && {marginHorizontal: 0},
      ]}>
      <TouchableOpacity
        onPress={handleOnPress}
        style={{
          borderColor: error ? COLORS.ERROR : COLORS.BORDER,
          borderWidth: 2,
          borderStyle: 'dashed',
          width: '100%',
          height: ViewScale(150),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {_.isEmpty(file) ? (
          <>
            <Upload />
            <TextRegular
              style={{textAlign: 'center', marginTop: ViewScale(10)}}
              color={'#4c637b'}>
              {title}
            </TextRegular>
          </>
        ) : (
          <TextRegular>{file[0]?.name}</TextRegular>
        )}
      </TouchableOpacity>
    </Container>
  );
}
