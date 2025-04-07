import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getTokenFromStorage = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem("accessToken");
    return token;
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Nếu có token:
apiClient.interceptors.request.use(async (config) => {
  const token = await getTokenFromStorage();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
