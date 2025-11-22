import styled from 'styled-components';
import { HiOutlineTrash } from 'react-icons/hi2';

interface DeleteCategoryButtonProps {
  onClick?: () => void;
}

const DeleteButton = styled.button`
  color: var(--color-grey-500);
  cursor: pointer;

  &:hover {
    color: var(--color-rose-500);
  }
`;

export function DeleteCategoryButton({
  onClick = () => {},
}: DeleteCategoryButtonProps) {
  return (
    <DeleteButton onClick={onClick}>
      <HiOutlineTrash />
    </DeleteButton>
  );
}
