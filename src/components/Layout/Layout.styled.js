import styled from 'styled-components';

export const LayoutContainer = styled.main`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;

  @media (max-width: 768px) {
    margin-top: 0;
  }
`;
