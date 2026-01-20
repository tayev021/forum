import { cloneElement, useEffect, useState, type ReactElement } from 'react';
import { clearPostError, deletePost, usePost } from '../../../entities/post';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import { getThread, useThread } from '../../../entities/thread';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

interface DeletePostProps {
  postId: number;
  closeModal?: () => void;
  children: ReactElement;
}

interface ChildElementProps {
  closeModal: () => void;
  confirm: () => void;
}

export function DeletePost({
  postId,
  closeModal = () => {},
  children,
}: DeletePostProps) {
  const [isDeleted, setIsDeleted] = useState(false);
  const { isLoading, error: serverError } = usePost();
  const dispatch = useAppDispatch();
  const { thread } = useThread();
  const navigate = useNavigate();

  useEffect(() => {
    if (serverError?.type === 'general') {
      toast.error(serverError.message);
      dispatch(clearPostError());
      setIsDeleted(false);
    } else if (!serverError && !isLoading && isDeleted) {
      closeModal();

      if (thread?.posts && thread.posts.length <= 1 && thread.page === 1) {
        navigate(`/forums/${thread.forumId}`);
      } else if (thread?.posts && thread.posts.length <= 1) {
        navigate(`/threads/${thread.id}?page=${thread.page - 1}`);
      } else if (thread?.posts && thread.posts.length > 1) {
        dispatch(getThread({ threadId: thread.id, page: thread.page }));
      }
    }
  }, [serverError, isLoading, isDeleted]);

  function confirm() {
    dispatch(deletePost({ postId }));
    setIsDeleted(true);
  }

  return cloneElement(children as React.ReactElement<ChildElementProps>, {
    closeModal,
    confirm,
  });
}
