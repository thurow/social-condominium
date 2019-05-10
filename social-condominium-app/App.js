import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Reducers } from './src/reducers';
export const Store = createStore(Reducers);

import Navigator from './src';
import { createAppContainer } from 'react-navigation';

const Main = createAppContainer(Navigator.MainNavigator)

const App = () => (
  <Provider store={store}>
    <Main />
  </Provider>
)

export default App
