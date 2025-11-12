import type { FormEvent, ReactElement } from 'react';
import styled from 'styled-components';
import { Heading } from './Heading';
import { Row } from './Row';
import { Label } from './Label';
import { Input } from './Input';
import { Error } from './Error';
import { Submit } from './Submit';
import { Loader } from './Loader';

interface FormProps {
  onSubmit: (e: FormEvent) => void;
  children: ReactElement | ReactElement[];
}

const StyledForm = styled.form`
  width: 30rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  position: relative;
  padding: 2rem;
  margin: 5rem auto;
  border: 2px solid var(--color-primary);
  border-radius: 0.8rem;
  box-shadow: var(--shadow-medium);
`;

export function Form({ onSubmit, children }: FormProps) {
  return <StyledForm onSubmit={onSubmit}>{children}</StyledForm>;
}

Form.Heading = Heading;
Form.Row = Row;
Form.Label = Label;
Form.Input = Input;
Form.Error = Error;
Form.Submit = Submit;
Form.Loader = Loader;
