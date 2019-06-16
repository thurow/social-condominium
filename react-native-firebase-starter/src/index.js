import { createStackNavigator } from 'react-navigation';
import LoginScreen from './containers/login/LoginScreen';
import RegisterScreen from './containers/cadastro/RegisterScreen'
import DashboardScreen from './containers/dashboard/DashboardScreen'
import SocialSpaceRegisterScreen from './containers/spaces/SocialSpaceRegisterScreen'
import PostRegisterScreen from './containers/post/PostRegisterScreen';
import CondominiumScreen from './containers/condominium/CondominiumScreen';
import SocialSpaceListScreen from './containers/spaces/SocialSpaceListScreen';
import { CondominiumListScreen } from './containers/condominium/CondominiumListScreen';

const MainNavigator = createStackNavigator({
  Home: LoginScreen,
  Register: RegisterScreen,
  Dashboard: DashboardScreen,
  SocialSpaceRegister: SocialSpaceRegisterScreen,
  PostRegister: PostRegisterScreen,
  CondominiumRegister: CondominiumScreen,
  CondominiumList: CondominiumListScreen,
  SocialSpaceList: SocialSpaceListScreen
}, {
    headerMode: 'none'
  });

export default { MainNavigator };
