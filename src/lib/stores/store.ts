import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './ui-slice';
import alertReducer from './alert.slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      ui: uiReducer,
      alert: alertReducer
    }
  });
};

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
