import type { Thread } from '../../../../shared/types/Thread';

export type PostThread = Pick<Thread, 'id' | 'title'> & { page: number };
