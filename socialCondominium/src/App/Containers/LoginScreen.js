import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, Alert, Image } from 'react-native';

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoginScreenStyle';

class LoginScreen extends Component {
  state = {
    email: '',
    password: ''
  }
	render() {
		return (
			<View style={styles.container}>
        <View style={styles.containerLogo}>
          <Image source={require('../Images/logo_bg.png')} style={styles.logo} resizeMode="contain" />
        </View>
        <View style={styles.mainContainer}>
				  <Text style={styles.titleText}>Entre no Condomínio Social</Text>
          <TextInput
            value={this.state.email}
            name="email"
            style={styles.textInput}
            placeholder="email@provedor.com"
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={email => this.setState({email})}
          />
          <TextInput
            value={this.state.password}
            name="password"
            style={styles.textInput}
            placeholder="Sua Senha"
            secureTextEntry
            onChangeText={password => this.setState({password})}
            onSubmitEditing={this._submitForm}
          />
          <TouchableOpacity onPress={this._submitForm}>
            <Text style={styles.button}>Entrar</Text>
          </TouchableOpacity>
        </View>
			</View>
		);
  }

  _submitForm = () => {
    const { email, password } = this.state
    Alert.alert(email, password)
    // do some stuff here…
  };
}

export default LoginScreen;
