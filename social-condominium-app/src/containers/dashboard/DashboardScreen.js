import React, { Component } from 'react'
import { Card } from 'react-native-elements'
import {Button} from 'react-native'
import { Container } from '../../styles/styles'

import AsyncStorage from '@react-native-community/async-storage';
import { connect } from "react-redux";
import { clearFields } from '../../actions/actions'
import Logo from '../../components/logo/Logo';

class DashboardScreen extends Component {

    getUserData = async () => {
        try {
          const user = await AsyncStorage.getItem('@user')

          if(user !== null) {
              console.log(JSON.parse(user))
            return JSON.parse(user)
          }
          return null

        } catch(e) {
          // error reading value
          console.log(e)
        }
    }

    logout = async () => {
        await AsyncStorage.clear()
        this.props.onLogoutAction()
        this.props.navigation.navigate('Home')
    }


    render() {
        return (
            <Container>
                <Logo logged />
                <Card title={`Olá ${this.getUserData() ? this.getUserData().fistName : ''}`}>
                    <Button title="Sair" onPress={this.logout} />

                </Card>

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
