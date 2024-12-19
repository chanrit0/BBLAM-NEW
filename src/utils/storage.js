import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import {isJson} from 'utils';

/**
 * Secure Storage Data
 */

export async function StoreSecureData(data) {
  try {
    await EncryptedStorage.setItem(data.key, data.value);
    console.log('StoreSecureData : ', data.key);
  } catch (error) {
    console.log({error});
  }
}

export async function RetrieveSecureData(key) {
  try {
    const value = await EncryptedStorage.getItem(key);
    return new Promise(resolve => {
      if (value !== undefined) {
        resolve(isJson(value) ? JSON.parse(value) : value);
      } else {
        resolve(null);
      }
    });
  } catch (error) {
    console.log({error});
  }
}

export async function RemoveSecureData(key) {
  try {
    await EncryptedStorage.removeItem(key);
    console.log('CLEAR ALL SECURE DATA');
  } catch (error) {
    console.log({error});
  }
}

export const ClearSecureData = async () => {
  try {
    EncryptedStorage.clear();
    console.log('CLEAR ALL SECURE DATA');
  } catch (error) {
    console.log({error});
  }
};

/**
 * Async Storage Data
 */

export const ClearData = async () => {
  try {
    AsyncStorage.clear();
    console.log('CLEAR ALL DATA');
  } catch (error) {
    console.log({error});
  }
};

export const StoreData = async data => {
  try {
    console.log('StoreData : ', data.key);
    await AsyncStorage.setItem(data.key, data.value);
  } catch (error) {
    console.log({error});
  }
};

export const RemoveData = async key => {
  try {
    console.log(`RemoveData: ${key}`);
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log({error});
  }
};

export const RetrieveData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return new Promise(resolve => {
        return resolve(isJson(value) ? JSON.parse(value) : value);
      });
    }
  } catch ({error}) {
    console.log({error});
  }
};
