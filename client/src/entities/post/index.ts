import {
  clearPost,
  clearPostError,
  postReducer,
} from './model/slice/postSlice';
import { createPost } from './model/thunks/createPost';
import { usePost } from './lib/hooks/usePost';
import { useLatestPosts } from './lib/hooks/useLatestPosts';
import { updatePost } from './model/thunks/updatePost';

export {
  postReducer,
  clearPost,
  clearPostError,
  createPost,
  updatePost,
  usePost,
  useLatestPosts,
};
