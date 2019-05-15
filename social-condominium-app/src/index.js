import { createStackNavigator } from 'react-navigation';
import LoginScreen from './containers/login/LoginScreen';
import RegisterScreen from './containers/cadastro/RegisterScreen'
import DashboardScreen from './containers/dashboard/DashboardScreen'
import AsyncStorage from '@react-native-community/async-storage';

const MainNavigator = createStackNavigator({
  Home: LoginScreen,
  Register: RegisterScreen,
  Dashboard: DashboardScreen
}, {
    headerMode: 'none'
  });

export default { MainNavigator };
