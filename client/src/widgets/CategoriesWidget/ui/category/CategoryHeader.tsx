import type { Category } from '../../../../entities/category';
import { useRestrictTo } from '../../../../entities/user';
import { WidgetHeader } from '../../../../shared/ui/widget-kit/WidgetHeader';
import { WidgetHeaderGroup } from '../../../../shared/ui/widget-kit/WidgetHeaderGroup';
import { WidgetTitle } from '../../../../shared/ui/widget-kit/WidgetTitle';
import { InlineModal } from '../../../../shared/ui/InlineModal';
import { UpdateCategoryTitle } from '../../../../features/updateCategoryTitle';
import { WidgetTitleInput } from '../../../../shared/ui/widget-kit/WidgetTitleInput';
import { WidgetEditButton } from '../../../../shared/ui/widget-kit/WidgetEditButton';
import { Modal } from '../../../../shared/ui/Modal';
import { WidgetCreateButton } from '../../../../shared/ui/widget-kit/WidgetCreateButton';
import { CreateForumForm } from '../../../../features/createForum';
import { WidgetDeleteButton } from '../../../../shared/ui/widget-kit/WidgetDeleteButton';
import { DeleteCategory } from '../../../../features/deleteCategory';
import { WidgetConfirm } from '../../../../shared/ui/widget-kit/WidgetConfirm';

interface CategoryHeaderProps {
  category: Category;
}

export function CategoryHeader({ category }: CategoryHeaderProps) {
  const hasAdminsPermissions = useRestrictTo(['admin']);
  const hasModeratePermissions = useRestrictTo(['admin', 'moderator']);

  return (
    <WidgetHeader>
      <WidgetHeaderGroup>
        <WidgetTitle>{category.title}</WidgetTitle>
        <InlineModal.Window name={`editCategoryTitle-${category.id}`}>
          <UpdateCategoryTitle categoryId={category.id}>
            <WidgetTitleInput currentTitle={category.title} />
          </UpdateCategoryTitle>
        </InlineModal.Window>
      </WidgetHeaderGroup>
      <WidgetHeaderGroup>
        {hasModeratePermissions && (
          <InlineModal.Open windowName={`editCategoryTitle-${category.id}`}>
            <WidgetEditButton />
          </InlineModal.Open>
        )}

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
  );
}
