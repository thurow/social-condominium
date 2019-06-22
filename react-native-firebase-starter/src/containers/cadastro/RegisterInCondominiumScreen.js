import React, { Component } from 'react'
import firebase from 'react-native-firebase'
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import Header from '../../components/header/Header';
import { Container, Title } from '../../styles/styles';
import Loading from '../../components/utils/Loading';
import { clearFields } from '../../actions/actions';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-community/async-storage';
import ActionButton from '../../components/button/ActionButton';

class RegisterInCondominiumScreen extends Component {

    state = {
        user: {},
        condominium: '',
        placeholder: {
            label: 'Selecione o condomínio...',
            value: null,
            color: '#9EA0A4',
        },
        isLoading: true,
        condominiuns: []
    }

    fetchUserData = async () => {
        try {
            const userStr = await AsyncStorage.getItem('@user')
            const user = JSON.parse(userStr)
            this.setState({ user })
        } catch (e) {
            console.log(e)
        }
    }

    async getCondominiuns() {
        try {
            const snapshot = await firebase.firestore().collection('condominium').get();
            return snapshot.docs.map(doc => ({ value: doc.id, label: doc.data().name }));
        } catch (err) {
            console.log(err)
        }
    }

    async componentDidMount() {
        await this.fetchUserData()
        this.setState({ condominiuns: await this.getCondominiuns()})
        this.setState({ isLoading: false })
    }

    _registerInCondominium = async () => {
        const user = await firebase.firestore().collection('users').doc(this.state.user.id)

        await firebase.firestore().runTransaction(async transaction => {
            const doc = await transaction.get(user);
            if (!doc.exists) {
                console.log(doc, user)
                alert('Usuário não encontrado.');
                return 1;
            }

            transaction.update(user, {
                condominium: this.state.condominium,
            });

            return doc.data();
        }).then(async response => {
            await this.storeData(response)
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Dashboard' })],
            });
            this.props.navigation.dispatch(resetAction);
        }).catch(err => {
            console.log(err)
        })
    }

    storeData = async user => {
		try {
            const userAS = JSON.parse(await AsyncStorage.getItem('@user'))
            userAS.condominium = this.state.condominium
            await AsyncStorage.setItem('@user', JSON.stringify(userAS));
		} catch (e) {
			console.log(e)
		}
	}

    logout = async () => {
        try {
            await AsyncStorage.clear()
            this.props.onLogoutAction()
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Home' })],
            });
            this.props.navigation.dispatch(resetAction);
        } catch (err) {
            console.log(err)
        }
    }

    render () {
        const { isLoading, condominiuns, condominium, placeholder } = this.state

        if (isLoading) {
            return (
                <SafeAreaView>
                    <Header />
                    <Container>
                        <Loading />
                    </Container>
                </SafeAreaView>
            )
        }

        return (
            <SafeAreaView>
                <Header />
                <Container>
                    <Title>Selecione seu Condomínio</Title>
                    <RNPickerSelect
                        placeholder={placeholder}
                        items={condominiuns}
                        style={pickerSelectStyles}
                        onValueChange={condominium => this.setState({ condominium })}
                        value={condominium}
                    />
                    <ActionButton
                        title='Registrar-se no Condomínio'
                        isPrimary
                        action={this._registerInCondominium}
                    />
                    <ActionButton
                        title='Sair da conta'
                        action={this.logout}
                    />
                </Container>
            </SafeAreaView>
        )
    }
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        height:40,
        paddingBottom: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#3b5998',
        color: 'black'
    },
    inputAndroid: {
        height:40,
        paddingBottom: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#3b5998',
        color: 'black'
    },
});

const mapDispatchToProps = dispatch => {
    return {
        onLogoutAction: () => dispatch(clearFields())
    }
}

export default connect(null, mapDispatchToProps)(RegisterInCondominiumScreen)
