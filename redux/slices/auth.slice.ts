// reducers/auth.reducer.ts
import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { getProfile,handleLogin,handleLogout } from '../actions/auth.action';
import { Profile } from '@/types/auth';
interface AuthState {
  account: Profile | null;
  loggedIn: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  account: null,
  loggedIn: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    DELETE_SESSION_AUTH: (state, action: PayloadAction<number>) => {
      state.account = action.payload as any;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.account = action.payload;
        state.loggedIn = true;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || 'Unknown error';
        state.loggedIn = false;
      })
      .addCase(handleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.account = action.payload;
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || 'Login failed';
      })
      .addCase(handleLogout.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleLogout.fulfilled, (state) => {
        state.loading = false;
        state.account = null;
        state.loggedIn = false;
      })
      .addCase(handleLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || 'Logout failed';
      });
  },
});

export const authReducer = authSlice.reducer;
export const { DELETE_SESSION_AUTH } = authSlice.actions;
