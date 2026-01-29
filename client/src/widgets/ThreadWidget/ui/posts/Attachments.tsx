import styled from 'styled-components';
import type { Attachment as AttachmentType } from '../../../../shared/types/Attachment';
import { Attachment } from './Attachment';

interface AttachmentsProps {
  attachments: AttachmentType[];
}

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export function Attachments({ attachments }: AttachmentsProps) {
  if (attachments.length <= 0) return null;

  return (
    <List>
      {attachments.map((attachment) => (
        <Attachment key={attachment.id} attachment={attachment} />
      ))}
    </List>
  );
}
