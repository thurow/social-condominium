import React from 'react'
import { ScrollView, Text, StyleSheet } from 'react-native'
import { Title } from '../../styles/styles';
import { connect } from "react-redux";
import { clearFields } from '../../actions/actions';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: 'white',
    padding: 20,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
    width: '100%',
    fontSize: 16,
    fontWeight: '300',
    paddingTop: 5,
    paddingBottom: 10,
    borderBottomWidth: 1
  },
});

class Menu extends React.Component {
  logout = async () => {
    await AsyncStorage.clear()
    this.props.onLogoutAction()
    const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Home' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
        <Title>Menu</Title>
        <Text
          onPress={() => this.props.navigation.push('Dashboard')}
          style={styles.item}
        >
          Início
        </Text>
        <Text
          onPress={() => this.props.navigation.push('SocialSpaceRegister')}
          style={styles.item}
        >
          Cadastrar Espaço Social
        </Text>
        <Text
          onPress={() => this.props.navigation.push('PostRegister')}
          style={styles.item}
        >
          Criar publicação
        </Text>
        <Text
          onPress={() => this.props.navigation.push('SocialSpaceList')}
          style={styles.item}
        >
          Espaços Sociais
        </Text>
        <Text
          onPress={this.logout}
          style={{...styles.item, color:'red'}}
        >
          Sair
        </Text>
      </ScrollView>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogoutAction: () => dispatch(clearFields())
  }
}

export default connect(null, mapDispatchToProps)(Menu)
