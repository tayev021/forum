import styled from 'styled-components';
import { PrimaryButton } from '../../../shared/ui/PrimaryButton';
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import {
  clearThreadError,
  createThread,
  useThread,
} from '../../../entities/thread';
import toast from 'react-hot-toast';
import { HiChevronRight, HiPaperClip } from 'react-icons/hi2';
import { POST_ATTACHMENTS_LIMIT } from '../../../shared/constants';

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

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
`;

const AttachmentsLabel = styled.label`
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;

  &:hover {
    color: var(--color-primary);
  }

  svg {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

const AttachmentsCounter = styled.span`
  width: 1.8rem;
  height: 1.8rem;
  position: absolute;
  top: 1.5rem;
  left: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 1.4rem;
  color: var(--color-text-secondary);
  background-color: var(--color-rose-500);
`;

const AttachmentsInput = styled.input`
  display: none;
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
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isCreated, setIsCreated] = useState(false);
  const refImagesInput = useRef<HTMLInputElement>(null);
  const { thread, isLoading, error: serverError } = useThread();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const forumId = Number(searchParams.get('forumId'));

  useEffect(() => {
    if (serverError) {
      if (serverError.type === 'general') {
        toast.error(serverError.message);
      } else if (serverError?.type === 'validation') {
        serverError.fields.forEach((field) => toast.error(field.message));
      }

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

  function handleChangeAttachments(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (files) {
      if (files.length > POST_ATTACHMENTS_LIMIT) {
        toast.error('You can attach to post a maximum of 8 images');
      }

      setAttachments(Array.from(files).slice(0, POST_ATTACHMENTS_LIMIT));
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!title || !content) return;

    const formData = new FormData();

    formData.append('title', title);
    formData.append('content', content);
    attachments.forEach((attachment) => formData.append('images', attachment));

    dispatch(createThread({ forumId, formData }));
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
      <Row>
        <div>
          <AttachmentsLabel htmlFor="postAttachments">
            <HiPaperClip />
            {attachments.length > 0 && (
              <AttachmentsCounter>{attachments.length}</AttachmentsCounter>
            )}
          </AttachmentsLabel>
          <AttachmentsInput
            type="file"
            name="images"
            id="postAttachments"
            accept="image/png, image/jpeg"
            multiple
            ref={refImagesInput}
            onChange={handleChangeAttachments}
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          Post <HiChevronRight />
        </Button>
      </Row>
    </Form>
  );
}
