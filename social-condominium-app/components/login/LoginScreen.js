import React, { Component } from 'react'
import {
	TouchableOpacity,
	Alert
} from 'react-native'
import KeyboardShift from '../keyboardshift/KeyboardShift'
import Logo from '../logo/Logo'
import { Title, Input, SubmitButton, Container } from './styles'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
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
						<TouchableOpacity onPress={this._submitForm}>
							<SubmitButton>Entrar</SubmitButton>
						</TouchableOpacity>
					</Container>
				)}
			</KeyboardShift>
		);
	}

}

export default LoginScreen;
