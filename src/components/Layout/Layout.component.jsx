import React from 'react';
import Header from '../Header';

import { SearchProvider } from '../../hooks/SearchProvider/SearchProvider';

import './Layout.styles.css';

function Layout({ children }) {
  return (
    <SearchProvider>
      <main className="container">
        <Header />
        {children}
      </main>
    </SearchProvider>
  );
}

export default Layout;
