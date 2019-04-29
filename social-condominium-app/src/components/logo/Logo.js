import React from 'react'
import { LogoContainer, LogoImage } from './styles'

export default Logo = () => (
  <LogoContainer>
    <LogoImage source={require('../../assets/logo_bg.png')} resizeMode="contain" />
  </LogoContainer>
)
