import {
  clearPost,
  clearPostError,
  postReducer,
} from './model/slice/postSlice';
import { createPost } from './model/thunks/createPost';
import { usePost } from './lib/hooks/usePost';
import { useLatestPosts } from './lib/hooks/useLatestPosts';
import { updatePost } from './model/thunks/updatePost';
import { likePost } from './model/thunks/likePost';
import type { Post } from './model/types/Post';

export {
  postReducer,
  clearPost,
  clearPostError,
  createPost,
  updatePost,
  usePost,
  useLatestPosts,
  likePost,
  type Post,
};
