import React, { Component, Fragment } from 'react'
import { Card } from 'react-native-elements'
import { StyleSheet, Text } from 'react-native'
import { Container, Title } from '../../styles/styles'
import Menu from '../../components/menu/Menu';
import Header from '../../components/header/Header';
import SideMenu from 'react-native-side-menu';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from "react-redux";
import { clearFields } from '../../actions/actions'
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';

const styles = StyleSheet.create({
    item: {
        fontSize: 20
    },
    logout: {
        fontSize: 20,
        color: 'red'
    }
});

class DashboardScreen extends Component {

    state = {
        name: '',
        condominium: null,
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

    fetchUserData = async () => {
        try {
            const userStr = await AsyncStorage.getItem('@user')
            const user = JSON.parse(userStr)
            this.setState({ name: user.firstName, condominium: user.condominium })
        } catch (e) {
            console.log(e)
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
        await this.fetchUserData()
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
                            <Title>{`Olá ${this.state.name}!`}</Title>
                            <Card>
                                <Text
                                    onPress={() => this.props.navigation.push('CondominiumList')}
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
                                    Cadastro de Espaços sociais
                                </Text>
                            </Card>
                            <Card>
                                <Text
                                    onPress={() => this.props.navigation.push('PostRegister')}
                                    style={styles.item}
                                >
                                    Criar publicação
                                </Text>
                            </Card>
                            <Card>
                                <Text
                                    onPress={() => this.props.navigation.push('QRCodeCamera')}
                                    style={styles.item}
                                >
                                    Ler QRCode
                                </Text>
                            </Card>
                            <Card containerStyle={{ marginBottom: 20 }}>
                                <Text
                                    onPress={() => this.props.navigation.push('SocialSpaceList')}
                                    style={styles.item}
                                >
                                    Espaços Sociais
                                </Text>
                            </Card>
                            <Card containerStyle={{ marginBottom: 20, borderColor: 'red', borderWidth:2 }}>
                                <Text
                                    onPress={this.logout}
                                    style={styles.logout}
                                >
                                    Sair
                                </Text>
                            </Card>
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