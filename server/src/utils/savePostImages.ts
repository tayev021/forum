import { v4 as uuid } from 'uuid';
import sharp from 'sharp';
import { Attachment } from '../models';

export const savePostImages = async (
  postId: number,
  files: Express.Multer.File[]
) => {
  for (const file of files) {
    const imageFileName = `image-${uuid()}.jpeg`;
    const imagePath = `public/images/posts/${imageFileName}`;

    await sharp(file.buffer).toFile(imagePath);
    await Attachment.create({
      postId,
      type: 'image',
      fileName: imageFileName,
    });
  }
};
