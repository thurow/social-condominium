import React, { Component } from 'react';
import { Alert, Text, View } from 'react-native';
import { KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import ActionButton from '../../components/button/ActionButton';
import InputTypeText from '../../components/inputs/InpuTypeText';
import Header from '../../components/header/Header';
import { Title, Container } from '../../styles/styles';
import { connect } from "react-redux";
import * as actions from '../../actions/actions'
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';


GoogleSignin.configure({
	scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
	webClientId: '806706434094-s0mhaernndvqjb2c9gveasr3r622dgie.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
	offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
	hostedDomain: '', // specifies a hosted domain restriction
	loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
	forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
	accountName: '', // [Android] specifies an account name on the device that should be used
	iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
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

	googleSignIn = async () => {
		try {
			await GoogleSignin.hasPlayServices();
			const { idToken, serverAuthCode } = await GoogleSignin.signIn();
			const authCredential = firebase.auth.GoogleAuthProvider.credential(idToken, serverAuthCode)
			const userCredential = await firebase.auth().signInWithCredential(authCredential)
			console.log(userCredential)
		} catch (error) {
			console.log(error)
			console.log(error.code)
		}
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
				lastName: user.get('lastName')
			}
		}

		login = async (type = 'email') => {
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
					const resetAction = StackActions.reset({
						index: 0,
						actions: [NavigationActions.navigate({ routeName: 'Dashboard' })],
					});
					this.props.navigation.dispatch(resetAction);
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
								action={this.googleSignIn}
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
