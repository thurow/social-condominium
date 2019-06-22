import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { RNCamera } from "react-native-camera";

class QRCodeCameraScreen extends Component {

    state = {
        shouldReadBarCode: true
    }

    onBarCodeRead = (e) => {
        try {
            this.setState({ shouldReadBarCode:false })
            const spaceId = e.data
            this.props.navigation.push('SocialSpace', {
                spaceId
            })
        } catch (err) {
            alert('Ocorreu um problema, por favor tente novamente.')
        }
    }

    render() {
        const { shouldReadBarCode }  = this.state;
        return (
            <View style={styles.container}>
                <RNCamera
                    style={styles.preview}
                    onBarCodeRead={shouldReadBarCode ? this.onBarCodeRead : null}
                    ref={cam => this.camera = cam}
                ></RNCamera>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
})

export default QRCodeCameraScreen
