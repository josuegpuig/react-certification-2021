import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useGetVideo } from '../../hooks/VideoDetails/VideoDetails';

import {
  VideoContainer,
  VideoDetails,
  VideoSuggestions,
  SuggestionContainer,
  ImgSuggestion,
  DescriptionSuggestion,
  TitleSuggestion,
} from './Video.styled';

const makeSuggestions = (suggestions) => {
  return suggestions.items.map((suggestion) => {
    return (
      <Link
        to={{ pathname: `/video/${suggestion.id.videoId}` }}
        key={suggestion.id.videoId}
      >
        <SuggestionContainer>
          <ImgSuggestion src={suggestion.snippet.thumbnails.medium.url} />
          <DescriptionSuggestion>
            <TitleSuggestion>{suggestion.snippet.title}</TitleSuggestion>
          </DescriptionSuggestion>
        </SuggestionContainer>
      </Link>
    );
  });
};

function VideoPage() {
  const { id } = useParams();
  const { video, suggestions } = useGetVideo(id);

  return (
    <VideoContainer>
      <VideoDetails>
        <iframe
          width="100%"
          height="450"
          allowFullScreen
          frameBorder="0"
          title={video ? video.items[0].snippet.title : ''}
          src={`https://www.youtube.com/embed/${id}?controls=1`}
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
        />
        <h2>{video && video.items[0].snippet.title}</h2>
        <p>{video && video.items[0].snippet.description}</p>
      </VideoDetails>
      <VideoSuggestions>{suggestions && makeSuggestions(suggestions)}</VideoSuggestions>
    </VideoContainer>
  );
}

export default VideoPage;
