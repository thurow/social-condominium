import React, { Component, Fragment } from 'react'
import firebase from 'react-native-firebase';
import { Alert } from 'react-native';
import { KeyboardAvoidingView, View } from 'react-native';
import InpuTypeText from '../../components/inputs/InpuTypeText'
import ActionButton from '../../components/button/ActionButton';
import Loading from '../../components/utils/Loading';
import { Container } from '../../styles/styles'
import Header from '../../components/header/Header';
import SideMenu from 'react-native-side-menu';
import Menu from '../../components/menu/Menu';

class CondominiumScreen extends Component {

    state = {
        key: '',
        city: '',
        complement: '',
        description: '',
        name: '',
        number: '',
        state: '',
        street: '',
        isLoading: false,
        isOpen: false
    }

    updateMenuState(isOpen) {
        this.setState({ isOpen });
    }

    async componentDidMount() {
        const { navigation } = this.props;
        const key = navigation.getParam('key', 'NO-ID');
        if(key && key.length > 0) {
            firebase.firestore().collection('condominium').doc(key).get()
                .then((doc) => {
                    if(doc.exists) {
                        const condominium = doc.data();
                        this.setState({
                            key: doc.id,
                            city: condominium.city,
                            complement: condominium.complement,
                            description: condominium.description,
                            name: condominium.name,
                            number: condominium.number,
                            state: condominium.state,
                            street: condominium.state,
                            isLoading: false
                        })
                    }
                });
        } else {
            Alert.alert('Não foi possível recuperar o condomínio.');
        }
    }

    toggleNav() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    register = async() => {
        this.setState({
            isLoading: true
        });

        await firebase.firestore().collection('condominium').add({
            city: this.state.city,
            complement: this.state.complement,
            description: this.state.description,
            name: this.state.name,
            number: this.state.number,
            state: this.state.state,
            street: this.state.street
        }).then((docRef) => {
            this.setState({
                isLoading: false
            })
            
            Alert.alert('Condomínio salvo com sucesso!');
        }).catch((error) => {
            console.error("Erro ao salvar condomínio: ", error);
            this.setState({
              isLoading: false,
            });
            Alert.alert('Ocorreu uma falha ao salvar o condomínio');
        });
    }

    render() {
        if(this.state.isLoading){
            return(
              <View>
                <Loading/>
              </View>
            )
        }

        const { navigation } = this.props;
        const menu = <Menu navigation={navigation} />
        return (
            <Fragment>
                <SafeAreaView style={{ flex: 0, backgroundColor: '#eb4444' }} />
                <SafeAreaView style={{ flex: 1, backgroundColor: '#3b5998' }}>
                    <SideMenu
                        menu={menu}
                        isOpen={this.state.isOpen}
                        disableGestures
                        menuPosition='right'
                        onChange={isOpen => this.updateMenuState(isOpen)}
                    >
                        <Header logged toggleNav={() => this.toggleNav()} />
                        <KeyboardAvoidingView behavior="padding" enabled>
                            <Container>
                                <InpuTypeText
                                    stateValue={this.state.name}
                                    name='name'
                                    autoCapitalize='words'
                                    keyboardType='default'
                                    onChange={(name) => this.setState({ name })}
                                    placeholder='Nome'
                                />
                                <InpuTypeText
                                    stateValue={this.state.description}
                                    name='description'
                                    autoCapitalize='words'
                                    keyboardType='default'
                                    onChange={(description) => this.setState({ description })}
                                    placeholder='Descrição'
                                />
                                <InpuTypeText
                                    stateValue={this.state.street}
                                    name='street'
                                    autoCapitalize='words'
                                    keyboardType='default'
                                    onChange={(street) => this.setState({ street })}
                                    placeholder='Rua'
                                />
                                <InpuTypeText
                                    stateValue={this.state.number}
                                    name='number'
                                    autoCapitalize='words'
                                    keyboardType='default'
                                    onChange={(number) => this.setState({ number })}
                                    placeholder='Número'
                                />
                                <InpuTypeText
                                    stateValue={this.state.complement}
                                    name='complement'
                                    autoCapitalize='words'
                                    keyboardType='default'
                                    onChange={(complement) => this.setState({ complement })}
                                    placeholder='Complemento'
                                />
                                <InpuTypeText
                                    stateValue={this.state.city}
                                    name='city'
                                    autoCapitalize='words'
                                    keyboardType='default'
                                    onChange={(city) => this.setState({ city })}
                                    placeholder='Cidade'
                                />
                                <InpuTypeText
                                    stateValue={this.state.state}
                                    name='state'
                                    autoCapitalize='words'
                                    keyboardType='default'
                                    onChange={(state) => this.setState({ state })}
                                    placeholder='Estado (UF)'
                                />
                                <ActionButton
                                    title="Salvar"
                                    isPrimary
                                    action={this.register}
                                />
                            </Container>
                        </KeyboardAvoidingView>
                    </SideMenu>
                </SafeAreaView>
            </Fragment>
        )
    }

}

CondominiumScreen.navigationOptions = {
    title: 'Condomínio'
}
  
export default CondominiumScreen