import styled from 'styled-components';
import type { Category } from '../../../entities/category/model/types/Category';
import { WidgetContainer } from '../../../shared/ui/WidgetContainer';
import { ForumLink } from './ForumLink';

interface CategoryProps {
  category: Category;
}

const Header = styled.header`
  padding: 1rem 3rem;
  border-bottom: 1px solid var(--color-grey-400);
  font-size: 2rem;
  font-weight: 600;
  line-height: 1;
  color: var(--color-primary);
`;

const ForumsList = styled.ul`
  padding: 1rem;
`;

export function Category({ category }: CategoryProps) {
  return (
    <WidgetContainer>
      <Header>{category.title}</Header>
      <ForumsList>
        {category.forums.map((forum) => (
          <ForumLink key={forum.id} forum={forum} />
        ))}
      </ForumsList>
    </WidgetContainer>
  );
}
