import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import APIGateway from '@/constants/APIGateway';
import { AxiosRequestConfig } from 'axios';
import { Profile } from '@/types/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginPayload {
  username: string;
  password: string;
}

interface ErrorPayload {
  error: string;
}

export const getProfile = createAsyncThunk<
  Profile,
  string,
  { rejectValue: ErrorPayload }
>(
  'auth/getProfile',
  async (accessToken: string, thunkAPI) => {
    try {
      const response = await axios.post(`${APIGateway.gateway}/getInfoMemberAPI`, {
        token: accessToken
      });
      console.log(response.data,accessToken)
      if (response.data.code !== 0) {
        throw new Error(response.data.mess || 'Auth failed');
      }
      return {
        code:response.data.code,
        info_member: response.data.data
      };
    } catch (error) {
      let errorMessage = 'Unknown error';
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data?.message || 'An error occurred';
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error('Error fetching profile:', errorMessage);
      return thunkAPI.rejectWithValue({ error: errorMessage });
    }
  }
);

export const handleLogin = createAsyncThunk<
  Profile,
  LoginPayload,
  { rejectValue: ErrorPayload }
>(
  'auth/useLogin',
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await axios.post(`${APIGateway.gateway}/checkLoginMemberAPI`, {
        phone: username,
        password: password,
        token_device: ''
      });

      if (response.data.code !== 0) {
        throw new Error(response.data.mess || 'Login failed');
      }
      await AsyncStorage.setItem(`tokens`, response.data.info_member?.token);
      return response.data;
    } catch (error) {
      let errorMessage = 'Unknown error';
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data?.mess || 'An error occurred';
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error('Error during login:', errorMessage);
      return thunkAPI.rejectWithValue({ error: errorMessage });
    }
  }
);

export const handleLogout = createAsyncThunk<
  void,
  { accessToken: string },
  { rejectValue: ErrorPayload } 
>(
  'auth/logout',
  async ({ accessToken }, thunkAPI) => {
    try {
      const token = await AsyncStorage.removeItem('tokens');
      const response = await axios.post(`${APIGateway.gateway}/checkLoginMemberAPI`, {
        token: token,
      });
      return response.data;
    } catch (error) {
      return;
    }
  }
);
