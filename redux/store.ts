import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { appMiddleware } from "@/redux/middlewares/app.middleware";
import { createBlacklistFilter, createFilter } from "redux-persist-transform-filter";
import {authReducer} from "@/redux/slices/auth.slice";

const reducers = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer<ReturnType<typeof reducers>>({
  key: "root",
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['auth'],
  
}, reducers);

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    })
});

export const persistor = (store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
