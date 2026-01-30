import { Attachment } from '../models';
import { removeFile } from './removeFile';

export async function deletePostImages(postId: number) {
  const attachments = await Attachment.findAll({ where: { postId } });

  if (!attachments) return;

  for (const attachment of attachments) {
    if (attachment.type === 'image') {
      removeFile(`public/images/posts/${attachment.fileName}`);
    }
  }
}
