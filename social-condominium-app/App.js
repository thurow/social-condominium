import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Reducers } from './src/reducers';
import SideMenu from 'react-native-side-menu';
import Navigator from './src';
import { createAppContainer } from 'react-navigation';
import Menu from './src/components/menu/Menu';
import Header from './src/components/header/Header';

const store = createStore(Reducers);
const Main = createAppContainer(Navigator.MainNavigator)

class App extends React.Component {

  state = {
    isOpen: false,
    isLoggedIn: false
  }

  toggleNav() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  render() {
    return (
      <Provider store={store}>
        <SideMenu
            menu={<Menu />}
            isOpen={this.state.isOpen}
            disableGestures
            menuPosition='right'
            onChange={isOpen => this.updateMenuState(isOpen)}
          >
          {/** @TODO verificar solucao para mostrar header logado somente quando estiver logado */}
          <Header logged toggleNav={() => this.toggleNav()} />
          <Main />
        </SideMenu>
      </Provider>
    )
  }
}

export default App
