import type { AttachmentType } from './AttachmentType';

export type Attachment = {
  id: number;
  type: AttachmentType;
  fileName: string;
  createdAt: string;
};
