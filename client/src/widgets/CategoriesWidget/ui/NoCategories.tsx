import styled from 'styled-components';
import { WidgetContainer } from '../../../shared/ui/widget-kit/WidgetContainer';

const Container = styled(WidgetContainer)`
  padding: 2rem;
  font-style: italic;
  text-align: center;
  color: var(--color-grey-500);
`;

export function NoCategories() {
  return <Container>No categories yet</Container>;
}
