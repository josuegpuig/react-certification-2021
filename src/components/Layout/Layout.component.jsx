import React from 'react';
import Header from '../Header';

import { SearchProvider } from '../../hooks/SearchProvider/SearchProvider';
import { Theme } from '../../hooks/ThemeProvider/ThemeProvider';
import { LayoutContainer } from './Layout.styled';

function Layout({ children }) {
  return (
    <SearchProvider>
      <Theme>
        <LayoutContainer>
          <Header />
          {children}
        </LayoutContainer>
      </Theme>
    </SearchProvider>
  );
}

export default Layout;
