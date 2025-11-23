import { forumReducer } from './model/slice/forumSlice';
import { addForum } from './model/thunks/addForum';
import { useForm } from '../../shared/lib/hooks/useForm';
import { type ForumData } from './model/types/ForumData';

export { forumReducer, addForum, useForm, type ForumData };
