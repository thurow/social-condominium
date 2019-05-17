import React, { Component } from 'react';
import { Alert, Text, View } from 'react-native';
import { KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import ActionButton from '../../components/button/ActionButton';
import InputTypeText from '../../components/inputs/InpuTypeText';
import { Title, Container } from '../../styles/styles';
import { connect } from "react-redux";
import * as actions from '../../actions/actions'
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';

class LoginScreen extends Component {

	state = {
		loggedIn: null
	}

	isUserLoggedIn = async () => {
		const user = await AsyncStorage.getItem('@user')
		return user !== null
	}

	_validateEmptyInputs = () => {
		const { email, password } = this.props;

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

	storeData = async (user) => {
		try {
			await AsyncStorage.setItem('@user', JSON.stringify({
				id: user.uid,
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName
			}))
		} catch (e) {
			// saving error
			console.log(e)
		}
	}

	_submitForm = async () => {
		const { email, password } = this.props;
		const validInputs = this._validateEmptyInputs();
		try {
			if (validInputs) {
				const authentication = await firebase.auth().signInWithEmailAndPassword(email, password);
				const user = await firebase.firestore().collection('users').doc(authentication.user.uid).get()
				const userProfile = {
					uid: authentication.user.uid,
					email: email,
					firstName: user.get('firstName'),
					lastName: user.get('lastName')
				}
				await this.storeData(userProfile);
				this.props.navigation.navigate('Dashboard')
			}
		} catch (error) {
			console.log(error);
			Alert.alert('E-mail ou senha estão incorretos');
		}
	};

	async componentDidMount() {
		let loggedIn = await this.isUserLoggedIn()

		setTimeout(() => {
			if (loggedIn) {
				this.props.navigation.navigate('Dashboard')
			}
			this.setState({ loggedIn })
		}, 2000) //Demorar = Credibilidade

	}

	render() {
		const { loggedIn } = this.state
		const { navigate } = this.props.navigation;
		const { email, password, onChangeEmail, onChangePassword } = this.props;
		return (
			<KeyboardAvoidingView style behavior="padding" enabled>
				<Container>
					{loggedIn === null &&
						<ActivityIndicator size="large" color="#d33028" />
					}
					<View style={loggedIn === null ? { display: 'none' } : {}}>
						<Title>Faça seu Login</Title>
						<InputTypeText
							onChange={(value) => onChangeEmail(value)}
							stateValue={email}
							name="email"
							placeholder="Digite seu e-mail"
							autoCapitalize="none"
							keyboardType="email-address"
						/>
						<InputTypeText
							stateValue={password}
							name="password"
							placeholder="Sua Senha"
							secureTextEntry
							onChange={(password) => onChangePassword(password)}
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
							title="Login com Facebook"
							color="#3b5998"
							isPrimary
						/>
						<ActionButton
							title="Login com Google"
							color="#d34836"
							isPrimary
						/>
					</View>

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
		email: state.loginState.email,
		password: state.loginState.password
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onChangeEmail: (newValue) => dispatch(actions.changeEmail(newValue)),
		onChangePassword: (newValue) => dispatch(actions.changePassword(newValue))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
