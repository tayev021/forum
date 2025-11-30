import { clearForumError, forumReducer } from './model/slice/forumSlice';
import { useForum } from './lib/hooks/useForum';
import { getForum } from './model/thunks/getForum';
import { addForum } from './model/thunks/addForum';
import { deleteForum } from './model/thunks/deleteForum';
import { type ForumData } from './model/types/ForumData';

export {
  forumReducer,
  useForum,
  clearForumError,
  getForum,
  addForum,
  deleteForum,
  type ForumData,
};
