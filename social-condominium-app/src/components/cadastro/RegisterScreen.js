import React, { Component } from 'react'
import { Text, View } from 'react-native'

class RegisterScreen extends Component {
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    )
  }
}

RegisterScreen.navigationOptions = {
	title: 'Cadastre-se'
}

export default RegisterScreen