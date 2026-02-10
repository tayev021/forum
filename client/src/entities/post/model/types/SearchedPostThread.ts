import type { Thread } from '../../../../shared/types/Thread';

export type SearchedPostThread = Pick<Thread, 'id' | 'title'> & {
  page: number;
};
