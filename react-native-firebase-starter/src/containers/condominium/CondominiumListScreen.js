import React, { Component, Fragment } from 'react'
import { View, Text } from 'react-native'
import SideMenu from 'react-native-side-menu';
import Menu from '../../components/menu/Menu';
import { SafeAreaView } from 'react-navigation';
import Header from '../../components/header/Header';
import { Container, Title } from '../../styles/styles';
import firebase from 'react-native-firebase';

class CondominiumListScreen extends Component {

    state = {
        isOpen: false,
        isLoading: false,
        condominiuns: []
    }

    async getCondominiuns() {
        const snapshot = await firebase.firestore().collection('condominium').get();
        return snapshot.docs.map(doc => doc.data());
    }

    async componentDidMount() {
        this.state.isLoading = true;
        this.state.condominiuns = await this.getCondominiuns();
        this.state.isLoading = false;
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View>
                    <Loading />
                </View>
            )
        }

        const { navigation } = this.props;
        const { condominiuns } = this.state;
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
                            <Title>Condomínios</Title>
                            {condominiuns.map(condominium => (
                                <View
                                    key={condominium.id}
                                    style={{
                                        flex: 0,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginBottom: 15,
                                        padding: 15,
                                        borderBottomWidth: 2,
                                        borderColor: "#eee"
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 24,
                                            fontWeight: '400'
                                        }}
                                    >
                                        {condominium.name}
                                    </Text>
                                </View>
                            ))}
                        </Container>
                    </SideMenu>
                </SafeAreaView>
            </Fragment>
        )
    }

    toggleNav() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    updateMenuState(isOpen) {
        this.setState({ isOpen });
    }
}

export default CondominiumListScreen