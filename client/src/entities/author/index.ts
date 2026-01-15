import { authorReducer, clearAuthorError } from './model/slice/authorSlice';
import { getAuthor } from './model/thunks/getAuthor';
import { useAuthor } from './lib/hooks/useAuthor';
import type { Author } from './model/types/Author';

export { authorReducer, clearAuthorError, getAuthor, useAuthor, type Author };
