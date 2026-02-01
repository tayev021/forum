import type { Attachment } from '../../../shared/types/Attachment';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import {
  clearPostError,
  deletePostAttachment,
  usePost,
} from '../../../entities/post';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import toast from 'react-hot-toast';
import { SERVER_URL } from '../../../shared/constants';
import { HiMiniXMark } from 'react-icons/hi2';

interface AttachmentProps {
  attachment: Attachment;
  deleteAttachment: () => void;
}

const Li = styled.li`
  position: relative;

  &:hover img {
    transform: scale(1.04);
  }
`;

const Image = styled.img`
  width: 10rem;
  height: 10rem;
  display: block;
  border: 1px solid var(--color-grey-200);
  border-radius: 0.6rem;
  object-fit: cover;
  overflow: hidden;
`;

const DeleteButton = styled.button`
  width: 2.2rem;
  height: 2.2rem;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: var(--color-rose-500);
  cursor: pointer;

  &:hover svg {
    transition: all 0.3s ease;
    transform: rotate(90deg);
  }

  svg {
    width: 2rem;
    height: 2rem;
  }
`;

export function Attachment({ attachment, deleteAttachment }: AttachmentProps) {
  const [isDeleted, setIsDeleted] = useState(false);
  const { isLoading, error: serverError } = usePost();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (serverError?.type === 'general') {
      toast.error(serverError.message);
      dispatch(clearPostError());
      setIsDeleted(false);
    } else if (!serverError && !isLoading && isDeleted) {
      deleteAttachment();
    }
  }, [isLoading, serverError, isDeleted]);

  function handleClick() {
    dispatch(deletePostAttachment({ attachmentId: attachment.id }));
    setIsDeleted(true);
  }

  return (
    <Li>
      <Image src={`${SERVER_URL}/images/posts/${attachment.fileName}`} alt="" />
      <DeleteButton type="button" onClick={handleClick}>
        <HiMiniXMark />
      </DeleteButton>
    </Li>
  );
}
