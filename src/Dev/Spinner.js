import {Spinner as RNSpinner} from 'components/common';
import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';

export default function Spinner() {
  const [visible, setVisible] = React.useState(false);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <RNSpinner visible={visible} />

      <Button
        mode="contained"
        onPress={() => {
          setVisible(true);
          console.log(true);
        }}>
        Press me
      </Button>
    </View>
  );
}
