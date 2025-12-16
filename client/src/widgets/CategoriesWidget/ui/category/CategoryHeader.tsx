import type { Category } from '../../../../entities/category';
import { useRestrictTo } from '../../../../entities/user';
import { Widget } from '../../../../shared/ui/WidgetKit';
import { InlineModal } from '../../../../shared/ui/InlineModal';
import { UpdateCategoryTitle } from '../../../../features/updateCategoryTitle';
import { Modal } from '../../../../shared/ui/Modal';
import { CreateForumForm } from '../../../../features/createForum';
import { DeleteCategory } from '../../../../features/deleteCategory';

interface CategoryHeaderProps {
  category: Category;
}

export function CategoryHeader({ category }: CategoryHeaderProps) {
  const hasAdminsPermissions = useRestrictTo(['admin']);
  const hasModeratePermissions = useRestrictTo(['admin', 'moderator']);

  return (
    <Widget.Header>
      <Widget.HeaderGroup>
        <Widget.Title>{category.title}</Widget.Title>
        <InlineModal.Window name={`editCategoryTitle-${category.id}`}>
          <UpdateCategoryTitle categoryId={category.id}>
            <Widget.TitleInput currentTitle={category.title} />
          </UpdateCategoryTitle>
        </InlineModal.Window>
      </Widget.HeaderGroup>
      <Widget.HeaderGroup>
        {hasModeratePermissions && (
          <InlineModal.Open windowName={`editCategoryTitle-${category.id}`}>
            <Widget.EditButton />
          </InlineModal.Open>
        )}

        {hasModeratePermissions && (
          <>
            <Modal.Open windowName={`createForumInCategory-${category.id}`}>
              <Widget.CreateButton />
            </Modal.Open>
            <Modal.Window name={`createForumInCategory-${category.id}`}>
              <CreateForumForm categoryId={category.id} />
            </Modal.Window>
          </>
        )}
        {hasAdminsPermissions && category.forums.length === 0 && (
          <>
            <Modal.Open windowName={`deleteCategory-${category.id}`}>
              <Widget.DeleteButton />
            </Modal.Open>
            <Modal.Window name={`deleteCategory-${category.id}`}>
              <DeleteCategory categoryId={category.id}>
                <Widget.Confirm title="Delete Category">
                  Are you sure you want to delete the "{category.title}"
                  category?
                </Widget.Confirm>
              </DeleteCategory>
            </Modal.Window>
          </>
        )}
      </Widget.HeaderGroup>
    </Widget.Header>
  );
}
