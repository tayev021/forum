import { cloneElement, useEffect, type ReactElement } from 'react';
import {
  clearForumError,
  updateForum,
  useForum,
} from '../../../entities/forum';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import toast from 'react-hot-toast';

interface UpdateForumTitleProps {
  forumId: number;
  closeModal?: () => void;
  children: ReactElement;
}

interface ChildElementProps {
  submit: (title: string) => void;
}

export function UpdateForumTitle({
  forumId,
  closeModal = () => {},
  children,
}: UpdateForumTitleProps) {
  const { isLoading, error: serverError } = useForum();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (serverError?.type === 'general') {
      toast.error(serverError.message);
      dispatch(clearForumError());
    }
  }, [serverError, isLoading]);

  function submit(title: string) {
    dispatch(updateForum({ forumId, title }));
    closeModal();
  }

  return cloneElement(children as React.ReactElement<ChildElementProps>, {
    submit,
  });
}
