import { HiPlus } from 'react-icons/hi2';
import styled from 'styled-components';

interface CreateForumButtonProps {
  onClick?: () => void;
}

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.8rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    color: var(--color-primary);
  }
`;

export function CreateForumButton({
  onClick = () => {},
}: CreateForumButtonProps) {
  return (
    <Button onClick={onClick}>
      <HiPlus /> Create Forum
    </Button>
  );
}
