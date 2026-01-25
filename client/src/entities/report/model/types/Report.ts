import type { ReportedPost } from './ReportedPost';
import type { Reporter } from './Reporter';

export type Report = {
  id: number;
  reason: string;
  reporter: Reporter;
  post: ReportedPost;
  createdAt: string;
};
