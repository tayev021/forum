import styled from 'styled-components';
import { PrimaryButton } from '../../../shared/ui/PrimaryButton';
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { HiChevronRight } from 'react-icons/hi2';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import {
  clearPost,
  clearPostError,
  createPost,
  updatePost,
  usePost,
} from '../../../entities/post';
import { getThread } from '../../../entities/thread';
import { useNavigate, useParams } from 'react-router';
import toast from 'react-hot-toast';

interface UpdatePostFormProps {
  postId?: number;
  postContent?: string;
}

const Form = styled.form`
  height: 100%;
  display: grid;
  grid-template-rows: 1fr min-content;
  gap: 1rem;
  padding: 1rem;
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 12rem;
  padding: 1rem;
  border-color: transparent;
  background-color: var(--color-grey-200);
  border-radius: 0.4rem;
  resize: none;
`;

const Button = styled(PrimaryButton)`
  justify-self: end;
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

export function UpdatePostForm({
  postId,
  postContent = '',
}: UpdatePostFormProps) {
  const [content, setContent] = useState(postContent);
  const { post, isLoading, error: serverError } = usePost();
  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const threadId = Number(params.threadId);

  useEffect(() => {
    if (serverError?.type === 'general') {
      toast.error(serverError.message);
      dispatch(clearPostError());
    } else if (!serverError && !isLoading && post && content) {
      navigate(`/threads/${threadId}?page=${post.thread.page}#${post.id}`);
      dispatch(getThread({ threadId, page: post.thread.page }));
      dispatch(clearPost());
    }
  }, [serverError, post, isLoading]);

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (postId) {
      dispatch(updatePost({ postId, content }));
    } else {
      dispatch(createPost({ threadId, content }));
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Textarea
        name="content"
        minLength={1}
        maxLength={1024}
        required
        placeholder="Write your post here…"
        value={content}
        onChange={handleChange}
      />
      <Button type="submit">
        {postId ? 'Edit' : 'Post'} <HiChevronRight />
      </Button>
    </Form>
  );
}
