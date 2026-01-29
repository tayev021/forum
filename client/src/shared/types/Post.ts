import type { Attachment } from './Attachment';

export interface Post {
  id: number;
  threadId: number;
  content: string;
  authorId: number | null;
  attachments: Attachment[];
  likes: number;
  isLiked: boolean;
  isReported: boolean;
  createdAt: string;
  updatedAt: string;
}
