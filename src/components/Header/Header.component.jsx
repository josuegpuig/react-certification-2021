import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
import { fetchSearch } from '../../utils/fetchApi';

function Header() {
  const history = useHistory();
  const { authenticated, logout } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);
  const [term, setTerm] = useState('wizeline');
  const { changeSearch } = useSearch();

  function SearchVideo() {
    const url = SearchVideos(term);
    fetchSearch(url, changeSearch);
  }

  function deAuthenticate(event) {
    event.preventDefault();
    logout();
    history.push('/');
  }

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
        <Link to="/login" onClick={() => setOpenMenu(false)}>
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
    <HeaderContainer>
      <NavIcon>
        <Link to="/">Home</Link>
      </NavIcon>
      <NavSearch>
        <SearchContainer>
          <input
            type="text"
            placeholder="Search"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </SearchContainer>
        <SearchIconContainer onClick={() => SearchVideo()}>
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
        <div>
          <Toggle>
            <input type="checkbox" />
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
