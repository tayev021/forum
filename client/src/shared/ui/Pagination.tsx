import styled from 'styled-components';
import { Link } from 'react-router';
import { paginate } from '../lib/utils/paginate';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

interface PaginationProps {
  className?: string;
  baseUrl: string;
  currentPage: number;
  totalPages: number;
}

interface PageLinkProps {
  $current?: boolean;
  $next?: boolean;
  $previous?: boolean;
}

const Container = styled.div`
  display: flex;
  gap: 1rem;

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

  &:hover {
    transform: scale(1.05);
  }

  ${(props) =>
    props.$current
      ? `
          border-color: var(--color-primary); 
          color: var(--color-text-secondary); 
          background-color: var(--color-primary);`
      : ''};

  ${(props) =>
    props.$next || props.$previous
      ? `
          @media (max-width: 600px) {
            display: none;
          }
        `
      : ''};
`;

const PageLinkPlaceholder = styled.span`
  font-weight: 900;
  letter-spacing: 1px;
`;

export function Pagination({
  className = '',
  baseUrl,
  currentPage,
  totalPages,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const links = paginate(currentPage, totalPages).map((page) => {
    if (page.type === 'placeholder') {
      return <PageLinkPlaceholder key={page.id}>...</PageLinkPlaceholder>;
    }

    return (
      <PageLink
        key={page.num}
        $current={page.num === currentPage}
        to={`${baseUrl}?page=${page.num}`}
      >
        {page.num}
      </PageLink>
    );
  });

  return (
    <Container className={className}>
      {currentPage > 1 && (
        <PageLink to={`${baseUrl}?page=${currentPage - 1}`} $previous={true}>
          <HiChevronLeft /> Prev
        </PageLink>
      )}

      <Pages>{links}</Pages>

      {currentPage < totalPages && (
        <PageLink to={`${baseUrl}?page=${currentPage + 1}`} $next={true}>
          Next
          <HiChevronRight />
        </PageLink>
      )}
    </Container>
  );
}
