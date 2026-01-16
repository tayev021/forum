import type { Post as BasePost } from '../../../../shared/types/Post';
import type { ThreadPostAuthor } from './ThreadPostAuthor';

export type ThreadPost = BasePost & { author: ThreadPostAuthor };
