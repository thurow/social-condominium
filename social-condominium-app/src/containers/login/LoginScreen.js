import React, { Component } from 'react';
import { Alert, Text } from 'react-native';
import {KeyboardAvoidingView} from 'react-native';
import Logo from '../../components/logo/Logo';
import ActionButton from '../../components/button/ActionButton';
import InputTypeText from '../../components/inputs/InpuTypeText';
import { Title, Container } from '../../styles/styles';
import { connect } from "react-redux";
import * as actions from '../../actions/actions'
import firebase from 'react-native-firebase';

class LoginScreen extends Component {
	// state = {
	// 	email: '',
	// 	password: '',
	// 	isAuthenticated: false
	// };

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
		const validInputs = this._validateEmptyInputs();

		try {
			if (validInputs) {
				const user = await firebase.auth().signInWithEmailAndPassword(email, password);
				this.props.navigation.navigate('Dashboard')
			}
		} catch (error) {
			console.log(error);
			Alert.alert('E-mail ou senha estão incorretos');
		}
	};

	render() {
		const {navigate} = this.props.navigation;
		return (
			<KeyboardAvoidingView style behavior="padding" enabled>
				<Container>
					<Logo />
					<Title>Faça seu Login</Title>
					<InputTypeText
						onChange={(email) => this.props.onChangeEmail(email)}
						stateValue={this.props.email}
						name="email"
						placeholder="Digite seu e-mail"
						autoCapitalize="none"
						keyboardType="email-address"
					/>
					<InputTypeText
						stateValue={this.props.password}
						name="password"
						placeholder="Sua Senha"
						secureTextEntry
						onChange={(password) => this.props.onChangePassword(password)}
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

const mapStateToProps = state => {
	return {
		email: state.loginReducer.email,
		password: state.loginReducer.password
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onChangeEmail: (value) => () => dispatch(actions.changeEmail(value)),
		onChangePassword: (value) => () => dispatch(actions.changePassword(value))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
