import styled from 'styled-components';
import { useCategories } from '../../../entities/category';
import { WidgetLoader } from '../../../shared/ui/WidgetLoader';
import { Category } from './Category';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export function CategoriesWidget() {
  const { categories, isLoading } = useCategories();

  return (
    <Container>
      {isLoading && <WidgetLoader position="top" />}
      {categories.map((category) => (
        <Category key={category.id} category={category} />
      ))}
    </Container>
  );
}
