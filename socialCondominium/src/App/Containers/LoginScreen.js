import React, { Component } from 'react';
import {
	Animated,
	Dimensions,
	Keyboard,
	Text,
	TextInput,
	View,
	TouchableOpacity,
	Alert,
	Image,
	UIManager,
	TextInputState
} from 'react-native';
import KeyboardShift from './KeyboardShift';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoginScreenStyle';

class LoginScreen extends Component {
	state = {
		email: '',
		password: ''
	};
	render() {
		return (
			<KeyboardShift>
				{() => (
					<View>
						<View style={styles.containerLogo}>
							<Image source={require('../Images/logo_bg.png')} style={styles.logo} resizeMode="contain" />
						</View>
						<Text style={styles.titleText}>Faça seu Login</Text>
						<TextInput
							value={this.state.email}
							name="email"
							style={styles.textInput}
							placeholder="email@provedor.com"
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

	_submitForm = () => {
		const { email, password } = this.state;
		Alert.alert(email, password);
		// do some stuff here…
	};
}

export default LoginScreen;
