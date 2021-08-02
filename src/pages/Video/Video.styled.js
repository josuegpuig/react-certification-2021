import styled from 'styled-components';

export const VideoContainer = styled.section`
  display: flex;
  flex-direction: row;
  width: 98%;
`;

export const VideoDetails = styled.section`
  display: flex;
  flex-direction: column;
  width: 70%;
  background-color: white;
  padding-right: 5px;

  h2,
  p {
    padding: 0 10px;
  }
`;

export const VideoSuggestions = styled.section`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  width: 30%;
  height: 100vh;
  background-color: white;
`;

export const SuggestionContainer = styled.div`
  display: flex;
  border: solid 1px gray;
  padding: 5px 0;
`;

export const ImgSuggestion = styled.img`
  width: 120px;
  height: 90px;
`;

export const DescriptionSuggestion = styled.div`
  height: 100%;
`;

export const TitleSuggestion = styled.p`
  font-size: 0.8rem;
  margin: 0;
  margin-left: 5%;
`;
