import type { Post as BasePost } from '../../../../shared/types/Post';
import type { Thread } from '../../../thread';

export type Post = BasePost & {
  thread: Pick<Thread, 'id' | 'title'> & {
    page: number;
  };
};
