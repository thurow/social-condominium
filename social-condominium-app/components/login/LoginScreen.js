import React, { Component } from 'react'
import { Alert, Text } from 'react-native'
import KeyboardShift from '../keyboardshift/KeyboardShift'
import Logo from '../logo/Logo'
import ActionButton from '../button/ActionButton'
import { Title, Input, Container } from './styles'

import firebase from 'react-native-firebase';

class LoginScreen extends Component {
	state = {
		email: '',
		password: '',
		isAuthenticated: false
	};

	_validateEmptyInputs = () => {
		const { email, password } = this.state

		if (email === '') {
			Alert.alert("Por favor informe um e-mail válido.")
			return false
		}
		if (password === '') {
			Alert.alert("Por favor informe uma senha válida.")
			return false
		}
		return true
	}

	_submitForm = async () => {
		const { email, password } = this.state;
		const isEmptyInputs = this._validateEmptyInputs()

		try {
			if (isEmptyInputs) {
				const user = await firebase.auth().signInWithEmailAndPassword(email, password)
				this.setState({isAuthenticated: true});
				console.log(user)
				Alert.alert(user.user.email);
			}
		} catch (error) {
			console.log(error)
		}
	};

	render() {
		return (
			<KeyboardShift>
				{() => (
					<Container>
						<Logo />
						<Title>Faça seu Login</Title>
						<Input
							value={this.state.email}
							name="email"
							placeholder="Digite seu e-mail"
							autoCapitalize="none"
							keyboardType="email-address"
							isValid={true}
							onChangeText={(email) => this.setState({ email })}
						/>
						<Input
							value={this.state.password}
							name="password"
							placeholder="Sua Senha"
							secureTextEntry
							isValid={true}
							onChangeText={(password) => this.setState({ password })}
							onSubmitEditing={this._submitForm}
						/>
						<ActionButton
							action={this._submitForm}
							title='Entrar'
							isPrimary
						/>
						<ActionButton
							// action={}
							title='Cadastre-se'
						/>
						<Text>ou</Text>
						{/**
						@TODO transformar botões em somente logo, sem texto
						*/}
						<ActionButton
							// action={}
							title='Login com Facebook'
							color='#3b5998'
							isPrimary
						/>
						<ActionButton
							// action={}
							title='Login com Google'
							color='#d34836'
							isPrimary
						/>
					</Container>
				)}
			</KeyboardShift>
		);
	}

}

export default LoginScreen;
