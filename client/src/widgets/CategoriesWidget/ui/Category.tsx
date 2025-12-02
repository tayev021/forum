import styled from 'styled-components';
import type { Category } from '../../../entities/category/model/types/Category';
import { WidgetContainer } from '../../../shared/ui/widget-kit/WidgetContainer';
import { ForumLink } from './ForumLink';
import { NoForums } from './NoForums';
import { useRestrictTo } from '../../../entities/user';
import { Modal } from '../../../shared/ui/modal';
import {
  DeleteCategoryButton,
  DeleteCategoryForm,
} from '../../../features/deleteCategory';
import {
  CreateForumButton,
  CreateForumForm,
} from '../../../features/createForum';

interface CategoryProps {
  category: Category;
}

const Header = styled.div`
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

const Footer = styled.div`
  display: flex;
  justify-content: end;
  padding: 1rem 3rem;
  border-top: 1px solid var(--color-grey-400);

  &:empty {
    display: none;
  }
`;

export function Category({ category }: CategoryProps) {
  const hasAdminsPermissions = useRestrictTo(['admin']);
  const hasModeratePermissions = useRestrictTo(['admin', 'moderator']);

  return (
    <WidgetContainer>
      <Header>
        {category.title}
        {hasAdminsPermissions && category.forums.length === 0 && (
          <>
            <Modal.Open windowName={`deleteCategory-${category.id}`}>
              <DeleteCategoryButton />
            </Modal.Open>
            <Modal.Window name={`deleteCategory-${category.id}`}>
              <DeleteCategoryForm
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
      <Footer>
        {hasModeratePermissions && (
          <>
            <Modal.Open windowName={`createForumInCategory-${category.id}`}>
              <CreateForumButton />
            </Modal.Open>
            <Modal.Window name={`createForumInCategory-${category.id}`}>
              <CreateForumForm categoryId={category.id} />
            </Modal.Window>
          </>
        )}
      </Footer>
    </WidgetContainer>
  );
}
