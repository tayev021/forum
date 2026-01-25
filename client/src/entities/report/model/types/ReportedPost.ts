import type { Post } from '../../../../shared/types/Post';
import type { ReportedPostAuthor } from './ReportedPostAuthor';
import type { ReportedPostThread } from './ReportedPostThread';

export type ReportedPost = Pick<Post, 'id' | 'content' | 'createdAt'> & {
  author: ReportedPostAuthor;
  thread: ReportedPostThread;
};
