import styled from 'styled-components';
import { useSearchParams } from 'react-router';
import {
  sortKeys,
  type SortKey,
  type SortOrder,
} from '../../../entities/forum';
import { HiMiniArrowLongDown, HiMiniArrowLongUp } from 'react-icons/hi2';

const Container = styled.div`
  width: 17rem;
  position: relative;
  font-size: 1.4rem;
  line-height: 1.2;
`;

const Options = styled.ul`
  position: absolute;
  top: -0.6rem;
  left: 6.2rem;
  height: 2.5rem;
  padding: 0.2rem;
  border: 1px solid transparent;
  border-radius: 0.5rem;
  background-color: var(--color-bg-secondary);
  overflow: hidden;

  &:hover {
    height: max-content;
    border: 1px solid var(--color-grey-300);
    box-shadow: var(--shadow-medium);
  }
`;

const Option = styled.li`
  &:first-child {
    padding: 0.4rem;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid var(--color-grey-400);
    border-radius: 0;
    color: var(--color-primary);
    font-weight: 500;
    cursor: default;
  }

  &:not(:first-child) {
    padding: 0.3rem 0.5rem;
    border-radius: 0.6rem;
    cursor: pointer;

    &:hover {
      background-color: var(--color-grey-200);
    }
  }
`;

const OrderButton = styled.button`
  transform: translate(3px, 3px);
  color: var(--color-primary);
  cursor: pointer;

  svg {
    height: 1.4rem;
    width: 1.4rem;

    &:hover {
      filter: drop-shadow(0 0 3px var(--color-primary));
    }
  }
`;

const LABELS = {
  updatedAt: 'update date',
  createdAt: 'creation date',
  title: 'title',
  views: 'views',
  postsCount: 'posts',
};

export function SortThreads() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSelect(key: SortKey) {
    const sortKey = searchParams.get('sortKey') as SortKey;

    if (sortKey !== key) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('sortKey', key);
      setSearchParams(newSearchParams);
    }
  }

  function handleClick() {
    const sortOrder = searchParams.get('sortOrder') as SortOrder;

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('sortOrder', sortOrder === 'ASC' ? 'DESC' : 'ASC');
    setSearchParams(newSearchParams);
  }

  return (
    <Container>
      sort by
      <Options>
        <Option>{LABELS[searchParams.get('sortKey') as SortKey]}</Option>
        {sortKeys.map((key) => (
          <Option key={key} onClick={() => handleSelect(key)}>
            {LABELS[key]}
          </Option>
        ))}
      </Options>
      <OrderButton onClick={handleClick}>
        {searchParams.get('sortOrder') === 'ASC' ? (
          <HiMiniArrowLongDown />
        ) : (
          <HiMiniArrowLongUp />
        )}
      </OrderButton>
    </Container>
  );
}
