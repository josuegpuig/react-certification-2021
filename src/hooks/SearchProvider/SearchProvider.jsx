import React, { createContext, useContext, useState } from 'react';

const SearchProviderContext = createContext(null);

function useSearch() {
  const context = useContext(SearchProviderContext);
  if (!context) {
    throw new Error(`Can't use "useSearch" without an SearchProvider!`);
  }
  return context;
}

function SearchProvider({ children }) {
  const [search, setSearch] = useState('');

  function changeSearch(term) {
    setSearch(term);
  }

  return (
    <SearchProviderContext.Provider value={{ search, changeSearch }}>
      {children}
    </SearchProviderContext.Provider>
  );
}

export { useSearch, SearchProvider };
