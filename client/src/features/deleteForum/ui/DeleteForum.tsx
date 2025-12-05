import { cloneElement, useEffect, type ReactElement } from 'react';
import { useNavigate } from 'react-router';
import {
  clearForumError,
  deleteForum,
  useForum,
} from '../../../entities/forum';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';

interface DeleteForumProps {
  forumId: number;
  closeModal?: () => void;
  children: ReactElement;
}

interface ChildElementProps {
  closeModal: () => void;
  confirm: () => void;
}

export function DeleteForum({
  forumId,
  closeModal = () => {},
  children,
}: DeleteForumProps) {
  const { isLoading, error: serverError } = useForum();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (serverError?.type === 'general') {
      dispatch(clearForumError());
      closeModal();
    }
  }, [serverError, isLoading]);

  function confirm() {
    dispatch(deleteForum({ forumId }));
    navigate('/');
  }

  return cloneElement(children as React.ReactElement<ChildElementProps>, {
    closeModal,
    confirm,
  });
}
