import {
  deleteAttachment,
  getThread,
  type ThreadPost,
} from '../../../entities/thread';
import styled from 'styled-components';
import { PrimaryButton } from '../../../shared/ui/PrimaryButton';
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import { HiChevronRight, HiPaperClip } from 'react-icons/hi2';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import {
  clearPost,
  clearPostError,
  createPost,
  updatePost,
  usePost,
} from '../../../entities/post';
import { useNavigate, useParams } from 'react-router';
import toast from 'react-hot-toast';
import { POST_ATTACHMENTS_LIMIT } from '../../../shared/constants';
import { Attachments } from './Attachments';

interface UpdatePostFormProps {
  post?: ThreadPost;
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
  post,
  postContent = '',
}: UpdatePostFormProps) {
  const [content, setContent] = useState(postContent);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const refImagesInput = useRef<HTMLInputElement>(null);
  const { post: serverPost, isLoading, error: serverError } = usePost();
  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const threadId = Number(params.threadId);
  const currentAttachmentsLength = post?.attachments.length || 0;

  useEffect(() => {
    if (serverError?.type === 'general') {
      toast.error(serverError.message);
      dispatch(clearPostError());
      setIsUpdated(false);
    } else if (!serverError && !isLoading && serverPost && isUpdated) {
      navigate(
        `/threads/${threadId}?page=${serverPost.thread.page}#${serverPost.id}`
      );
      dispatch(getThread({ threadId, page: serverPost.thread.page }));
      dispatch(clearPost());

      if (!post) {
        refImagesInput.current!.value = '';
        setContent('');
        setAttachments([]);
        setIsUpdated(false);
      }
    }
  }, [serverError, serverPost, isLoading, isUpdated, post]);

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);
  }

  function handleChangeAttachments(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (files) {
      if (files.length + currentAttachmentsLength > POST_ATTACHMENTS_LIMIT) {
        toast.error('You can attach to post a maximum of 8 images');
      }

      setAttachments(
        Array.from(files).slice(
          0,
          POST_ATTACHMENTS_LIMIT - currentAttachmentsLength
        )
      );
    }
  }

  function handleDeleteAttachment(attachmentId: number) {
    if (post) {
      dispatch(
        deleteAttachment({ postId: post.id, attachmentId: attachmentId })
      );
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!content) return;

    const formData = new FormData();

    formData.append('content', content);
    attachments.forEach((attachment) => formData.append('images', attachment));

    if (post) {
      dispatch(updatePost({ postId: post.id, formData }));
    } else {
      dispatch(createPost({ threadId, formData }));
    }

    setIsUpdated(true);
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
      {post && (
        <Attachments
          attachments={post.attachments}
          deleteAttachment={handleDeleteAttachment}
        />
      )}
      <Row>
        <div>
          {(post?.attachments.length || 0) >= POST_ATTACHMENTS_LIMIT ? null : (
            <>
              <AttachmentsLabel htmlFor="postAttachments">
                <HiPaperClip />
                {currentAttachmentsLength + attachments.length > 0 && (
                  <AttachmentsCounter>
                    {currentAttachmentsLength + attachments.length}
                  </AttachmentsCounter>
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
            </>
          )}
        </div>
        <Button type="submit">
          {post ? 'Edit' : 'Post'} <HiChevronRight />
        </Button>
      </Row>
    </Form>
  );
}
