import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/ThemeProvider/ThemeProvider';

import {
  CardContainer,
  DescriptionContainer,
  ImageContainer,
  Title,
  Description,
} from './Card.styled';

function Card(props) {
  const { theme } = useTheme();

  return (
    <CardContainer dark={theme.darkMode}>
      <Link to={{ pathname: `/video/${props.videoId}` }}>
        <ImageContainer image={props.image.medium.url} />
        <DescriptionContainer>
          <Title dark={theme.darkMode}>{props.title}</Title>
          <Description>{props.description}</Description>
        </DescriptionContainer>
      </Link>
    </CardContainer>
  );
}

export default Card;
