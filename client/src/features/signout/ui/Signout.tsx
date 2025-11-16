import styled from 'styled-components';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import { signout } from '../../../entities/user';

const Button = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    color: var(--color-text-tertiary);
  }
`;

export function Signout() {
  const dispatch = useAppDispatch();

  return (
    <Button onClick={() => dispatch(signout())}>
      <HiArrowRightOnRectangle />
    </Button>
  );
}
