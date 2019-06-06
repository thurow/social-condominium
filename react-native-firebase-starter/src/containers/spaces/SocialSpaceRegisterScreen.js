import React, { Component, Fragment } from 'react';
import { Image, KeyboardAvoidingView } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import ActionButton from '../../components/button/ActionButton';
import InputTypeText from '../../components/inputs/InpuTypeText';
import { Title, Container } from '../../styles/styles';
import Menu from '../../components/menu/Menu';
import Header from '../../components/header/Header';
import SideMenu from 'react-native-side-menu';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';

// import { Container } from './styles';

const createFormData = (photo, body) => {
    const data = new FormData();

    data.append("photo", {
        name: photo.fileName,
        type: photo.type,
        uri:
        Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    });

    Object.keys(body).forEach(key => {
        data.append(key, body[key]);
    });

    return data;
}

class SocialSpaceRegisterScreen extends Component {
    state = {
        space_name: '',
        space_photo: null,
        space_description: '',
        isOpen: false,
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
    _submitSpace = () => {

    }
    updateMenuState = isOpen => {
        this.setState({ isOpen });
    }
    /**
     * @TODO ajustar e executar esta funcao quando criar o espaco para armazenar a imagem
     * pensar em um jeito de subir e trabalhar com esta imagem
     */
    // handleUploadPhoto = () => {
    //     fetch("http://localhost:3000/api/upload", {
    //     method: "POST",
    //     body: createFormData(this.state.space_photo, { userId: "123" })
    //     })
    //     .then(response => response.json())
    //     .then(response => {
    //         console.log("upload succes", response);
    //         alert("Upload success!");
    //         this.setState({ space_photo: null });
    //     })
    //     .catch(error => {
    //         console.log("upload error", error);
    //         alert("Upload failed!");
    //     });
    // }
    render() {
        const { space_photo } = this.state
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
                        <KeyboardAvoidingView behavior="padding" enabled>
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
                                        <ActionButton title="Salvar foto" action={this.handleUpload} />
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

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(Actions, dispatch);

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(SocialSpaceRegisterScreen);
