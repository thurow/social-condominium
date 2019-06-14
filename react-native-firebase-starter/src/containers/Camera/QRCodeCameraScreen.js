import React, { Component } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { RNCamera } from "react-native-camera";

class QRCodeCameraScreen extends Component {

    onBarCodeRead = (e) => {
        Alert.alert("Barcode value is"+e.data ,"Barcode type is"+e.type);
    }
    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    style={styles.preview}
                    onBarCodeRead={this.onBarCodeRead}
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
