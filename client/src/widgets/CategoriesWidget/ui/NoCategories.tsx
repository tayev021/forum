import styled from 'styled-components';
import { Widget } from '../../../shared/ui/WidgetKit';

const Container = styled(Widget.Container)`
  min-height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  font-style: italic;
  color: var(--color-grey-500);
`;

export function NoCategories() {
  return <Container>No categories yet</Container>;
}
