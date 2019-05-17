import React from 'react'
import Logo from '../logo/Logo';
import { LoggedContainer, NormalContainer } from './styles';
import MenuButton from '../menu/MenuButton';

const Header = ({ logged, toggleNav }) => {
    if (logged) {
        return (
          <LoggedContainer >
              <Logo logged />
              <MenuButton toggleNav={toggleNav} />
          </LoggedContainer>
        )
      } else {
        return (
            <NormalContainer>
                <Logo />
            </NormalContainer>
        )
      }
}

Header.defaultProps = {
    logged: false
}

export default Header
