import React from 'react';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

type UseStateHook<T> = [T, (value: T) => void];

async function setStorageItemAsync(key: string, value: any) {
  if (Platform.OS === 'web') {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  } else {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  }
}

export function useStorageState<T>(key: string, defaultValue: T): UseStateHook<T> {
  const [state, setState] = React.useState<T>(defaultValue);

  // Get
  React.useEffect(() => {
    if (Platform.OS === 'web') {
      try {
        if (typeof localStorage !== 'undefined') {
          const item = localStorage.getItem(key);
          setState(item ? JSON.parse(item) : defaultValue);
        }
      } catch (e) {
        console.error('Local storage is unavailable:', e);
      }
    } else {
      SecureStore.getItemAsync(key).then(value => {
        setState(value ? JSON.parse(value) : defaultValue);
      });
    }
  }, [key]);

  // Set
  const setValue = React.useCallback(
    (value: T) => {
      setState(value);
      setStorageItemAsync(key, value);
    },
    [key]
  );

  return [state, setValue];
}
