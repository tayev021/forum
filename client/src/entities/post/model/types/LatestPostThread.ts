import type { Thread } from '../../../../shared/types/Thread';

export type LatestPostThread = Pick<Thread, 'id' | 'title'> & {
  page: number;
};
