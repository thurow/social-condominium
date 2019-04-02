import React, { Component } from 'react'
import { ScrollView, Text, Image, View, Button } from 'react-native'
import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {
  render () {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.section} >
            <Text style={styles.sectionTitle}>
              Social Condominium Hello World
            </Text>
          </View>

          <View>
            <Button
                title="Faça Login" 
                onPress={() => navigate('LoginScreen')}
            />
          </View>

        </ScrollView>
      </View>
    )
  }
}
