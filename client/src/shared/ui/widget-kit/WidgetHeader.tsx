import styled from 'styled-components';

export const WidgetHeader = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr max-content;
  align-items: center;
  gap: 2rem;
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--color-grey-400);
  overflow: hidden;
`;
