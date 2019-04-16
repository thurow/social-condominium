import React, { Component } from 'react'
import { Alert } from 'react-native'
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

	_submitForm = async () => {
		const { email, password } = this.state;

		try {
			const user = await firebase.auth().signInWithEmailAndPassword(email, password)
			this.setState({isAuthenticated: true});
			console.log(user)
		Alert.alert(user.user.email);

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
							onChangeText={(email) => this.setState({ email })}
						/>
						<Input
							value={this.state.password}
							name="password"
							placeholder="Sua Senha"
							secureTextEntry
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
					</Container>
				)}
			</KeyboardShift>
		);
	}

}

export default LoginScreen;
