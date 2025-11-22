import styled from 'styled-components';
import type { Category } from '../../../entities/category/model/types/Category';
import { WidgetContainer } from '../../../shared/ui/WidgetContainer';
import { ForumLink } from './ForumLink';
import { NoForums } from './NoForums';
import { useRestrictTo } from '../../../entities/user';
import { Modal } from '../../../shared/ui/modal';
import {
  DeleteCategoryButton,
  DeleteCategory,
} from '../../../features/deleteCategory';

interface CategoryProps {
  category: Category;
}

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  padding: 1rem 3rem;
  border-bottom: 1px solid var(--color-grey-400);
  font-size: 2rem;
  font-weight: 600;
  line-height: 1;
  color: var(--color-primary);
`;

const ForumsList = styled.ul`
  padding: 1rem;
`;

export function Category({ category }: CategoryProps) {
  const hasPermission = useRestrictTo(['admin']);

  return (
    <WidgetContainer>
      <Header>
        {category.title}
        {hasPermission && (
          <>
            <Modal.Open windowName={`deleteCategory-${category.id}`}>
              <DeleteCategoryButton />
            </Modal.Open>
            <Modal.Window name={`deleteCategory-${category.id}`}>
              <DeleteCategory
                categoryId={category.id}
                categoryTitle={category.title}
              />
            </Modal.Window>
          </>
        )}
      </Header>
      <ForumsList>
        {category.forums.length === 0 && <NoForums />}
        {category.forums.map((forum) => (
          <ForumLink key={forum.id} forum={forum} />
        ))}
      </ForumsList>
    </WidgetContainer>
  );
}
