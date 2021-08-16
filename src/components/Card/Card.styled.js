/* istanbul ignore file */
import styled from 'styled-components';

export const CardContainer = styled.div`
  border: solid 1px gray;
  height: 345px;
  width: 345px;
  max-height: 345px;
  max-width: 345px;
  margin: 10px;
  background-color: ${(props) => (props.theme.darkMode ? 'black' : 'white')};

  @media (max-width: 768px) {
    height: auto;
    width: auto;
  }
`;

export const DescriptionContainer = styled.div`
  height: 190px;
  padding: 15px;
  overflow: hidden;
  &:hover {
    background-color: #80808045;
  }
`;

export const ImageContainer = styled.div`
  height: 145px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export const Image = styled.img`
  height: 100%;
  width: 100%;
`;

export const Title = styled.h2`
  margin: 0;
  color: ${(props) => (props.theme.darkMode ? 'white' : 'black')};
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.6;
  letter-spacing: 0.0075em;
`;

export const Description = styled.p`
  color: gray;
  font-size: 0.74rem;
`;
