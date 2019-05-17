import React from 'react'
import { LogoImage, LogoImageLoggedIn } from './styles'


export default Logo = ({ logged = false }) => {
  if (logged) {
    return (
      <LogoImageLoggedIn source={require('../../assets/logo_bg.png')} resizeMode="contain" />
    )
  } else {
    return (
      <LogoImage  source={require('../../assets/logo_bg.png')} resizeMode="contain" />
    )
  }
}
