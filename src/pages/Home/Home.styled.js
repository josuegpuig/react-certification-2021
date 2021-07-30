import styled from 'styled-components';

export const HomeSection = styled.section`
  text-align: center;

  h1 {
    font-size: 3rem;
    letter-spacing: -2px;
  }
`;

export const CardsSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1rem 2.25rem;

  @media (max-width: 768px) {
    padding: 1.15rem;
  }
`;
