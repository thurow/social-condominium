import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'

const image = require('../../assets/drawer.png');

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        top: 10,
        padding: 10,
        right: 5,
    }
});

const MenuButton = ({ toggleNav }) => {
  return (
    <TouchableOpacity
        onPress={toggleNav}
        style={styles.button}
        >
        <Image
            source={image}
            style={{ width: 32, height: 32 }}
        />
    </TouchableOpacity>
  )
}

export default MenuButton
