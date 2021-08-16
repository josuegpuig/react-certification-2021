/* istanbul ignore file */
import styled, { css } from 'styled-components';
import { ReactComponent as SearchIcon } from './searchIcon.svg';

export const StyledSearchIcon = styled(SearchIcon)`
  height: 20px;
  width: 20px;
  fill: ${(props) => (props.theme.darkMode ? 'white' : 'black')};
`;

export const SearchContainer = styled.div`
  height: 32px;
  padding: 0 0.25rem;
  border: solid 1px gray;
  border-radius: 5px 0 0 5px;

  input {
    height: 26px;
    width: 300px;
    border: none;
    background-color: transparent;
    color: ${(props) => (props.theme.darkMode ? 'white' : 'black')};

    &:focus {
      outline: none;
    }

    @media (max-width: 768px) {
      width: auto;
    }
  }

  @media (max-width: 768px) {
    flex-grow: 1;
  }
`;

export const SearchIconContainer = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  border: solid 1px gray;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
`;

export const NavIcon = styled.div`
  cursor: pointer;

  a {
    color: inherit;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavSearch = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-grow: 0.8;
  }
`;

export const NavActions = styled.div`
  display: flex;

  a {
    color: inherit;
  }

  div {
    padding: 4px 6px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    opacity: 0;
    width: 100%;
    max-height: 0;
    transition: all 0.2s ease-out;
    transition-property: max-height;
    ${(props) =>
      props.click &&
      css`
        max-height: 240px;
        opacity: 1;
      `};
  }
`;

export const Toggle = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 25px;
  top: 1px;

  input {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + span {
      background-color: #2196f3;
    }
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 34px;

    &:before {
      position: absolute;
      content: '';
      height: 18px;
      width: 18px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
      border-radius: 50%;
    }
  }

  input:focus + span {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + span:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
`;

export const NavButtonContainer = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const NavButton = styled.span`
  background: ${(props) => (props.click ? 'transparent' : '#333')};
  display: block;
  height: 2px;
  position: relative;
  transition: background 0.2s ease-out;
  width: 18px;

  &:before,
  &:after {
    background: #333;
    content: '';
    display: block;
    height: 100%;
    position: absolute;
    transition: all 0.2s ease-out;
    width: 100%;
  }

  &:before {
    top: ${(props) => (props.click ? 0 : '5px')};
    transform: ${(props) => (props.click ? 'rotate(-45deg)' : 'none')};
  }

  &:after {
    top: ${(props) => (props.click ? 0 : '-5px')};
    transform: ${(props) => (props.click ? 'rotate(45deg)' : 'none')};
  }
`;

export const HeaderContainer = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 3.5rem;
  height: 3.5rem;
  padding: 0 1rem;
  background-color: ${(props) => (props.theme.darkMode ? 'black' : 'white')};
  color: ${(props) => (props.theme.darkMode ? 'white' : 'black')};
  box-shadow: inset 0 -1px 0 0 #ebebeb;
  position: fixed;
  top: 0;
  @media (max-width: 768px) {
    position: relative;
    flex-wrap: wrap;
    padding: 0.25rem 0.5rem;
    min-height: unset;
    max-height: unset;
    height: fit-content;
    background-color: white;
    z-index: 1;
  }
`;
