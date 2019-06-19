import React, { Component, Fragment } from 'react'
import SideMenu from 'react-native-side-menu';
import Menu from '../../components/menu/Menu';
import { SafeAreaView } from 'react-navigation';
import { ActivityIndicator, View, Text } from 'react-native'
import { Container, Title } from '../../styles/styles';
import Header from '../../components/header/Header';
import firebase from 'react-native-firebase';
import { Image, CheckBox } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import ActionButton from '../../components/button/ActionButton';

class SocialSpaceScreen extends Component {

    state = {
        isOpen: false,
        isLoading: true,
        space: {},
        date: new Date(),
        clearSpace: false
    }

    async componentDidMount() {
        try {
            const spaceId = this.props.navigation.getParam('spaceId')

            const snapshot = await firebase.firestore().collection('social-space').doc(spaceId).get()
            this.setState({ space:snapshot.data(), isLoading: false })
        } catch (err) {
            console.log(err)
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
                                style={isLoading === true ? { display: 'none' } : { borderEndColor: '#eee', borderEndWidth:1 }}
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
                                    action={() => console.log(this.state)}
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