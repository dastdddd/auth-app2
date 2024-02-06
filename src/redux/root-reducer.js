import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "../services/auth-api";
import { postApi } from "../services/post-api";
import authSlice from "./slices/authSlice";

// тут собираем всех slices и endpoints и отпавим store -> UI
export const rootReducer = combineReducers({
  auth: authSlice,
  [authApi.reducerPath]: authApi.reducer,
  [postApi.reducerPath]: postApi.reducer
})