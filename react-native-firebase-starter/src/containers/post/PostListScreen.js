import React, { Component, Fragment } from 'react'
import { View, Text } from 'react-native'
import SideMenu from 'react-native-side-menu';
import Menu from '../../components/menu/Menu';
import { SafeAreaView } from 'react-navigation';
import Header from '../../components/header/Header';
import { Container, Title } from '../../styles/styles';
import { Image } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';

export default class PostListScreen extends Component {

    state = {
        isOpen: false,
        isLoading: true,
        posts: []
    }

    async getPosts() {
        const { condominium } = JSON.parse(await AsyncStorage.getItem('@user'));

        const posts = (await firebase.firestore().collection('post').where('condominium', '==', condominium).orderBy('datetime', 'desc')
            .get()).docs().map(doc => doc.data());

        const users = (await firebase.firestore().collection('users').get()).docs().map( doc => (
            {
                id: doc.id,
                firstName: doc.data().firstName,
                lastName: doc.data().lastName
            }
        ));

        posts.forEach(post => {
            const user = users.find(user => user.id == post.userid);
            post.username = `${user.firstName} ${user.lastName}`;
        });

        this.setState({
            posts
        });
    }

    async componentDidMount() {
        await this.getPosts();
        this.setState({
            isLoading: true
        });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <>
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
                </>
            )
        }

        const { navigation } = this.props;
        const { posts, isLoading } = this.state;
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
                            <Title>Feed</Title>
                            <FlatList
                                data={posts}
                                keyExtractor={post => post.id.toString()}
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
                                        <Image
                                            style={{width: 100, height: 75, marginRight:10}}
                                            source={{uri: item.photo_url}} />

                                        <Text
                                            style={{
                                                paddingVertical: 20,
                                                fontSize: 20,
                                                fontWeight:'400',
                                                width: 0,
                                                flexGrow: 1,
                                                flex: 1,
                                            }}
                                        >
                                            {item.username}
                                        </Text>
                                        <Text
                                            style={{
                                                paddingVertical: 20,
                                                fontSize: 20,
                                                fontWeight:'400',
                                                width: 0,
                                                flexGrow: 1,
                                                flex: 1,
                                            }}
                                        >
                                            {item.datetime}
                                        </Text>
                                        <Text
                                            style={{
                                                paddingVertical: 20,
                                                fontSize: 20,
                                                fontWeight:'400',
                                                width: 0,
                                                flexGrow: 1,
                                                flex: 1,
                                            }}
                                        >
                                            {item.description}
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

export default PostListScreen