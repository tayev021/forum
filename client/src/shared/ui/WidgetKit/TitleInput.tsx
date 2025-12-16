import styled from 'styled-components';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { HiChevronRight } from 'react-icons/hi2';

interface TitleInputProps {
  currentTitle: string;
  className?: string;
  submit?: (title: string) => void;
}

const Form = styled.form`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  padding: 0.5rem 1rem;
  background-color: var(--color-bg-secondary);
`;

const Input = styled.input`
  min-width: 10rem;
  padding: 0.5rem 5rem 0.5rem 1rem;
  border: none;
  border-radius: 0.4rem;
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.4;
  color: var(--color-primary);
  background-color: var(--color-grey-200);

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  position: absolute;
  top: 50%;
  right: 2.5rem;
  transform: translateY(-50%);
  cursor: pointer;

  &:hover {
    color: var(--color-primary);
  }
`;

export function TitleInput({
  currentTitle,
  className,
  submit = () => {},
}: TitleInputProps) {
  const [title, setTitle] = useState(currentTitle);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    submit(title);
  }

  return (
    <Form className={className} onSubmit={handleSubmit}>
      <Input
        type="text"
        name="title"
        autoFocus={true}
        value={title}
        onChange={handleChange}
      />
      <Button type="submit">
        <HiChevronRight />
      </Button>
    </Form>
  );
}
