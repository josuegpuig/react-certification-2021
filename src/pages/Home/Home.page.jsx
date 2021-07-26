import React, { useRef } from 'react';

import videoMocks from '../../utils/youtube-videos-mock.json';
import { HomeSection, CardsSection } from './Home.styled';

import Card from '../../components/Card';

function HomePage() {
  const sectionRef = useRef(null);

  const videosInfo = () => {
    return videoMocks.items.map((video) => {
      return (
        <Card
          key={video.etag}
          image={video.snippet.thumbnails}
          title={video.snippet.title}
          description={video.snippet.description}
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
