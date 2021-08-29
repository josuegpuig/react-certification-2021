import React from 'react';
import Header from '../Header';

import { SearchProvider } from '../../hooks/SearchProvider/SearchProvider';
import { Theme } from '../../hooks/ThemeProvider/ThemeProvider';
import { LayoutContainer } from './Layout.styled';
import { FavoritesProvider } from '../../hooks/FavoritesProvider/FavoritesProvider';

function Layout({ children }) {
  return (
    <SearchProvider>
      <Theme>
        <FavoritesProvider>
          <LayoutContainer>
            <Header />
            {children}
          </LayoutContainer>
        </FavoritesProvider>
      </Theme>
    </SearchProvider>
  );
}

export default Layout;
