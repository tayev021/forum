import styled from 'styled-components';
import { PrimaryButton } from '../../../shared/ui/PrimaryButton';
import {
  clearCategoryError,
  getCategories,
  useCategories,
} from '../../../entities/category';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Widget } from '../../../shared/ui/WidgetKit';
import { NoCategories } from './NoCategories';
import { Category } from './category/Category';
import { Modal } from '../../../shared/ui/Modal';
import { useRestrictTo } from '../../../entities/user';
import { CreateCategoryForm } from '../../../features/createCategory';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const CreateButton = styled(PrimaryButton)`
  align-self: flex-end;
`;

export function CategoriesWidget() {
  const { categories, isLoading, error: serverError } = useCategories();
  const hasPermissions = useRestrictTo(['admin', 'moderator']);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (serverError?.type === 'general') {
      toast.error(serverError.message);
      dispatch(clearCategoryError());
    }
  }, [serverError]);

  return (
    <Container>
      {isLoading && <Widget.Loader position="top" />}
      {categories.length === 0 && <NoCategories />}
      {categories.map((category) => (
        <Category key={category.id} category={category} />
      ))}
      {hasPermissions && (
        <>
          <Modal.Open windowName="createCategory">
            <CreateButton>Create Category</CreateButton>
          </Modal.Open>
          <Modal.Window name="createCategory">
            <CreateCategoryForm />
          </Modal.Window>
        </>
      )}
    </Container>
  );
}
