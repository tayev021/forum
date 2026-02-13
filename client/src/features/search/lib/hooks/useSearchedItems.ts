import type { Option } from '../../model/types/Options';
import { searchPosts, useSearchedPosts } from '../../../../entities/post';
import { searchAuthors, useSearchedAuthors } from '../../../../entities/author';
import { searchThreads, useSearchedThreads } from '../../../../entities/thread';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch';
import { useEffect } from 'react';

export function useSearchedItems(option: Option, query: string) {
  const posts = useSearchedPosts();
  const authors = useSearchedAuthors();
  const threads = useSearchedThreads();
  const dispatch = useAppDispatch();

  const options: Record<Option, any> = {
    posts: {
      searchedItems: posts.searchedPosts,
      isLoading: posts.isLoading,
    },
    authors: {
      searchedItems: authors.searchedAuthors,
      isLoading: authors.isLoading,
    },
    threads: {
      searchedItems: threads.searchedThreads,
      isLoading: threads.isLoading,
    },
  } as const;

  useEffect(() => {
    if (query.length <= 0 || !option) {
      return;
    } else if (option === 'posts') {
      dispatch(searchPosts({ query }));
    } else if (option === 'authors') {
      dispatch(searchAuthors({ query }));
    } else if (option === 'threads') {
      dispatch(searchThreads({ query }));
    }
  }, [option, query, dispatch]);

  if (!query) {
    return { searchedItems: [], isLoading: false };
  }

  const { searchedItems, isLoading } = options[option];

  return { searchedItems, isLoading };
}
