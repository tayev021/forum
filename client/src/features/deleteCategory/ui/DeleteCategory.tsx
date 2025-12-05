import { cloneElement, useEffect, useState, type ReactElement } from 'react';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import {
  clearCategoryError,
  deleteCategory,
  useCategories,
} from '../../../entities/category';
import toast from 'react-hot-toast';

interface DeleteCategoryProps {
  categoryId: number;
  closeModal?: () => void;
  children: ReactElement;
}

interface ChildElementProps {
  closeModal: () => void;
  confirm: () => void;
}

export function DeleteCategory({
  categoryId,
  closeModal = () => {},
  children,
}: DeleteCategoryProps) {
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const { isLoading, error: serverError } = useCategories();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (serverError?.type === 'general') {
      toast.error(serverError.message);
      dispatch(clearCategoryError());
      setIsDeleted(false);
    } else if (!serverError && !isLoading && isDeleted) {
      closeModal();
    }
  }, [serverError, isLoading, isDeleted]);

  function confirm() {
    dispatch(deleteCategory({ categoryId }));
    setIsDeleted(true);
  }

  return cloneElement(children as React.ReactElement<ChildElementProps>, {
    closeModal,
    confirm,
  });
}
