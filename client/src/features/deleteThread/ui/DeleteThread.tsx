import { cloneElement, useEffect, type ReactElement } from 'react';
import {
  clearThreadError,
  deleteThread,
  useThread,
} from '../../../entities/thread';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import { useNavigate } from 'react-router';

interface DeleteThreadProps {
  forumId: number;
  threadId: number;
  closeModal?: () => void;
  children: ReactElement;
}

interface ChildElementProps {
  closeModal: () => void;
  confirm: () => void;
}

export function DeleteThread({
  forumId,
  threadId,
  closeModal = () => {},
  children,
}: DeleteThreadProps) {
  const { isLoading, error: serverError } = useThread();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (serverError?.type === 'general') {
      dispatch(clearThreadError());
      closeModal();
    }
  }, [serverError, isLoading]);

  function confirm() {
    dispatch(deleteThread({ threadId }));
    navigate(`/forums/${forumId}?page=1`);
  }

  return cloneElement(children as React.ReactElement<ChildElementProps>, {
    closeModal,
    confirm,
  });
}
