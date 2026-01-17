import { updateThreadPost, type ThreadPost } from '../../../entities/thread';
import styled from 'styled-components';
import { HiHandThumbUp } from 'react-icons/hi2';
import { useUser } from '../../../entities/user';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import {
  clearPost,
  clearPostError,
  likePost,
  usePost,
} from '../../../entities/post';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

interface LikePostProps {
  post: ThreadPost;
}

interface LikeButtonProps {
  $isLikeable: boolean;
}

const LikeButton = styled.button<LikeButtonProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.2rem 0.8rem;
  border-radius: 2rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-primary);
  ${(props) =>
    props.$isLikeable ? 'cursor: pointer;' : 'cursor: not-allowed;'}

  &:hover {
    background-color: var(--color-grey-200);
  }

  svg {
    width: 1.8rem;
    height: 1.8rem;
  }
`;

export function LikePost({ post }: LikePostProps) {
  const { user } = useUser();
  const { post: serverPost, isLoading, error: serverError } = usePost();
  const dispatch = useAppDispatch();

  const isLikeable = !!user && !post.isLiked && post.authorId !== user.id;

  useEffect(() => {
    if (serverError?.type === 'general') {
      toast.error(serverError.message);
      dispatch(clearPostError());
    } else if (
      !serverError &&
      !isLoading &&
      serverPost &&
      post.id === serverPost.id
    ) {
      dispatch(
        updateThreadPost({
          postId: serverPost.id,
          post: {
            likes: serverPost.likes,
            isLiked: true,
          },
        }),
      );
      dispatch(clearPost());
    }
  }, [serverPost, isLoading, serverError]);

  function handleLike() {
    if (isLikeable) {
      dispatch(likePost({ postId: post.id }));
    }
  }

  return (
    <LikeButton $isLikeable={isLikeable} onClick={handleLike}>
      <HiHandThumbUp />
      {post.likes}
    </LikeButton>
  );
}
