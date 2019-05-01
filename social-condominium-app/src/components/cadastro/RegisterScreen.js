import React, { Component } from 'react'
import {KeyboardAvoidingView} from 'react-native';
import InpuTypeText from '../inputs/InpuTypeText'
import ActionButton from '../button/ActionButton';
import Logo from '../logo/Logo';
import { Container } from './styles'

class RegisterScreen extends Component {

  state = {
    first_name: '',
    last_name: '',
		email: '',
		password: ''
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <Container>
          <Logo />
        </Container>
        <Container>
          <InpuTypeText
            stateValue={this.state.first_name}
            name='first_name'
            autoCapitalize='words'
            keyboardType='default'
            onChange={(first_name) => this.setState({first_name})}
            placeholder='Nome'
          />
          <InpuTypeText
            stateValue={this.state.last_name}
            name='last_name'
            autoCapitalize='words'
            keyboardType='default'
            onChange={(last_name) => this.setState({last_name})}
            placeholder='Sobrenome'
          />
          <InpuTypeText
            stateValue={this.state.email}
            name='email'
            autoCapitalize='none'
            keyboardType='email-address'
            onChange={(email) => this.setState({email})}
            placeholder='E-mail'
          />
          <InpuTypeText
            stateValue={this.state.password}
            name='password'
            autoCapitalize='none'
            keyboardType='default'
            secureTextEntry={true}
            onChange={(password) => this.setState({password})}
            placeholder='Sobrenome'
          />
        </Container>
        <Container>
          <ActionButton
            title="Cadastre-se"
            isPrimary
          />
        </Container>
      </KeyboardAvoidingView>
    )
  }
}

RegisterScreen.navigationOptions = {
	title: 'Cadastre-se'
}

export default RegisterScreen