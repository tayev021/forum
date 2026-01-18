import { updateThreadPost, type ThreadPost } from '../../../entities/thread';
import styled, { css, keyframes } from 'styled-components';
import { HiHandThumbUp } from 'react-icons/hi2';
import { useUser } from '../../../entities/user';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import {
  clearPost,
  clearPostError,
  likePost,
  usePost,
} from '../../../entities/post';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface LikePostProps {
  post: ThreadPost;
}

interface LikeButtonProps {
  $isLikeable: boolean;
  $isAnimated: boolean;
}

const topBubbles = keyframes`
  50% {
    background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%,
      50% 50%, 65% 20%, 90% 30%;
  }
  100% {
    background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%,
      50% 40%, 65% 10%, 90% 20%;
    background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
  }
`;

const bottomBubbles = keyframes`
  50% {
    background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%,
      105% 0%;
  }
  100% {
    background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%,
      110% 10%;
    background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
  }
`;

const topAnimation = css`
  top: -120%;
  background-image:
    radial-gradient(circle, #059669 20%, transparent 20%),
    radial-gradient(circle, transparent 20%, #059669 20%, transparent 30%),
    radial-gradient(circle, #059669 20%, transparent 20%),
    radial-gradient(circle, #059669 20%, transparent 20%),
    radial-gradient(circle, transparent 10%, #059669 15%, transparent 20%),
    radial-gradient(circle, #059669 20%, transparent 20%),
    radial-gradient(circle, #059669 20%, transparent 20%),
    radial-gradient(circle, #059669 20%, transparent 20%),
    radial-gradient(circle, #059669 20%, transparent 20%);
  background-size:
    10% 10%,
    20% 20%,
    15% 15%,
    20% 20%,
    18% 18%,
    10% 10%,
    15% 15%,
    10% 10%,
    18% 18%;
  background-position:
    5% 90%,
    10% 90%,
    10% 90%,
    15% 90%,
    25% 90%,
    25% 90%,
    40% 90%,
    55% 90%,
    70% 90%;
  animation: ${topBubbles} ease-in-out 0.6s infinite;
`;

const bottomAnimation = css`
  top: 70%;
  background-image:
    radial-gradient(circle, #059669 20%, transparent 20%),
    radial-gradient(circle, #059669 20%, transparent 20%),
    radial-gradient(circle, transparent 10%, #059669 15%, transparent 20%),
    radial-gradient(circle, #059669 20%, transparent 20%),
    radial-gradient(circle, #059669 20%, transparent 20%),
    radial-gradient(circle, #059669 20%, transparent 20%),
    radial-gradient(circle, #059669 20%, transparent 20%);
  background-size:
    15% 15%,
    20% 20%,
    18% 18%,
    20% 20%,
    15% 15%,
    20% 20%,
    18% 18%;
  background-position:
    10% -10%,
    30% 10%,
    55% -10%,
    70% -10%,
    85% -10%,
    70% -10%,
    70% 0%;
  animation: ${bottomBubbles} ease-in-out 0.6s infinite;
`;

const LikeButton = styled.button<LikeButtonProps>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.2rem 0.8rem;
  border-radius: 2rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-primary);
  transition: all 0.2s ease;
  ${(props) => (props.$isLikeable ? 'cursor: pointer;' : 'cursor: auto;')}

  &:hover {
    ${(props) =>
      props.$isLikeable ? 'background-color: var(--color-grey-200);' : ''}
  }

  &:active {
    transform: scale(0.96);
  }

  svg {
    width: 1.8rem;
    height: 1.8rem;
  }

  &::before,
  &::after {
    content: '';
    width: 150%;
    height: 150%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    background-repeat: no-repeat;
  }

  &::before {
    ${(props) => (props.$isAnimated ? topAnimation : '')}
  }

  &::after {
    ${(props) => (props.$isAnimated ? bottomAnimation : '')}
  }
`;

export function LikePost({ post }: LikePostProps) {
  const [isAnimated, setIsAnimated] = useState(false);
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
      setIsAnimated(true);
      setTimeout(() => setIsAnimated(false), 600);
    }
  }

  return (
    <LikeButton
      $isLikeable={isLikeable}
      $isAnimated={isAnimated}
      onClick={handleLike}
    >
      <HiHandThumbUp />
      {post.likes}
    </LikeButton>
  );
}
