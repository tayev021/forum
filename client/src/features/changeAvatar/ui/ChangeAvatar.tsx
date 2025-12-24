import { changeAvatar, useUser } from '../../../entities/user';
import type { ChangeEvent } from 'react';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import styled from 'styled-components';

const Label = styled.label`
  padding: 0.2rem 1.6rem;
  border-radius: 0.4rem;
  font-size: 1.2rem;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  background-color: var(--color-primary);
  cursor: pointer;

  &:hover {
    box-shadow: var(--shadow-small);
  }

  &:active {
    box-shadow: none;
  }
`;

const Input = styled.input`
  display: none;
`;

export function ChangeAvatar() {
  const { isLoading } = useUser();
  const dispatch = useAppDispatch();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files?.[0]) return;

    const formData = new FormData();
    formData.append('avatar', event.target.files[0]);

    dispatch(changeAvatar(formData));
  }

  return (
    <>
      <Label htmlFor="avatar">Change Avatar</Label>
      <Input
        type="file"
        name="avatar"
        id="avatar"
        accept="image/png, image/jpeg"
        onChange={handleChange}
        disabled={isLoading}
      />
    </>
  );
}
