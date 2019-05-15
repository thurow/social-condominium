import React from 'react'
import { LogoContainer, LogoImage, LogoImageLoggedIn, LogoContainerLoggedIn } from './styles'


export default Logo = ({ logged = false }) => {
  if (logged) {
    return (
      <LogoContainerLoggedIn>
        <LogoImageLoggedIn source={require('../../assets/logo_bg.png')} resizeMode="contain" />
      </LogoContainerLoggedIn>
    )
  } else {
    return (
      <LogoContainer>
        <LogoImage  source={require('../../assets/logo_bg.png')} resizeMode="contain" />
      </LogoContainer>
    )
  }
}
