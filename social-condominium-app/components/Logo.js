import React from 'react'
// import PropTypes from 'prop-types';
import { View, Image } from 'react-native'

export default Logo = () => (
  <View>
    <Image source={require('../assets/logo_bg.png')} resizeMode="contain" />
  </View>
)
