import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import LoginScreen from './components/login/LoginScreen';
import RegisterScreen from './components/cadastro/RegisterScreen'
import DashboardScreen from './components/dashboard/DashboardScreen'

const MainNavigator = createStackNavigator({
  Home: LoginScreen,
  Register: RegisterScreen,
  Dashboard: DashboardScreen
}, {
  headerMode: 'none'
});

export default { MainNavigator };
