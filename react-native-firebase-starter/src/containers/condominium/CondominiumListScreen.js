import React, { Component, Fragment } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import SideMenu from 'react-native-side-menu';
import Menu from '../../components/menu/Menu';
import { SafeAreaView } from 'react-navigation';
import Header from '../../components/header/Header';
import { Container, Title } from '../../styles/styles';
import firebase from 'react-native-firebase';
import Loading from '../../components/utils/Loading';
import ActionButton from '../../components/button/ActionButton';

class CondominiumListScreen extends Component {

    state = {
        isOpen: false,
        isLoading: true,
        condominiuns: []
    }

    async componentDidMount() {
        firebase.firestore().collection('condominium').get()
            .then(snapshot => {
                this.setState({
                    condominiuns: snapshot.docs.map(doc => ({id: doc.id, value: doc.data()})),
                    isLoading: false
                });
            });
    }

    _listEmptyComponent = () => {
        return (
            <View>
                <Text>Nenhum Condomínio encontrado ;(</Text>
            </View>
        )
    }

    render() {
        if (this.state.isLoading) {
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
                                <Loading />
                            </Container>
                        </SideMenu>
                    </SafeAreaView>
                </Fragment>
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
                            <FlatList
                                data={condominiuns}
                                keyExtractor={condominium => condominium.id.toString()}
                                ListEmptyComponent={this._listEmptyComponent}
                                renderItem={({item}) =>
                                    <View
                                        style={{
                                            flex: 0,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginBottom: 15,
                                            padding: 15,
                                            borderWidth: 0.3,
                                            borderRadius: 7,
                                            borderColor: "red"
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 22,
                                                fontWeight: '300',
                                                width: '100%'
                                            }}
                                            onPress={() => this.props.navigation.navigate('CondominiumRegister', {key: item.id})}
                                        >
                                            {item.value.name}
                                        </Text>
                                    </View>
                                }
                            />
                        </Container>
                    </SideMenu>
                </SafeAreaView>
                <View>
                    <ActionButton
                        title="Novo condomínio"
                        isPrimary
                        action={() => this.props.navigation.navigate('CondominiumRegister')}
                    />
                </View>
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