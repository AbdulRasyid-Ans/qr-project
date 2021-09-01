import React from 'react';
import { Text, View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
const SCREEN_WIDTH = Dimensions.get('window').width

export default function Home({ navigation }) {
    function pressBtnScanQR() {
        navigation.navigate('Scan')
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.btnQR} onPress={pressBtnScanQR}>
                <Text style={styles.text}>Scan QR</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 0.07 * SCREEN_WIDTH,
        fontWeight: 'bold',
        color: '#61DAFB',
        textTransform: 'capitalize'
    },
    btnQR: {
        alignItems: "center",
        width: SCREEN_WIDTH / 2,
        borderWidth: 2,
        borderColor: '#61DAFB',
        borderRadius: 10,
        padding: 10,
        margin: 10
    },
});