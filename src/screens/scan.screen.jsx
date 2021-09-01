import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Icon from "react-native-vector-icons/Ionicons";
import * as Animatable from "react-native-animatable";

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default class ScanScreen extends Component {
  constructor() {
    super();
    this.state = {
      qrText: '',
      flash: false,
      flashMode: RNCamera.Constants.FlashMode.off,
      flashButtonTxt: 'Turn on Flash',
    };
  }

  onSuccess = e => {
    this.setState({ qrText: e.data })
  };

  onPress = () => {
    if (this.state.flash) {
      this.setState({
        flash: false,
        flashMode: RNCamera.Constants.FlashMode.off,
        flashButtonTxt: 'Turn on Flash',
      })
    }
    else {
      this.setState({
        flash: true,
        flashMode: RNCamera.Constants.FlashMode.torch,
        flashButtonTxt: 'Turn off Flash',
      })
    }
  }

  makeSlideOutTranslation(translationType, fromValue) {
    return {
      from: {
        [translationType]: SCREEN_WIDTH * -0.18
      },
      to: {
        [translationType]: fromValue
      }
    };
  }

  render() {
    return (
      <QRCodeScanner
        // onRead digunakan untuk memanggil fungsi yang ingin dijalankan ketika QR Code nya terbaca
        onRead={this.onSuccess}
        // flashMode digunakan untuk mengatur mode flash pada kamera dan value nya diambil dari package 'react-native-camera' 
        flashMode={this.state.flashMode}
        // value showMarker harus true jika ingin menggunakan customMarker, default false
        showMarker={true}
        // reactivate digunakan untuk scan QR secara terus menerus, default false (hanya 1x scan QR)
        reactivate={true}
        // reactivateTimeout digunakan untuk mengatur delay scan QR jika value reactivate true, default 0 ms
        reactivateTimeout={3000}
        // cameraStyle digunakan untuk merubah style pada View Camera
        cameraStyle={{ height: SCREEN_HEIGHT }}
        // customMarker digunakan untuk kostumisasi view Marker
        customMarker={
          <View style={styles.rectangleContainer}>
            <View style={styles.topOverlay}>
              <Text style={{ fontSize: 30, color: "white" }}>
                QR CODE SCANNER
              </Text>
              <Text style={{ fontSize: 15, color: "white" }}>
                {`${this.state.qrText}`}
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <View style={styles.leftAndRightOverlay} />

              <View style={styles.rectangle}>
                <Icon
                  name="scan-outline"
                  size={SCREEN_WIDTH * 0.70}
                  color={iconScanColor}
                />
                <Animatable.View
                  style={styles.scanBar}
                  direction="alternate-reverse"
                  iterationCount="infinite"
                  duration={2000}
                  easing="linear"
                  animation={this.makeSlideOutTranslation(
                    "translateY",
                    SCREEN_WIDTH * -0.55
                  )}
                />
              </View>

              <View style={styles.leftAndRightOverlay} />
            </View>

            <View style={styles.bottomOverlay} />
            <TouchableOpacity style={styles.buttonTouchable} onPress={this.onPress}>
              <Text style={styles.buttonText}>{`${this.state.flashButtonTxt}`}</Text>
            </TouchableOpacity>
          </View>
        }
      />
    );
  }
}

const overlayColor = "rgba(0,0,0,0.8)";

const rectDimensions = SCREEN_WIDTH * 0.65;
const rectBorderWidth = SCREEN_WIDTH * 0.005;
const rectBorderColor = "green";

const scanBarWidth = SCREEN_WIDTH * 0.46;
const scanBarHeight = SCREEN_WIDTH * 0.005;
const scanBarColor = "#ff0000";

const iconScanColor = "green";

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    paddingBottom: SCREEN_WIDTH * 0.25,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rectangleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },

  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    borderWidth: rectBorderWidth,
    borderColor: rectBorderColor,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },

  topOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    justifyContent: "center",
    alignItems: "center"
  },

  bottomOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    // paddingBottom: SCREEN_WIDTH * 0.25
  },

  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor
  },

  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor
  },
});