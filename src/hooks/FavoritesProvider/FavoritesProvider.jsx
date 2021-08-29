/* istanbul ignore file */
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { storage } from '../../utils/storage';

const FavoritesProviderContext = createContext(null);

function useFavorites() {
  const context = useContext(FavoritesProviderContext);
  if (!context) {
    throw new Error(`Can't use "useFavorites" without an SearchProvider!`);
  }
  return context;
}

function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [favoritesList, setFavoritesList] = useState({});

  useEffect(() => {
    const lastFavoriteList = storage.get('favorite-list');
    const favoriteListExist = Boolean(lastFavoriteList);

    const lastFavorites = storage.get('favorites');
    const favoritesExist = Boolean(lastFavorites);

    if (favoriteListExist) {
      setFavoritesList(lastFavoriteList);
    }

    if (favoritesExist) {
      setFavorites(lastFavorites);
    }
  }, []);

  const addFavorite = useCallback((video) => {
    setFavoritesList((prevList) => {
      const newList = { ...prevList, [video.videoId]: true };
      storage.set('favorite-list', newList);

      return newList;
    });
    setFavorites((favorite) => {
      const newFavorites = [...favorite, video];
      storage.set('favorites', newFavorites);

      return newFavorites;
    });
  }, []);

  const removeFavorite = useCallback((id) => {
    setFavoritesList((prevList) => {
      const newList = { ...prevList };
      delete newList[id];
      storage.set('favorite-list', newList);

      return newList;
    });
    setFavorites((favorite) => {
      const newFavorites = [...favorite];
      const index = newFavorites.findIndex((element) => element.videoId === id);
      newFavorites.splice(index, 1);
      storage.set('favorites', newFavorites);

      return newFavorites;
    });
  }, []);

  return (
    <FavoritesProviderContext.Provider
      value={{ favorites, addFavorite, removeFavorite, favoritesList }}
    >
      {children}
    </FavoritesProviderContext.Provider>
  );
}

export { useFavorites, FavoritesProvider };
