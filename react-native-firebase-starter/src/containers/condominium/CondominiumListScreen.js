import React, { Component, Fragment } from 'react'
import { View, Text, FlatList } from 'react-native'
import SideMenu from 'react-native-side-menu';
import Menu from '../../components/menu/Menu';
import { SafeAreaView } from 'react-navigation';
import Header from '../../components/header/Header';
import { Container, Title } from '../../styles/styles';
import firebase from 'react-native-firebase';
import Loading from '../../components/utils/Loading';

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
                            <FlatList
                                data={condominiuns}
                                keyExtractor={condominium => condominium.id.toString()}
                                renderItem={({item}) =>
                                    <View
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