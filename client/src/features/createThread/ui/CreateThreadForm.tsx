import styled from 'styled-components';
import { PrimaryButton } from '../../../shared/ui/PrimaryButton';
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import {
  clearThreadError,
  createThread,
  useThread,
} from '../../../entities/thread';
import toast from 'react-hot-toast';
import { HiChevronRight } from 'react-icons/hi2';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 1rem;
  border-radius: 0.4rem;
  border-color: transparent;
  background-color: var(--color-grey-200);
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 12rem;
  padding: 1rem;
  border-radius: 0.4rem;
  border-color: transparent;
  background-color: var(--color-grey-200);
  resize: none;
`;

const Button = styled(PrimaryButton)`
  align-self: flex-end;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: none;

  &:hover {
    transform: translateX(-3px);
    box-shadow: none;
  }

  &:active {
    transform: translateX(0);
    box-shadow: none;
  }
`;

export function CreateThreadForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isCreated, setIsCreated] = useState(false);
  const { thread, isLoading, error: serverError } = useThread();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const forumId = Number(searchParams.get('forumId'));

  useEffect(() => {
    if (serverError?.type === 'general') {
      toast.error(serverError.message);
      dispatch(clearThreadError());
      setIsCreated(false);
    } else if (!serverError && !isLoading && isCreated && thread) {
      navigate(`/threads/${thread.id}?page=1`);
    }
  }, [serverError, isLoading, isCreated]);

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    dispatch(createThread({ forumId, title, content }));
    setIsCreated(true);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <TitleInput
        type="text"
        placeholder="Write thread title here..."
        minLength={3}
        required
        value={title}
        onChange={handleTitleChange}
      />
      <Textarea
        name="content"
        minLength={1}
        maxLength={1024}
        required
        placeholder="Write your post here…"
        value={content}
        onChange={handleContentChange}
      />
      <Button type="submit" disabled={isLoading}>
        Post <HiChevronRight />
      </Button>
    </Form>
  );
}
