import type { Report } from '../../../entities/report';
import styled from 'styled-components';
import { RejectReport } from '../../../features/rejectReport';
import { BanPost } from '../../../features/banPost';
import { BanUser } from '../../../features/banUser';
import { Modal } from '../../../shared/ui/Modal';
import { Widget } from '../../../shared/ui/WidgetKit';

interface ReportActionsProps {
  report: Report;
}

const Actions = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 10rem);
  justify-content: space-between;
  gap: 2rem;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    justify-content: center;
    gap: 1rem;
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: 2px solid var(--color-primary);
  border-radius: 0.6rem;
  font-weight: 500;
  line-height: 1;
  color: var(--color-primary);
  cursor: pointer;

  &:hover {
    color: var(--color-text-secondary);
    background-color: var(--color-primary);
  }
`;

const BanPostButton = styled(Button)`
  border-color: var(--color-yellow-400);
  color: var(--color-yellow-400);

  &:hover {
    color: var(--color-text-secondary);
    background-color: var(--color-yellow-400);
  }
`;

const BanUserButton = styled(Button)`
  border-color: var(--color-rose-500);
  color: var(--color-rose-500);

  &:hover {
    color: var(--color-text-secondary);
    background-color: var(--color-rose-500);
  }
`;

export function ReportActions({ report }: ReportActionsProps) {
  return (
    <Actions>
      <RejectReport report={report}>
        <Button>Reject</Button>
      </RejectReport>
      <BanPost report={report}>
        <BanPostButton>Ban Post</BanPostButton>
      </BanPost>
      {report.post.author && (
        <>
          <Modal.Open windowName={`banUser-${report.post.author.id}`}>
            <BanUserButton>Ban User</BanUserButton>
          </Modal.Open>
          <Modal.Window name={`banUser-${report.post.author.id}`}>
            <BanUser report={report}>
              <Widget.Confirm title="Ban User">
                Are you sure you want to ban the "{report.post.author.username}"
                user?
              </Widget.Confirm>
            </BanUser>
          </Modal.Window>
        </>
      )}
    </Actions>
  );
}
