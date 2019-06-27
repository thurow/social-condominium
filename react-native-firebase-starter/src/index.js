import { createStackNavigator } from 'react-navigation';
import LoginScreen from './containers/login/LoginScreen';
import RegisterScreen from './containers/cadastro/RegisterScreen'
import DashboardScreen from './containers/dashboard/DashboardScreen'
import SocialSpaceRegisterScreen from './containers/spaces/SocialSpaceRegisterScreen'
import PostRegisterScreen from './containers/post/PostRegisterScreen';
import CondominiumScreen from './containers/condominium/CondominiumScreen';
import SocialSpaceListScreen from './containers/spaces/SocialSpaceListScreen';
import QRCodeCameraScreen from './containers/Camera/QRCodeCameraScreen';
import CondominiumListScreen from './containers/condominium/CondominiumListScreen';
import SocialSpaceScreen from './containers/spaces/SocialSpaceScreen';
import RegisterInCondominiumScreen from './containers/cadastro/RegisterInCondominiumScreen';
import PostListScreen from './containers/post/PostListScreen';

const MainNavigator = createStackNavigator({
  Home: LoginScreen,
  Register: RegisterScreen,
  Dashboard: DashboardScreen,
  SocialSpaceRegister: SocialSpaceRegisterScreen,
  PostRegister: PostRegisterScreen,
  PostList: PostListScreen,
  CondominiumRegister: CondominiumScreen,
  SocialSpaceList: SocialSpaceListScreen,
  QRCodeCamera: QRCodeCameraScreen,
  CondominiumList: CondominiumListScreen,
  SocialSpace: SocialSpaceScreen,
  RegisterInCondominium: RegisterInCondominiumScreen
}, {
    headerMode: 'none'
  });

export default { MainNavigator };
