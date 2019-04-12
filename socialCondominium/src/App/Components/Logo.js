import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Image } from 'react-native'
import styles from './Styles/LogoStyle'

export default Logo = () => (
  <View style={styles.containerLogo}>
    <Image source={require('../Images/logo_bg.png')} style={styles.logo} resizeMode="contain" />
  </View>
)

