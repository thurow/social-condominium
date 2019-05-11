import { createStackNavigator } from 'react-navigation';
import LoginScreen from './containers/login/LoginScreen';
import RegisterScreen from './containers/cadastro/RegisterScreen'
import DashboardScreen from './containers/dashboard/DashboardScreen'
import AsyncStorage from '@react-native-community/async-storage';

const isUserLoggedIn = async () => {
  const user = await AsyncStorage.getItem('@user')
  return user !== null
}

const MainNavigator = createStackNavigator({
  Home: isUserLoggedIn() ? DashboardScreen : LoginScreen,
  Register: RegisterScreen,
  Dashboard: DashboardScreen
}, {
  headerMode: 'none'
});

export default { MainNavigator };
