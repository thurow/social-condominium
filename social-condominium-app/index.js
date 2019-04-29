/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import Navigator from './src';
import { createAppContainer } from 'react-navigation';

const App = createAppContainer(Navigator.MainNavigator)

AppRegistry.registerComponent(appName, () => App);
