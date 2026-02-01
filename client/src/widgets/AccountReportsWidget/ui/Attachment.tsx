import styled from 'styled-components';
import type { Attachment } from '../../../shared/types/Attachment';
import { SERVER_URL } from '../../../shared/constants';

interface AttachmentProps {
  attachment: Attachment;
}

const Link = styled.a`
  width: 10rem;
  height: 10rem;
  display: block;
  border: 1px solid var(--color-grey-200);
  border-radius: 0.6rem;
  overflow: hidden;

  &:hover {
    transform: scale(1.04);
  }

  &:active {
    transform: scale(0.96);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export function Attachment({ attachment }: AttachmentProps) {
  return (
    <li>
      <Link
        href={`${SERVER_URL}/images/posts/${attachment.fileName}`}
        target="_blank"
      >
        <Image
          src={`${SERVER_URL}/images/posts/${attachment.fileName}`}
          alt=""
        />
      </Link>
    </li>
  );
}
