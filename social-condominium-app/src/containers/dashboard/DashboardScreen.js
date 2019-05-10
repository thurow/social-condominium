import React, { Component } from 'react'
import { Card } from 'react-native-elements'
import {Button} from 'react-native'
import { Container } from '../../styles/styles'

import AsyncStorage from '@react-native-community/async-storage';
import { connect } from "react-redux";
import { clearFields } from '../../actions/actions'

class DashboardScreen extends Component {

    getData = async () => {
        try {
          const user = await AsyncStorage.getItem('@user')

          if(user !== null) {
          // value previously stored
          }
        } catch(e) {
          // error reading value
          console.log(e)
        }
    }

    logout = async () => {
        await AsyncStorage.clear()
        this.props.navigation.navigate('Home')
        this.props.onLogoutAction()
    }


    render() {
        this.getData()
        return (
            <Container>
                <Card title="oi">
                    <Button title="Sair" onPress={this.logout} />

                </Card>

            </Container>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogoutAction: () => dispatch(clearFields)
    }
}

export default connect(null, mapDispatchToProps)(DashboardScreen)