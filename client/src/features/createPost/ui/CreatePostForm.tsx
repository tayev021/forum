import styled from 'styled-components';
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { HiChevronRight } from 'react-icons/hi2';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import { clearPostError, createPost, usePost } from '../../../entities/post';
import { getThread } from '../../../entities/thread';
import { useParams, useSearchParams } from 'react-router';
import toast from 'react-hot-toast';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 12rem;
  padding: 1rem;
  border-color: transparent;
  background-color: var(--color-grey-200);
  border-radius: 0.4rem;
  resize: none;
`;

const StyledButton = styled.button`
  align-self: flex-end;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 0.4rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  background-color: var(--color-primary);
  cursor: pointer;

  &:hover {
    transform: translateX(-3px);
  }

  &:active {
    transform: translateX(0);
  }
`;

export function CreatePostForm() {
  const [content, setContent] = useState('');
  const [isCreated, setIsCreated] = useState(false);
  const params = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { isLoading, error: serverError } = usePost();

  const threadId = Number(params.threadId);
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    if (serverError?.type === 'general') {
      toast.error(serverError.message);
      dispatch(clearPostError());
      setIsCreated(false);
    } else if (!serverError && !isLoading && isCreated) {
      dispatch(getThread({ threadId, page }));
    }
  }, [serverError, isLoading, isCreated]);

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    dispatch(createPost({ threadId, content }));
    setIsCreated(true);
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledTextarea
        name="content"
        minLength={1}
        maxLength={1024}
        required
        placeholder="Write your post here…"
        value={content}
        onChange={handleChange}
      />
      <StyledButton type="submit">
        Post <HiChevronRight />
      </StyledButton>
    </StyledForm>
  );
}
