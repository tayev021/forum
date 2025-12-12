import { type ChangeEvent, type FocusEvent } from 'react';
import styled from 'styled-components';

interface InputProps {
  id: string;
  type: 'text' | 'password';
  autoFocus: boolean;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

const StyledInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 2px solid var(--color-primary);
  border-radius: 0.8rem;
  font-size: 1.6rem;
  line-height: 1;
  background-color: var(--color-bg-secondary);
  box-shadow: var(--shadow-small);

  &:focus {
    outline: none;
  }
`;

export function Input({
  id,
  type = 'text',
  autoFocus = false,
  value,
  onChange,
  onBlur,
}: InputProps) {
  return (
    <StyledInput
      id={id}
      type={type}
      autoFocus={autoFocus}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}
