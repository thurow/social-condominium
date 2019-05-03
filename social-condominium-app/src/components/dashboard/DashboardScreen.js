import React, { Component } from 'react'
import { Card } from 'react-native-elements'
import { Container } from '../styles'

import AsyncStorage from '@react-native-community/async-storage';

export default class DashboardScreen extends Component {

    getData = async () => {
        try {
          const user = await AsyncStorage.getItem('@user')

          if(user !== null) {
          console.log(JSON.parse(user))
          // value previously stored
          }
        } catch(e) {
          // error reading value
          console.log(e)
        }
    }
    render() {
        this.getData()
        return (
            <Container>
                <Card title="Teste">

                </Card>
            </Container>
        )
    }
}
