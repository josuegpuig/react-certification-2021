import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import {
  HeaderContainer,
  NavActions,
  NavIcon,
  NavSearch,
  StyledSearchIcon,
  SearchContainer,
  SearchIconContainer,
  NavButton,
  NavButtonContainer,
  Toggle,
} from './Header.styled';
import { SearchVideos } from '../../resources/calls';

import { useAuth } from '../../providers/Auth';
import { useSearch } from '../../hooks/SearchProvider/SearchProvider';
import { useTheme } from '../../hooks/ThemeProvider/ThemeProvider';
import { fetchSearch } from '../../utils/fetchApi';

function Header() {
  const history = useHistory();
  const { authenticated, logout } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);
  const [darkToggle, setDarkToggle] = useState(false);
  const [term, setTerm] = useState('wizeline');
  const { changeSearch } = useSearch();
  const { setTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    setTheme({ type: `${darkToggle ? 'DARKMODE' : 'LIGHTMODE'}` });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [darkToggle]);

  function SearchVideo() {
    const url = SearchVideos(term);
    fetchSearch(url, changeSearch);
  }

  function deAuthenticate(event) {
    event.preventDefault();
    logout();
    history.push('/');
  }

  const FavoritesButton = () => {
    return authenticated ? <Link to="/favorites">Favorites</Link> : null;
  };

  const AuthButton = () => {
    return authenticated ? (
      <>
        <div>
          <Link to="/" onClick={deAuthenticate}>
            ← logout
          </Link>
        </div>
      </>
    ) : (
      <div>
        <Link
          to={{
            pathname: '/login',
            state: { prev: location.pathname },
          }}
          onClick={() => setOpenMenu(false)}
        >
          Log In
        </Link>
      </div>
    );
  };

  let homeButton;
  if (openMenu) {
    homeButton = (
      <div>
        <Link to="/" onClick={() => setOpenMenu(false)}>
          Home
        </Link>
      </div>
    );
  }

  return (
    <HeaderContainer data-testid="HeaderMenu">
      <NavIcon>
        <Link to="/">Home</Link>
      </NavIcon>
      <NavSearch>
        <SearchContainer>
          <input
            data-testid="SearchMenu"
            type="text"
            placeholder="Search"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </SearchContainer>
        <SearchIconContainer data-testid="button-search" onClick={() => SearchVideo()}>
          <StyledSearchIcon />
        </SearchIconContainer>
      </NavSearch>
      <NavButtonContainer
        data-testid="button-menu"
        onClick={() => setOpenMenu(!openMenu)}
      >
        <NavButton click={openMenu} />
      </NavButtonContainer>
      <NavActions click={openMenu}>
        {homeButton}
        {FavoritesButton()}
        <div>
          <Toggle>
            <input
              data-testid="check-theme"
              type="checkbox"
              checked={darkToggle}
              onChange={() => setDarkToggle((dark) => !dark)}
            />
            <span />
          </Toggle>
          Dark Mode
        </div>
        {AuthButton()}
      </NavActions>
    </HeaderContainer>
  );
}

export default Header;
