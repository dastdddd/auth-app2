import { configureStore } from '@reduxjs/toolkit'
import { api } from '../services/settings';
import { rootReducer } from './root-reducer';

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV === 'development',
    //development - консолго чыгарбай корсо болот
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware().concat(api.middleware),
      //озу жазылат
  })
}