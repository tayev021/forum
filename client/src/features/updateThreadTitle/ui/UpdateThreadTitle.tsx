import { cloneElement, useEffect, type ReactElement } from 'react';
import {
  clearThreadError,
  updateThread,
  useThread,
} from '../../../entities/thread';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import toast from 'react-hot-toast';

interface UpdateThreadTitleProps {
  threadId: number;
  closeModal?: () => void;
  children: ReactElement;
}

interface ChildElementProps {
  submit: (title: string) => void;
}

export function UpdateThreadTitle({
  threadId,
  closeModal = () => {},
  children,
}: UpdateThreadTitleProps) {
  const { isLoading, error: serverError } = useThread();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (serverError?.type === 'general') {
      toast.error(serverError.message);
      dispatch(clearThreadError());
    }
  }, [serverError, isLoading]);

  function submit(title: string) {
    dispatch(updateThread({ threadId, title }));
    closeModal();
  }

  return cloneElement(children as React.ReactElement<ChildElementProps>, {
    submit,
  });
}
