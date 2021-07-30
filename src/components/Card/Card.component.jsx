import React from 'react';
import { Link } from 'react-router-dom';

import {
  CardContainer,
  DescriptionContainer,
  ImageContainer,
  Title,
  Description,
} from './Card.styled';

function Card(props) {
  return (
    <CardContainer>
      <Link to="/">
        <ImageContainer image={props.image.medium.url} />
        <DescriptionContainer>
          <Title>{props.title}</Title>
          <Description>{props.description}</Description>
        </DescriptionContainer>
      </Link>
    </CardContainer>
  );
}

export default Card;
