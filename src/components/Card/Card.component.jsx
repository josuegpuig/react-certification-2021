import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../hooks/FavoritesProvider/FavoritesProvider';
import { useTheme } from '../../hooks/ThemeProvider/ThemeProvider';
import { useAuth } from '../../providers/Auth';

import {
  CardContainer,
  DescriptionContainer,
  ImageContainer,
  Title,
  Description,
  ButtonsContainer,
  ButtonAdd,
  ButtonRemove,
} from './Card.styled';

function Card(props) {
  const { theme } = useTheme();
  const [shown, setIsShown] = useState(false);
  const { authenticated } = useAuth();
  const { addFavorite, removeFavorite } = useFavorites();

  function constructVideo() {
    const videoObject = {
      etag: props.videoId,
      image: {
        medium: {
          url: props.image.medium.url,
        },
      },
      title: props.title,
      description: props.description,
      videoId: props.videoId,
    };

    addFavorite(videoObject);
  }

  function showButton() {
    if (props.favorite) {
      return (
        <ButtonRemove type="button" onClick={() => removeFavorite(props.videoId)}>
          Remover Favorito
        </ButtonRemove>
      );
    }

    return (
      <ButtonAdd type="button" onClick={constructVideo}>
        Añadir Favorito
      </ButtonAdd>
    );
  }

  return (
    <CardContainer
      dark={theme.darkMode}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
      data-testid="card-container"
    >
      <Link to={{ pathname: `/video/${props.videoId}` }}>
        <ImageContainer image={props.image.medium.url} />
        <DescriptionContainer>
          <Title dark={theme.darkMode}>{props.title}</Title>
          <Description>{props.description}</Description>
        </DescriptionContainer>
      </Link>
      <ButtonsContainer shown={shown && authenticated} data-testid="buttons-container">
        {showButton(props.videoId)}
      </ButtonsContainer>
    </CardContainer>
  );
}

export default Card;
