import styled from 'styled-components';
import { Widget } from '../../../shared/ui/WidgetKit';

const Container = styled(Widget.Container)`
  padding: 2rem;
  font-style: italic;
  text-align: center;
  color: var(--color-grey-500);
`;

export function NoCategories() {
  return <Container>No categories yet</Container>;
}
