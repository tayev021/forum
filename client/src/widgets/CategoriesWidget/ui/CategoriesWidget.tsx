import styled from 'styled-components';
import { useCategories } from '../../../entities/category';
import { WidgetLoader } from '../../../shared/ui/widget-kit/WidgetLoader';
import { NoCategories } from './NoCategories';
import { Category } from './Category';
import { Modal } from '../../../shared/ui/modal';
import { useRestrictTo } from '../../../entities/user';
import { AddCategoryForm } from '../../../features/addCategory';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const AddButton = styled.button`
  align-self: flex-end;
  padding: 1rem 2rem;
  border-radius: 0.4rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  background-color: var(--color-primary);
  box-shadow: var(--shadow-small);
  cursor: pointer;

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-medium);
  }

  &:active {
    transform: translateY(0);
    box-shadow: var(--shadow-small);
  }
`;

export function CategoriesWidget() {
  const { categories, isLoading } = useCategories();
  const hasPermissions = useRestrictTo(['admin', 'moderator']);

  return (
    <Container>
      {isLoading && <WidgetLoader position="top" />}
      {categories.length === 0 && <NoCategories />}
      {categories.map((category) => (
        <Category key={category.id} category={category} />
      ))}
      {hasPermissions && (
        <>
          <Modal.Open windowName="addCategory">
            <AddButton>Add Category</AddButton>
          </Modal.Open>
          <Modal.Window name="addCategory">
            <AddCategoryForm />
          </Modal.Window>
        </>
      )}
    </Container>
  );
}
