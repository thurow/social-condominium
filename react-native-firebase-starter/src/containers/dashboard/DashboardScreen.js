import React, { Component, Fragment } from 'react'
import { Card } from 'react-native-elements'
import { Button } from 'react-native'
import { Container } from '../../styles/styles'
import Menu from '../../components/menu/Menu';
import Header from '../../components/header/Header';
import SideMenu from 'react-native-side-menu';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from "react-redux";
import { clearFields } from '../../actions/actions'
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';

class DashboardScreen extends Component {

    state = {
        name: null,
        isOpen: false
    }

    toggleNav() {
        this.setState({
          isOpen: !this.state.isOpen
        })
      }

      updateMenuState(isOpen) {
        this.setState({ isOpen });
      }

    getUserData = async () => {
        try {
            const user = await AsyncStorage.getItem('@user')
            return JSON.parse(user)
        } catch (e) {
            console.log(e)
            return null
        }
    }

    logout = async () => {
        try {
            await AsyncStorage.clear()
            this.props.onLogoutAction()
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Home' })],
            });
            this.props.navigation.dispatch(resetAction);
        } catch (err) {
            console.log(err)
        }
    }


    async componentDidMount() {
        const user = await this.getUserData()
        this.setState({ name: user.firstName })
    }

    render() {
        const { navigation } = this.props;

        const menu = <Menu navigation={navigation} />
        return (
            <Fragment>
                <SafeAreaView style={{ flex: 0, backgroundColor: '#eb4444' }} />
                <SafeAreaView style={{ flex: 1, backgroundColor: '#3b5998' }}>
                    <SideMenu
                        menu={menu}
                        isOpen={this.state.isOpen}
                        menuPosition='right'
                        onChange={isOpen => this.updateMenuState(isOpen)}
                    >
                        <Header logged toggleNav={() => this.toggleNav()} />
                        <Container>
                            <Card title={`Olá ${this.state.name}`}>
                                <Button title="Gerenciar condomínios" />
                                <Button
                                    title="Cadastrar Espaços Sociais"
                                    onPress={() => navigation.push('SocialSpaceRegister')}
                                />
                            </Card>
                            <Button title="Sair" onPress={this.logout} />
                        </Container>
                    </SideMenu>
                </SafeAreaView>
             </Fragment>
           )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogoutAction: () => dispatch(clearFields())
    }
}

export default connect(null, mapDispatchToProps)(DashboardScreen)
