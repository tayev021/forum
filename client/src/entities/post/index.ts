import {
  clearPost,
  clearPostError,
  postReducer,
} from './model/slice/postSlice';
import { createPost } from './model/thunks/createPost';
import { updatePost } from './model/thunks/updatePost';
import { likePost } from './model/thunks/likePost';
import { deletePost } from './model/thunks/deletePost';
import { usePost } from './lib/hooks/usePost';
import { useLatestPosts } from './lib/hooks/useLatestPosts';
import type { Post } from './model/types/Post';

export {
  postReducer,
  clearPost,
  clearPostError,
  createPost,
  updatePost,
  likePost,
  deletePost,
  usePost,
  useLatestPosts,
  type Post,
};
