import { cloneElement, useEffect, useState, type ReactElement } from 'react';
import {
  clearCategoryError,
  updateCategory,
  useCategory,
} from '../../../entities/category';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import toast from 'react-hot-toast';

interface UpdateCategoryTitleProps {
  categoryId: number;
  closeModal?: () => void;
  children: ReactElement;
}

interface ChildElementProps {
  submit: (title: string) => void;
}

export function UpdateCategoryTitle({
  categoryId,
  closeModal = () => {},
  children,
}: UpdateCategoryTitleProps) {
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const { isLoading, error: serverError } = useCategory();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (serverError?.type === 'general') {
      toast.error(serverError.message);
      dispatch(clearCategoryError());
      setIsUpdated(false);
    } else if (!serverError && !isLoading && isUpdated) {
      closeModal();
    }
  }, [serverError, isLoading]);

  function submit(title: string) {
    dispatch(updateCategory({ categoryId, title }));
    setIsUpdated(true);
  }

  return cloneElement(children as React.ReactElement<ChildElementProps>, {
    submit,
  });
}
