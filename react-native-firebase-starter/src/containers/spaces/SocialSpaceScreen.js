import React, { Component, Fragment } from 'react'
import SideMenu from 'react-native-side-menu';
import Menu from '../../components/menu/Menu';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import { ActivityIndicator, View, Text } from 'react-native'
import { Container, Title } from '../../styles/styles';
import Header from '../../components/header/Header';
import firebase from 'react-native-firebase';
import { Image, CheckBox } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import ActionButton from '../../components/button/ActionButton';
import AsyncStorage from '@react-native-community/async-storage';

class SocialSpaceScreen extends Component {

    state = {
        isOpen: false,
        isLoading: true,
        space: {
            space_name: '',
            space_photo_uploaded_url: null,
            space_description: ''
        },
        date: new Date(),
        spaceId: null,
        clearSpace: false,
    }

    _submitSpace = async () => {
        try {
            const { spaceId, clearSpace, date, space } = this.state
            const { id, firstName } = JSON.parse(await AsyncStorage.getItem('@user'))
            const submitData = {
                spaceId,
                condominiumId: space.condominium,
                clearSpace,
                date,
                userId: id,
                userName: firstName
            }

            await firebase.firestore().collection('social-space-rent').add(submitData)
            alert('Espaço alugado!')
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Home' })],
            });
            this.props.navigation.dispatch(resetAction);
        } catch (err) {
            console.log(err)
        }

    }

    async componentDidMount() {
        try {
            const spaceId = this.props.navigation.getParam('spaceId')

            const snapshot = await firebase.firestore().collection('social-space').doc(spaceId).get()

            if (snapshot.exists) {
                this.setState({ spaceId, space:snapshot.data(), isLoading: false })
            } else {
                alert('Espaço inválido ou não existente')
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Home' })],
                });
                this.setState({ isLoading: false})
                this.props.navigation.dispatch(resetAction);
            }
        } catch (err) {
            console.log(err)
            alert('Espaço inválido ou não existente')
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Home' })],
            });
            this.setState({ isLoading: false})
            this.props.navigation.dispatch(resetAction);
        }
    }

    toggleNav = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    updateMenuState = (isOpen) => {
        this.setState({ isOpen });
    }

    render() {

        const { navigation } = this.props;
        const { isLoading, space, isOpen } = this.state;

        if (isLoading) {
            return (
                <Fragment>
                    <SafeAreaView style={{ flex: 0, backgroundColor: '#eb4444' }} />
                    <SafeAreaView style={{ flex: 1, backgroundColor: '#3b5998' }}>
                        <SideMenu
                            menu={menu}
                            isOpen={isOpen}
                            menuPosition='right'
                            onChange={isOpen => this.updateMenuState(isOpen)}
                        >
                            <Header logged toggleNav={() => this.toggleNav()} />
                            <Container>
                                <ActivityIndicator size="large" color="#d33028" />
                            </Container>
                        </SideMenu>
                    </SafeAreaView>
                </Fragment>
            )
        }

        const menu = <Menu navigation={navigation} />
        return (
            <Fragment>
                <SafeAreaView style={{ flex: 0, backgroundColor: '#eb4444' }} />
                <SafeAreaView style={{ flex: 1, backgroundColor: '#3b5998' }}>
                    <SideMenu
                        menu={menu}
                        isOpen={isOpen}
                        menuPosition='right'
                        onChange={isOpen => this.updateMenuState(isOpen)}
                    >
                        <Header logged toggleNav={() => this.toggleNav()} />
                        <Container>
                            {isLoading && <ActivityIndicator size="large" color="#d33028" />}
                            <View
                                style={isLoading === true ? { display: 'none' } : { }}
                            >
                                <Title>{space.space_name}</Title>
                                <Image
                                    style={{width: '100%', height: 250, marginVertical: 30}}
                                    source={{uri: space.space_photo_uploaded_url}}
                                />
                                <Text>{space.space_description}</Text>

                                <View style={{
                                    flex:1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginVertical: 20
                                }}>
                                    <DatePicker
                                        style={{width: 150}}
                                        date={this.state.date}
                                        mode="date"
                                        androidMode="calendar"
                                        placeholder="select date"
                                        format="DD/MM/YYYY"
                                        minDate={new Date()}
                                        confirmBtnText="Confirmar"
                                        cancelBtnText="Cancelar"
                                        customStyles={{
                                            dateIcon: {
                                                position: 'absolute',
                                                left: 0,
                                                top: 4,
                                                marginLeft: 0
                                            },
                                            dateInput: {
                                                marginLeft: 36
                                            }
                                        }}
                                        onDateChange={date => this.setState({ date })}
                                    />
                                    <CheckBox
                                        title='Taxa de Limpeza'
                                        checkedColor='red'
                                        checked={this.state.clearSpace}
                                        containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                                        onPress={() => this.setState({ clearSpace: !this.state.clearSpace })}
                                    />
                                </View>

                                <ActionButton
                                    title='Alugar Espaço'
                                    action={this._submitSpace}
                                    isPrimary
                                />
                            </View>

                        </Container>
                    </SideMenu>
                </SafeAreaView>
            </Fragment>
        )
    }
}

export default SocialSpaceScreen