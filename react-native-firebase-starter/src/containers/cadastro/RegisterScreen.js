import React, { Component } from 'react'
import { KeyboardAvoidingView } from 'react-native';
import InpuTypeText from '../../components/inputs/InpuTypeText'
import ActionButton from '../../components/button/ActionButton';
import { Container } from '../../styles/styles'
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../../components/header/Header';
import { SafeAreaView } from 'react-navigation';
import userService from '../../services/userService'

class RegisterScreen extends Component {

  state = {
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  };

  register = async () => {
    const { email, password } = this.state;
    if (!email || !password) {
      alert('O e-mail e a senha são obrigatórios');
      return
    }

    try {
      const authentication = await firebase.auth().createUserWithEmailAndPassword(email, password)
      await userService.createNewUser(authentication.user.uid, {
        firstName: this.state.first_name,
        lastName: this.state.last_name,
        condominium: 'none'
      })
      await this.storeData(authentication);
      this.props.navigation.push('Dashboard')
    } catch (error) {
      console.log(error)
      const isPasswordError = error.message.includes('password')
      const message = isPasswordError ? 'A senha deve conter no mínimo 6 caracteres' : 'E-mail inválido'
      alert(message);
    }

  }

  storeData = async (authentication) => {
    try {
      await AsyncStorage.setItem('@user', JSON.stringify({
        id: authentication.user.uid,
        email: authentication.user.email,
        firstName: this.state.first_name,
        lastName: this.state.last_name,
        condominium: 'none'
      }))
    } catch (e) {
      // saving error
      console.log(e)
    }
  }

  render() {

    return (
      <SafeAreaView>
        <KeyboardAvoidingView behavior="padding" enabled>
          <Header />
          <Container>
            <InpuTypeText
              stateValue={this.state.first_name}
              name='first_name'
              autoCapitalize='words'
              keyboardType='default'
              onChange={first_name => this.setState({ first_name })}
              placeholder='Nome'
            />
            <InpuTypeText
              stateValue={this.state.last_name}
              name='last_name'
              autoCapitalize='words'
              keyboardType='default'
              onChange={last_name => this.setState({ last_name })}
              placeholder='Sobrenome'
            />
            <InpuTypeText
              stateValue={this.state.email}
              name='email'
              autoCapitalize='none'
              keyboardType='email-address'
              onChange={email => this.setState({ email })}
              placeholder='E-mail'
            />
            <InpuTypeText
              stateValue={this.state.password}
              name='password'
              autoCapitalize='none'
              keyboardType='default'
              secureTextEntry={true}
              onChange={password => this.setState({ password })}
              placeholder='Senha'
            />
            <ActionButton
              title="Cadastre-se"
              isPrimary
              action={this.register}
            />
          </Container>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }
}

RegisterScreen.navigationOptions = {
  title: 'Cadastre-se'
}

export default RegisterScreen