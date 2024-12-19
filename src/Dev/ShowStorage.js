import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {View, Text} from 'react-native';

export default function ShowAsync() {
  const [storage, setStorage] = React.useState([]);

  React.useEffect(() => {
    const call = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        setStorage(keys);
      } catch (error) {
        console.log(error);
      }
    };

    call();
  }, []);

  return (
    <View>
      {storage.map(item => (
        <Text>{item}</Text>
      ))}
    </View>
  );
}
