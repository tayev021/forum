import type { Thread } from '../../../../shared/types/Thread';

export type ReportedPostThread = Pick<Thread, 'id' | 'title' | 'createdAt'>;
