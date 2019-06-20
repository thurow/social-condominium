import React, { Component, Fragment } from 'react';
import { Image, KeyboardAvoidingView } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import ActionButton from '../../components/button/ActionButton';
import InputTypeText from '../../components/inputs/InpuTypeText';
import { Title, Container } from '../../styles/styles';
import Menu from '../../components/menu/Menu';
import Header from '../../components/header/Header';
import SideMenu from 'react-native-side-menu';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';

import uuid from 'uuid/v4'
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';

class SocialSpaceRegisterScreen extends Component {
    state = {
        space_name: '',
        space_photo: null,
        space_photo_uploaded_url: null,
        space_description: '',
        isOpen: false,
        uploading: false,
        progress:0
    }
    handleChoosePhoto = () => {
        const options = {
          noData: true,
        }
        ImagePicker.launchImageLibrary(options, response => {
          if (response.uri) {
            this.setState({ space_photo: response })
          }
        })
    }
    toggleNav = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    _submitSpace = async () => {
        try {
            const { condominium } = JSON.parse(await AsyncStorage.getItem('@user'));
            const { space_name, space_description, space_photo_uploaded_url } = this.state
            await firebase.firestore().collection('social-space').add({
                space_name,
                space_description,
                space_photo_uploaded_url,
                condominium
            });

            this.props.navigation.push('SocialSpaceList')
        } catch (err) {
            console.log(err)
        }
    }
    updateMenuState = isOpen => {
        this.setState({ isOpen });
    }
    handleUploadPhoto = () => {
        const filename = `${uuid()}.jpg`; // Generate unique name
        this.setState({ uploading: true });
        console.log(filename)
        firebase
            .storage()
            .ref(`social-spaces/${filename}`)
            .putFile(this.state.space_photo.uri)
            .on(
                firebase.storage.TaskEvent.STATE_CHANGED,
                snapshot => {
                    if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
                        this.setState({
                            space_photo_uploaded_url: snapshot.downloadURL,
                            uploading: false
                        })
                        alert('Foto foi salva!')
                    }
                },
                error => {
                    unsubscribe();
                    alert('Ocorreu uma falha, tente novamente.');
                }
        );
    }
    render() {
        const { space_photo, uploading, space_photo_uploaded_url } = this.state
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
                        <KeyboardAvoidingView behavior="height" enabled style={{backgroundColor: '#fff'}}>
                            <Container>
                                <Title>Novo Espaço Social</Title>
                                <InputTypeText
                                    autoCapitalize='words'
                                    keyboardType='default'
                                    name='space_name'
                                    placeholder='Nome do Espaço'
                                    stateValue={this.state.space_name}
                                    onChange={space_name => this.setState({ space_name })}
                                />
                                <InputTypeText
                                    keyboardType='default'
                                    name='space_description'
                                    placeholder='Descrição do Espaço'
                                    multiline
                                    numberOfLines={4}
                                    stateValue={this.state.space_description}
                                    onChange={space_description => this.setState({ space_description })}
                                />
                                {space_photo && (
                                    <Fragment>
                                        <Image
                                            source={{ uri: space_photo.uri }}
                                            resizeMode="contain"
                                            style={{ width: '80%', height: 200, marginLeft: 'auto', marginRight: 'auto'}}
                                        />
                                        {uploading ? (
                                            <ActionButton title="Salvando..." disabled />
                                        ) : (
                                            <ActionButton title="Salvar foto" action={this.handleUploadPhoto} />
                                        )}
                                    </Fragment>
                                )}
                                <ActionButton
                                    title='Selecionar Foto do Espaço'
                                    action={this.handleChoosePhoto}
                                    color="#3b5998"
                                />
                                <ActionButton
                                    title='Salvar Espaço Social'
                                    action={this._submitSpace}
                                    disabled={space_photo_uploaded_url !== null ? false : true}
                                    isPrimary
                                />
                            </Container>
                        </KeyboardAvoidingView>
                    </SideMenu>
                </SafeAreaView>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({});

// export default connect(
//   mapStateToProps,
//   // mapDispatchToProps
// )(SocialSpaceRegisterScreen);
export default SocialSpaceRegisterScreen