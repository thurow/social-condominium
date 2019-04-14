import React, { Component } from 'react';
import {
	Text,
	TextInput,
	View,
	TouchableOpacity,
	Alert
} from 'react-native';
import KeyboardShift from './KeyboardShift';
import Logo from '../Components/Logo'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoginScreenStyle';
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
		} catch (error) {
			console.log(error)
		}


		Alert.alert(email, password);
	};

	render() {
		return (
			<KeyboardShift>
				{() => (
					<View>
						<Logo />
						<Text style={styles.titleText}>Faça seu Login</Text>
						<TextInput
							value={this.state.email}
							name="email"
							style={styles.textInput}
							placeholder="Digite seu e-mail"
							autoCapitalize="none"
							keyboardType="email-address"
							onChangeText={(email) => this.setState({ email })}
						/>
						<TextInput
							value={this.state.password}
							name="password"
							style={styles.textInput}
							placeholder="Sua Senha"
							secureTextEntry
							onChangeText={(password) => this.setState({ password })}
							onSubmitEditing={this._submitForm}
						/>
						<TouchableOpacity onPress={this._submitForm}>
							<Text style={styles.button}>Entrar</Text>
						</TouchableOpacity>
					</View>
				)}
			</KeyboardShift>
		);
	}

}

export default LoginScreen;
