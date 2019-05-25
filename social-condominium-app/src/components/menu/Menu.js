import React from 'react'
import { ScrollView, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    menu: {
        flex: 1,
        width: window.width,
        height: window.height,
        backgroundColor: 'gray',
        padding: 20,
    },
    avatarContainer: {
        marginBottom: 20,
        marginTop: 20,
    },
    name: {
        position: 'absolute',
        left: 70,
        top: 20,
    },
    item: {
        fontSize: 14,
        fontWeight: '300',
        paddingTop: 5,
    },
});

class Menu extends React.Component {
  render() {
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
        <Text
          onPress={() => this.props.navigation.push('SocialSpaceRegister')}
          style={styles.item}
        >
            Cadastrar Espaço Social
          </Text>
      </ScrollView>
    )
  }
}

export default Menu
