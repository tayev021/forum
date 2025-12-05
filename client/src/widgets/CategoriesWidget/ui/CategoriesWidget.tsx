import styled from 'styled-components';
import { PrimaryButton } from '../../../shared/ui/PrimaryButton';
import { useCategories } from '../../../entities/category';
import { WidgetLoader } from '../../../shared/ui/widget-kit/WidgetLoader';
import { NoCategories } from './NoCategories';
import { Category } from './Category';
import { Modal } from '../../../shared/ui/modal';
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
