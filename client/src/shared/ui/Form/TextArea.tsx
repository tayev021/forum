import type { ChangeEvent, FocusEvent, TextareaHTMLAttributes } from 'react';
import styled from 'styled-components';

interface CustomTextAreaProps {
  id: string;
  autoFocus?: boolean;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void;
}

type TextAreaProps = CustomTextAreaProps &
  TextareaHTMLAttributes<HTMLTextAreaElement>;

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 12rem;
  padding: 0.8rem 1rem;
  border: 2px solid var(--color-primary);
  border-radius: 0.8rem;
  font-size: 1.6rem;
  line-height: 1;
  background-color: var(--color-bg-secondary);
  box-shadow: var(--shadow-small);
  resize: none;

  &:focus {
    outline: none;
  }
`;

export function TextArea({
  id,
  autoFocus = false,
  value,
  onChange,
  onBlur,
  ...props
}: TextAreaProps) {
  return (
    <StyledTextarea
      id={id}
      autoFocus={autoFocus}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      {...props}
    />
  );
}
