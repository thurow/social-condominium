import React, { Component } from 'react'
import { Card } from 'react-native-elements'
import { Button, StyleSheet, Text } from 'react-native'
import { Container } from '../../styles/styles'
import Menu from '../../components/menu/Menu';
import Header from '../../components/header/Header';
import SideMenu from 'react-native-side-menu';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from "react-redux";
import { clearFields } from '../../actions/actions'
import ActionButton from '../../components/button/ActionButton';

const styles = StyleSheet.create({
    item: {
        fontSize: 20
    }
});

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
        await AsyncStorage.clear()
        this.props.onLogoutAction()
        this.props.navigation.push('Home')
    }


    async componentDidMount() {
        const user = await this.getUserData()
        this.setState({ name: user.firstName })
    }

    render() {
        const { navigation } = this.props;

        const menu = <Menu navigation={navigation} />
        return (
            <SideMenu
                menu={menu}
                isOpen={this.state.isOpen}
                disableGestures
                menuPosition='right'
                onChange={isOpen => this.updateMenuState(isOpen)}
            >
                <Header logged toggleNav={() => this.toggleNav()} />
                <Container>
                    <Card>
                        <Text
                            //onPress={() => this.props.navigation.push('PostRegister')}
                            style={styles.item}
                        >
                            Condomínios
                        </Text>
                    </Card>
                    <Card>
                        <Text
                            onPress={() => this.props.navigation.push('SocialSpaceRegister')}
                            style={styles.item}
                        >
                            Espaços sociais
                        </Text>
                    </Card>
                    <Card containerStyle={{marginBottom: 20}}>
                        <Text
                            onPress={() => this.props.navigation.push('PostRegister')}
                            style={styles.item}
                        >
                            Criar publicação
                        </Text>
                    </Card>

                    <ActionButton action={this.logout} title="Sair" color="red" />
                </Container>
            </SideMenu>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogoutAction: () => dispatch(clearFields())
    }
}

export default connect(null, mapDispatchToProps)(DashboardScreen)
