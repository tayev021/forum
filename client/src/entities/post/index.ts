import { clearPostError, postReducer } from './model/slice/postSlice';
import { createPost } from './model/thunks/createPost';
import { usePost } from './lib/hooks/usePost';
import { useAuthorPosts } from './lib/hooks/useAuthorPosts';
import { useLatestPosts } from './lib/hooks/useLatestPosts';
import { updatePost } from './model/thunks/updatePost';
import { getAuthorPosts } from './model/thunks/getAuthorPosts';
import { type Post } from './model/types/Post';

export {
  postReducer,
  clearPostError,
  createPost,
  updatePost,
  usePost,
  useAuthorPosts,
  useLatestPosts,
  getAuthorPosts,
  type Post,
};
