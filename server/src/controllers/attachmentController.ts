import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { Attachment, Post } from '../models';
import { AppError } from '../utils/AppError';
import { removeFile } from '../utils/removeFile';

export const deleteAttachment = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user!;
    const attachmentId = req.params.attachmentId;

    const attachment = await Attachment.findByPk(attachmentId);

    if (!attachment) {
      throw new AppError(400, 'Failed to delete attachment!', {
        type: 'general',
        message: 'You are trying to delete an attachment that does not exist',
      });
    }

    const post = await Post.findByPk(attachment.postId);

    if (post && post.authorId !== user.id) {
      throw new AppError(400, 'Failed to delete attachment!', {
        type: 'general',
        message:
          'You are not the author of the post in which you are trying to delete the attachment',
      });
    }

    removeFile(`public/images/posts/${attachment.fileName}`);
    await attachment.destroy();

    res.status(200).json({});
  }
);
