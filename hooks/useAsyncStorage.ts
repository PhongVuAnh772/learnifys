import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAsyncStorage = (key: string) => {
  const [data, setData] = useState<any>(null);
  const [loadingStorage, setLoadingStorage] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingStorage(true);
        const value = await AsyncStorage.getItem(key);
        if (value !== null && value !== "null") {
          setData(JSON.parse(value));
        } else {
          setData(null);
        }
      } catch (e: any) {
        setError(e);
      } finally {
        setLoadingStorage(false);
      }
    };

    fetchData();
  }, [key]);

  const saveData = async (value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      setData(value);
    } catch (e: any) {
      setError(e);
    }
  };

  const removeData = async () => {
    try {
      await AsyncStorage.removeItem(key);
      setData(null);
    } catch (e: any) {
      setError(e);
    }
  };

  return { data, saveData, removeData, loadingStorage, error };
};

export default useAsyncStorage;
