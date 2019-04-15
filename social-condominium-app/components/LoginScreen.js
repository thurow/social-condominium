import React, { Component } from 'react';
import {
	Text,
	TextInput,
	View,
	TouchableOpacity,
	Alert
} from 'react-native';
import KeyboardShift from './KeyboardShift';
import Logo from './Logo'
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
					<View>
						{/* <Logo /> */}
						<Text>Faça seu Login</Text>
						<TextInput
							value={this.state.email}
							name="email"
							placeholder="Digite seu e-mail"
							autoCapitalize="none"
							keyboardType="email-address"
							onChangeText={(email) => this.setState({ email })}
						/>
						<TextInput
							value={this.state.password}
							name="password"
							placeholder="Sua Senha"
							secureTextEntry
							onChangeText={(password) => this.setState({ password })}
							onSubmitEditing={this._submitForm}
						/>
						<TouchableOpacity onPress={this._submitForm}>
							<Text>Entrar</Text>
						</TouchableOpacity>
					</View>
				)}
			</KeyboardShift>
		);
	}

}

export default LoginScreen;
