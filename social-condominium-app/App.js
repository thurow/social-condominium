import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import LoginScreen from './components/login/LoginScreen';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <LoginScreen />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
