import React, { Component, Fragment } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import SideMenu from 'react-native-side-menu';
import { connect } from 'react-redux'
import Menu from '../../components/menu/Menu';
import { SafeAreaView } from 'react-navigation';
import Header from '../../components/header/Header';
import { Container, Title } from '../../styles/styles';
import { Image } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import firebase from 'react-native-firebase';
/**
 * @TODO Filtrar lista pelo condominio do user
 */
export class SocialSpaceListScreen extends Component {
    state = {
        isOpen: false,
        isLoading: true,
        socialSpaces: []
    }

    async componentDidMount() {
        const snapshot = await firebase.firestore().collection('social-space').get()
        this.setState({
            socialSpaces: snapshot.docs.map( doc => (
                {
                    id: doc.id,
                    name: doc.data().space_name,
                    image_url: doc.data().space_photo_uploaded_url
                }
            )),
            isLoading: false
        })
    }

    toggleNav() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    updateMenuState(isOpen) {
        this.setState({ isOpen });
    }

    render() {
        const { navigation } = this.props;
        const { socialSpaces, isLoading } = this.state

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
                            <Title>Alugar Espaço</Title>
                            {isLoading && <ActivityIndicator size="large" color="#d33028" />}
                            <FlatList
                                data={socialSpaces}
                                style={isLoading === true ? { display: 'none' } : { borderEndColor: '#eee', borderEndWidth:1 }}
                                keyExtractor={space => space.id.toString()}
                                renderItem={({item}) =>
                                    <View
                                        style={{
                                            flex: 0,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginBottom: 15,
                                            padding:15,
                                            borderBottomWidth: 2,
                                            borderColor: "#eee"
                                        }}
                                    >
                                        <Image
                                            style={{width: 100, height: 75, marginRight:10}}
                                            source={{uri: item.image_url}} />
                                        <Text
                                            style={{
                                                paddingVertical: 20,
                                                fontSize: 20,
                                                fontWeight:'400'
                                            }}
                                            onPress={() => navigation.push('SocialSpace', {
                                                spaceId: item.id
                                            })}
                                        >
                                            {item.name}
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
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(SocialSpaceListScreen)
