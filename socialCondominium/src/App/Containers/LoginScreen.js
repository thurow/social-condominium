import React, { Component } from 'react'
import { Text, TextInput, View, Button, Alert } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoginScreenStyle'

class LoginScreen extends Component {
    // state = {
    //   email: '',
    //   password: ''
    // }
  handleEmailChanges (email) {
    this.setState({email})
  }
  handlePasswordChanges (password) {
    this.setState({password})
  }
  render () {
    return (
      <View style={styles.section}>
          <Text style={styles.titleText}>Entre no Condomínio Social</Text>
          <TextInput 
            // value={this.state.email}
            name='email'
            style={styles.textInput}
            placeholder='email@provedor.com'
            autoCapitalize = 'none'
            keyboardType='email-address'
            // onChangeText={this.handleEmailChanges}
          />
          <TextInput 
            // value={this.state.password}
            name='password'
            style={styles.textInput}
            placeholder='Sua Senha'
            secureTextEntry
            // onChangeText={this.handlePasswordChanges}
          />
          <Button 
            title='Entrar'
            onPress={() => Alert.alert('Apertou')}
          />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
