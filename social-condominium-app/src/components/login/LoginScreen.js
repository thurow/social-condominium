import React, { Component } from 'react';
import { Alert, Text } from 'react-native';
import {KeyboardAvoidingView} from 'react-native';
import Logo from '../logo/Logo';
import ActionButton from '../button/ActionButton';
import InputTypeText from '../inputs/InpuTypeText';
import { Title, Input, Container } from './styles';

import firebase from 'react-native-firebase';

class LoginScreen extends Component {
	state = {
		email: '',
		password: '',
		isAuthenticated: false
	};

	_validateEmptyInputs = () => {
		const { email, password } = this.state;

		if (email === '') {
			Alert.alert('Por favor informe um e-mail válido.');
			return false;
		}
		if (password === '') {
			Alert.alert('Por favor informe uma senha válida.');
			return false;
		}
		return true;
	};

	_submitForm = async () => {
		const { email, password } = this.state;
		const isNotEmptuInputs = this._validateEmptyInputs();

		try {
			if (isNotEmptuInputs) {
				const user = await firebase.auth().signInWithEmailAndPassword(email, password);
				this.setState({ isAuthenticated: true });
				console.log(user);
			}
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		const {navigate} = this.props.navigation;
		return (
			<KeyboardAvoidingView behavior="padding" enabled>
				<Container>
					<Logo />
					<Title>Faça seu Login</Title>
					<InputTypeText
						onChange={(email) => this.setState({ email })}
						stateValue={this.state.email}
						name="email"
						placeholder="Digite seu e-mail"
						autoCapitalize="none"
						keyboardType="email-address"
					/>
					<InputTypeText
						stateValue={this.state.password}
						name="password"
						placeholder="Sua Senha"
						secureTextEntry
						onChange={(password) => this.setState({ password })}
						onSubmitEditing={this._submitForm}
					/>
					<ActionButton action={this._submitForm} title="Entrar" isPrimary />
					<ActionButton action={() => navigate('Register')}
					title="Cadastre-se" />
					<Text>ou</Text>
					{/**
					@TODO transformar botões em somente logo, sem texto
					*/}
					<ActionButton
						// action={}
						title="Login com Facebook"
						color="#3b5998"
						isPrimary
					/>
					<ActionButton
						// action={}
						title="Login com Google"
						color="#d34836"
						isPrimary
					/>
				</Container>
			</KeyboardAvoidingView>
		);
	}
}

LoginScreen.navigationOptions = {
	title: 'Faça Login'
}

export default LoginScreen;
