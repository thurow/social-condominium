import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import ActionButton from '../../components/button/ActionButton';
import InputTypeText from '../../components/inputs/InpuTypeText';
import Header from '../../components/header/Header';
import { Title, Container } from '../../styles/styles';
import { connect } from "react-redux";
import * as actions from '../../actions/actions'
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions, SafeAreaView } from 'react-navigation';
import { GoogleSignin } from 'react-native-google-signin';
import userService from '../../services/userService'


GoogleSignin.configure({
	webClientId: '806706434094-s0mhaernndvqjb2c9gveasr3r622dgie.apps.googleusercontent.com',
	offlineAccess: true,
	forceConsentPrompt: true
});

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
			alert('Por favor informe um e-mail válido.');
			return false;
		}
		if (password === '') {
			alert('Por favor informe uma senha válida.');
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
				lastName: user.lastName,
				condominium: user.condominium
			}))
			const fbUser = await firebase.firestore().collection('users').doc(user.uid).get()
			const fbUserData = fbUser.data()
			if (fbUserData.condominium != null) {
				const condominium = await fbUserData.condominium.get()
				if (condominium.exists) {
					await AsyncStorage.setItem('@condominium', condominium.id)
				}
			}

		} catch (e) {
			// saving error
			console.log(e)
		}
	}

	googleSignIn = async () => {
		await GoogleSignin.hasPlayServices();
		const { idToken, serverAuthCode } = await GoogleSignin.signIn();
		const authCredential = firebase.auth.GoogleAuthProvider.credential(idToken, serverAuthCode)
		const { user } = await firebase.auth().signInWithCredential(authCredential)
		const userProfile = {
			uid: user.uid,
			email: user.email,
			firstName: user.displayName,
		}
		await userService.createUserIfNotExists(userProfile.uid, userProfile)
		return userProfile
	}

	emailSignIn = async () => {
		const { email, password } = this.props;
		const validInputs = this._validateEmptyInputs();

		if (validInputs) {
			const authentication = await firebase.auth().signInWithEmailAndPassword(email, password);
			const user = await firebase.firestore().collection('users').doc(authentication.user.uid).get()
			const userProfile = {
				uid: authentication.user.uid,
				email: email,
				firstName: user.get('firstName'),
				lastName: user.get('lastName'),
				condominium: user.get('condominium')
			}
			return userProfile
		}
		return null;
	}

	login = async (type = 'email') => {
		let signIn = null
		if (type === 'google') {
			signIn = this.googleSignIn
		} else {
			signIn = this.emailSignIn
		}

		try {
			const userProfile = await signIn()
			await this.storeData(userProfile);
			const resetAction = StackActions.reset({
				index: 0,
				actions: [NavigationActions.navigate({ routeName: 'Dashboard' })],
			});
			this.props.navigation.dispatch(resetAction);
		} catch (error) {
			console.log(error);
			alert('Não foi possível autenticar-se, verifique suas credenciais');
		}
	};

	async componentDidMount() {
		let loggedIn = await this.isUserLoggedIn()

		setTimeout(() => {
			if (loggedIn) {
				const resetAction = StackActions.reset({
					index: 0,
					actions: [NavigationActions.navigate({ routeName: 'Dashboard' })],
				});
				this.props.navigation.dispatch(resetAction);
			}
			this.setState({ loggedIn })
		}, 100) //Demorar = Credibilidade

	}

	render() {
		const { loggedIn } = this.state
		const { push } = this.props.navigation;
		const { email, password, onChangeEmail, onChangePassword } = this.props;
		return (
			<KeyboardAvoidingView style behavior="padding" enabled>
				<SafeAreaView>
					<Header />
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
								onSubmitEditing={this.login}
							/>
							<ActionButton action={this.login} title="Entrar" isPrimary />
							<ActionButton action={() => push('Register')}
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
								action={() => this.login('google')}
							/>
						</View>

					</Container>
				</SafeAreaView>
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
