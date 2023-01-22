import styled from 'styled-components'

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;

  @media only screen and (max-width: 600px) {
    top: auto;
    bottom: 0;
  }
`

export const NavbarContainer = styled.nav`
  display: flex;
  padding: 1rem 3rem;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  overflow: hidden;
`

export const NavbarWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  width: 100%;
  align-self: center;
  justify-self: center;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    gap: 1rem;
  }
`

export const NavbarLogo = styled.img`
  max-height: 2.5rem;
  cursor: pointer;
  transition: opacity 0.1s ease-in-out;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  &:hover {
    opacity: 0.75;
  }

  @media only screen and (max-width: 600px) {
    display: none;
  }
`

export const NavbarBackground = styled.img`
  @keyframes spin {
    0% {
      transform: rotate(0deg) translate(0%, -50%) scale(2);
    }
    25% {
      transform: rotate(90deg) translate(-50%, 0%) scale(3);
    }
    50% {
      transform: rotate(180deg) translate(0%, 50%) scale(2);
    }
    50% {
      transform: rotate(270deg) translate(50%, 0%) scale(3);
    }
    100% {
      transform: rotate(360deg) translate(0%, -50%) scale(2);
    }
  }

  position: absolute;
  animation: spin 500s linear infinite;
  transform-origin: 50%;
  z-index: -1;
  max-width: 100vw;
  height: auto;

  @media only screen and (max-width: 600px) {
    display: none;
  }
`

export const NavLinksContainer = styled.ul`
  display: flex;
  list-style: none;
  width: 100%;
  flex-wrap: wrap;
  background: #121212;

  @media only screen and (max-width: 600px) {
    display: none;
  }
`

export const NavLinksItem = styled.li<{
  selected?: boolean
}>`
  align-items: center;
  color: #fff;
  cursor: pointer;
  display: flex;
  flex: 1;
  font-weight: bold;
  justify-content: center;
  transition: opacity 0.1s ease-in-out;
  height: 2.5rem;
  background: #1f1f1f;

  &:hover {
    opacity: 0.75;
  }

  ${({ selected }) =>
    selected &&
    `
    background: #121212;
    `}
`

export const NavSearchContainer = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  position: relative;
  gap: 1rem;
  height: 2.5rem;
  border-radius: 1.25rem;
  background: #1f1f1f;
  overflow: hidden;

  @media only screen and (max-width: 600px) {
    width: 80%;
  }
`

export const NavSearchInput = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  font-size: 1rem;
  color: rgb(168, 169, 173);
  font-weight: bold;
  transition: box-shadow 0.1s ease-in-out;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: rgb(168, 169, 173);
    font-weight: bold;
  }

  /* caret color */
  &::-webkit-input-placeholder {
    color: rgb(168, 169, 173);
  }
  &:-moz-placeholder {
    color: rgb(168, 169, 173);
  }
  &::-moz-placeholder {
    color: rgb(168, 169, 173);
  }
  &:-ms-input-placeholder {
    color: rgb(168, 169, 173);
  }
`

export const NavSearchIcon = styled.div`
  flex: 1;
  cursor: pointer;

  @media only screen and (max-width: 275px) {
    display: none;
  }
`
