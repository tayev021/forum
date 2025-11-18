import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../../entities/user';
import { statisticReducer } from '../../entities/statistic';

export const store = configureStore({
  reducer: {
    user: userReducer,
    statistic: statisticReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
