import React, { Component } from 'react'
import { Card } from 'react-native-elements'
import { Button } from 'react-native'
import { Container } from '../../styles/styles'

import AsyncStorage from '@react-native-community/async-storage';
import { connect } from "react-redux";
import { clearFields } from '../../actions/actions'
import Logo from '../../components/logo/Logo';

class DashboardScreen extends Component {


    state = {
        name: null
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
        this.props.navigation.navigate('Home')
    }


    async componentWillMount() {
        const user = await this.getUserData()
        this.setState({ name: user.firstName })
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <Container>
                <Logo logged />
                <Card title={`Olá ${this.state.name}`}>
                    <Button title="Gerenciar condomínios" />
                </Card>
                <Button title="Sair" onPress={this.logout} />
            </Container>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogoutAction: () => dispatch(clearFields())
    }
}

export default connect(null, mapDispatchToProps)(DashboardScreen)
// export default DashboardScreen
