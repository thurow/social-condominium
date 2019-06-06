import React, { Component, Fragment } from 'react'
import { View, Text } from 'react-native'
import SideMenu from 'react-native-side-menu';
import { connect } from 'react-redux'
import Menu from '../../components/menu/Menu';
import { SafeAreaView } from 'react-navigation';
import Header from '../../components/header/Header';
import { Container, Title } from '../../styles/styles';

import { data } from '../../mock/social_list';
import { Card, Image } from 'react-native-elements';

export class SocialSpaceListScreen extends Component {
    state = {
        isOpen: false,
        socialSpaces: data.spaces
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
        const { socialSpaces } = this.state

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
                            {socialSpaces.map(space => (
                                <View
                                    key={space.id}
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
                                        source={{uri: space.image_url}} />
                                    <Text
                                        style={{
                                            fontSize: 24,
                                            fontWeight:'400'
                                        }}
                                    >
                                        {space.name}
                                    </Text>
                                </View>
                            ))}
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
