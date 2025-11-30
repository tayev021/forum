import { HiOutlineTrash } from 'react-icons/hi2';
import { WidgetDeleteButton } from '../../../shared/ui/widget-kit/WidgetDeleteButton';
import styled from 'styled-components';

interface DeleteForumButtonProps {
  onClick?: () => void;
}

const Icon = styled(HiOutlineTrash)`
  width: 2rem;
  height: 2rem;
`;

export function DeleteForumButton({
  onClick = () => {},
}: DeleteForumButtonProps) {
  return (
    <WidgetDeleteButton onClick={onClick}>
      <Icon />
    </WidgetDeleteButton>
  );
}
