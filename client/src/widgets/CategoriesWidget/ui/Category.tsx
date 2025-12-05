import type { Category } from '../../../entities/category/model/types/Category';
import styled from 'styled-components';
import { useRestrictTo } from '../../../entities/user';
import { WidgetContainer } from '../../../shared/ui/widget-kit/WidgetContainer';
import { WidgetHeader } from '../../../shared/ui/widget-kit/WidgetHeader';
import { WidgetHeaderGroup } from '../../../shared/ui/widget-kit/WidgetHeaderGroup';
import { WidgetTitle } from '../../../shared/ui/widget-kit/WidgetTitle';
import { Modal } from '../../../shared/ui/modal';
import { WidgetDeleteButton } from '../../../shared/ui/widget-kit/WidgetDeleteButton';
import { WidgetConfirm } from '../../../shared/ui/widget-kit/WidgetConfirm';
import { DeleteCategory } from '../../../features/deleteCategory';
import { NoForums } from './NoForums';
import { ForumLink } from './ForumLink';
import { CreateForumForm } from '../../../features/createForum';
import { WidgetCreateButton } from '../../../shared/ui/widget-kit/WidgetCreateButton';

interface CategoryProps {
  category: Category;
}

const ForumsList = styled.ul`
  padding: 1rem;
`;

export function Category({ category }: CategoryProps) {
  const hasAdminsPermissions = useRestrictTo(['admin']);
  const hasModeratePermissions = useRestrictTo(['admin', 'moderator']);

  return (
    <WidgetContainer>
      <WidgetHeader>
        <WidgetHeaderGroup>
          <WidgetTitle>{category.title}</WidgetTitle>
        </WidgetHeaderGroup>
        <WidgetHeaderGroup>
          {hasModeratePermissions && (
            <>
              <Modal.Open windowName={`createForumInCategory-${category.id}`}>
                <WidgetCreateButton />
              </Modal.Open>
              <Modal.Window name={`createForumInCategory-${category.id}`}>
                <CreateForumForm categoryId={category.id} />
              </Modal.Window>
            </>
          )}
          {hasAdminsPermissions && category.forums.length === 0 && (
            <>
              <Modal.Open windowName={`deleteCategory-${category.id}`}>
                <WidgetDeleteButton />
              </Modal.Open>
              <Modal.Window name={`deleteCategory-${category.id}`}>
                <DeleteCategory categoryId={category.id}>
                  <WidgetConfirm title="Delete Category">
                    Are you sure you want to delete the "{category.title}"
                    category?
                  </WidgetConfirm>
                </DeleteCategory>
              </Modal.Window>
            </>
          )}
        </WidgetHeaderGroup>
      </WidgetHeader>
      <ForumsList>
        {category.forums.length === 0 && <NoForums />}
        {category.forums.map((forum) => (
          <ForumLink key={forum.id} forum={forum} />
        ))}
      </ForumsList>
    </WidgetContainer>
  );
}
