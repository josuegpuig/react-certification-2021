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

import { useAuth } from '../../providers/Auth';

function Header() {
  const history = useHistory();
  const { authenticated, logout } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);

  function deAuthenticate(event) {
    event.preventDefault();
    logout();
    history.push('/');
  }

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
          <input type="text" placeholder="Search" />
        </SearchContainer>
        <SearchIconContainer>
          <StyledSearchIcon />
        </SearchIconContainer>
      </NavSearch>
      <NavButtonContainer onClick={() => setOpenMenu(!openMenu)}>
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
        {authenticated ? (
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
        )}
      </NavActions>
    </HeaderContainer>
  );
}

export default Header;
