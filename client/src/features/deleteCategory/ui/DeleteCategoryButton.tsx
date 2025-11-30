import { HiOutlineTrash } from 'react-icons/hi2';
import { WidgetDeleteButton } from '../../../shared/ui/WidgetDeleteButton';

interface DeleteCategoryButtonProps {
  onClick?: () => void;
}

export function DeleteCategoryButton({
  onClick = () => {},
}: DeleteCategoryButtonProps) {
  return (
    <WidgetDeleteButton onClick={onClick}>
      <HiOutlineTrash />
    </WidgetDeleteButton>
  );
}
