import { clearUserError, deleteAccount, useUser } from '../../../entities/user';
import { cloneElement, useEffect, useState, type ReactElement } from 'react';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import toast from 'react-hot-toast';

interface DeleteAccountFormProps {
  closeModal?: () => void;
  children: ReactElement;
}

interface ChildElementProps {
  closeModal: () => void;
  confirm: () => void;
}

export function DeleteAccount({
  closeModal = () => {},
  children,
}: DeleteAccountFormProps) {
  const [isDeleted, setIsDeleted] = useState(false);
  const { isLoading, error: serverError } = useUser();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (serverError?.type === 'general') {
      toast.error(serverError.message);
      dispatch(clearUserError());
      setIsDeleted(false);
    } else if (!serverError && !isLoading && isDeleted) {
      closeModal();
    }
  }, [serverError, isLoading, isDeleted]);

  function confirm() {
    dispatch(deleteAccount());
    setIsDeleted(true);
  }

  return cloneElement(children as React.ReactElement<ChildElementProps>, {
    closeModal,
    confirm,
  });
}
