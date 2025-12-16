import type { Category } from '../../../../entities/category/model/types/Category';
import styled from 'styled-components';
import { Widget } from '../../../../shared/ui/WidgetKit';
import { CategoryHeader } from './CategoryHeader';
import { NoForums } from '../NoForums';
import { ForumLink } from '../ForumLink';

interface CategoryProps {
  category: Category;
}

const ForumsList = styled.ul`
  padding: 1rem;
`;

export function Category({ category }: CategoryProps) {
  return (
    <Widget.Container>
      <CategoryHeader category={category} />
      <ForumsList>
        {category.forums.length === 0 && <NoForums />}
        {category.forums.map((forum) => (
          <ForumLink key={forum.id} forum={forum} />
        ))}
      </ForumsList>
    </Widget.Container>
  );
}
