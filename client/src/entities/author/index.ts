import { authorReducer, clearAuthorError } from './model/slice/authorSlice';
import { getAuthor } from './model/thunks/getAuthor';
import { searchAuthors } from './model/thunks/searchAuthors';
import { useAuthor } from './lib/hooks/useAuthor';
import { useSearchedAuthors } from './lib/hooks/useSearchedAuthors';
import type { Author } from './model/types/Author';
import type { SearchedAuthor } from './model/types/SearchedAuthor';

export {
  authorReducer,
  clearAuthorError,
  getAuthor,
  searchAuthors,
  useAuthor,
  useSearchedAuthors,
  type Author,
  type SearchedAuthor,
};
