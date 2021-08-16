/* istanbul ignore file */
import styled from 'styled-components';

export const VideoContainer = styled.section`
  display: flex;
  flex-direction: row;
  width: 98%;
  background-color: ${(props) => (props.theme.darkMode ? 'black' : 'white')};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const VideoDetails = styled.section`
  display: flex;
  flex-direction: column;
  width: 70%;
  background-color: ${(props) => (props.theme.darkMode ? 'black' : 'white')};
  padding-right: 5px;

  h2,
  p {
    padding: 0 10px;
    color: ${(props) => (props.theme.darkMode ? 'white' : 'inherit')};
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const VideoSuggestions = styled.section`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  width: 30%;
  height: 100vh;
  background-color: ${(props) => (props.theme.darkMode ? 'black' : 'white')};

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

export const SuggestionContainer = styled.div`
  display: flex;
  border: solid 1px gray;
  padding: 5px 0;
  color: ${(props) => (props.theme.darkMode ? 'white' : 'inherit')};
`;

export const ImgSuggestion = styled.img`
  width: 120px;
  height: 90px;
`;

export const DescriptionSuggestion = styled.div`
  height: 100%;
  color: inherit;
`;

export const TitleSuggestion = styled.p`
  font-size: 0.8rem;
  margin: 0;
  margin-left: 5%;
  color: inherit;
`;
