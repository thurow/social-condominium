import React, { Component, Fragment } from 'react';
import { Image, KeyboardAvoidingView } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Header from '../../components/header/Header';
import { Container, Title } from '../../styles/styles';
import InputTypeText from '../../components/inputs/InpuTypeText';
import SideMenu from 'react-native-side-menu';
import Menu from '../../components/menu/Menu';
import ActionButton from '../../components/button/ActionButton';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import uuid from 'uuid/v4'

class PostRegisterScreen extends Component {

    state = {
        post_photo: null,
        post_photo_uploaded_url: null,
        post_description: '',
        isOpen: false,
        uploading: false
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
    handleUploadPhoto = () => {
        const filename = `${uuid()}.jpg`; // Generate unique name
        this.setState({ uploading: true });
        firebase
            .storage()
            .ref(`posts/${filename}`)
            .putFile(this.state.post_photo.uri)
            .on(
                firebase.storage.TaskEvent.STATE_CHANGED,
                snapshot => {
                    if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
                        this.setState({
                            post_photo_uploaded_url: snapshot.downloadURL,
                            uploading: false
                        })
                        alert('Imagem salva com sucesso!')
                    }
                },
                error => {
                    unsubscribe();
                    alert('Falha ao salvar a imagem. Tente novamente!');
                }
        );
    }

    toggleNav() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    updateMenuState(isOpen) {
        this.setState({ isOpen });
    }

    savePost = async() => {
        const { id, condominium } = JSON.parse(await AsyncStorage.getItem('@user'));
        const { post_description, post_photo_uploaded_url } = this.state;
        await firebase.firestore().collection('post').add({
            datetime: new Date(),
            description: post_description,
            photo_url: post_photo_uploaded_url,
            condominium: condominium,
            userid: id
        });
    }

    render() {
        const { post_photo, uploading } = this.state;
        const { navigation } = this.props;

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
                        <KeyboardAvoidingView behavior="height" enabled>
                            <Container>
                                <Title>Criar publicação</Title>
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
                                        {uploading ? (
                                            <ActionButton title="Salvando..." disabled />
                                        ) : (
                                            <ActionButton title="Salvar imagem" action={this.handleUploadPhoto} />
                                        )}
                                    </React.Fragment>
                                )}
                                <ActionButton
                                    title='Imagem'
                                    action={this.handleChoosePhoto}
                                    color="#3b5998"
                                />
                                <ActionButton
                                    title='Publicar'
                                    isPrimary
                                    action={this.savePost}
                                />
                            </Container>
                        </KeyboardAvoidingView>
                    </SideMenu>
                </SafeAreaView>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({});
export default connect(mapStateToProps)(PostRegisterScreen);