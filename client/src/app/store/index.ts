import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../../entities/user';
import { postReducer } from '../../entities/post';
import { threadReducer } from '../../entities/thread';
import { forumReducer } from '../../entities/forum';
import { categoryReducer } from '../../entities/category';
import { statisticReducer } from '../../entities/statistic';

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    thread: threadReducer,
    forum: forumReducer,
    category: categoryReducer,
    statistic: statisticReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
