import styled from 'styled-components';
import { Link } from 'react-router';
import { paginate } from '../lib/utils/paginate';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

interface PaginationProps {
  baseUrl: string;
  currentPage: number;
  totalPages: number;
}

interface PageLinkProps {
  $current?: boolean;
}

const Container = styled.div`
  display: flex;
  gap: 1rem;
  margin: 2rem 0;

  &:empty {
    display: none;
  }
`;

const Pages = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const PageLink = styled(Link)<PageLinkProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.6rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 0.4rem;
  background-color: var(--color-bg-secondary);
  box-shadow: var(--shadow-small);
  font-weight: 500;
  line-height: 1;

  ${(props) =>
    props.$current
      ? `
        border-color: var(--color-primary); 
        color: var(--color-text-secondary); 
        background-color: var(--color-primary);`
      : ''};
`;

const PageLinkPlaceholder = styled.span`
  font-weight: 900;
  letter-spacing: 1px;
`;

export function Pagination({
  baseUrl,
  currentPage,
  totalPages,
}: PaginationProps) {
  if (totalPages === 1) return null;

  const links = paginate(currentPage, totalPages).map((pageNumber) => {
    if (pageNumber === null) {
      return <PageLinkPlaceholder>...</PageLinkPlaceholder>;
    }

    return (
      <PageLink
        key={pageNumber}
        $current={pageNumber === currentPage}
        to={`${baseUrl}?page=${pageNumber}`}
      >
        {pageNumber}
      </PageLink>
    );
  });

  return (
    <Container>
      {currentPage > 1 && (
        <PageLink to={`${baseUrl}?page=${currentPage - 1}`}>
          <HiChevronLeft /> Prev
        </PageLink>
      )}

      <Pages>{links}</Pages>

      {currentPage < totalPages && (
        <PageLink to={`${baseUrl}?page=${currentPage + 1}`}>
          Next
          <HiChevronRight />
        </PageLink>
      )}
    </Container>
  );
}
