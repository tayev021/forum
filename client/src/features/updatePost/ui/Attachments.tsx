import styled from 'styled-components';
import { Attachment } from './Attachment';
import type { Attachment as AttachmentType } from '../../../shared/types/Attachment';

interface AttachmentsProps {
  attachments: AttachmentType[];
  deleteAttachment: (attachmentId: number) => void;
}

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export function Attachments({
  attachments,
  deleteAttachment,
}: AttachmentsProps) {
  if (attachments.length <= 0) return null;

  return (
    <List>
      {attachments.map((attachment) => (
        <Attachment
          key={attachment.id}
          attachment={attachment}
          deleteAttachment={() => deleteAttachment(attachment.id)}
        />
      ))}
    </List>
  );
}
