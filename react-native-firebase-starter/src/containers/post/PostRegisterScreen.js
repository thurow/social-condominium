import React, { Component } from 'react';
import { Image, KeyboardAvoidingView } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Header from '../../components/header/Header';
import { Container, Title } from '../../styles/styles';
import InputTypeText from '../../components/inputs/InpuTypeText';
import SideMenu from 'react-native-side-menu';
import Menu from '../../components/menu/Menu';
import ActionButton from '../../components/button/ActionButton';
import { connect } from 'react-redux';

class PostRegisterScreen extends Component {

    state = {
        post_photo: null,
        post_description: '',
        isOpen: false,
    }

    handleChoosePhoto = () => {
        const options = {
            noData: true,
        }
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                this.setState({ post_photo: response })
            }
        });
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
        const { post_photo } = this.state
        const { navigation } = this.props;

        const menu = <Menu navigation={navigation} />

        return (
            <SideMenu
                menu={menu}
                isOpen={this.state.isOpen}
                disableGestures
                menuPosition='right'
                onChange={isOpen => this.updateMenuState(isOpen)}
            >
                <Header logged toggleNav={() => this.toggleNav()} />
                <KeyboardAvoidingView behavior="padding" enabled>
                    <Title>Criar publicação</Title>
                    <Container>
                        <InputTypeText
                            autoCapitalize='words'
                            keyboardType='default'
                            name='post_description'
                            multiline
                            numberOfLines={6}
                            placeholder='O que você deseja compartilhar?'
                            stateValue={this.state.post_description}
                            onChange={post_description => this.setState({ post_description })}
                        />
                        {post_photo && (
                            <React.Fragment>
                                <Image
                                    source={{ uri: post_photo.uri }}
                                    resizeMode="contain"
                                    style={{ width: '80%', height: 200, marginLeft: 'auto', marginRight: 'auto' }}
                                />
                                <ActionButton title="Salvar imagem" action={this.handleUpload} />
                            </React.Fragment>
                        )}
                        <ActionButton
                            title='Imagem'
                            action={this.handleChoosePhoto}
                            color="#3b5998"
                        />
                    </Container>
                </KeyboardAvoidingView>

            </SideMenu>
        );
    }
}

const mapStateToProps = state => ({});
export default connect(mapStateToProps)(PostRegisterScreen);