import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../hooks/FavoritesProvider/FavoritesProvider';
import { useGetVideo } from '../../hooks/VideoDetails/VideoDetails';
import { useAuth } from '../../providers/Auth';

import {
  VideoContainer,
  VideoDetails,
  VideoSuggestions,
  SuggestionContainer,
  ImgSuggestion,
  DescriptionSuggestion,
  TitleSuggestion,
  VideoLists,
  ButtonFavorite,
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

const showFavorites = ({ authenticated, favorites }) => {
  if (favorites.length === 0) {
    return null;
  }

  return (
    <VideoSuggestions
      favorites={authenticated && favorites.length > 0}
      data-testid="favorites-list"
    >
      <h3>Favorites</h3>
      {favorites.map((favorite) => {
        return (
          <Link to={{ pathname: `/video/${favorite.videoId}` }} key={favorite.videoId}>
            <SuggestionContainer>
              <ImgSuggestion src={favorite.image.medium.url} />
              <DescriptionSuggestion>
                <TitleSuggestion>{favorite.title}</TitleSuggestion>
              </DescriptionSuggestion>
            </SuggestionContainer>
          </Link>
        );
      })}
    </VideoSuggestions>
  );
};

const showFavoriteButton = (isFavorite, constructVideo, removeFavorite, id) => {
  if (isFavorite) {
    return (
      <ButtonFavorite type="button" onClick={() => removeFavorite(id)}>
        Remover de Favoritos
      </ButtonFavorite>
    );
  }

  return (
    <ButtonFavorite type="button" onClick={constructVideo}>
      Agregar a Favoritos
    </ButtonFavorite>
  );
};

function VideoPage() {
  const { id } = useParams();
  const { video, suggestions } = useGetVideo(id);
  const { favorites, favoritesList, addFavorite, removeFavorite } = useFavorites();
  const { authenticated } = useAuth();

  function constructVideo() {
    const videoObject = {
      etag: id,
      image: {
        medium: {
          url: video.items[0].snippet.thumbnails.medium.url,
        },
      },
      title: video.items[0].snippet.title,
      description: video.items[0].snippet.description,
      videoId: id,
    };

    addFavorite(videoObject);
  }

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
        {authenticated &&
          showFavoriteButton(favoritesList[id], constructVideo, removeFavorite, id)}
        <p>{video && video.items[0].snippet.description}</p>
      </VideoDetails>
      <VideoLists>
        <VideoSuggestions favorites={authenticated && favorites.length > 0}>
          {suggestions && makeSuggestions(suggestions)}
        </VideoSuggestions>
        {authenticated && showFavorites({ authenticated, favorites })}
      </VideoLists>
    </VideoContainer>
  );
}

export default VideoPage;
