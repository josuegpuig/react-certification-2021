import React, { useEffect, useRef } from 'react';

// import videoMocks from '../../utils/youtube-videos-mock.json';
import { HomeSection, CardsSection } from './Home.styled';

import Card from '../../components/Card';
import { SearchVideos } from '../../resources/calls';
import { fetchSearch } from '../../utils/fetchApi';
import { useSearch } from '../../hooks/SearchProvider/SearchProvider';
import { useFavorites } from '../../hooks/FavoritesProvider/FavoritesProvider';

function HomePage() {
  const sectionRef = useRef(null);
  const { search, changeSearch } = useSearch();
  const { favoritesList } = useFavorites();

  useEffect(() => {
    function SearchVideo() {
      const url = SearchVideos('wizeline');
      fetchSearch(url, changeSearch);
    }

    SearchVideo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const videosInfo = () => {
    if (search === '') {
      return null;
    }

    return search.items.map((video) => {
      return (
        <Card
          key={video.etag}
          image={video.snippet.thumbnails}
          title={video.snippet.title}
          description={video.snippet.description}
          videoId={video.id.videoId}
          favorite={!!favoritesList[video.id.videoId]}
        />
      );
    });
  };

  return (
    <>
      <HomeSection className="homepage" ref={sectionRef} data-testid="home-component">
        <h1>Hello stranger!</h1>
      </HomeSection>
      <CardsSection className="cards">{videosInfo()}</CardsSection>
    </>
  );
}

export default HomePage;
