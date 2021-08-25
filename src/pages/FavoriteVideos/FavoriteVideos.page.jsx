import React from 'react';

import Card from '../../components/Card';
import { useFavorites } from '../../hooks/FavoritesProvider/FavoritesProvider';
import { CardsSection } from './FavoriteVideos.styled';

function HomePage() {
  const { favorites, favoritesList } = useFavorites();

  const videosInfo = () => {
    if (favorites.length === 0) {
      return null;
    }

    return favorites.map((video) => {
      return (
        <Card
          key={video.etag}
          image={video.image}
          title={video.title}
          description={video.description}
          videoId={video.videoId}
          favorite={!!favoritesList[video.videoId]}
        />
      );
    });
  };

  return (
    <>
      <div data-testid="favorite-component">
        <h1>Favorites</h1>
      </div>
      <CardsSection className="cards">{videosInfo()}</CardsSection>
    </>
  );
}

export default HomePage;
