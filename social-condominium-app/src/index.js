import { createDrawerNavigator } from 'react-navigation';
import LoginScreen from './components/login/LoginScreen';
import RegisterScreen from './components/cadastro/RegisterScreen'

const MainNavigator = createDrawerNavigator({
  Home: LoginScreen,
  Register: RegisterScreen
});

export default { MainNavigator };
